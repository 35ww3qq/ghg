import React from "react";
import {
  LayoutDashboard,
  Link,
  List,
  Zap,
  Package,
  Receipt,
  MessageSquare,
  FileText,
  HelpCircle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PackageTable from "./admin/PackageTable";
import { Card } from "@/components/ui/card";
import { Link as RouterLink } from "react-router-dom";

interface Stats {
  totalSites: number;
  totalSpent: number;
  purchasedLinks: number;
}

const defaultStats: Stats = {
  totalSites: 1433,
  totalSpent: 5630,
  purchasedLinks: 1451,
};

const Home = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e]">
      <header className="h-16 border-b border-gray-700 flex items-center justify-between px-6 bg-[#1e1f2e]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <h1 className="text-xl font-bold text-white">Hacklink Market</h1>
        </div>
        <nav className="flex items-center gap-6">
          <RouterLink to="/dashboard">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Button>
          </RouterLink>
          <RouterLink to="/link-market">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <Link size={18} />
              Link Market
            </Button>
          </RouterLink>
          <RouterLink to="/my-links">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <List size={18} />
              Linklerim
            </Button>
          </RouterLink>
          <RouterLink to="/premium-indexer">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <Zap size={18} />
              Premium Indexer
            </Button>
          </RouterLink>
          <RouterLink to="/packages">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <Package size={18} />
              Paketler
            </Button>
          </RouterLink>
          <RouterLink to="/invoices">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <Receipt size={18} />
              Faturalar
            </Button>
          </RouterLink>
          <RouterLink to="/support">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <MessageSquare size={18} />
              Destek
            </Button>
          </RouterLink>
          <RouterLink to="/documentation">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-transparent gap-2"
            >
              <FileText size={18} />
              Dökümanlar
            </Button>
          </RouterLink>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-transparent"
          >
            <HelpCircle size={20} />
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-transparent"
          >
            <Bell size={20} />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-white text-sm">A</span>
          </div>
        </div>
      </header>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Welcome Card */}
          <Card className="bg-[#2a2b3d] p-6 rounded-lg border-0">
            <div className="flex items-start gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Hoş Geldin @komutan!! 🎯
                </h2>
                <p className="text-purple-400 text-lg">Bakiye: 120 Kredi</p>
              </div>
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=transparent"
                alt="Avatar"
                className="w-24 h-24"
              />
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="bg-[#2a2b3d] p-6 rounded-lg border-0">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
              İstatistik
              <span className="text-sm text-gray-400">Şimdi Güncellendi</span>
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <LayoutDashboard size={16} />
                  Toplam Site
                </div>
                <p className="text-2xl font-bold text-white">
                  {defaultStats.totalSites}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Receipt size={16} />
                  Toplam Harcamanız
                </div>
                <p className="text-2xl font-bold text-white">
                  {defaultStats.totalSpent} Kredi
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Package size={16} />
                  Satın Aldığınız Link Sayısı
                </div>
                <p className="text-2xl font-bold text-white">
                  {defaultStats.purchasedLinks}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Link Market Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Link Market</h2>
          <div className="bg-yellow-600/20 p-4 rounded-md text-yellow-400 mb-6">
            <span>⚠️</span> Alınma durumu, o linki daha önce alıp almadığınızı
            gösterir. Eğer aldıysanız, imleci "Eklendi" butonunun üstüne
            getirin, bu sayede o linke hangi siteyi ve kelimeyi eklediğinizi
            görebilirsiniz.
          </div>
          <PackageTable />
        </div>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Header 1
      </h1>
    </div>
  );
};

export default Home;
