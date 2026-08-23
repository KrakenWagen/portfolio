"use client"

import React, { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useFBO } from "@react-three/drei"
import * as THREE from "three"

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
`

const fragmentShader = `
uniform float uOpacity;
uniform float uTime;
uniform float uGrainScale;
uniform float uGrainAmount;
uniform float uGrainSatBias;
uniform float uGrainMotion;

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
  adjustment = clamp(adjustment, 0.0, 2.0);
  vec3 color = mix(vec3(intensity), rgb, adjustment);
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

const int LOOP = 12;

void main() {
  float iorRatioRed = 1.0/uIorR;
  float iorRatioGreen = 1.0/uIorG;
  float iorRatioBlue = 1.0/uIorB;

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = normalize(worldNormal);
  vec3 color = vec3(0.0);
  vec3 eye = normalize(eyeVector);

  for (int i = 0; i < LOOP; i++) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(eye, normal, iorRatioRed);
    vec3 refractVecY = refract(eye, normal, 1.0/uIorY);
    vec3 refractVecG = refract(eye, normal, iorRatioGreen);
    vec3 refractVecC = refract(eye, normal, 1.0/uIorC);
    vec3 refractVecB = refract(eye, normal, iorRatioBlue);
    vec3 refractVecP = refract(eye, normal, 1.0/uIorP);

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

  float bgLuminance = dot(color, vec3(0.4, 1.0, 0.8));

  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight;

  float f = fresnel(eyeVector, normal, uFresnelPower);
  color += f * vec3(1.0);

  color = color / (color + vec3(1.0));
  color = pow(color, vec3(1.0 / 2.2));

  float contrast = mix(1.0, 6.0, smoothstep(0.0, 1.0, bgLuminance));
  vec3 midpoint = vec3(0.74);
  color = (color - midpoint) * contrast + midpoint;

  // Temporal grain — uGrainMotion 0 = static, 1 = full animation rate
  vec2 grainCoord = floor(gl_FragCoord.xy / max(uGrainScale, 1.0));
  float motionTick = floor(uTime * 60.0 * clamp(uGrainMotion, 0.0, 1.0));
  grainCoord += vec2(motionTick * 1.7, motionTick * 2.3) * step(1e-4, uGrainMotion);
  float dither = fract(sin(dot(grainCoord, vec2(12.9898, 78.233))) * 43758.5453);

  float vmax = max(color.r, max(color.g, color.b));
  float vmin = min(color.r, min(color.g, color.b));
  // Cheap saturation approx: chroma relative to value (0 for greys / black / white)
  float satApprox = clamp(vmax > 1e-4 ? (vmax - vmin) / vmax : 0.0, 0.0, 1.0);
  float grainMask = clamp(mix(1.0, satApprox, clamp(uGrainSatBias, 0.0, 1.0)), 0.0, 1.0);

  color += (dither - 0.5) * uGrainAmount * grainMask;

  gl_FragColor = vec4(color, uOpacity);
}
`

const SETTINGS = {
  light: new THREE.Vector3(-1.0, 1.0, 1.0),
  diffuseness: 0.2,
  shininess: 15.0,
  fresnelPower: 8.0,
  iorR: 1.96,
  iorY: 1.68,
  iorG: 1.18,
  iorC: 1.22,
  iorB: 1.22,
  iorP: 1.22,
  saturation: 1.14,
  chromaticAberration: 0.5,
  refraction: 0.25,
  grainScale: 1,
  grainAmount: 0.125,
  // 0 = frozen grain, 1 = animated (~60 Hz)
  grainMotion: 0.125,
  // 0 = uniform grain, 1 = grain only on saturated colors
  grainSatBias: 0.75,
}

function ThemeBackground() {
  const { scene } = useThree()

  useEffect(() => {
    const apply = () => {
      const cssColor = getComputedStyle(document.body).backgroundColor
      if (!cssColor) return
      scene.background = new THREE.Color(cssColor)
    }

    apply()

    const observer = new MutationObserver(apply)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [scene])

  return null
}

function Geometries({ active }) {
  const mesh = useRef(null)
  const mainRenderTarget = useFBO()
  const backRenderTarget = useFBO()

  const uniforms = useMemo(
    () => ({
      uOpacity: { value: 0 },
      uTime: { value: 0 },
      uGrainScale: { value: SETTINGS.grainScale },
      uGrainAmount: { value: SETTINGS.grainAmount },
      uGrainSatBias: { value: SETTINGS.grainSatBias },
      uGrainMotion: { value: SETTINGS.grainMotion },
      uTexture: { value: null },
      uIorR: { value: SETTINGS.iorR },
      uIorY: { value: SETTINGS.iorY },
      uIorG: { value: SETTINGS.iorG },
      uIorC: { value: SETTINGS.iorC },
      uIorB: { value: SETTINGS.iorB },
      uIorP: { value: SETTINGS.iorP },
      uRefractPower: { value: SETTINGS.refraction },
      uChromaticAberration: { value: SETTINGS.chromaticAberration },
      uSaturation: { value: SETTINGS.saturation },
      uShininess: { value: SETTINGS.shininess },
      uDiffuseness: { value: SETTINGS.diffuseness },
      uFresnelPower: { value: SETTINGS.fresnelPower },
      uLight: { value: SETTINGS.light.clone() },
      winResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )

  useFrame(({ gl, scene, camera, clock }) => {
    if (!active || !mesh.current) return

    const elapsed = clock.getElapsedTime()
    const opacity = Math.min(elapsed / 1, 1)
    const material = mesh.current.material
    const u = material.uniforms

    u.uOpacity.value = opacity
    u.uTime.value = elapsed
    // Must match gl_FragCoord (device pixels), not CSS size — otherwise DPR skews refraction UVs
    gl.getDrawingBufferSize(u.winResolution.value)

    const t = elapsed
    mesh.current.rotation.x = Math.sin(t * 0.3) * 0.5
    mesh.current.rotation.y = Math.cos(t * 0.5) * 0.8
    mesh.current.rotation.z = Math.sin(t * 0.2 + Math.PI / 3) * 0.3

    mesh.current.visible = false

    gl.setRenderTarget(backRenderTarget)
    gl.render(scene, camera)

    u.uTexture.value = backRenderTarget.texture
    material.side = THREE.BackSide
    mesh.current.visible = true

    gl.setRenderTarget(mainRenderTarget)
    gl.render(scene, camera)

    u.uTexture.value = mainRenderTarget.texture
    material.side = THREE.FrontSide

    gl.setRenderTarget(null)
  })

  return (
    <>
      <ThemeBackground />
      <mesh ref={mesh}>
        <torusKnotGeometry args={[3, 0.5, 256, 48, 2, 3]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.FrontSide}
          transparent
        />
      </mesh>
    </>
  )
}

export default function Scene() {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const active = visible && !reducedMotion

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="h-full w-full">
      {!reducedMotion ? (
        <Canvas
          camera={{ position: [4, -2, 7], fov: 75 }}
          dpr={1}
          frameloop={active ? "always" : "never"}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
          style={{
            opacity: 0,
            animation: "fadeIn 3s ease-in-out forwards",
          }}
        >
          <ambientLight intensity={1.0} />
          <Geometries active={active} />
        </Canvas>
      ) : null}
    </div>
  )
}
