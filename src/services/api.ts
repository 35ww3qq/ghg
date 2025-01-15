import axios from "axios";
import { handleApiError, rateLimitMiddleware } from "./middleware";

// API instance oluştur
const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://competent-wilbur2-b65vf.dev.tempolabs.ai/api",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Rate limit kontrolü
    await rateLimitMiddleware(config);

    // Token varsa ekle
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  handleApiError,
);

// API endpoints
export const api = {
  post: async (url: string, data: any) => axiosInstance.post(url, data),
  get: async (url: string) => axiosInstance.get(url),
  put: async (url: string, data: any) => axiosInstance.put(url, data),
  delete: async (url: string) => axiosInstance.delete(url),
};

// Admin API endpoints
export const adminApi = {
  getSystemMetrics: () => api.get("/admin/system-stats"),
  getUsers: () => api.get("/admin/users"),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  createUser: (data: any) => api.post("/admin/users", data),
  addUserCredits: (id: string, amount: number) =>
    api.post(`/admin/users/${id}/credits`, { amount }),
};

// Backlink API endpoints
export const backlinkApi = {
  getMetrics: () => api.get("/backlinks/metrics"),
  getAllBacklinks: () => api.get("/backlinks"),
  getBacklinkById: (id: string) => api.get(`/backlinks/${id}`),
  createBacklink: (data: any) => api.post("/backlinks", data),
  updateBacklink: (id: string, data: any) => api.put(`/backlinks/${id}`, data),
  deleteBacklink: (id: string) => api.delete(`/backlinks/${id}`),
  checkStatus: (id: string) => api.get(`/backlinks/${id}/status`),
  verifyIndexing: (id: string) => api.post(`/backlinks/${id}/verify-indexing`),
};

// Credit API endpoints
export const creditApi = {
  getBalance: () => api.get("/credits/balance"),
  getTransactions: () => api.get("/credits/transactions"),
  addCredits: (amount: number) => api.post("/credits/add", { amount }),
};

// Market API endpoints
export const marketApi = {
  getAvailableLinks: () => api.get("/market/available-links"),
  purchase: (data: any) => api.post("/market/purchase", data),
};
