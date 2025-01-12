import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart, TrendingUp, Users, Link as LinkIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e] p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Aktif Backlink</p>
              <p className="text-2xl font-bold text-white">1,234</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <LinkIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Toplam Link</p>
              <p className="text-2xl font-bold text-white">5,678</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Aktif Müşteri</p>
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
              <p className="text-sm text-gray-400">Toplam Gelir</p>
              <p className="text-2xl font-bold text-white">45,678 ₺</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Link Performansı
          </h3>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            [Grafik Gelecek]
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Popüler Siteler
          </h3>
          <div className="space-y-4">
            {[
              { site: "example1.com", links: 156, growth: "+12%" },
              { site: "example2.com", links: 142, growth: "+8%" },
              { site: "example3.com", links: 98, growth: "+5%" },
              { site: "example4.com", links: 87, growth: "+3%" },
            ].map((site, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{site.site}</p>
                  <p className="text-sm text-gray-400">{site.links} backlink</p>
                </div>
                <span className="text-green-500">{site.growth}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
