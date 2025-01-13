import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  Link as LinkIcon,
  Settings,
  Shield,
  FileText,
  LogOut,
  Code2,
  Database,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface AdminSidebarProps {
  items?: SidebarItem[];
  onLogout?: () => void;
  className?: string;
}

const defaultItems: SidebarItem[] = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: <Database className="w-5 h-5" />,
    label: "Backlink Yönetimi",
    href: "/admin/bulk-links",
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    label: "Entegrasyon Kodları",
    href: "/admin/code-generator",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Müşteriler",
    href: "/admin/customers",
  },
  {
    icon: <Package className="w-5 h-5" />,
    label: "Paketler",
    href: "/admin/packages",
  },
  {
    icon: <BarChart className="w-5 h-5" />,
    label: "Raporlar",
    href: "/admin/analytics",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: "Güvenlik",
    href: "/admin/security",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Ayarlar",
    href: "/admin/settings",
  },
];

const AdminSidebar = ({
  items = defaultItems,
  onLogout = () => {},
  className,
}: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col h-full w-[280px] bg-background border-r px-4 py-6",
        className,
      )}
    >
      <div className="flex items-center mb-8 px-4">
        <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center mr-3">
          <span className="text-white font-bold">A</span>
        </div>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 space-y-2 px-2">
        {items.map((item) => (
          <Button
            key={item.href}
            variant={location.pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 px-4",
              location.pathname === item.href
                ? "bg-secondary hover:bg-secondary/80"
                : "hover:bg-accent",
            )}
            onClick={() => navigate(item.href)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 hover:bg-destructive/10 hover:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
