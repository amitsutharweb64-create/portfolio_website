import dotenv from 'dotenv';
import dns from 'node:dns';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Timeline from '../models/Timeline.js';
import Certificate from '../models/Certificate.js';

dotenv.config();
dns.setServers(['1.1.1.1', '8.8.8.8']);

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ Cannot seed database: MONGO_URI is missing in backend .env file.');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    // 1. Seed or Verify Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';
    const adminName = process.env.ADMIN_NAME || 'Amit Suthar';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      console.log(`👤 Creating initial Admin user (${adminEmail})...`);
      await Admin.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created successfully.');
    } else {
      existingAdmin.name = adminName;
      existingAdmin.password = adminPassword;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log(`✅ Admin user verified and password synchronized: ${adminEmail}`);
    }

    // 2. Seed Initial Profile if empty
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      console.log('📄 Seeding initial Profile...');
      await Profile.create({
        name: 'Amit Suthar',
        title: 'Full-Stack Developer & 3D Web Enthusiast',
        bio: 'Building production-ready, interactive web applications with modern reactive architectures, Three.js 3D animations, and secure cloud microservices.',
        about: 'I am Amit Suthar, a creative full-stack developer committed to writing clean, maintainable code and engineering memorable digital experiences. From building robust Express/MongoDB backend APIs to rendering silky smooth 3D scenes in the browser, I treat software craft with care and curiosity.',
        learningJourney: 'Constantly expanding knowledge across modern reactive architectures, real-time distributed systems, Three.js shader pipelines, and cloud-native deployment patterns.',
        careerGoals: 'Aspiring to build scalable products, collaborate with world-class engineering teams, and deliver intuitive web experiences that seamlessly blend design and technology.',
        email: 'amit.suthar.dev@example.com',
        location: 'India',
        status: 'Available for full-time roles & projects',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        resumeUrl: '',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      });
      console.log('✅ Initial Profile seeded.');
    }

    // 3. Seed Initial Projects if empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('🚀 Seeding initial Projects...');
      await Project.create([
        {
          title: 'NeuroSphere 3D Data Visualizer',
          description: 'An interactive WebGL-powered 3D dashboard for exploring multivariate node networks and real-time metric streams with interactive particle clouds.',
          category: 'Full-Stack',
          technologies: ['React', 'Three.js', 'Node.js', 'Express', 'Tailwind CSS'],
          imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
          liveUrl: 'https://example.com/demo1',
          githubUrl: 'https://github.com/example/neurosphere',
          featured: true,
          order: 1,
        },
        {
          title: 'OmniCart Cloud Commerce',
          description: 'Production-ready e-commerce platform with secure JWT cookie authentication, role-based admin dashboard, MongoDB inventory, and order analytics.',
          category: 'Full-Stack',
          technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS'],
          imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
          liveUrl: 'https://example.com/demo2',
          githubUrl: 'https://github.com/example/omnicart',
          featured: true,
          order: 2,
        },
        {
          title: 'Aura UI Design System',
          description: 'High-performance accessible component library built with modern React, Framer Motion transitions, and fully custom dark mode aesthetics.',
          category: 'Frontend',
          technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Storybook'],
          imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
          liveUrl: 'https://example.com/demo3',
          githubUrl: 'https://github.com/example/aura-ui',
          featured: false,
          order: 3,
        },
        {
          title: 'SecureAuth Enterprise Gateway',
          description: 'Pluggable authentication microservice featuring rate limiting, bcrypt hashing, HTTP-only secure cookies, and CSRF token defense mechanisms.',
          category: 'Backend',
          technologies: ['Node.js', 'Express', 'MongoDB', 'Bcrypt', 'Helmet'],
          imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
          liveUrl: 'https://example.com/demo4',
          githubUrl: 'https://github.com/example/secure-auth',
          featured: false,
          order: 4,
        },
      ]);
      console.log('✅ Initial Projects seeded.');
    }

    // 4. Seed Initial Skills if empty
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      console.log('⚡ Seeding initial Skills...');
      await Skill.create([
        {
          category: 'Frontend & 3D',
          order: 1,
          skills: [
            { name: 'React / Vite', level: 90, icon: 'Code2' },
            { name: 'Three.js / WebGL', level: 80, icon: 'Box' },
            { name: 'Tailwind CSS', level: 95, icon: 'Palette' },
            { name: 'Framer Motion', level: 85, icon: 'Sparkles' },
            { name: 'JavaScript / TypeScript', level: 88, icon: 'Cpu' },
            { name: 'HTML5 & Modern CSS', level: 95, icon: 'Layers' },
          ],
        },
        {
          category: 'Backend & Systems',
          order: 2,
          skills: [
            { name: 'Node.js & Express', level: 88, icon: 'Server' },
            { name: 'RESTful API Design', level: 90, icon: 'Network' },
            { name: 'MongoDB & Mongoose', level: 85, icon: 'Database' },
            { name: 'JWT & Cookie Auth', level: 86, icon: 'ShieldCheck' },
            { name: 'Cloudinary API', level: 82, icon: 'Cloud' },
            { name: 'Input Validation & Security', level: 85, icon: 'Lock' },
          ],
        },
        {
          category: 'Workflow & Tools',
          order: 3,
          skills: [
            { name: 'Git & GitHub', level: 88, icon: 'GitBranch' },
            { name: 'Postman / ThunderClient', level: 85, icon: 'Terminal' },
            { name: 'Vercel / Render Deployment', level: 84, icon: 'Workflow' },
            { name: 'Clean Architecture', level: 82, icon: 'Compass' },
          ],
        },
      ]);
      console.log('✅ Initial Skills seeded.');
    }

    // 5. Seed Timeline if empty
    const timelineCount = await Timeline.countDocuments();
    if (timelineCount === 0) {
      console.log('⏳ Seeding initial Timeline...');
      await Timeline.create([
        {
          type: 'experience',
          title: 'Full-Stack Web Developer Intern',
          organization: 'Tech Innovators Lab',
          period: '2024 — Present',
          description: 'Contributed to building modular React components, integrated RESTful API services, and participated in sprint reviews and UI performance optimizations.',
          badge: 'Current',
          order: 1,
        },
        {
          type: 'experience',
          title: 'Junior Frontend Contributor',
          organization: 'Open Source Collective',
          period: '2023 — 2024',
          description: 'Collaborated on open source documentation and accessible UI component implementations using modern CSS, Tailwind, and React.',
          badge: 'Open Source',
          order: 2,
        },
        {
          type: 'education',
          title: 'Bachelor of Technology in Computer Science',
          organization: 'Engineering University',
          period: '2021 — 2025',
          description: 'Relevant coursework in Data Structures, Algorithms, Database Management Systems, Computer Networks, and Web Application Engineering.',
          badge: 'Academics',
          order: 3,
        },
      ]);
      console.log('✅ Initial Timeline seeded.');
    }

    // 6. Seed Certificates if empty
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      console.log('🏆 Seeding initial Certificates...');
      await Certificate.create([
        {
          title: 'Full-Stack Web Development Certification',
          issuer: 'FreeCodeCamp & Coursera',
          issueDate: '2024',
          verificationUrl: 'https://example.com/verify-cert-1',
          highlight: 'Comprehensive full-stack engineering curriculum',
          order: 1,
        },
        {
          title: 'Interactive 3D Web & Three.js Specialization',
          issuer: 'Three.js Journey / Community',
          issueDate: '2024',
          verificationUrl: 'https://example.com/verify-cert-2',
          highlight: 'Shaders, lights, materials, and physics simulations',
          order: 2,
        },
        {
          title: 'Modern JavaScript & Node.js API Masterclass',
          issuer: 'Udemy Professional',
          issueDate: '2023',
          verificationUrl: 'https://example.com/verify-cert-3',
          highlight: 'Secure REST APIs, Express middleware, and MongoDB schemas',
          order: 3,
        },
      ]);
      console.log('✅ Initial Certificates seeded.');
    }

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed with error:', err);
    process.exit(1);
  }
};

seedDatabase();
