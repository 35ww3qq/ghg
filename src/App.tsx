import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./pages/Dashboard";
import LinkMarket from "./pages/LinkMarket";
import MyLinks from "./components/client/MyLinks";
import PremiumIndexer from "./pages/PremiumIndexer";
import Packages from "./pages/Packages";
import Invoices from "./pages/Invoices";
import Support from "./pages/Support";
import Documentation from "./pages/Documentation";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import PackageManagement from "./components/admin/PackageManagement";
import CustomerManagement from "./components/admin/CustomerManagement";
import AdminSettings from "./components/admin/AdminSettings";
import AdminReports from "./components/admin/AdminReports";
import AdminLogs from "./components/admin/AdminLogs";
import AdminSecurity from "./components/admin/AdminSecurity";

// Admin route guard
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = true; // Bu kısmı gerçek auth sisteminize göre değiştirin
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#1e1f2e] text-white">
          Yükleniyor...
        </div>
      }
    >
      <div className="min-h-screen bg-[#1e1f2e]">
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/link-market" element={<LinkMarket />} />
          <Route path="/my-links" element={<MyLinks />} />
          <Route path="/premium-indexer" element={<PremiumIndexer />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/support" element={<Support />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="packages" element={<PackageManagement />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="security" element={<AdminSecurity />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
