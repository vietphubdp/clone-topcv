import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerCompany = async (payload) => {
  const response = await api.post('/companies/register', payload);
  return response.data;
};

export const registerCandidate = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getJobs = async (params = {}) => {
  const response = await api.get('/jobs', { params });
  return response.data;
};

export const getJobDetail = async (slugOrId) => {
  const response = await api.get(`/jobs/${slugOrId}`);
  return response.data;
};

export const applyJob = async (jobId, payload) => {
  const response = await api.post(`/jobs/${jobId}/apply`, payload);
  return response.data;
};

export const createJob = async (payload) => {
  const response = await api.post('/employer/jobs', payload);
  return response.data;
};

export default api;
