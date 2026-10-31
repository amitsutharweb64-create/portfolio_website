# Amit Suthar — Creative 3D Full-Stack Developer Portfolio & Admin Portal

A complete, production-ready, futuristic 3D animated portfolio and content management system for **Amit Suthar**. Built with React 19, Tailwind CSS v4, Three.js / React Three Fiber, Framer Motion, GSAP, Node.js, Express, MongoDB Atlas, and Cloudinary.

---

## 🌟 Key Features

### 1. Public Portfolio
- **Futuristic 3D Hero Scene**: Floating interactive wireframe icosahedrons and glowing rings powered by Three.js and React Three Fiber.
- **Dark Charcoal & Lime Theme**: Curated dark aesthetic (`#08090b` background with vibrant `#a3e635` accents and glassmorphism).
- **Smooth Navigation & Scroll Progress**: Top header with monogram logo, section anchor jumping, mobile drawer, and top scroll progress bar.
- **Dynamic Content Modules**:
  - **About Me**: Interactive profile card, background story, learning journey, and career goals.
  - **Technical Arsenal**: Category-filtered skills with animated percentage bars.
  - **Featured Projects**: Filterable project showcases with live demo and GitHub links.
  - **Experience & Education**: Milestone timeline with connected visual nodes.
  - **Certificates**: Credential cards with issuer and verification links.
  - **Resume Showcase**: Direct download button with verified file badges.
  - **Contact Form**: Real-time validation, honeypot anti-spam protection, and instant submission to MongoDB.

### 2. Secure Admin Management Portal (`/admin/login` & `/admin`)
- **Authentication**: JWT token authentication with bcrypt password hashing and HTTP-only cookie support.
- **Profile & Narrative Management**: Edit name, title, bio, about me, learning journey, goals, location, and social links in real time without touching source code.
- **Projects CRUD**: Create, edit, and delete projects with image uploads, tags, and featured toggles.
- **Skills Arsenal CRUD**: Create and manage categories, adjust proficiency percentages, and add technologies.
- **Experience & Education CRUD**: Add, edit, and delete milestones.
- **Certifications CRUD**: Manage credentials and verification links.
- **Inquiries Inbox**: View contact messages sent from the public website in real time, mark as read, or delete.
- **Media Uploads**: Built-in support for Cloudinary with an automatic local filesystem fallback.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR a free MongoDB Atlas connection string

### 1. Start the Backend Server
```bash
cd backend
npm install
node server.js
```
The backend will run at **`http://localhost:5001`**.
MongoDB must be running and reachable through `MONGO_URI`; the server now stops at startup when the database connection fails, instead of accepting requests that later fail.

*(Optional)* To reset or reseed the initial database records and admin account:
```bash
node scripts/seedAdmin.js
```

### 2. Start the Frontend Client
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at **`http://localhost:5173`**.

---

## 🔐 Admin Portal Credentials (Default Seed)

- **Portal URL**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Admin Email**: `admin@example.com`
- **Password**: `ChangeThisPassword123!`

*(You can update this password or change your credentials anytime inside the database or via environment variables).*

---

## 🛠️ Environment Configuration

### Backend (`backend/.env`)
```env
# Server
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database (MongoDB Atlas URI in production)
MONGO_URI=mongodb://127.0.0.1:27017/portfolio

# Authentication
JWT_SECRET=super_secret_jwt_key_amit_suthar_portfolio_2025
JWT_EXPIRE=7d

# Initial Admin Seed Credentials
ADMIN_NAME=Amit Suthar
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeThisPassword123!

# Cloudinary (Optional - falls back to local storage if not provided)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5001/api
```

---

## 🌐 Production Deployment Guide

### Step 1: Deploy MongoDB on MongoDB Atlas
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user and whitelist `0.0.0.0/0` (allow access from anywhere) in Network Access.
3. Copy your connection string:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

### Step 2: Deploy Backend to Render (or Railway)
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set the **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGO_URI`: *(Your MongoDB Atlas URI from Step 1)*
   - `JWT_SECRET`: *(A secure random string)*
   - `CLIENT_URL`: `https://your-portfolio-frontend.vercel.app`
   - `CLOUDINARY_CLOUD_NAME`: *(Your Cloudinary cloud name)*
   - `CLOUDINARY_API_KEY`: *(Your Cloudinary API key)*
   - `CLOUDINARY_API_SECRET`: *(Your Cloudinary API secret)*

### Step 3: Deploy Frontend to Vercel
1. Create a new project on [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-service.onrender.com/api`
5. Click **Deploy**.
