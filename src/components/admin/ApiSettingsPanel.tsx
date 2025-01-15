import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import {
  Server,
  Database,
  Globe,
  Shield,
  Settings2,
  AlertCircle,
  RefreshCw,
  Gauge,
} from "lucide-react";

interface ApiSettings {
  apiUrl: string;
  apiKey: string;
  apiVersion: string;
  apiTimeout: number;
  apiRetries: number;
  apiRateLimit: number;
  apiCacheTimeout: number;
  sslEnabled: boolean;
  ipRestriction: boolean;
  securityLogs: boolean;
}

const ApiSettingsPanel = () => {
  const [settings, setSettings] = useState<ApiSettings>({
    apiUrl: import.meta.env.VITE_API_URL || "https://api.example.com",
    apiKey: "your-api-key-here",
    apiVersion: "v1",
    apiTimeout: 30000,
    apiRetries: 3,
    apiRateLimit: 100,
    apiCacheTimeout: 300,
    sslEnabled: true,
    ipRestriction: false,
    securityLogs: true,
  });

  const [loading, setLoading] = useState(false);
  const [healthStatus, setHealthStatus] = useState({
    latency: 45,
    uptime: 99.9,
    errors: 0.1,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Başarılı",
        description: "API ayarları güncellendi",
      });
    }, 1000);
  };

  const checkHealth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHealthStatus({
        latency: Math.floor(Math.random() * 100),
        uptime: 99.9,
        errors: Math.random(),
      });
      toast({
        title: "Sağlık Kontrolü",
        description: "API sağlık kontrolü tamamlandı",
      });
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Settings2 className="h-6 w-6 text-purple-500" />
          <h1 className="text-2xl font-bold text-white">API Yönetimi</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={checkHealth}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Sağlık Kontrolü
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleSave}
            disabled={loading}
          >
            Değişiklikleri Kaydet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <Gauge className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">API Latency</p>
              <p className="text-2xl font-bold text-white">
                {healthStatus.latency}ms
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <Server className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Uptime</p>
              <p className="text-2xl font-bold text-white">
                {healthStatus.uptime}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-500/20">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Error Rate</p>
              <p className="text-2xl font-bold text-white">
                {healthStatus.errors.toFixed(2)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Globe className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">
              Endpoint Ayarları
            </h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-400">API URL</label>
              <Input
                value={settings.apiUrl}
                onChange={(e) =>
                  setSettings({ ...settings, apiUrl: e.target.value })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">API Key</label>
              <Input
                type="password"
                value={settings.apiKey}
                onChange={(e) =>
                  setSettings({ ...settings, apiKey: e.target.value })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">API Version</label>
              <Input
                value={settings.apiVersion}
                onChange={(e) =>
                  setSettings({ ...settings, apiVersion: e.target.value })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-white">Güvenlik</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">SSL Doğrulama</p>
                <p className="text-sm text-gray-400">
                  SSL sertifikası kontrolü
                </p>
              </div>
              <Switch
                checked={settings.sslEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, sslEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">IP Kısıtlaması</p>
                <p className="text-sm text-gray-400">
                  Belirli IP aralıklarına izin ver
                </p>
              </div>
              <Switch
                checked={settings.ipRestriction}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, ipRestriction: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Güvenlik Logları</p>
                <p className="text-sm text-gray-400">API güvenlik logları</p>
              </div>
              <Switch
                checked={settings.securityLogs}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, securityLogs: checked })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Database className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">Cache Ayarları</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Cache Hit Rate</span>
                <span className="text-white">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Cache Timeout (sn)</label>
              <Input
                type="number"
                value={settings.apiCacheTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    apiCacheTimeout: parseInt(e.target.value),
                  })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Server className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-white">Rate Limiting</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Current Usage</span>
                <span className="text-white">45/100</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Rate Limit (istek/dk)</label>
              <Input
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    apiRateLimit: parseInt(e.target.value),
                  })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiSettingsPanel;
