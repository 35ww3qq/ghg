import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Backlink, Customer, Package, Order, BacklinkStats } from "@/types/api";

interface AppState {
  // Auth State
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: "admin" | "client";
    name: string;
  } | null;
  setUser: (user: AppState["user"]) => void;
  logout: () => void;

  // Backlinks State
  backlinks: Backlink[];
  setBacklinks: (backlinks: Backlink[]) => void;
  addBacklink: (backlink: Backlink) => void;
  updateBacklink: (id: string, data: Partial<Backlink>) => void;
  removeBacklink: (id: string) => void;

  // Customers State
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  removeCustomer: (id: string) => void;

  // Packages State
  packages: Package[];
  setPackages: (packages: Package[]) => void;
  addPackage: (pkg: Package) => void;
  updatePackage: (id: string, data: Partial<Package>) => void;
  removePackage: (id: string) => void;

  // Orders State
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, data: Partial<Order>) => void;

  // Stats State
  stats: BacklinkStats | null;
  setStats: (stats: BacklinkStats) => void;

  // UI State
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>(
  persist(
    (set) => ({
      // Auth Initial State
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Backlinks Initial State
      backlinks: [],
      setBacklinks: (backlinks) => set({ backlinks }),
      addBacklink: (backlink) =>
        set((state) => ({ backlinks: [...state.backlinks, backlink] })),
      updateBacklink: (id, data) =>
        set((state) => ({
          backlinks: state.backlinks.map((b) =>
            b.id === id ? { ...b, ...data } : b,
          ),
        })),
      removeBacklink: (id) =>
        set((state) => ({
          backlinks: state.backlinks.filter((b) => b.id !== id),
        })),

      // Customers Initial State
      customers: [],
      setCustomers: (customers) => set({ customers }),
      addCustomer: (customer) =>
        set((state) => ({ customers: [...state.customers, customer] })),
      updateCustomer: (id, data) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, ...data } : c,
          ),
        })),
      removeCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
        })),

      // Packages Initial State
      packages: [],
      setPackages: (packages) => set({ packages }),
      addPackage: (pkg) =>
        set((state) => ({ packages: [...state.packages, pkg] })),
      updatePackage: (id, data) =>
        set((state) => ({
          packages: state.packages.map((p) =>
            p.id === id ? { ...p, ...data } : p,
          ),
        })),
      removePackage: (id) =>
        set((state) => ({
          packages: state.packages.filter((p) => p.id !== id),
        })),

      // Orders Initial State
      orders: [],
      setOrders: (orders) => set({ orders }),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrder: (id, data) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, ...data } : o,
          ),
        })),

      // Stats Initial State
      stats: null,
      setStats: (stats) => set({ stats }),

      // UI Initial State
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "backlink-store",
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);
