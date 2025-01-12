import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BacklinkPurchase = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Backlink Satın Al</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Bakiye:</span>
          <div className="flex items-center gap-1 text-white font-bold">
            <span>🪙</span>
            <span>450</span>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 ml-4">
            Kredi Yükle
          </Button>
        </div>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Domain ara..."
              className="pl-10 bg-[#1e1f2e] border-0"
            />
          </div>
          <Select defaultValue="da-high">
            <SelectTrigger className="w-[180px] bg-[#1e1f2e] border-0">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="da-high">DA (Yüksek-Düşük)</SelectItem>
              <SelectItem value="da-low">DA (Düşük-Yüksek)</SelectItem>
              <SelectItem value="price-high">Fiyat (Yüksek-Düşük)</SelectItem>
              <SelectItem value="price-low">Fiyat (Düşük-Yüksek)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            {
              domain: "example1.com",
              da: 45,
              pa: 38,
              spamScore: 2,
              credits: 100,
              category: "Teknoloji",
              language: "TR",
              traffic: "15K/ay",
            },
            // ... daha fazla domain
          ].map((domain, index) => (
            <Card key={index} className="bg-[#1e1f2e] p-4 border-0">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-medium">{domain.domain}</h3>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-purple-500/20 hover:text-purple-500"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="bg-purple-500 text-white border-0"
                  >
                    DA: {domain.da}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-500 text-white border-0"
                  >
                    PA: {domain.pa}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${domain.spamScore <= 2 ? "bg-green-500" : "bg-red-500"} text-white border-0`}
                  >
                    SS: {domain.spamScore}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400">Kategori</p>
                    <p className="text-white">{domain.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Dil</p>
                    <p className="text-white">{domain.language}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Trafik</p>
                    <p className="text-white">{domain.traffic}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Kredi</p>
                    <div className="flex items-center gap-1 text-white">
                      <span>🪙</span>
                      <span>{domain.credits}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Satın Al
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BacklinkPurchase;
