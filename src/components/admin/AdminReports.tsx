import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricsChart } from "@/components/shared/MetricsChart";
import {
  BarChart,
  DollarSign,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Link as LinkIcon,
  AlertCircle,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminReports = () => {
  const [dateRange, setDateRange] = useState("this-month");

  // Örnek veriler
  const stats = {
    totalRevenue: 45678,
    totalCustomers: 1234,
    totalLinks: 5678,
    activeLinks: 3456,
  };

  const revenueData = [
    { date: "1 Ocak", value: 2500 },
    { date: "2 Ocak", value: 3200 },
    { date: "3 Ocak", value: 2800 },
    { date: "4 Ocak", value: 4100 },
    { date: "5 Ocak", value: 3600 },
    { date: "6 Ocak", value: 4800 },
    { date: "7 Ocak", value: 4200 },
  ];

  const topPackages = [
    { name: "Premium Plus", sales: 156, growth: "+12%" },
    { name: "Professional", sales: 142, growth: "+8%" },
    { name: "Starter", sales: 98, growth: "+5%" },
    { name: "Enterprise", sales: 87, growth: "+3%" },
  ];

  const customerMetrics = [
    { metric: "Genel Memnuniyet", value: "4.8/5", change: "+0.2" },
    { metric: "Backlink Kalitesi", value: "4.7/5", change: "+0.3" },
    { metric: "Destek Hızı", value: "4.9/5", change: "+0.1" },
    { metric: "Platform Kullanımı", value: "4.6/5", change: "+0.2" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Raporlar ve Analizler</h1>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] bg-[#2a2b3d] border-0">
              <SelectValue placeholder="Tarih Aralığı" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Bugün</SelectItem>
              <SelectItem value="this-week">Bu Hafta</SelectItem>
              <SelectItem value="this-month">Bu Ay</SelectItem>
              <SelectItem value="last-month">Geçen Ay</SelectItem>
              <SelectItem value="custom">Özel Aralık</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Toplam Gelir</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.totalRevenue} ₺
          </p>
          <p className="text-sm text-green-500">+12.5% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Yeni Müşteriler</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.totalCustomers}
          </p>
          <p className="text-sm text-green-500">+8.3% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Ortalama Sipariş Değeri</h3>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-white">195 ₺</p>
          <p className="text-sm text-red-500">-3.2% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Backlink Başarı Oranı</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">94.5%</p>
          <p className="text-sm text-green-500">+1.8% geçen aya göre</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Gelir Analizi</h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-purple-500/20 text-purple-500 border-0"
              >
                Bu Ay
              </Badge>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <MetricsChart
            data={revenueData}
            title=""
            className="bg-transparent border-0"
          />
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              En Çok Satan Paketler
            </h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topPackages.map((pkg, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{pkg.name}</p>
                  <p className="text-sm text-gray-400">{pkg.sales} satış</p>
                </div>
                <span className="text-green-500">{pkg.growth}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Müşteri Memnuniyeti
            </h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {customerMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{metric.metric}</p>
                  <p className="text-sm text-gray-400">{metric.value}</p>
                </div>
                <span className="text-green-500">{metric.change}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Link Metrikleri
            </h3>
            <LinkIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">İndexlenme Oranı</span>
                <span className="text-white">85%</span>
              </div>
              <Progress value={85} className="h-2 bg-green-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Başarı Oranı</span>
                <span className="text-white">94%</span>
              </div>
              <Progress value={94} className="h-2 bg-blue-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Aktif Link Oranı</span>
                <span className="text-white">78%</span>
              </div>
              <Progress value={78} className="h-2 bg-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-yellow-600/20 border-0 p-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Gelir raporları her gece otomatik olarak güncellenir. Son
            güncelleme: 2 saat önce
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminReports;
