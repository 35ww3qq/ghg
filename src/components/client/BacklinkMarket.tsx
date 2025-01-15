import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { marketApi } from "@/services/api";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Domain {
  id: string;
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

const BacklinkMarket = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [targetUrl, setTargetUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDomains = async () => {
    try {
      setLoading(true);
      const data = await marketApi.getAvailableLinks();
      setDomains(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Domainler alınamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const handlePurchase = async () => {
    if (!selectedDomain || !targetUrl || !keyword) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun",
        variant: "destructive",
      });
      return;
    }

    try {
      await marketApi.purchase({
        domainId: selectedDomain.id,
        targetUrl,
        keyword,
      });
      setSelectedDomain(null);
      setTargetUrl("");
      setKeyword("");
      toast({
        title: "Başarılı",
        description: "Backlink satın alma işlemi tamamlandı",
      });
      fetchDomains(); // Listeyi yenile
    } catch (error) {
      toast({
        title: "Hata",
        description: "Satın alma işlemi başarısız",
        variant: "destructive",
      });
    }
  };

  // Arama filtrelemesi
  const filteredDomains = domains.filter((domain) =>
    domain.url.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
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

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Domain ara..."
              className="pl-10 bg-[#1e1f2e] border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtreler
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredDomains.map((domain) => (
            <Card key={domain.id} className="bg-[#1e1f2e] p-4 border-0">
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
                  onClick={() => window.open(`https://${domain.url}`, "_blank")}
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
      </Card>

      <Dialog
        open={!!selectedDomain}
        onOpenChange={() => setSelectedDomain(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backlink Satın Al</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Hedef URL</label>
              <Input
                placeholder="https://example.com/page"
                className="bg-[#1e1f2e] border-0"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Anahtar Kelime</label>
              <Input
                placeholder="SEO, Web Tasarım vb."
                className="bg-[#1e1f2e] border-0"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center p-4 bg-[#1e1f2e] rounded-md">
              <span className="text-gray-400">Toplam Kredi:</span>
              <div className="flex items-center gap-1 text-white font-bold">
                <span>🪙</span>
                <span>{selectedDomain?.credits}</span>
              </div>
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={handlePurchase}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Satın Al ve Ekle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BacklinkMarket;
