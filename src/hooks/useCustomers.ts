import { useState, useCallback } from "react";
import { api } from "@/services/api";
import { useStore } from "@/store";
import { Customer } from "@/types/api";

export const useCustomers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    customers,
    setCustomers,
    addCustomer,
    updateCustomer,
    removeCustomer,
  } = useStore();

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.customers.getAll();
      setCustomers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch customers",
      );
    } finally {
      setIsLoading(false);
    }
  }, [setCustomers]);

  const createCustomer = useCallback(
    async (data: Partial<Customer>) => {
      try {
        setIsLoading(true);
        setError(null);
        const newCustomer = await api.customers.create(data);
        addCustomer(newCustomer);
        return newCustomer;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create customer",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addCustomer],
  );

  const updateCustomerById = useCallback(
    async (id: string, data: Partial<Customer>) => {
      try {
        setIsLoading(true);
        setError(null);
        const updatedCustomer = await api.customers.update(id, data);
        updateCustomer(id, updatedCustomer);
        return updatedCustomer;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update customer",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [updateCustomer],
  );

  const deleteCustomer = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await api.customers.delete(id);
        removeCustomer(id);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete customer",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [removeCustomer],
  );

  const addCustomerCredits = useCallback(
    async (id: string, amount: number) => {
      try {
        setIsLoading(true);
        setError(null);
        await api.customers.addCredits(id, amount);
        await fetchCustomers(); // Refresh customer list to get updated credits
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add credits");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCustomers],
  );

  return {
    customers,
    isLoading,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomer: updateCustomerById,
    deleteCustomer,
    addCustomerCredits,
  };
};
