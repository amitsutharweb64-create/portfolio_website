import axios from 'axios';
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialTimeline,
  initialCertificates
} from '../data/placeholderData';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace(/\/+$/, '');
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export function resolveAssetUrl(assetUrl) {
  if (!assetUrl || assetUrl === '#') return assetUrl;

  try {
    const url = new URL(assetUrl, window.location.origin);
    const isLocalBackendUrl = ['localhost', '127.0.0.1'].includes(url.hostname);

    if (assetUrl.startsWith('/uploads/') || isLocalBackendUrl) {
      return `${API_ORIGIN}${url.pathname}${url.search}${url.hash}`;
    }

    return url.toString();
  } catch {
    return assetUrl;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Bearer token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error unwrap
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// 1. Auth Service
export const authService = {
  async login(email, password) {
    const res = await apiClient.post('/auth/login', { email, password });
    if (res.data.token) {
      localStorage.setItem('portfolio_token', res.data.token);
      localStorage.setItem('portfolio_admin', JSON.stringify(res.data.admin));
    }
    return res.data;
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('portfolio_token');
      localStorage.removeItem('portfolio_admin');
    }
  },

  async getMe() {
    const res = await apiClient.get('/auth/me');
    return res.data?.data || res.data;
  },

  getCurrentAdmin() {
    try {
      const stored = localStorage.getItem('portfolio_admin');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('portfolio_token');
  }
};

// 2. Public Portfolio Data Service (with graceful local fallback)
export const portfolioService = {
  async getProfile() {
    try {
      const res = await apiClient.get('/profile');
      return res.data?.data || res.data || initialProfile;
    } catch {
      return initialProfile;
    }
  },

  async getSkills() {
    try {
      const res = await apiClient.get('/skills');
      const data = res.data?.data || res.data;
      return Array.isArray(data) && data.length > 0 ? data : initialSkills;
    } catch {
      return initialSkills;
    }
  },

  async getProjects() {
    try {
      const res = await apiClient.get('/projects');
      const data = res.data?.data || res.data;
      return Array.isArray(data) && data.length > 0 ? data : initialProjects;
    } catch {
      return initialProjects;
    }
  },

  async getTimeline() {
    try {
      const res = await apiClient.get('/timeline');
      const data = res.data?.data || res.data;
      return Array.isArray(data) && data.length > 0 ? data : initialTimeline;
    } catch {
      return initialTimeline;
    }
  },

  async getCertificates() {
    try {
      const res = await apiClient.get('/certificates');
      const data = res.data?.data || res.data;
      return Array.isArray(data) && data.length > 0 ? data : initialCertificates;
    } catch {
      return initialCertificates;
    }
  },

  async submitContact(formData) {
    try {
      const res = await apiClient.post('/contact', formData);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
};

// 3. Admin Management Service (Full CRUD & Uploads)
export const adminService = {
  // Profile
  async updateProfile(profileData) {
    const res = await apiClient.put('/profile', profileData);
    return res.data?.data || res.data;
  },

  // Projects CRUD
  async getProjects() {
    const res = await apiClient.get('/projects');
    return res.data?.data || res.data || [];
  },
  async createProject(projectData) {
    const res = await apiClient.post('/projects', projectData);
    return res.data?.data || res.data;
  },
  async updateProject(id, projectData) {
    const res = await apiClient.put(`/projects/${id}`, projectData);
    return res.data?.data || res.data;
  },
  async deleteProject(id) {
    const res = await apiClient.delete(`/projects/${id}`);
    return res.data;
  },

  // Skills CRUD
  async getSkills() {
    const res = await apiClient.get('/skills');
    return res.data?.data || res.data || [];
  },
  async createSkillCategory(categoryData) {
    const res = await apiClient.post('/skills', categoryData);
    return res.data?.data || res.data;
  },
  async updateSkillCategory(id, categoryData) {
    const res = await apiClient.put(`/skills/${id}`, categoryData);
    return res.data?.data || res.data;
  },
  async deleteSkillCategory(id) {
    const res = await apiClient.delete(`/skills/${id}`);
    return res.data;
  },

  // Timeline CRUD
  async getTimeline() {
    const res = await apiClient.get('/timeline');
    return res.data?.data || res.data || [];
  },
  async createTimeline(timelineData) {
    const res = await apiClient.post('/timeline', timelineData);
    return res.data?.data || res.data;
  },
  async updateTimeline(id, timelineData) {
    const res = await apiClient.put(`/timeline/${id}`, timelineData);
    return res.data?.data || res.data;
  },
  async deleteTimeline(id) {
    const res = await apiClient.delete(`/timeline/${id}`);
    return res.data;
  },

  // Certificates CRUD
  async getCertificates() {
    const res = await apiClient.get('/certificates');
    return res.data?.data || res.data || [];
  },
  async createCertificate(certData) {
    const res = await apiClient.post('/certificates', certData);
    return res.data?.data || res.data;
  },
  async updateCertificate(id, certData) {
    const res = await apiClient.put(`/certificates/${id}`, certData);
    return res.data?.data || res.data;
  },
  async deleteCertificate(id) {
    const res = await apiClient.delete(`/certificates/${id}`);
    return res.data;
  },

  // Contact Inquiries
  async getContactMessages() {
    const res = await apiClient.get('/contact');
    return res.data?.data || res.data || [];
  },
  async markMessageRead(id) {
    const res = await apiClient.patch(`/contact/${id}/read`);
    return res.data?.data || res.data;
  },
  async deleteContactMessage(id) {
    const res = await apiClient.delete(`/contact/${id}`);
    return res.data;
  },

  // Upload file (Image or PDF)
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
};
