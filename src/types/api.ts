export interface Backlink {
  id: string;
  url: string;
  targetUrl: string;
  keyword: string;
  title: string;
  status: "active" | "pending" | "removed";
  metrics: {
    da: number;
    pa: number;
    spamScore: number;
  };
  createdAt: string;
  expiresAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  credits: number;
  status: "active" | "suspended" | "pending";
  totalSpent: number;
  joinDate: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  metrics: {
    minDa: number;
    minPa: number;
    maxSpamScore: number;
  };
}

export interface Order {
  id: string;
  customerId: string;
  packageId: string;
  amount: number;
  credits: number;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
  createdAt: string;
}

export interface SiteMetrics {
  da: number;
  pa: number;
  spamScore: number;
  traffic: string;
  category: string;
  language: string;
}

export interface BacklinkStats {
  totalBacklinks: number;
  activeBacklinks: number;
  indexRate: number;
  averageDA: number;
  averagePA: number;
}
