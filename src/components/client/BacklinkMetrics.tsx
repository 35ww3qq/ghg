import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { backlinkApi } from "@/services/api";
import {
  BarChart,
  TrendingUp,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react";

interface Metrics {
  da: number;
  pa: number;
  spamScore: number;
  indexRate: number;
  successRate: number;
}

const BacklinkMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await backlinkApi.getMetrics();
      setMetrics(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Metrikler alınamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Backlink Metrikleri
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={fetchMetrics}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Yenile
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <BarChart className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Domain Authority</p>
              <p className="text-2xl font-bold text-white">{metrics.da}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Page Authority</p>
              <p className="text-2xl font-bold text-white">{metrics.pa}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-500/20">
              <LinkIcon className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Spam Score</p>
              <p className="text-2xl font-bold text-white">
                {metrics.spamScore}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">İndexlenme Oranı</span>
              <Badge
                variant="outline"
                className="bg-green-500 text-white border-0"
              >
                {metrics.indexRate}%
              </Badge>
            </div>
            <Progress value={metrics.indexRate} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Başarı Oranı</span>
              <Badge
                variant="outline"
                className="bg-purple-500 text-white border-0"
              >
                {metrics.successRate}%
              </Badge>
            </div>
            <Progress value={metrics.successRate} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BacklinkMetrics;
