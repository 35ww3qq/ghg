import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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
import BulkLinkManager from "./components/admin/BulkLinkManager";
import CustomerManager from "./components/admin/CustomerManager";
import AdminLogs from "./components/admin/AdminLogs";
import AdminSecurity from "./components/admin/AdminSecurity";
import SystemMonitor from "./components/admin/SystemMonitor";
import UserManagement from "./components/admin/UserManagement";
import CodeGenerator from "./components/admin/CodeGenerator";
import ApiSettingsPanel from "./components/admin/ApiSettingsPanel";

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Client Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/link-market" element={<BacklinkPurchase />} />
          <Route path="/my-links" element={<MyLinks />} />
          <Route path="/premium-indexer" element={<PremiumIndexer />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/support" element={<Support />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/market" element={<BacklinkMarket />} />
          <Route path="/admin/analytics" element={<BacklinkAnalytics />} />
          <Route path="/admin/settings" element={<BacklinkSettings />} />
          <Route path="/admin/customers" element={<CustomerManager />} />
          <Route path="/admin/bulk-links" element={<BulkLinkManager />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/security" element={<AdminSecurity />} />
          <Route path="/admin/system" element={<SystemMonitor />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/code-generator" element={<CodeGenerator />} />
          <Route path="/admin/api-settings" element={<ApiSettingsPanel />} />

          {/* 404 Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
