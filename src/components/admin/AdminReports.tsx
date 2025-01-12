import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminReports = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Raporlar ve Analizler</h1>
        <div className="flex items-center gap-4">
          <Select defaultValue="this-month">
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
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0 hover:bg-[#3a3b4d] gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0 hover:bg-[#3a3b4d] gap-2"
          >
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
          <p className="text-2xl font-bold text-white">₺45,678</p>
          <p className="text-sm text-green-500">+12.5% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Yeni Müşteriler</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-white">234</p>
          <p className="text-sm text-green-500">+8.3% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400">Ortalama Sipariş Değeri</h3>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-white">₺195</p>
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
              <LineChart className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            [Gelir Grafiği]
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Backlink Performansı
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-blue-500/20 text-blue-500 border-0"
              >
                Son 30 Gün
              </Badge>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            [Backlink Performans Grafiği]
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              En Çok Satan Paketler
            </h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { name: "Premium Plus", sales: 156, growth: "+12%" },
              { name: "Professional", sales: 142, growth: "+8%" },
              { name: "Starter", sales: 98, growth: "+5%" },
              { name: "Enterprise", sales: 87, growth: "+3%" },
            ].map((pkg, index) => (
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
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { metric: "Genel Memnuniyet", value: "4.8/5", change: "+0.2" },
              { metric: "Backlink Kalitesi", value: "4.7/5", change: "+0.3" },
              { metric: "Destek Hızı", value: "4.9/5", change: "+0.1" },
              { metric: "Platform Kullanımı", value: "4.6/5", change: "+0.2" },
            ].map((metric, index) => (
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
      </div>
    </div>
  );
};

export default AdminReports;
