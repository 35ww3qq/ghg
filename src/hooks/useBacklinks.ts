import { useState, useCallback } from "react";
import { api } from "@/services/api";
import { useStore } from "@/store";
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
      const data = await api.backlinks.getAll();
      setBacklinks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch backlinks",
      );
    } finally {
      setIsLoading(false);
    }
  }, [setBacklinks]);

  const createBacklink = useCallback(
    async (data: Partial<Backlink>) => {
      try {
        setIsLoading(true);
        setError(null);
        const newBacklink = await api.backlinks.create(data);
        addBacklink(newBacklink);
        return newBacklink;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create backlink",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addBacklink],
  );

  const updateBacklinkById = useCallback(
    async (id: string, data: Partial<Backlink>) => {
      try {
        setIsLoading(true);
        setError(null);
        const updatedBacklink = await api.backlinks.update(id, data);
        updateBacklink(id, updatedBacklink);
        return updatedBacklink;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update backlink",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [updateBacklink],
  );

  const deleteBacklink = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await api.backlinks.delete(id);
        removeBacklink(id);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete backlink",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [removeBacklink],
  );

  const bulkCreateBacklinks = useCallback(
    async (targetUrl: string, links: string[]) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await api.backlinks.bulkCreate({ targetUrl, links });
        await fetchBacklinks(); // Refresh the list after bulk creation
        return result;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to bulk create backlinks",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchBacklinks],
  );

  const bulkDeleteBacklinks = useCallback(
    async (ids: string[]) => {
      try {
        setIsLoading(true);
        setError(null);
        await api.backlinks.bulkDelete(ids);
        ids.forEach(removeBacklink);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to bulk delete backlinks",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [removeBacklink],
  );

  return {
    backlinks,
    isLoading,
    error,
    fetchBacklinks,
    createBacklink,
    updateBacklink: updateBacklinkById,
    deleteBacklink,
    bulkCreateBacklinks,
    bulkDeleteBacklinks,
  };
};
