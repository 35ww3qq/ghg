import {
  Backlink,
  Customer,
  Package,
  Order,
  SiteMetrics,
  BacklinkStats,
} from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "https://api.example.com";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};

export const api = {
  // Auth
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    },
    logout: async () => {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
      });
      return handleResponse(response);
    },
  },

  // Backlinks
  backlinks: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/backlinks`);
      return handleResponse(response) as Promise<Backlink[]>;
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/backlinks/${id}`);
      return handleResponse(response) as Promise<Backlink>;
    },
    create: async (data: Partial<Backlink>) => {
      const response = await fetch(`${API_URL}/backlinks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Backlink>;
    },
    update: async (id: string, data: Partial<Backlink>) => {
      const response = await fetch(`${API_URL}/backlinks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Backlink>;
    },
    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/backlinks/${id}`, {
        method: "DELETE",
      });
      return handleResponse(response);
    },
    bulkCreate: async (data: { targetUrl: string; links: string[] }) => {
      const response = await fetch(`${API_URL}/backlinks/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    bulkDelete: async (ids: string[]) => {
      const response = await fetch(`${API_URL}/backlinks/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      return handleResponse(response);
    },
    getStats: async () => {
      const response = await fetch(`${API_URL}/backlinks/stats`);
      return handleResponse(response) as Promise<BacklinkStats>;
    },
  },

  // Customers
  customers: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/customers`);
      return handleResponse(response) as Promise<Customer[]>;
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/customers/${id}`);
      return handleResponse(response) as Promise<Customer>;
    },
    create: async (data: Partial<Customer>) => {
      const response = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Customer>;
    },
    update: async (id: string, data: Partial<Customer>) => {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Customer>;
    },
    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "DELETE",
      });
      return handleResponse(response);
    },
    addCredits: async (id: string, amount: number) => {
      const response = await fetch(`${API_URL}/customers/${id}/credits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      return handleResponse(response);
    },
  },

  // Packages
  packages: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/packages`);
      return handleResponse(response) as Promise<Package[]>;
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/packages/${id}`);
      return handleResponse(response) as Promise<Package>;
    },
    create: async (data: Partial<Package>) => {
      const response = await fetch(`${API_URL}/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Package>;
    },
    update: async (id: string, data: Partial<Package>) => {
      const response = await fetch(`${API_URL}/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Package>;
    },
    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/packages/${id}`, {
        method: "DELETE",
      });
      return handleResponse(response);
    },
  },

  // Orders
  orders: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/orders`);
      return handleResponse(response) as Promise<Order[]>;
    },
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/orders/${id}`);
      return handleResponse(response) as Promise<Order>;
    },
    create: async (data: Partial<Order>) => {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Order>;
    },
    update: async (id: string, data: Partial<Order>) => {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return handleResponse(response) as Promise<Order>;
    },
  },

  // Site Metrics
  metrics: {
    getSiteMetrics: async (url: string) => {
      const response = await fetch(
        `${API_URL}/metrics/site?url=${encodeURIComponent(url)}`,
      );
      return handleResponse(response) as Promise<SiteMetrics>;
    },
    bulkCheck: async (urls: string[]) => {
      const response = await fetch(`${API_URL}/metrics/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      return handleResponse(response) as Promise<Record<string, SiteMetrics>>;
    },
  },
};
