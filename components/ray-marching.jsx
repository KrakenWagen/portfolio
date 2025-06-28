import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { Leva, folder, useControls } from "leva";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

const vertexShader = `
varying vec3 worldNormal;
varying vec3 eyeVector;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  worldNormal = normalize(mat3(modelMatrix) * normal);
  eyeVector = normalize(worldPos.xyz - cameraPosition);
}
`;

const fragmentShader = `
uniform float uOpacity;

uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;

uniform float uSaturation;
uniform float uChromaticAberration;
uniform float uRefractPower;
uniform float uFresnelPower;
uniform float uShininess;
uniform float uDiffuseness;
uniform vec3 uLight;

uniform vec2 winResolution;
uniform sampler2D uTexture;

varying vec3 worldNormal;
varying vec3 eyeVector;

vec3 sat(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  float intensity = dot(rgb, W);

  // Clamp adjustment to [0, 2] to avoid negative or extreme values
  adjustment = clamp(adjustment, 0.0, 2.0);

  // Interpolate between grayscale intensity and rgb
  vec3 color = mix(vec3(intensity), rgb, adjustment);

  // Clamp final color so no negative values
  return max(color, vec3(0.0));
}

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;
  return pow(inversefresnelFactor, power);
}

float specular(vec3 light, float shininess, float diffuseness) {
  vec3 normal = normalize(worldNormal);
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeVector + lightVector);

  float NdotL = dot(normal, lightVector);
  float NdotH = dot(normal, halfVector);
  float kDiffuse = max(0.0, NdotL);
  float NdotH2 = NdotH * NdotH;

  float kSpecular = pow(NdotH2, shininess);
  return kSpecular + kDiffuse * diffuseness;
}

const int LOOP = 16;

void main() {
  float iorRatioRed = 1.0/uIorR;
  float iorRatioGreen = 1.0/uIorG;
  float iorRatioBlue = 1.0/uIorB;

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = normalize(worldNormal);
  vec3 color = vec3(0.0);

  for (int i = 0; i < LOOP; i++) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(normalize(eyeVector), normal, iorRatioRed);
    vec3 refractVecY = refract(normalize(eyeVector), normal, 1.0/uIorY);
    vec3 refractVecG = refract(normalize(eyeVector), normal, iorRatioGreen);
    vec3 refractVecC = refract(normalize(eyeVector), normal, 1.0/uIorC);
    vec3 refractVecB = refract(normalize(eyeVector), normal, iorRatioBlue);
    vec3 refractVecP = refract(normalize(eyeVector), normal, 1.0/uIorP);

    float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;

    float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
               texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
               texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;

    float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;

    float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
               texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
               texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;

    float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;

    float p = (texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
               texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
               texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;

    float R = r + (2.0*p + 2.0*y - c)/3.0;
    float G = g + (2.0*y + 2.0*c - p)/3.0;
    float B = b + (2.0*c + 2.0*p - y)/3.0;

    color.r += R;
    color.g += G;
    color.b += B;

    color = sat(color, uSaturation);
  }

  color /= float(LOOP);

  // HACK:
  float bgLuminance = dot(color, vec3(0.4, 1.0, 0.8));

  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight;

  float f = fresnel(eyeVector, normal, uFresnelPower);
  color += f * vec3(1.0);

  color = color / (color + vec3(1.0));
  color = pow(color, vec3(1.0 / 2.2));

  // HACK: Adaptive saturation boost for brighter backgrounds
  float contrast = mix(1.0, 6.0, smoothstep(0.0, 1.0, bgLuminance));
  vec3 midpoint = vec3(0.74);
  color = (color - midpoint) * contrast + midpoint;
  
  gl_FragColor = vec4(color, uOpacity);

}
`;


function LerpedBackground() {
  const [color, setColor] = useState(() =>
    getComputedStyle(document.body)
      .backgroundColor
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const cssColor = getComputedStyle(document.body)
        .backgroundColor;

      if (cssColor && cssColor !== color) {
        setColor(cssColor);
      }
    }, 150); // check every 150ms

    return () => clearInterval(interval);
  }, [color]);

  return <color attach="background" args={[color]} />;
}

