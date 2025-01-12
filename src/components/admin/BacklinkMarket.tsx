import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Edit2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BacklinkMarket = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Backlink Market</h1>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          <Plus className="h-4 w-4" />
          Yeni Site Ekle
        </Button>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Site ara..."
              className="pl-10 bg-[#1e1f2e] border-0"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-[#1e1f2e] border-0">
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="pending">Beklemede</SelectItem>
              <SelectItem value="sold">Satıldı</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400 font-medium">Site</th>
                <th className="pb-3 text-gray-400 font-medium">DA/PA</th>
                <th className="pb-3 text-gray-400 font-medium">Spam Score</th>
                <th className="pb-3 text-gray-400 font-medium">Kredi</th>
                <th className="pb-3 text-gray-400 font-medium">Durum</th>
                <th className="pb-3 text-gray-400 font-medium">Satış</th>
                <th className="pb-3 text-gray-400 font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  site: "example1.com",
                  da: 45,
                  pa: 38,
                  spamScore: 2,
                  credits: 100,
                  status: "active",
                  sales: 156,
                },
                {
                  site: "example2.com",
                  da: 35,
                  pa: 28,
                  spamScore: 1,
                  credits: 75,
                  status: "pending",
                  sales: 89,
                },
                // ... daha fazla site
              ].map((site, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-4 text-white">{site.site}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="bg-purple-500 text-white border-0"
                      >
                        DA: {site.da}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-500 text-white border-0"
                      >
                        PA: {site.pa}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={`${site.spamScore <= 2 ? "bg-green-500" : "bg-red-500"} text-white border-0`}
                    >
                      {site.spamScore}/10
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-white">
                      <span>🪙</span>
                      <span>{site.credits}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={`${
                        site.status === "active"
                          ? "bg-green-500"
                          : site.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      } text-white border-0`}
                    >
                      {site.status === "active"
                        ? "Aktif"
                        : site.status === "pending"
                          ? "Beklemede"
                          : "Satıldı"}
                    </Badge>
                  </td>
                  <td className="py-4 text-white">{site.sales}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-blue-500/20 hover:text-blue-500"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-red-500/20 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BacklinkMarket;
