import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./components/auth/LoginPage";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./components/home";

// Client Pages
import Dashboard from "./components/client/Dashboard";
import BacklinkPurchase from "./components/client/BacklinkPurchase";
import MyLinks from "./components/client/MyLinks";
import PremiumIndexer from "./pages/PremiumIndexer";
import Packages from "./pages/Packages";
import Invoices from "./pages/Invoices";
import Support from "./pages/Support";
import Documentation from "./pages/Documentation";

// Admin Pages
import AdminDashboard from "./components/admin/AdminDashboard";
import BacklinkMarket from "./components/admin/BacklinkMarket";
import BacklinkAnalytics from "./components/admin/BacklinkAnalytics";
import BacklinkSettings from "./components/admin/BacklinkSettings";
import BacklinkCodeGenerator from "./components/admin/BacklinkCodeGenerator";
import CustomerManager from "./components/admin/CustomerManager";
import BulkLinkManager from "./components/admin/BulkLinkManager";
import AdminSettings from "./components/admin/AdminSettings";
import AdminLogs from "./components/admin/AdminLogs";
import AdminReports from "./components/admin/AdminReports";
import AdminSecurity from "./components/admin/AdminSecurity";

// Loading Component
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="text-lg text-muted-foreground">Yükleniyor...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Client Routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="link-market" element={<BacklinkPurchase />} />
            <Route path="my-links" element={<MyLinks />} />
            <Route path="premium-indexer" element={<PremiumIndexer />} />
            <Route path="packages" element={<Packages />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="support" element={<Support />} />
            <Route path="documentation" element={<Documentation />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="market" element={<BacklinkMarket />} />
            <Route path="analytics" element={<BacklinkAnalytics />} />
            <Route path="settings" element={<BacklinkSettings />} />
            <Route path="code-generator" element={<BacklinkCodeGenerator />} />
            <Route path="customers" element={<CustomerManager />} />
            <Route path="bulk-links" element={<BulkLinkManager />} />
            <Route path="system-settings" element={<AdminSettings />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="security" element={<AdminSecurity />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
