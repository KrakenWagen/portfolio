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
    description: [
      "I'm a software engineer with 10+ years of experience building software solutions, web applications.", "Interested in Artificial Intelligence, backend and full-stack development, graphics and computer vision, distributed systems and much more...",
    ],
    skills: [
      "JavaScript, TypeScript, React, Next.js",
      "Node.js, Python, Express, Ruby on Rails",
      "MySQL, PostgreSQL, DynamoDB, Redis",
      "Docker, AWS, CI/CD, Linux...",
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
      degree: "Bachelor of Science in Software Engineering",
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
        "Developed an innovative neural network-based solution that predicts visual attention in 360-degree virtual reality videos by integrating both visual and audio information.",
      tech: ["Python", "Computer Vision", "AI", "TensorFlow"],
      year: "2022",
      image: "/vr.png",
      read: 'https://zaguan.unizar.es/record/120377?ln=es',
      github: 'https://github.com/KrakenWagen/PAVS_2022',
    },
    {
      title: "Single scattering and direct illumination rendering using multidimensional control variates",
      description:
        "Developed a light rendering solution that outperformed the widely used Monte Carlo algorithm by employing Newton-Cotes methods as control variates.",
      tech: ["C++", "Computer Graphics", "Light Rendering"],
      year: "2020",
      image: "/scattering.png",
      read: 'https://zaguan.unizar.es/record/96367?ln=es',
      live: undefined,
    },
    {
      title: "Call of Blocks",
      description: "Online first-person competitive shooter based on a fully customizable and destructible world and a wide variety of game modes. Obtained multiple awards, including \"Best Game\" in different game conventions.",
      tech: ["Unity", "C#", "Online"],
      year: "2015",
      image: "/cob.png",
      youtube: "https://www.youtube.com/watch?v=FH3An_MNGxw",
    },
  ],

  contact: {
    description:
      "I'm always interested in new collaborations. Feel free to reach out if you'd like to work together.",
    availability: ["Zaragoza 🇪🇸 • Warsaw 🇵🇱 • Tampere 🇫🇮"],
  },
  footer: <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            Made with{" "}
            <span className="text-red-500">❤</span> in T2, Adolfo Suárez Madrid-Barajas
          </p>
}
