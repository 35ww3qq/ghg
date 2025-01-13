import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricsChart } from "@/components/shared/MetricsChart";
import {
  BarChart,
  TrendingUp,
  Users,
  Link as LinkIcon,
  DollarSign,
  Package,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Download,
} from "lucide-react";

const AdminDashboard = () => {
  // Örnek veriler
  const stats = {
    totalRevenue: 45678,
    totalCustomers: 892,
    totalLinks: 5678,
    activeLinks: 3456,
    averageDA: 35,
    averagePA: 28,
    successRate: 94,
  };

  const recentActivities = [
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
  ];

  const chartData = [
    { date: "1 Ocak", value: 2500 },
    { date: "2 Ocak", value: 3200 },
    { date: "3 Ocak", value: 2800 },
    { date: "4 Ocak", value: 4100 },
    { date: "5 Ocak", value: 3600 },
    { date: "6 Ocak", value: 4800 },
    { date: "7 Ocak", value: 4200 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Rapor İndir
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <DollarSign className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Toplam Gelir</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalRevenue} ₺
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Toplam Müşteri</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalCustomers}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <LinkIcon className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Toplam Link</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalLinks}
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
              <p className="text-sm text-gray-400">Aktif Linkler</p>
              <p className="text-2xl font-bold text-white">
                {stats.activeLinks}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Gelir Analizi</h3>
            <Badge
              variant="outline"
              className="bg-purple-500/20 text-purple-500 border-0"
            >
              Bu Ay
            </Badge>
          </div>
          <MetricsChart
            data={chartData}
            title=""
            className="bg-transparent border-0"
          />
        </Card>

        {/* Recent Activities */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Son Aktiviteler
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-400 hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
              Tümünü Gör
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
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

        {/* Metrics */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-6">
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
                <span className="text-white">
                  {stats.averageDA}/{stats.averagePA}
                </span>
              </div>
              <Progress value={stats.averageDA} className="h-2 bg-blue-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Başarı Oranı</span>
                <span className="text-white">{stats.successRate}%</span>
              </div>
              <Progress
                value={stats.successRate}
                className="h-2 bg-purple-500"
              />
            </div>
          </div>
        </Card>

        {/* System Status */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-6">
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

      {/* System Alerts */}
      <Card className="bg-yellow-600/20 border-0 p-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Sistem yedeklemesi 3 gün içinde gerçekleştirilecek. Yedekleme
            sırasında kısa süreli kesintiler yaşanabilir.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
