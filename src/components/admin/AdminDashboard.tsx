import React from "react";
import DashboardStats from "./DashboardStats";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  BarChart,
  TrendingUp,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Toplam Backlink</p>
              <p className="text-2xl font-bold text-white">12,345</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <LinkIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Aktif Backlink</p>
              <p className="text-2xl font-bold text-white">8,234</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Toplam Müşteri</p>
              <p className="text-2xl font-bold text-white">892</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500/20">
              <BarChart className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Aylık Gelir</p>
              <p className="text-2xl font-bold text-white">45,678 ₺</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Backlink Metrikleri
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Başarılı İndexlenme</span>
                <span className="text-white">85%</span>
              </div>
              <Progress value={85} className="h-2 bg-green-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Ortalama DA/PA</span>
                <span className="text-white">45/38</span>
              </div>
              <Progress value={45} className="h-2 bg-blue-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Aktif Link Oranı</span>
                <span className="text-white">92%</span>
              </div>
              <Progress value={92} className="h-2 bg-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Son Aktiviteler
          </h3>
          <div className="space-y-4">
            {[
              {
                action: "Yeni Müşteri Kaydı",
                details: "example1.com",
                time: "5 dk önce",
              },
              {
                action: "Backlink Satın Alma",
                details: "250 kredi",
                time: "15 dk önce",
              },
              {
                action: "İndexleme Başarılı",
                details: "example2.com",
                time: "25 dk önce",
              },
              {
                action: "Yeni Destek Talebi",
                details: "#45678",
                time: "1 saat önce",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.details}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Popüler Domainler
          </h3>
          <div className="space-y-4">
            {[
              { domain: "example1.com", backlinks: 156, growth: "+12%" },
              { domain: "example2.com", backlinks: 142, growth: "+8%" },
              { domain: "example3.com", backlinks: 98, growth: "+5%" },
              { domain: "example4.com", backlinks: 87, growth: "+3%" },
            ].map((domain, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{domain.domain}</p>
                  <p className="text-sm text-gray-400">
                    {domain.backlinks} backlink
                  </p>
                </div>
                <span className="text-green-500">{domain.growth}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Sistem Durumu
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">API Performansı</span>
                <span className="text-white">98%</span>
              </div>
              <Progress value={98} className="h-2 bg-green-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Sunucu Yükü</span>
                <span className="text-white">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-yellow-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Cache Hit Ratio</span>
                <span className="text-white">78%</span>
              </div>
              <Progress value={78} className="h-2 bg-blue-500" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
