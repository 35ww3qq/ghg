import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

const BacklinkAnalytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Backlink Analitiği</h1>
        <div className="flex gap-4">
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
          <h3 className="text-gray-400 mb-2">Toplam Tıklama</h3>
          <p className="text-2xl font-bold text-white">12,345</p>
          <p className="text-sm text-green-500">+8.5% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Ortalama CTR</h3>
          <p className="text-2xl font-bold text-white">2.4%</p>
          <p className="text-sm text-red-500">-0.3% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">İndexlenme Oranı</h3>
          <p className="text-2xl font-bold text-white">94%</p>
          <p className="text-sm text-green-500">+2.1% geçen aya göre</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Backlink</h3>
          <p className="text-2xl font-bold text-white">8,234</p>
          <p className="text-sm text-green-500">+156 bu ay</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Domain Metrikleri
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Ortalama DA</span>
                <span className="text-white">45/100</span>
              </div>
              <Progress value={45} className="h-2 bg-purple-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Ortalama PA</span>
                <span className="text-white">38/100</span>
              </div>
              <Progress value={38} className="h-2 bg-blue-500" />
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
          <h3 className="text-lg font-semibold text-white mb-4">
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

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            En Çok Tıklanan Backlinkler
          </h3>
          <div className="space-y-4">
            {[
              { url: "example1.com", clicks: 1234, growth: "+12%" },
              { url: "example2.com", clicks: 987, growth: "+8%" },
              { url: "example3.com", clicks: 876, growth: "+5%" },
              { url: "example4.com", clicks: 765, growth: "+3%" },
            ].map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{link.url}</p>
                  <p className="text-sm text-gray-400">{link.clicks} tıklama</p>
                </div>
                <span className="text-green-500">{link.growth}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Coğrafi Dağılım
          </h3>
          <div className="space-y-4">
            {[
              { country: "Türkiye", percentage: 65 },
              { country: "Amerika", percentage: 15 },
              { country: "Almanya", percentage: 10 },
              { country: "İngiltere", percentage: 5 },
              { country: "Diğer", percentage: 5 },
            ].map((country, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">{country.country}</span>
                  <span className="text-white">{country.percentage}%</span>
                </div>
                <Progress
                  value={country.percentage}
                  className="h-2 bg-blue-500"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BacklinkAnalytics;
