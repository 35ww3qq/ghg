import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { adminApi } from "@/services/api";
import {
  Server,
  Database,
  Cpu,
  HardDrive,
  RefreshCw,
  AlertCircle,
  CircuitBoard,
} from "lucide-react";

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  dbConnections: number;
  cacheHitRate: number;
  apiLatency: number;
}

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getSystemMetrics();
      setMetrics(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Sistem metrikleri alınamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Her 30 saniyede bir güncelle
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Sistem Monitörü</h2>
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
              <Cpu className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">CPU Kullanımı</p>
              <p className="text-2xl font-bold text-white">{metrics.cpu}%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <CircuitBoard className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bellek Kullanımı</p>
              <p className="text-2xl font-bold text-white">{metrics.memory}%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <HardDrive className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Disk Kullanımı</p>
              <p className="text-2xl font-bold text-white">{metrics.disk}%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Database Bağlantıları</span>
              <Badge
                variant="outline"
                className={`${
                  metrics.dbConnections < 80
                    ? "bg-green-500"
                    : metrics.dbConnections < 90
                      ? "bg-yellow-500"
                      : "bg-red-500"
                } text-white border-0`}
              >
                {metrics.dbConnections}/100
              </Badge>
            </div>
            <Progress value={metrics.dbConnections} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Cache Hit Rate</span>
              <Badge
                variant="outline"
                className="bg-blue-500 text-white border-0"
              >
                {metrics.cacheHitRate}%
              </Badge>
            </div>
            <Progress value={metrics.cacheHitRate} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">API Latency</span>
              <Badge
                variant="outline"
                className={`${
                  metrics.apiLatency < 100
                    ? "bg-green-500"
                    : metrics.apiLatency < 300
                      ? "bg-yellow-500"
                      : "bg-red-500"
                } text-white border-0`}
              >
                {metrics.apiLatency}ms
              </Badge>
            </div>
            <Progress
              value={100 - (metrics.apiLatency / 500) * 100}
              className="h-2"
            />
          </div>
        </div>
      </Card>

      {metrics.cpu > 80 || metrics.memory > 80 || metrics.disk > 80 ? (
        <Card className="bg-red-500/20 border-0 p-4">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>
              Sistem kaynaklarında yüksek kullanım tespit edildi. Lütfen kontrol
              edin.
            </p>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default SystemMonitor;
