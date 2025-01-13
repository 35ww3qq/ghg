import { useState, useCallback } from "react";
import { api } from "@/services/api";
import { SiteMetrics } from "@/types/api";

export const useMetrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSiteMetrics = useCallback(async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const metrics = await api.metrics.getSiteMetrics(url);
      return metrics;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check site metrics",
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const bulkCheckMetrics = useCallback(async (urls: string[]) => {
    try {
      setIsLoading(true);
      setError(null);
      const metrics = await api.metrics.bulkCheck(urls);
      return metrics;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to bulk check metrics",
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    checkSiteMetrics,
    bulkCheckMetrics,
  };
};
