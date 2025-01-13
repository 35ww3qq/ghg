import { Suspense } from "react";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./components/auth/LoginPage";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./components/home";
import ClientDashboard from "./components/client/Dashboard";
import BacklinkPurchase from "./components/client/BacklinkPurchase";
import MyLinks from "./components/client/MyLinks";
import PremiumIndexer from "./pages/PremiumIndexer";
import Packages from "./pages/Packages";
import Invoices from "./pages/Invoices";
import Support from "./pages/Support";
import Documentation from "./pages/Documentation";
import AdminDashboard from "./components/admin/AdminDashboard";
import BacklinkMarket from "./components/admin/BacklinkMarket";
import BacklinkAnalytics from "./components/admin/BacklinkAnalytics";
import BacklinkSettings from "./components/admin/BacklinkSettings";
import BacklinkCodeGenerator from "./components/admin/BacklinkCodeGenerator";
import CustomerManager from "./components/admin/CustomerManager";
import BulkLinkManager from "./components/admin/BulkLinkManager";

// @ts-ignore
import routes from "tempo-routes";

const App = () => {
  // Tempo routes
  const tempoRoutes = process.env.TEMPO ? useRoutes(routes) : null;

  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        {/* Tempo routes */}
        {tempoRoutes}

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
            <Route path="dashboard" element={<ClientDashboard />} />
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
            path="admin"
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
          </Route>

          {/* Add this before the catchall route */}
          {process.env.TEMPO && <Route path="/tempobook/*" />}

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
