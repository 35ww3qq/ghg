// Mock user data
const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    credits: 1000,
    status: "active",
  },
  {
    id: "2",
    email: "client@example.com",
    password: "client123",
    name: "Client User",
    role: "client",
    credits: 500,
    status: "active",
  },
];

// Mock market data
const mockDomains = [
  {
    id: "1",
    url: "example1.com",
    da: 45,
    pa: 38,
    spamScore: 2,
    category: "Technology",
    language: "TR",
    traffic: "15K/ay",
    credits: 100,
    isNew: true,
  },
  {
    id: "2",
    url: "example2.com",
    da: 35,
    pa: 28,
    spamScore: 1,
    category: "Business",
    language: "TR",
    traffic: "10K/ay",
    credits: 75,
    isPopular: true,
  },
];

// Mock backlinks data
const mockBacklinks = [
  {
    id: "1",
    targetUrl: "https://example.com",
    keyword: "web tasarım",
    addedSite: "example1.com",
    da: 45,
    pa: 38,
    spamScore: 2,
    status: "active",
    indexStatus: "indexed",
    addedDate: "2024-01-15",
    expiryDate: "2024-02-15",
    lastChecked: "2024-01-20",
  },
  {
    id: "2",
    targetUrl: "https://example.com/services",
    keyword: "seo hizmetleri",
    addedSite: "example2.com",
    da: 35,
    pa: 28,
    spamScore: 1,
    status: "pending",
    indexStatus: "pending",
    addedDate: "2024-01-18",
    expiryDate: "2024-02-18",
    lastChecked: "2024-01-20",
  },
];

// Mock transactions data
const mockTransactions = [
  {
    id: "1",
    type: "purchase",
    amount: 100,
    description: "Kredi satın alma",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    type: "usage",
    amount: 75,
    description: "Backlink satın alma",
    date: "2024-01-18",
    status: "completed",
  },
];

// Mock API responses
export const mockApi = {
  auth: {
    login: async (email: string, password: string) => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return {
          success: true,
          data: {
            token: "mock-jwt-token",
            user: userWithoutPassword,
          },
        };
      }
      throw new Error("Invalid credentials");
    },

    validateToken: async () => {
      return {
        success: true,
        data: {
          user: {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
            role: "admin",
            credits: 1000,
            status: "active",
          },
        },
      };
    },
  },

  admin: {
    getUsers: async () => {
      return {
        success: true,
        data: mockUsers.map(({ password: _, ...user }) => user),
      };
    },

    updateUser: async (id: string, data: any) => {
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex >= 0) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
        return {
          success: true,
          data: mockUsers[userIndex],
        };
      }
      throw new Error("User not found");
    },

    addUserCredits: async (id: string, amount: number) => {
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex >= 0) {
        mockUsers[userIndex].credits += amount;
        return {
          success: true,
          data: mockUsers[userIndex],
        };
      }
      throw new Error("User not found");
    },

    createUser: async (data: any) => {
      const newUser = {
        id: `${mockUsers.length + 1}`,
        ...data,
        credits: parseInt(data.credits),
        totalSpent: 0,
        joinDate: new Date().toISOString().split("T")[0],
      };
      mockUsers.push(newUser);
      return {
        success: true,
        data: newUser,
      };
    },
  },

  market: {
    getAvailableLinks: async () => {
      return {
        success: true,
        data: mockDomains,
      };
    },

    purchase: async (data: any) => {
      mockBacklinks.push({
        id: `${mockBacklinks.length + 1}`,
        targetUrl: data.targetUrl,
        keyword: data.keyword,
        addedSite: mockDomains.find((d) => d.id === data.domainId)?.url || "",
        da: 35,
        pa: 28,
        spamScore: 1,
        status: "pending",
        indexStatus: "pending",
        addedDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        lastChecked: new Date().toISOString().split("T")[0],
      });

      return {
        success: true,
        data: {
          message: "Backlink başarıyla satın alındı",
        },
      };
    },
  },

  backlinks: {
    getMetrics: async () => {
      return {
        success: true,
        data: {
          da: 35,
          pa: 28,
          spamScore: 2,
          indexRate: 85,
          successRate: 92,
        },
      };
    },

    getAllBacklinks: async () => {
      return {
        success: true,
        data: mockBacklinks,
      };
    },

    deleteBacklink: async (id: string) => {
      const index = mockBacklinks.findIndex((b) => b.id === id);
      if (index >= 0) {
        mockBacklinks.splice(index, 1);
        return {
          success: true,
          data: { message: "Backlink başarıyla silindi" },
        };
      }
      throw new Error("Backlink not found");
    },

    checkStatus: async (id: string) => {
      const backlink = mockBacklinks.find((b) => b.id === id);
      if (backlink) {
        backlink.lastChecked = new Date().toISOString().split("T")[0];
        return {
          success: true,
          data: { message: "Durum kontrolü tamamlandı" },
        };
      }
      throw new Error("Backlink not found");
    },
  },

  credits: {
    getBalance: async () => {
      return {
        success: true,
        data: {
          balance: 500,
        },
      };
    },

    getTransactions: async () => {
      return {
        success: true,
        data: mockTransactions,
      };
    },
  },
};
