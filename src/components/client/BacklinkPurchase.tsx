import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { MetricsDisplay } from "@/components/shared/MetricsDisplay";
import {
  Search,
  Filter,
  ExternalLink,
  Info,
  AlertCircle,
  ShoppingCart,
  Zap,
  ArrowUpDown,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Domain {
  url: string;
  da: number;
  pa: number;
  spamScore: number;
  category: string;
  language: string;
  traffic: string;
  credits: number;
  isNew?: boolean;
  isPopular?: boolean;
}

const BacklinkPurchase = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [filters, setFilters] = useState({
    minDA: 20,
    minPA: 15,
    maxSpamScore: 3,
    category: "all",
    language: "all",
  });

  // Örnek domain listesi
  const domains: Domain[] = [
    {
      url: "example1.com",
      da: 45,
      pa: 38,
      spamScore: 2,
      category: "Technology",
      language: "TR",
      traffic: "15K/ay",
      credits: 100,
      isNew: true,
    },
    {
      url: "example2.com",
      da: 35,
      pa: 28,
      spamScore: 1,
      category: "Business",
      language: "TR",
      traffic: "10K/ay",
      credits: 75,
      isPopular: true,
    },
    // ... daha fazla domain
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Link Market</h1>
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

      {/* Filters */}
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
            Filtreler
          </Button>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Min. DA</label>
            <Slider
              value={[filters.minDA]}
              onValueChange={(value) =>
                setFilters({ ...filters, minDA: value[0] })
              }
              max={100}
              step={1}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Min. PA</label>
            <Slider
              value={[filters.minPA]}
              onValueChange={(value) =>
                setFilters({ ...filters, minPA: value[0] })
              }
              max={100}
              step={1}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Max. Spam Score
            </label>
            <Slider
              value={[filters.maxSpamScore]}
              onValueChange={(value) =>
                setFilters({ ...filters, maxSpamScore: value[0] })
              }
              max={10}
              step={1}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Sadece Yeni Domainler</span>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Domain Grid */}
      <div className="grid grid-cols-3 gap-4">
        {domains.map((domain, index) => (
          <Card key={index} className="bg-[#1e1f2e] p-4 border-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{domain.url}</h3>
                  {domain.isNew && (
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-white border-0"
                    >
                      Yeni
                    </Badge>
                  )}
                  {domain.isPopular && (
                    <Badge
                      variant="outline"
                      className="bg-purple-500 text-white border-0"
                    >
                      Popüler
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-purple-500/20 hover:text-purple-500"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <MetricsDisplay
              metrics={{
                da: domain.da,
                pa: domain.pa,
                spamScore: domain.spamScore,
              }}
              size="sm"
            />

            <div className="grid grid-cols-2 gap-2 text-sm mt-4">
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

            <Button
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => setSelectedDomain(domain)}
            >
              Satın Al
            </Button>
          </Card>
        ))}
      </div>

      {/* Purchase Dialog */}
      {selectedDomain && (
        <Dialog
          open={!!selectedDomain}
          onOpenChange={() => setSelectedDomain(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Backlink Satın Al</DialogTitle>
              <DialogDescription>
                {selectedDomain.url} sitesi için backlink satın alma işlemini
                onaylayın.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Hedef URL"
                className="bg-[#1e1f2e] border-0"
              />
              <Input
                placeholder="Anahtar Kelime"
                className="bg-[#1e1f2e] border-0"
              />
              <div className="flex justify-between items-center p-4 bg-[#1e1f2e] rounded-md">
                <span className="text-gray-400">Toplam Kredi:</span>
                <div className="flex items-center gap-1 text-white font-bold">
                  <span>🪙</span>
                  <span>{selectedDomain.credits}</span>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Satın Al ve Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BacklinkPurchase;
