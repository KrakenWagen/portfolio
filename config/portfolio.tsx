export const portfolioConfig = {
  personal: {
    name: "Alex Johnson",
    title: "Software Engineer",
    location: "San Francisco, CA",
    email: "alex@example.com",
    github: "github.com/alexdev",
    linkedin: "linkedin.com/in/alexdev",
    availability: {
      remote: true,
      openToOpportunities: true,
    },
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
      "I'm a software engineer with 5+ years of experience building web applications. I specialize in full-stack development with a focus on clean architecture and user experience.",
      "Currently working with modern technologies like React, Node.js, and cloud platforms to create scalable solutions for complex problems.",
    ],
    skills: [
      "JavaScript, TypeScript, React, Next.js",
      "Node.js, Python, Express, FastAPI",
      "PostgreSQL, MongoDB, Redis",
      "Docker, AWS, CI/CD, Linux",
    ],
  },

  experience: [
    {
      position: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      years: "2022 - Present",
      description:
        "Lead developer for cloud-based enterprise solutions. Architected and implemented scalable microservices using Node.js and Kubernetes.",
    },
    {
      position: "Full Stack Developer",
      company: "Digital Solutions Group",
      location: "San Francisco, CA",
      years: "2020 - 2022",
      description:
        "Developed and maintained web applications for financial services clients using React, TypeScript, and GraphQL.",
    },
    {
      position: "Software Engineering Intern",
      company: "StartUp Ventures",
      location: "Palo Alto, CA",
      years: "Summer 2019",
      description: "Contributed to front-end development using React and implemented RESTful APIs with Express.",
    },
  ],

  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      location: "Stanford, CA",
      years: "2018 - 2020",
      description: "Specialized in Artificial Intelligence and Machine Learning",
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      years: "2014 - 2018",
      description: "Minor in Mathematics",
    },
  ],

  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack solution with React, Node.js, and PostgreSQL featuring real-time inventory management and payment processing",
      tech: ["React", "Node.js", "PostgreSQL"],
      year: "2024",
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      live: "#",
    },
    {
      title: "Task Management App",
      description:
        "Real-time collaborative tool with WebSocket integration, featuring team workspaces and project tracking",
      tech: ["Next.js", "Socket.io", "MongoDB"],
      year: "2024",
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      live: "#",
    },
    {
      title: "API Analytics Dashboard",
      description: "Performance monitoring system with real-time metrics, custom alerts, and comprehensive reporting",
      tech: ["React", "D3.js", "Express"],
      year: "2023",
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      live: "#",
    },
  ],

  contact: {
    description:
      "I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to work together.",
    availability: ["Based in San Francisco, CA", "Available for remote work", "Open to new opportunities"],
  },
  footer: <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Alex Johnson • Made with{" "}
            <span className="text-red-500">❤</span> in T2, Adolfo Suárez Madrid-Barajas
          </p>
}
