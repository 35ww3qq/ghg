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

// Demo mode flag
const IS_DEMO = true; // Set this to false when connecting to real API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const handleResponse = async <T>(
  response: Response,
): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    if (!response.ok) {
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

// Demo data
const DEMO_USERS = {
  "admin@example.com": {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
  "client@example.com": {
    id: "2",
    email: "client@example.com",
    password: "client123",
    role: "client",
    name: "Client User",
  },
};

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      if (IS_DEMO) {
        // Demo login logic
        return new Promise<ApiResponse<{ token: string; user: any }>>(
          (resolve) => {
            setTimeout(() => {
              const user = DEMO_USERS[email as keyof typeof DEMO_USERS];
              if (user && user.password === password) {
                const token = btoa(`${email}:${password}`);
                resolve({
                  success: true,
                  data: { token, user: { ...user, password: undefined } },
                  error: null,
                });
              } else {
                resolve({
                  success: false,
                  data: null,
                  error: "Invalid credentials",
                });
              }
            }, 500);
          },
        );
      }

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, password }),
      });
      return handleResponse<{ token: string; user: any }>(response);
    },
    logout: async () => {
      if (IS_DEMO) {
        return new Promise<ApiResponse<null>>((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              data: null,
              error: null,
            });
          }, 500);
        });
      }

      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { ...headers, ...getAuthHeader() },
      });
      return handleResponse(response);
    },
  },

  // Add other API endpoints with demo data handling...
};
