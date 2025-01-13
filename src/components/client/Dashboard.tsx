import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricsChart } from "@/components/shared/MetricsChart";
import {
  BarChart,
  TrendingUp,
  Link as LinkIcon,
  Package,
  Plus,
  ExternalLink,
  RefreshCw,
  ArrowUpRight,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Örnek veri - gerçek uygulamada API'den gelecek
  const stats = {
    credits: 450,
    activeLinks: 24,
    averageMetrics: { da: 35, pa: 28 },
    successRate: 94,
  };

  const recentBacklinks = [
    {
      site: "example1.com",
      keyword: "dijital pazarlama",
      metrics: { da: 35, pa: 28 },
      status: "active",
      addedDate: "2024-01-15",
    },
    {
      site: "example2.com",
      keyword: "seo hizmetleri",
      metrics: { da: 42, pa: 35 },
      status: "pending",
      addedDate: "2024-01-14",
    },
    {
      site: "example3.com",
      keyword: "web tasarım",
      metrics: { da: 38, pa: 30 },
      status: "active",
      addedDate: "2024-01-13",
    },
  ];

  const chartData = [
    { date: "1 Ocak", value: 30 },
    { date: "2 Ocak", value: 45 },
    { date: "3 Ocak", value: 35 },
    { date: "4 Ocak", value: 50 },
    { date: "5 Ocak", value: 40 },
    { date: "6 Ocak", value: 55 },
    { date: "7 Ocak", value: 45 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-4">
          <Button
            className="bg-purple-600 hover:bg-purple-700 gap-2"
            onClick={() => navigate("/link-market")}
          >
            <Plus className="h-4 w-4" />
            Yeni Backlink Al
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Metrikleri Güncelle
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Package className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Kalan Kredi</p>
              <p className="text-2xl font-bold text-white">{stats.credits}</p>
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
              <p className="text-2xl font-bold text-white">
                {stats.activeLinks}
              </p>
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
              <p className="text-2xl font-bold text-white">
                {stats.averageMetrics.da}/{stats.averageMetrics.pa}
              </p>
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
              <p className="text-2xl font-bold text-white">
                {stats.successRate}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Backlinks */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Son Backlinkler
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white gap-2"
              onClick={() => navigate("/my-links")}
            >
              Tümünü Gör
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentBacklinks.map((backlink, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white">{backlink.site}</p>
                    {backlink.status === "pending" && (
                      <Badge
                        variant="outline"
                        className="bg-yellow-500/20 text-yellow-500 border-0"
                      >
                        Beklemede
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-400">{backlink.keyword}</p>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{backlink.addedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">DA/PA</p>
                    <p className="text-white">
                      {backlink.metrics.da}/{backlink.metrics.pa}
                    </p>
                  </div>
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

        {/* Metrics */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-6">Metrikler</h3>
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
              <MetricsChart
                data={chartData}
                title="Backlink Performansı"
                className="bg-transparent border-0"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="bg-yellow-600/20 border-0 p-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Bazı backlinklerinizin indexlenmesi bekleniyor. Premium Indexer
            kullanarak indexlenme sürecini hızlandırabilirsiniz.
          </p>
          <Button
            variant="link"
            className="text-yellow-500 hover:text-yellow-400"
            onClick={() => navigate("/premium-indexer")}
          >
            Premium Indexer'a Git
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
