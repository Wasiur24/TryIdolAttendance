import axios from "axios";

const API = axios.create({
 baseURL: "https://tryhr-be.onrender.com/api", 
});

// Interceptor to attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;