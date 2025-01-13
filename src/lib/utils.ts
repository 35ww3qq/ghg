import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(amount);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("tr-TR").format(number);
};

export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const extractDomain = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  } catch {
    return url;
  }
};

export const generateSiteId = () => {
  return "site_" + Math.random().toString(36).substr(2, 9);
};

export const calculateMetricScore = (
  da: number,
  pa: number,
  spamScore: number,
) => {
  // DA ve PA'ya daha fazla ağırlık ver, spam score'u ceza olarak kullan
  const score = da * 0.4 + pa * 0.4 - spamScore * 2;
  return Math.max(0, Math.min(100, score));
};

export const getMetricColor = (
  value: number,
  type: "da" | "pa" | "spamScore",
) => {
  if (type === "spamScore") {
    if (value <= 2) return "text-green-500";
    if (value <= 5) return "text-yellow-500";
    return "text-red-500";
  }

  if (value >= 40) return "text-green-500";
  if (value >= 20) return "text-yellow-500";
  return "text-red-500";
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const retryOperation = async <T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0) throw error;
    await sleep(delay);
    return retryOperation(operation, retries - 1, delay * 2);
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
) => {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
