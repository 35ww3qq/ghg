import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MetricsDisplay } from "@/components/shared/MetricsDisplay";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  Download,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Site {
  id: string;
  url: string;
  da: number;
  pa: number;
  spamScore: number;
  category: string;
  language: string;
  traffic: string;
  price: number;
  status: "active" | "pending" | "removed";
  addedDate: string;
}

const BacklinkMarket = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // Örnek veri
  const sites: Site[] = [
    {
      id: "1",
      url: "example1.com",
      da: 45,
      pa: 38,
      spamScore: 2,
      category: "Technology",
      language: "TR",
      traffic: "15K/ay",
      price: 100,
      status: "active",
      addedDate: "2024-01-15",
    },
    {
      id: "2",
      url: "example2.com",
      da: 35,
      pa: 28,
      spamScore: 1,
      category: "Business",
      language: "TR",
      traffic: "10K/ay",
      price: 75,
      status: "pending",
      addedDate: "2024-01-14",
    },
  ];

  const stats = {
    totalSites: sites.length,
    activeSites: sites.filter((s) => s.status === "active").length,
    averageDA: Math.round(
      sites.reduce((acc, site) => acc + site.da, 0) / sites.length,
    ),
    averagePrice: Math.round(
      sites.reduce((acc, site) => acc + site.price, 0) / sites.length,
    ),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Link Market Yönetimi</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Upload className="h-4 w-4" />
            Toplu Site Yükle
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
            <Plus className="h-4 w-4" />
            Yeni Site Ekle
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Site</h3>
          <p className="text-2xl font-bold text-white">{stats.totalSites}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Siteler</h3>
          <p className="text-2xl font-bold text-green-500">
            {stats.activeSites}
          </p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Ortalama DA</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.averageDA}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Ortalama Fiyat</h3>
          <p className="text-2xl font-bold text-purple-500">
            {stats.averagePrice} ₺
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#2a2b3d] p-4 border-0">
        <div className="flex gap-4">
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
              <SelectItem value="removed">Kaldırıldı</SelectItem>
            </SelectContent>
          </Select>
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
            <Download className="h-4 w-4" />
            Dışa Aktar
          </Button>
        </div>
      </Card>

      {/* Sites List */}
      <div className="space-y-4">
        {sites.map((site) => (
          <Card key={site.id} className="bg-[#2a2b3d] p-4 border-0">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{site.url}</h3>
                  <Badge
                    variant="outline"
                    className={`${
                      site.status === "active"
                        ? "bg-green-500"
                        : site.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } text-white border-0`}
                  >
                    {site.status === "active"
                      ? "Aktif"
                      : site.status === "pending"
                        ? "Beklemede"
                        : "Kaldırıldı"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                  <div>
                    <span>Kategori: </span>
                    <span className="text-white">{site.category}</span>
                  </div>
                  <div>
                    <span>Dil: </span>
                    <span className="text-white">{site.language}</span>
                  </div>
                  <div>
                    <span>Trafik: </span>
                    <span className="text-white">{site.traffic}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MetricsDisplay
                  metrics={{
                    da: site.da,
                    pa: site.pa,
                    spamScore: site.spamScore,
                  }}
                  size="sm"
                />
                <div className="text-right">
                  <p className="text-sm text-gray-400">Fiyat</p>
                  <p className="text-lg font-bold text-white">{site.price} ₺</p>
                </div>
                <div className="flex flex-col gap-2">
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
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bulk Upload Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Toplu Site Yükleme</DialogTitle>
            <DialogDescription>
              Excel veya CSV dosyası yükleyerek toplu site ekleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">
                Dosyayı sürükleyin veya seçin
              </p>
              <input type="file" className="hidden" accept=".xlsx,.csv" />
            </div>
            <div className="bg-yellow-600/20 p-4 rounded-md flex items-start gap-2 text-yellow-500">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Önemli Notlar:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Excel veya CSV formatında olmalıdır</li>
                  <li>Maksimum dosya boyutu: 5MB</li>
                  <li>Şablon formatına uygun olmalıdır</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                İptal
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Yükle ve Ekle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BacklinkMarket;
