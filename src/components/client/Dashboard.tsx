import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  TrendingUp,
  Link as LinkIcon,
  Package,
  Plus,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

const ClientDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-4">
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <Plus className="h-4 w-4" />
            Yeni Backlink Al
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Metrikleri Güncelle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Package className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Kalan Kredi</p>
              <p className="text-2xl font-bold text-white">450</p>
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
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Ortalama DA/PA</p>
              <p className="text-2xl font-bold text-white">35/28</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500/20">
              <BarChart className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Başarı Oranı</p>
              <p className="text-2xl font-bold text-white">94%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Son Backlinkler
          </h3>
          <div className="space-y-4">
            {[
              {
                site: "example1.com",
                keyword: "anahtar kelime 1",
                metrics: { da: 35, pa: 28 },
                status: "active",
              },
              {
                site: "example2.com",
                keyword: "anahtar kelime 2",
                metrics: { da: 42, pa: 35 },
                status: "pending",
              },
              {
                site: "example3.com",
                keyword: "anahtar kelime 3",
                metrics: { da: 38, pa: 30 },
                status: "active",
              },
            ].map((backlink, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div className="flex-1">
                  <p className="text-white">{backlink.site}</p>
                  <p className="text-sm text-gray-400">{backlink.keyword}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">DA/PA</p>
                    <p className="text-white">
                      {backlink.metrics.da}/{backlink.metrics.pa}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${backlink.status === "active" ? "bg-green-500" : "bg-yellow-500"} text-white border-0`}
                  >
                    {backlink.status === "active" ? "Aktif" : "Beklemede"}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-purple-500/20 hover:text-purple-500"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">Metrikler</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">İndexlenme Oranı</span>
                <span className="text-white">85%</span>
              </div>
              <Progress value={85} className="h-2 bg-green-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Backlink Sağlığı</span>
                <span className="text-white">92%</span>
              </div>
              <Progress value={92} className="h-2 bg-blue-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Kredi Kullanımı</span>
                <span className="text-white">65%</span>
              </div>
              <Progress value={65} className="h-2 bg-purple-500" />
            </div>

            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-white mb-4">Domain Dağılımı</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1e1f2e] p-3 rounded-md">
                  <p className="text-sm text-gray-400">Yüksek DA/PA</p>
                  <p className="text-xl font-bold text-white">45%</p>
                </div>
                <div className="bg-[#1e1f2e] p-3 rounded-md">
                  <p className="text-sm text-gray-400">Orta DA/PA</p>
                  <p className="text-xl font-bold text-white">35%</p>
                </div>
                <div className="bg-[#1e1f2e] p-3 rounded-md">
                  <p className="text-sm text-gray-400">Düşük DA/PA</p>
                  <p className="text-xl font-bold text-white">20%</p>
                </div>
                <div className="bg-[#1e1f2e] p-3 rounded-md">
                  <p className="text-sm text-gray-400">Yeni Domainler</p>
                  <p className="text-xl font-bold text-white">15%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