function Geometries() {
  const mesh = useRef(null);
  const backgroundGroup = useRef(null);
  const mainRenderTarget = useFBO();
  const backRenderTarget = useFBO();

  const {
    
    light,
    shininess,
    diffuseness,
    fresnelPower,
    iorR,
    iorY,
    iorG,
    iorC,
    iorB,
    iorP,
    saturation,
    chromaticAberration,
    refraction,
  } = useControls({
    light: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
    diffuseness: { value: 0.2 },
    shininess: { value: 15.0 },
    fresnelPower: { value: 8.0 },
    ior: folder({
      iorR: { min: 1.0, max: 2.333, step: 0.001, value: 1.96 },
      iorY: { min: 1.0, max: 2.333, step: 0.001, value: 1.68 },
      iorG: { min: 1.0, max: 2.333, step: 0.001, value: 1.18 },
      iorC: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
      iorB: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
      iorP: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
    }),
    saturation: { value: 1.14, min: 1, max: 1.25, step: 1.11 },
    chromaticAberration: { value: 0.5, min: 0, max: 1.5, step: 0.01 },
    refraction: { value: 0.25, min: 0, max: 1, step: 0.01 },
  });

  const uniforms = useMemo(
    () => ({
      uOpacity: { value: 0 },
      uTexture: { value: null },
      uIorR: { value: iorR },
      uIorY: { value: iorY },
      uIorG: { value: iorG },
      uIorC: { value: iorC },
      uIorB: { value: iorB },
      uIorP: { value: iorP },
      uRefractPower: { value: refraction },
      uChromaticAberration: { value: chromaticAberration },
      uSaturation: { value: saturation },
      uShininess: { value: shininess },
      uDiffuseness: { value: diffuseness },
      uFresnelPower: { value: fresnelPower },
      uLight: { value: light },
      winResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
      },
    }),
    [
      iorR, iorY, iorG, iorC, iorB, iorP,
      refraction, chromaticAberration, saturation,
      shininess, diffuseness, fresnelPower, light,
    ]
  );

  useFrame(({ gl, scene, camera, clock }) => {
    if (!mesh.current) return;

    const elapsed = clock.getElapsedTime();
    const fadeDuration = 1; // seconds
    const opacity = Math.min(elapsed / fadeDuration, 1);
    
    mesh.current.material.uniforms.uOpacity.value = opacity;

    const t = clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t * 0.3) * 0.5;
    mesh.current.rotation.y = Math.cos(t * 0.5) * 0.8;
    mesh.current.rotation.z = Math.sin(t * 0.2 + Math.PI / 3) * 0.3;

    mesh.current.visible = false;

    mesh.current.material.uniforms.uDiffuseness.value = diffuseness;
    mesh.current.material.uniforms.uShininess.value = shininess;
    mesh.current.material.uniforms.uLight.value.copy(light);
    mesh.current.material.uniforms.uFresnelPower.value = fresnelPower;
    mesh.current.material.uniforms.uIorR.value = iorR;
    mesh.current.material.uniforms.uIorY.value = iorY;
    mesh.current.material.uniforms.uIorG.value = iorG;
    mesh.current.material.uniforms.uIorC.value = iorC;
    mesh.current.material.uniforms.uIorB.value = iorB;
    mesh.current.material.uniforms.uIorP.value = iorP;
    mesh.current.material.uniforms.uSaturation.value = saturation;
    mesh.current.material.uniforms.uChromaticAberration.value = chromaticAberration;
    mesh.current.material.uniforms.uRefractPower.value = refraction;

    gl.setRenderTarget(backRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = backRenderTarget.texture;
    mesh.current.material.side = THREE.BackSide;

    mesh.current.visible = true;

    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
    mesh.current.material.side = THREE.FrontSide;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <LerpedBackground/>
      <group ref={backgroundGroup} visible={false}>
        <mesh position={[-4, -3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[4, -3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[3, 0.5, 200, 32, 2, 3]} />
        <shaderMaterial
          key={uuidv4()}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.FrontSide}
        />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <Leva collapsed hidden/>
      <Canvas camera={{ position: [4, -2, 7], fov: 75 }} dpr={[1, 2]} style={{
        opacity: 0,    
        animation: "fadeIn 3s ease-in-out forwards",
      }}>
        <ambientLight intensity={1.0} />
        <Geometries />
      </Canvas>
    </>
  );
}

export default Scene;
