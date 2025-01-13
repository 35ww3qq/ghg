import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

const BacklinkSettings = () => {
  const [apiSettings, setApiSettings] = useState({
    apiUrl: localStorage.getItem("apiUrl") || "https://api.example.com",
    apiKey: localStorage.getItem("apiKey") || "",
    socketUrl: localStorage.getItem("socketUrl") || "wss://api.example.com",
  });

  const handleSaveSettings = () => {
    // API ayarlarını localStorage'a kaydet
    localStorage.setItem("apiUrl", apiSettings.apiUrl);
    localStorage.setItem("apiKey", apiSettings.apiKey);
    localStorage.setItem("socketUrl", apiSettings.socketUrl);

    alert(
      "Ayarlar kaydedildi! Değişikliklerin etkili olması için sayfayı yenileyin.",
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Sistem Ayarları</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* API Ayarları */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            API Ayarları
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 mb-2 block">API URL</label>
              <Input
                value={apiSettings.apiUrl}
                onChange={(e) =>
                  setApiSettings((prev) => ({
                    ...prev,
                    apiUrl: e.target.value,
                  }))
                }
                className="bg-[#1e1f2e] border-0"
                placeholder="https://api.example.com"
              />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">API Key</label>
              <Input
                type="password"
                value={apiSettings.apiKey}
                onChange={(e) =>
                  setApiSettings((prev) => ({
                    ...prev,
                    apiKey: e.target.value,
                  }))
                }
                className="bg-[#1e1f2e] border-0"
                placeholder="API Key girin"
              />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">WebSocket URL</label>
              <Input
                value={apiSettings.socketUrl}
                onChange={(e) =>
                  setApiSettings((prev) => ({
                    ...prev,
                    socketUrl: e.target.value,
                  }))
                }
                className="bg-[#1e1f2e] border-0"
                placeholder="wss://api.example.com"
              />
            </div>

            <div className="bg-yellow-600/20 p-4 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-500">
                API ayarlarını değiştirdikten sonra sayfayı yenilemeniz gerekir.
              </div>
            </div>

            <Button
              onClick={handleSaveSettings}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Ayarları Kaydet
            </Button>
          </div>
        </Card>

        {/* API Test Paneli */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            API Test Paneli
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">API Bağlantısı</span>
              <Badge
                variant="outline"
                className="bg-green-500 text-white border-0"
              >
                Bağlı
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">WebSocket Bağlantısı</span>
              <Badge
                variant="outline"
                className="bg-green-500 text-white border-0"
              >
                Bağlı
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Son İstek Durumu</span>
              <Badge
                variant="outline"
                className="bg-green-500 text-white border-0"
              >
                200 OK
              </Badge>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                // API bağlantısını test et
                fetch(apiSettings.apiUrl + "/health")
                  .then((res) => res.json())
                  .then(() => alert("API bağlantısı başarılı!"))
                  .catch(() => alert("API bağlantısı başarısız!"));
              }}
            >
              Bağlantıyı Test Et
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BacklinkSettings;
