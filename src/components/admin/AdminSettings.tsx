import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Server, Shield, Settings2, Globe } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // API Settings
    apiUrl: import.meta.env.VITE_API_URL || "https://api.example.com",
    apiKey: "your-api-key-here",
    apiVersion: "v1",
    apiTimeout: 30000,
    apiRetries: 3,
    apiRateLimit: 100,
    apiCacheTimeout: 300,
    // API Endpoints
    authEndpoint: "/auth",
    backlinkEndpoint: "/backlinks",
    marketEndpoint: "/market",
    adminEndpoint: "/admin",
    // API Headers
    apiHeaders: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // API Security
    sslEnabled: true,
    ipRestriction: false,
    securityLogs: true,
  });

  const handleSave = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    toast({
      title: "Başarılı",
      description: "API ayarları kaydedildi",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">API Ayarları</h1>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleSave}
        >
          Değişiklikleri Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* API Settings */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Server className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">
              API Bağlantı Ayarları
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

        {/* API Endpoints */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Globe className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-white">API Endpoints</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-400">Auth Endpoint</label>
              <Input
                value={settings.authEndpoint}
                onChange={(e) =>
                  setSettings({ ...settings, authEndpoint: e.target.value })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Backlink Endpoint</label>
              <Input
                value={settings.backlinkEndpoint}
                onChange={(e) =>
                  setSettings({ ...settings, backlinkEndpoint: e.target.value })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Market Endpoint</label>
              <Input
                value={settings.marketEndpoint}
                onChange={(e) =>
                  setSettings({ ...settings, marketEndpoint: e.target.value })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Admin Endpoint</label>
              <Input
                value={settings.adminEndpoint}
                onChange={(e) =>
                  setSettings({ ...settings, adminEndpoint: e.target.value })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>
          </div>
        </Card>

        {/* API Performance */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Settings2 className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">API Performans</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-400">API Timeout (ms)</label>
              <Input
                type="number"
                value={settings.apiTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    apiTimeout: parseInt(e.target.value),
                  })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">API Retries</label>
              <Input
                type="number"
                value={settings.apiRetries}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    apiRetries: parseInt(e.target.value),
                  })
                }
                className="bg-[#1e1f2e] border-0"
              />
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

        {/* API Security */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-white">API Güvenlik</h3>
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
      </div>
    </div>
  );
};

export default AdminSettings;
