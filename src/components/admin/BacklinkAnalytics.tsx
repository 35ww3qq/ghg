import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricsChart } from "@/components/shared/MetricsChart";
import {
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart,
  Globe,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BacklinkAnalytics = () => {
  const [dateRange, setDateRange] = useState("this-month");

  // Örnek veriler
  const stats = {
    totalBacklinks: 5678,
    activeBacklinks: 3456,
    indexRate: 85,
    averageDA: 35,
    averagePA: 28,
    successRate: 94,
  };

  const performanceData = [
    { date: "1 Ocak", value: 85 },
    { date: "2 Ocak", value: 88 },
    { date: "3 Ocak", value: 86 },
    { date: "4 Ocak", value: 90 },
    { date: "5 Ocak", value: 89 },
    { date: "6 Ocak", value: 92 },
    { date: "7 Ocak", value: 91 },
  ];

  const topDomains = [
    { domain: "example1.com", da: 45, growth: "+12%" },
    { domain: "example2.com", da: 42, growth: "+8%" },
    { domain: "example3.com", da: 38, growth: "+5%" },
    { domain: "example4.com", da: 36, growth: "+3%" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Backlink Analitiği</h1>
        <div className="flex gap-4">
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
            <Download className="h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Toplam Backlink</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.totalBacklinks}
          </p>
          <p className="text-sm text-green-500">+12.5% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Aktif Backlink</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.activeBacklinks}
          </p>
          <p className="text-sm text-green-500">+8.3% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">İndexlenme Oranı</h3>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.indexRate}%</p>
          <p className="text-sm text-red-500">-2.1% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Başarı Oranı</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
          <p className="text-sm text-green-500">+1.8% geçen aya göre</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Backlink Performansı
            </h3>
            <Badge
              variant="outline"
              className="bg-purple-500/20 text-purple-500 border-0"
            >
              Son 7 Gün
            </Badge>
          </div>
          <MetricsChart
            data={performanceData}
            title=""
            className="bg-transparent border-0"
          />
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              En İyi Performans Gösteren Domainler
            </h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topDomains.map((domain, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{domain.domain}</p>
                  <p className="text-sm text-gray-400">DA: {domain.da}</p>
                </div>
                <span className="text-green-500">{domain.growth}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-6">
            Domain Metrikleri
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Ortalama DA</span>
                <span className="text-white">{stats.averageDA}/100</span>
              </div>
              <Progress value={stats.averageDA} className="h-2 bg-purple-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Ortalama PA</span>
                <span className="text-white">{stats.averagePA}/100</span>
              </div>
              <Progress value={stats.averagePA} className="h-2 bg-blue-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Spam Score</span>
                <span className="text-white">2/10</span>
              </div>
              <Progress value={20} className="h-2 bg-green-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-6">
            Link Dağılımı
          </h3>
          <div className="space-y-4">
            {[
              { type: "Dofollow", count: 6234, percentage: 75 },
              { type: "Nofollow", count: 2000, percentage: 25 },
              { type: "Text Link", count: 7234, percentage: 88 },
              { type: "Image Link", count: 1000, percentage: 12 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">{item.type}</span>
                  <span className="text-white">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <Progress
                  value={item.percentage}
                  className="h-2 bg-purple-500"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="bg-yellow-600/20 border-0 p-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            İndexlenme oranında düşüş tespit edildi. Premium Indexer kullanarak
            indexlenme sürecini hızlandırabilirsiniz.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BacklinkAnalytics;
