import React from "react";
import DashboardStats from "./DashboardStats";
import { Card } from "@/components/ui/card";
import { LineChart, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>

      <DashboardStats />

      <Card className="bg-[#2a2b3d] p-6 border-0 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Sistem Performansı
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">CPU Kullanımı</span>
              <span className="text-white">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">RAM Kullanımı</span>
              <span className="text-white">60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Disk Kullanımı</span>
              <span className="text-white">35%</span>
            </div>
            <Progress value={35} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Bağlantı Yükü</span>
              <span className="text-white">25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Gelir Analizi</h3>
            <LineChart className="text-gray-400 h-5 w-5" />
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            [Gelir Grafiği Buraya Gelecek]
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Popüler Linkler
            </h3>
            <BarChart className="text-gray-400 h-5 w-5" />
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            [Link İstatistikleri Grafiği Buraya Gelecek]
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
