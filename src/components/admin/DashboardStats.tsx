import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart, DollarSign, Link as LinkIcon, Users } from "lucide-react";

interface DashboardStats {
  totalRevenue: number;
  totalCustomers: number;
  totalLinks: number;
  activeLinks: number;
}

const defaultStats: DashboardStats = {
  totalRevenue: 45678,
  totalCustomers: 1234,
  totalLinks: 5678,
  activeLinks: 3456,
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-full bg-purple-500/20">
            <DollarSign className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Toplam Gelir</p>
            <p className="text-2xl font-bold text-white">
              {defaultStats.totalRevenue} ₺
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-full bg-blue-500/20">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Toplam Müşteri</p>
            <p className="text-2xl font-bold text-white">
              {defaultStats.totalCustomers}
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-full bg-green-500/20">
            <LinkIcon className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Toplam Link</p>
            <p className="text-2xl font-bold text-white">
              {defaultStats.totalLinks}
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-full bg-yellow-500/20">
            <BarChart className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Aktif Linkler</p>
            <p className="text-2xl font-bold text-white">
              {defaultStats.activeLinks}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;
