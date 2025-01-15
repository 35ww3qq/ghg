import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { backlinkApi } from "@/services/api";
import { MetricsDisplay } from "@/components/shared/MetricsDisplay";
import {
  Search,
  Filter,
  ExternalLink,
  Edit2,
  Trash2,
  AlertCircle,
  RefreshCw,
  ArrowUpDown,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Backlink {
  id: string;
  targetUrl: string;
  keyword: string;
  addedSite: string;
  da: number;
  pa: number;
  spamScore: number;
  status: "active" | "pending" | "removed";
  indexStatus: "indexed" | "pending" | "failed";
  addedDate: string;
  expiryDate: string;
  lastChecked: string;
}

const MyLinks = () => {
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBacklinks = async () => {
    try {
      setLoading(true);
      const data = await backlinkApi.getAllBacklinks();
      setBacklinks(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Backlinkler alınamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBacklinks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await backlinkApi.deleteBacklink(id);
      await fetchBacklinks(); // Listeyi yenile
      toast({
        title: "Başarılı",
        description: "Backlink silindi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Backlink silinemedi",
        variant: "destructive",
      });
    }
  };

  const handleCheckStatus = async (id: string) => {
    try {
      await backlinkApi.checkStatus(id);
      await fetchBacklinks(); // Listeyi yenile
      toast({
        title: "Başarılı",
        description: "Durum kontrolü tamamlandı",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Durum kontrolü başarısız",
        variant: "destructive",
      });
    }
  };

  // İstatistikler
  const stats = {
    total: backlinks.length,
    active: backlinks.filter((b) => b.status === "active").length,
    pending: backlinks.filter((b) => b.status === "pending").length,
    indexed: backlinks.filter((b) => b.indexStatus === "indexed").length,
  };

  // Arama filtrelemesi
  const filteredBacklinks = backlinks.filter(
    (backlink) =>
      backlink.targetUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backlink.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backlink.addedSite.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Backlinklerim</h1>
        <Button
          className="bg-purple-600 hover:bg-purple-700 gap-2"
          onClick={fetchBacklinks}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Tümünü Kontrol Et
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Backlink</h3>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Linkler</h3>
          <p className="text-2xl font-bold text-green-500">{stats.active}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bekleyen Linkler</h3>
          <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">İndexlenen</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.indexed}</p>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] p-4 border-0">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Backlink ara..."
              className="pl-10 bg-[#1e1f2e] border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredBacklinks.map((backlink) => (
          <Card key={backlink.id} className="bg-[#2a2b3d] p-4 border-0">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">
                    {backlink.addedSite}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`${
                      backlink.status === "active"
                        ? "bg-green-500"
                        : backlink.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } text-white border-0`}
                  >
                    {backlink.status === "active"
                      ? "Aktif"
                      : backlink.status === "pending"
                        ? "Beklemede"
                        : "Kaldırıldı"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${
                      backlink.indexStatus === "indexed"
                        ? "bg-blue-500"
                        : backlink.indexStatus === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } text-white border-0`}
                  >
                    {backlink.indexStatus === "indexed"
                      ? "İndexlendi"
                      : backlink.indexStatus === "pending"
                        ? "İndexleniyor"
                        : "İndexlenmedi"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span>{backlink.targetUrl}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>{backlink.keyword}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MetricsDisplay
                  metrics={{
                    da: backlink.da,
                    pa: backlink.pa,
                    spamScore: backlink.spamScore,
                  }}
                  size="sm"
                />
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
                    onClick={() => handleDelete(backlink.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Eklenme: {backlink.addedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Bitiş: {backlink.expiryDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Son Kontrol:</span>
                <span className="text-white">{backlink.lastChecked}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={() => handleCheckStatus(backlink.id)}
                >
                  <RefreshCw className="h-3 w-3" />
                  Kontrol Et
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyLinks;
