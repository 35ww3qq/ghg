import {
  Backlink,
  Customer,
  Package,
  Order,
  SiteMetrics,
  BacklinkStats,
} from "@/types/api";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

const API_URL = import.meta.env.VITE_API_URL || "https://batuna.vn/api/";

const handleResponse = async <T>(
  response: Response,
): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    if (!response.ok) {
      // Handle specific error codes
      switch (response.status) {
        case 401:
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          throw new Error("Yetkisiz erişim");
        case 429:
          throw new Error("Çok fazla istek gönderildi. Lütfen bekleyin.");
      }
      return {
        success: false,
        data: null,
        error: data.message || "API request failed",
      };
    }
    return {
      success: true,
      data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, password }),
      });
      return handleResponse<{ token: string; user: any }>(response);
    },
    register: async (data: {
      email: string;
      password: string;
      name: string;
    }) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      return handleResponse<{ token: string; user: any }>(response);
    },
    logout: async () => {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse(response);
    },
    resetPassword: async (email: string) => {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      });
      return handleResponse(response);
    },
  },

  backlinks: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/backlinks`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<Backlink[]>(response);
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/backlinks/${id}`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<Backlink>(response);
    },
    create: async (data: Partial<Backlink>) => {
      const response = await fetch(`${API_URL}/backlinks`, {
        method: "POST",
        headers: { ...headers, ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return handleResponse<Backlink>(response);
    },
    update: async (id: string, data: Partial<Backlink>) => {
      const response = await fetch(`${API_URL}/backlinks/${id}`, {
        method: "PUT",
        headers: { ...headers, ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return handleResponse<Backlink>(response);
    },
    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/backlinks/${id}`, {
        method: "DELETE",
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse(response);
    },
    bulkCreate: async (data: { targetUrl: string; links: string[] }) => {
      const response = await fetch(`${API_URL}/backlinks/bulk`, {
        method: "POST",
        headers: { ...headers, ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return handleResponse<{ success: boolean; results: any[] }>(response);
    },
    getStats: async () => {
      const response = await fetch(`${API_URL}/backlinks/stats`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<BacklinkStats>(response);
    },
    checkStatus: async (id: string) => {
      const response = await fetch(`${API_URL}/backlinks/${id}/status`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<{ status: string; lastChecked: string }>(response);
    },
  },

  market: {
    getAvailableLinks: async (filters?: any) => {
      const queryString = filters ? `?${new URLSearchParams(filters)}` : "";
      const response = await fetch(`${API_URL}/market${queryString}`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<Package[]>(response);
    },
    purchase: async (
      packageId: string,
      data: { targetUrl: string; keyword: string },
    ) => {
      const response = await fetch(`${API_URL}/market/${packageId}/purchase`, {
        method: "POST",
        headers: { ...headers, ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return handleResponse<Order>(response);
    },
  },

  credits: {
    getBalance: async () => {
      const response = await fetch(`${API_URL}/credits/balance`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<{ balance: number }>(response);
    },
    addCredits: async (amount: number, paymentMethod: string) => {
      const response = await fetch(`${API_URL}/credits/add`, {
        method: "POST",
        headers: { ...headers, ...getAuthHeader() },
        body: JSON.stringify({ amount, paymentMethod }),
      });
      return handleResponse<{ balance: number; transactionId: string }>(
        response,
      );
    },
    getTransactions: async () => {
      const response = await fetch(`${API_URL}/credits/transactions`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<any[]>(response);
    },
  },

  admin: {
    getUsers: async () => {
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<Customer[]>(response);
    },
    updateUser: async (userId: string, data: Partial<Customer>) => {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "PUT",
        headers: { ...headers, ...getAuthHeader() },
        body: JSON.stringify(data),
      });
      return handleResponse<Customer>(response);
    },
    getSystemStats: async () => {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<any>(response);
    },
    getLogs: async (filters?: any) => {
      const queryString = filters ? `?${new URLSearchParams(filters)}` : "";
      const response = await fetch(`${API_URL}/admin/logs${queryString}`, {
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse<any[]>(response);
    },
  },
};
