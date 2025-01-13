import { useState, useCallback } from "react";
import { api } from "@/services/api";
import { useStore } from "@/store";
import { toast } from "@/components/ui/use-toast";
import { Backlink } from "@/types/api";

export const useBacklinks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    backlinks,
    setBacklinks,
    addBacklink,
    updateBacklink,
    removeBacklink,
  } = useStore();

  const fetchBacklinks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.backlinks.getAll();
      if (response.success && response.data) {
        setBacklinks(response.data);
      } else {
        throw new Error(response.error || "Failed to fetch backlinks");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch backlinks";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setBacklinks]);

  const createBacklink = useCallback(
    async (data: Partial<Backlink>) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.backlinks.create(data);
        if (response.success && response.data) {
          addBacklink(response.data);
          toast({
            title: "Success",
            description: "Backlink created successfully",
          });
          return response.data;
        } else {
          throw new Error(response.error || "Failed to create backlink");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create backlink";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addBacklink],
  );

  const bulkCreateBacklinks = useCallback(
    async (targetUrl: string, links: string[]) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.backlinks.bulkCreate({ targetUrl, links });
        if (response.success) {
          await fetchBacklinks(); // Refresh the list after bulk creation
          toast({
            title: "Success",
            description: "Backlinks created successfully",
          });
          return response.data;
        } else {
          throw new Error(response.error || "Failed to bulk create backlinks");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to bulk create backlinks";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchBacklinks],
  );

  return {
    backlinks,
    isLoading,
    error,
    fetchBacklinks,
    createBacklink,
    bulkCreateBacklinks,
  };
};
