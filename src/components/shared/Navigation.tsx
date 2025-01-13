import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Link as LinkIcon,
  List,
  Zap,
  Package,
  Receipt,
  MessageSquare,
  FileText,
  Bell,
  Settings,
  LogOut,
  BarChart,
  Users,
  Database,
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const clientLinks = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    { to: "/link-market", icon: <LinkIcon size={18} />, label: "Link Market" },
    { to: "/my-links", icon: <List size={18} />, label: "Linklerim" },
    {
      to: "/premium-indexer",
      icon: <Zap size={18} />,
      label: "Premium Indexer",
    },
    { to: "/packages", icon: <Package size={18} />, label: "Paketler" },
    { to: "/invoices", icon: <Receipt size={18} />, label: "Faturalar" },
    { to: "/support", icon: <MessageSquare size={18} />, label: "Destek" },
    { to: "/documentation", icon: <FileText size={18} />, label: "Dökümanlar" },
  ];

  const adminLinks = [
    { to: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/admin/market", icon: <LinkIcon size={18} />, label: "Link Market" },
    { to: "/admin/customers", icon: <Users size={18} />, label: "Müşteriler" },
    {
      to: "/admin/bulk-links",
      icon: <Database size={18} />,
      label: "Toplu İşlemler",
    },
    {
      to: "/admin/analytics",
      icon: <BarChart size={18} />,
      label: "Analizler",
    },
    { to: "/admin/settings", icon: <Settings size={18} />, label: "Ayarlar" },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  return (
    <nav className="flex items-center justify-between px-6 h-16 bg-[#1e1f2e] border-b border-gray-700">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold">{isAdmin ? "A" : "H"}</span>
        </div>
        <h1 className="text-xl font-bold text-white">
          {isAdmin ? "Admin Panel" : "Hacklink Market"}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            <Button
              variant="ghost"
              className={`text-gray-300 hover:text-white hover:bg-transparent gap-2 ${location.pathname === link.to ? "text-white bg-[#2a2b3d]" : ""}`}
            >
              {link.icon}
              {link.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white hover:bg-transparent"
        >
          <Bell size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white hover:bg-transparent"
        >
          <Settings size={20} />
        </Button>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
          onClick={logout}
        >
          <LogOut size={18} />
          Çıkış
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
