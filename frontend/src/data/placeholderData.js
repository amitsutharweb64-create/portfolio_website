export const initialProfile = {
  name: "Amit Suthar",
  title: "Full-Stack Developer & 3D Web Enthusiast",
  bio: "Passionate software engineer building modern, accessible, and high-performance digital experiences. Enthusiastic about 3D interfaces, clean system architectures, and developer tooling.",
  about: "I am a developer driven by curiosity and craft. My journey spans full-stack JavaScript, scalable backend microservices, and interactive 3D graphics on the web. I focus on writing maintainable, well-documented code that creates genuine value.",
  learningJourney: "Constantly expanding knowledge across modern reactive architectures, real-time distributed systems, Three.js shader pipelines, and cloud-native deployment patterns.",
  careerGoals: "Aspiring to build scalable products, collaborate with world-class engineering teams, and deliver intuitive web experiences that seamlessly blend design and technology.",
  email: "amit.suthar.dev@example.com",
  location: "India",
  status: "Available for full-time roles & projects",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resumeUrl: "#resume-section",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
};

export const initialSkills = [
  {
    category: "Frontend & 3D",
    skills: [
      { name: "React / Vite", level: 90, icon: "Code2" },
      { name: "Three.js / WebGL", level: 80, icon: "Box" },
      { name: "Tailwind CSS", level: 95, icon: "Palette" },
      { name: "Framer Motion", level: 85, icon: "Sparkles" },
      { name: "JavaScript / TypeScript", level: 88, icon: "Cpu" },
      { name: "HTML5 & Modern CSS", level: 95, icon: "Layers" }
    ]
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node.js & Express", level: 88, icon: "Server" },
      { name: "RESTful API Design", level: 90, icon: "Network" },
      { name: "MongoDB & Mongoose", level: 85, icon: "Database" },
      { name: "JWT & Cookie Auth", level: 86, icon: "ShieldCheck" },
      { name: "Cloudinary API", level: 82, icon: "Cloud" },
      { name: "Input Validation & Security", level: 85, icon: "Lock" }
    ]
  },
  {
    category: "Workflow & Tools",
    skills: [
      { name: "Git & GitHub", level: 88, icon: "GitBranch" },
      { name: "Postman / ThunderClient", level: 85, icon: "Terminal" },
      { name: "Vercel / Render Deployment", level: 84, icon: "Workflow" },
      { name: "Clean Architecture", level: 82, icon: "Compass" }
    ]
  }
];

export const initialProjects = [
  {
    id: "proj-1",
    title: "NeuroSphere 3D Data Visualizer",
    description: "An interactive WebGL-powered 3D dashboard for exploring multivariate node networks and real-time metric streams with interactive particle clouds.",
    category: "Full-Stack",
    technologies: ["React", "Three.js", "Node.js", "Express", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/example/neurosphere",
    featured: true
  },
  {
    id: "proj-2",
    title: "OmniCart Cloud Commerce",
    description: "Production-ready e-commerce platform with secure JWT cookie authentication, role-based admin dashboard, MongoDB inventory, and order analytics.",
    category: "Full-Stack",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/example/omnicart",
    featured: true
  },
  {
    id: "proj-3",
    title: "Aura UI Design System",
    description: "High-performance accessible component library built with modern React, Framer Motion transitions, and fully custom dark mode aesthetics.",
    category: "Frontend",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Storybook"],
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/example/aura-ui",
    featured: false
  },
  {
    id: "proj-4",
    title: "SecureAuth Enterprise Gateway",
    description: "Pluggable authentication microservice featuring rate limiting, bcrypt hashing, HTTP-only secure cookies, and CSRF token defense mechanisms.",
    category: "Backend",
    technologies: ["Node.js", "Express", "MongoDB", "Bcrypt", "Helmet"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/demo4",
    githubUrl: "https://github.com/example/secure-auth",
    featured: false
  }
];

export const initialTimeline = [
  {
    id: "exp-1",
    type: "experience",
    title: "Full-Stack Web Developer Intern",
    organization: "Tech Innovators Lab",
    period: "2024 — Present",
    description: "Contributed to building modular React components, integrated RESTful API services, and participated in sprint reviews and UI performance optimizations.",
    badge: "Current"
  },
  {
    id: "exp-2",
    type: "experience",
    title: "Junior Frontend Contributor",
    organization: "Open Source Collective",
    period: "2023 — 2024",
    description: "Collaborated on open source documentation and accessible UI component implementations using modern CSS, Tailwind, and React.",
    badge: "Open Source"
  },
  {
    id: "edu-1",
    type: "education",
    title: "Bachelor of Technology in Computer Science",
    organization: "Engineering University",
    period: "2021 — 2025",
    description: "Relevant coursework in Data Structures, Algorithms, Database Management Systems, Computer Networks, and Web Application Engineering.",
    badge: "Academics"
  }
];

export const initialCertificates = [
  {
    id: "cert-1",
    title: "Full-Stack Web Development Certification",
    issuer: "FreeCodeCamp & Coursera",
    issueDate: "2024",
    verificationUrl: "https://example.com/verify-cert-1",
    highlight: "Comprehensive full-stack engineering curriculum"
  },
  {
    id: "cert-2",
    title: "Interactive 3D Web & Three.js Specialization",
    issuer: "Three.js Journey / Community",
    issueDate: "2024",
    verificationUrl: "https://example.com/verify-cert-2",
    highlight: "Shaders, lights, materials, and physics simulations"
  },
  {
    id: "cert-3",
    title: "Modern JavaScript & Node.js API Masterclass",
    issuer: "Udemy Professional",
    issueDate: "2023",
    verificationUrl: "https://example.com/verify-cert-3",
    highlight: "Secure REST APIs, Express middleware, and MongoDB schemas"
  }
];
