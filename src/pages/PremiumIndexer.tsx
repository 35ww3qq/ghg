import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Zap, RefreshCw, CheckCircle } from "lucide-react";

const PremiumIndexer = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Premium Indexer</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="URL girin..."
              className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Zap className="h-4 w-4 mr-2" />
            Hızlı İndexle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam İndexleme</h3>
          <p className="text-2xl font-bold text-white">12,345</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Başarılı</h3>
          <p className="text-2xl font-bold text-green-500">11,234</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Beklemede</h3>
          <p className="text-2xl font-bold text-yellow-500">987</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Başarısız</h3>
          <p className="text-2xl font-bold text-red-500">124</p>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] border-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Son İndexleme İstekleri
          </h3>
          <div className="space-y-4">
            {[
              {
                url: "https://example1.com/page1",
                status: "success",
                date: "2 dakika önce",
              },
              {
                url: "https://example2.com/page2",
                status: "pending",
                date: "5 dakika önce",
              },
              {
                url: "https://example3.com/page3",
                status: "success",
                date: "10 dakika önce",
              },
              {
                url: "https://example4.com/page4",
                status: "failed",
                date: "15 dakika önce",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-700"
              >
                <div className="flex items-center gap-3">
                  {item.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : item.status === "pending" ? (
                    <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
                  ) : (
                    <Zap className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-white">{item.url}</p>
                    <p className="text-sm text-gray-400">{item.date}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${
                    item.status === "success"
                      ? "text-green-500"
                      : item.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {item.status === "success"
                    ? "İndexlendi"
                    : item.status === "pending"
                      ? "İşleniyor"
                      : "Başarısız"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PremiumIndexer;
