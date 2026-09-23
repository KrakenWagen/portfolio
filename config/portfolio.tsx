export const portfolioConfig = {
  personal: {
    name: "Felix Bernal",
    title: "Software Engineer",
    location: "Zaragoza, ES",
    email: "felixbernalsierra@gmail.com",
    github: "https://github.com/KrakenWagen",
    linkedin: "https://linkedin.com/in/felix-bernal-sierra",
  },

  terminal: {
    whoami: "xilef"
  },

  hero: {
    words: ["XILEF", "CODE", "TECH", "SOLUTIONS"],
    wordChangeInterval: 3000,
  },

  navigation: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ],

  about: {
    lead: "Software engineer and tech enthusiast with 10+ years of experience building software.",
    description: [
      "Reasoning across hardware, software, and maths to solve messy, cross-disciplinary problems.",
    ],
    focus: [
      {
        title: "Artificial Intelligence",
        description: "Generative, attention, segmentation, LLMs, and everything in between.",
      },
      {
        title: "Computer Vision",
        description: "Images, video, and what to notice in them. AI-powered or not.",
      },
      {
        title: "Robotics",
        description: "Machines that perceive, predict, and move together in the real world.",
      },
      {
        title: "Graphics",
        description: "Light, rendering, and real-time images.",
      },
      {
        title: "Backend & full-stack",
        description: "End-to-end products, distributed systems, and reverse engineering.",
      },
      {
        title: "Videogames",
        description: "Game engines, bots, networking and games built from scratch.",
      },
    ],
    toolGroups: [
      {
        label: "Languages",
        items: ["TypeScript", "Python", "C++", "Rust", "Java", ".NET", "Assembly"],
      },
      {
        label: "Frontend",
        items: ["React", "Next.js", "WebGL", "Three.js", "WASM"],
      },
      {
        label: "Backend",
        items: ["Node.js", "FastAPI", "Ruby on Rails"],
      },
      {
        label: "Graphics",
        items: ["OpenGL", "Vulkan", "CUDA", "OpenCV", "ROS", "WebGL", "Three.js"],
      },
      {
        label: "AI",
        items: ["TensorFlow", "PyTorch"],
      },
      {
        label: "Games",
        items: ["Unity", "Unreal Engine"],
      },
      {
        label: "Data",
        items: ["PostgreSQL", "MySQL", "DynamoDB", "Redis", "NumPy", "SciPy", "Polars", "Airflow"],
      },
      {
        label: "Infra",
        items: ["Docker", "Kubernetes", "AWS", "Terraform", "Ansible", "Git", "CMake"],
      },
      {
        label: "Systems",
        items: ["Linux", "Profilers", "Debuggers"],
      },
      {
        label: "Other",
        items: ["Bartending"],
      },
    ],
  },

  experience: [
    {
      position: "Senior Software Engineer",
      company: "Microhealth",
      location: "Zaragoza, ES",
      years: "2022 - Present",
      description:
        "We build digital tools for people living with blood conditions.",
    },
    {
      position: "Software Engineer",
      company: "Devhello",
      location: "Zaragoza, ES",
      years: "2016 - Present",
      description: "Technology solutions tailored for unique client needs.",
    },
    {
      position: "Software Engineer",
      company: "Adalia Oy",
      location: "Tampere, FI",
      years: "2020 - 2022",
      description:
        "Digital monitoring and evaluation for international developments.",
    },
    {
      position: "Solo Developer",
      company: "Afropixel Games",
      location: "Zaragoza, ES",
      years: "2014 - 2019",
      description: "Game studio specialized in voxel-based games.",
    },
  ],

  education: [
    {
      degree: "Master in Robotics, Graphics and Computer Vision",
      school: "Universidad de Zaragoza",
      location: "Zaragoza, ES",
      years: "2019 - 2021",
      tags: ["With honors"],
      description: [
        "Specialized in Artificial Intelligence and Computer Vision",
        "Thesis Grade: 10/10",
      ],
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      school: "Universidad de Zaragoza",
      location: "Zaragoza, ES",
      years: "2014 - 2018",
      description: [
        "Specialized in Computing",
        "Thesis Grade: 9.5/10"
      ],
    },
  ],

  projects: [
    {
      title: "Audio-visual saliency prediction for 360° video via deep learning",
      description:
        "Developed a novel, state-of-the-art, deep learning-based system to predict visual attention in immersive 360° virtual reality videos by combining both visual and audio cues. \n\nThis multimodal approach improves prediction accuracy by integrating spatial sound and dynamic visual features, enabling more realistic and adaptive content delivery in VR environments. The work highlights the potential of audio-visual fusion for enhanced user experience in immersive media.",
      tech: ["Python", "Computer Vision", "AI", "TensorFlow"],
      year: "2022",
      image: "/vr.png",
      read: 'https://zaguan.unizar.es/record/120377?ln=es',
      github: 'https://github.com/KrakenWagen/PAVS_2022',
    },
    {
      title: "AI Cover Letter and Resume Generator: Resumine",
      description: "Designed and developed a web-based SaaS platform that leverages AI to help users create personalized cover letters and resumes efficiently. The application features intelligent content suggestions, customization options, and seamless user experience to streamline the job application process.",
      tech: ["AI", "React", "Next.js", "Supabase", "TypeScript", "Node.js", "PostgreSQL"],
      year: "2022",
      image: "/resumine.png",
      live: undefined,
    },
    {
      title: "Autonomous Drone Collaboration: Catch me if you can",
      description:
        "Designed and implemented a drone coordination system using onboard stereo vision and predictive modeling. The multi-drone formation control algorithm enables a team of UAVs to estimate a ball's 3D trajectory and dynamically position themselves to catch it with a shared net. \n \n This project showcased advanced perception, trajectory prediction, and swarm behavior in a physically realistic simulation framework.",
      tech: ["C++", "ROS", "Flightmare", "Unity"],
      year: "2021",
      image: "/drones.png",
      live: undefined,
    },
    {
      title: "Single scattering and direct illumination rendering using multidimensional control variates",
      description:
        "Developed a novel light rendering solution that outperformed standard Monte Carlo methods by integrating Newton-Cotes quadrature as control variates, significantly reducing variance in illumination estimates in single-scattering scenarios.\n\n The approach achieved faster and more accurate results compared to traditional path tracing, demonstrating how deterministic numerical integration can enhance photorealistic rendering performance in graphics pipelines.",
      tech: ["C++", "Computer Graphics", "Light Rendering"],
      year: "2020",
      image: "/scattering.png",
      read: 'https://zaguan.unizar.es/record/96367?ln=es',
      live: undefined,
    },
    {
      title: "Unsupervised and Semi-Supervised Learning for Bone Segmentation",
      description:
        "Developed a deep learning pipeline for bone segmentation in spinal CT images using an unsupervised approach based on Active Contour Without Edges (ACWE) loss.\n\n The method segments anatomical structures without labeled data, enabling scalable training on large unlabeled CT datasets. Accuracy is improved, showing strong performance in extracting complex bone structures combining energy-based models with deep learning with a semi-supervised approach using limited manual labels.",
      tech: ["Python", "Computer Vision", "AI", "TensorFlow"],
      year: "2020",
      image: "/bones.png",
      live: undefined,
    },
    {
      title: "Top-down shooter: Counter-Strike 2D Remake",
      description: "Developed a full remake of Counter-Strike 2D from the ground up, featuring smart AI bots for an engaging offline experience. Built a custom lightweight game engine using JavaFX, providing smooth gameplay and customization.\n \n Over 4 months, I implemented core systems including rendering, physics, and tactical bot behavior (patrolling, chasing, reacting to combat). The result is a fun, responsive 2D shooter that blends classic gameplay with modern AI-driven design.",
      tech: ["Java", "JavaFX", "AI"],
      year: "2020",
      image: "/cs2d.png",
      youtube: "https://www.youtube.com/watch?v=VB63VldVqeU",
    },
    {
      title: "Online competitive first-person shooter: Call of Blocks",
      description: "At age 16, I developed a competitive online first-person shooter featuring fully customizable, destructible environments and diverse game modes. Players can alter the map in real time, adding a dynamic layer of strategy and replayability.\n\nThe game received multiple awards, including “Best Game” at several conventions, recognized for its innovation, polish, and depth. Designed to support competitive play while enabling creative freedom through user-driven world manipulation.",
      tech: ["Unity", "C#", "Online"],
      year: "2015",
      image: "/cob.png",
      youtube: "https://www.youtube.com/watch?v=FH3An_MNGxw",
    },
  ],

  contact: {
    description:
      "If something here resonates, write me. Happy to talk, research, software, or whatever is on your mind.",
    availability: [
      { city: "Zaragoza", country: "ES" as const },
      { city: "Warsaw", country: "PL" as const },
      { city: "Tampere", country: "FI" as const },
    ],
  },
}
