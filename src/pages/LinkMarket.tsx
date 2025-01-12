import React from "react";
import PackageTable from "@/components/admin/PackageTable";
import { Card } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinkMarket = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Link Market</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Site ara..."
              className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
            />
          </div>
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0 hover:bg-[#3a3b4d] gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Link</h3>
          <p className="text-2xl font-bold text-white">5,678</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Linkler</h3>
          <p className="text-2xl font-bold text-green-500">3,456</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Ortalama DA/PA</h3>
          <p className="text-2xl font-bold text-blue-500">35/28</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Başarı Oranı</h3>
          <p className="text-2xl font-bold text-purple-500">94%</p>
        </Card>
      </div>

      <div className="bg-yellow-600/20 p-4 rounded-md text-yellow-400 mb-6">
        <span>⚠️</span> Alınma durumu, o linki daha önce alıp almadığınızı
        gösterir. Eğer aldıysanız, imleci "Eklendi" butonunun üstüne getirin, bu
        sayede o linke hangi siteyi ve kelimeyi eklediğinizi görebilirsiniz.
      </div>

      <PackageTable />
    </div>
  );
};

export default LinkMarket;
