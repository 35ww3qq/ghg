import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import {
  Database,
  Save,
  HardDrive,
  RefreshCw,
  AlertCircle,
  Download,
  Upload,
  Trash2,
} from "lucide-react";

interface StorageConfig {
  persistData: boolean;
  syncInterval: number;
  backupEnabled: boolean;
  encryptData: boolean;
  storageLocation: string;
  maxStorageSize: number;
}

const PersistentStorage = () => {
  const [config, setConfig] = useState<StorageConfig>({
    persistData: true,
    syncInterval: 5,
    backupEnabled: true,
    encryptData: true,
    storageLocation: localStorage.getItem("storageLocation") || "localStorage",
    maxStorageSize: 50,
  });

  const [storageStats, setStorageStats] = useState({
    used: 0,
    total: 100,
    lastSync: new Date().toISOString(),
    lastBackup: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ayarları localStorage'dan yükle
    const savedConfig = localStorage.getItem("storageConfig");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }

    // Storage kullanımını hesapla
    calculateStorageUsage();
  }, []);

  const calculateStorageUsage = () => {
    try {
      let totalSize = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length * 2; // UTF-16
        }
      }
      setStorageStats((prev) => ({
        ...prev,
        used: Math.round((totalSize / 1024 / 1024) * 100) / 100, // MB
      }));
    } catch (error) {
      console.error("Storage calculation error:", error);
    }
  };

  const handleSaveConfig = () => {
    setLoading(true);
    try {
      localStorage.setItem("storageConfig", JSON.stringify(config));
      localStorage.setItem("storageLocation", config.storageLocation);
      toast({
        title: "Başarılı",
        description: "Depolama ayarları kaydedildi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilemedi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackup = () => {
    setLoading(true);
    try {
      const data = {
        config,
        storage: { ...localStorage },
        timestamp: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStorageStats((prev) => ({
        ...prev,
        lastBackup: new Date().toISOString(),
      }));

      toast({
        title: "Başarılı",
        description: "Yedek dosyası oluşturuldu",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Yedek oluşturulamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearStorage = () => {
    if (confirm("Tüm depolama verilerini silmek istediğinize emin misiniz?")) {
      try {
        localStorage.clear();
        calculateStorageUsage();
        toast({
          title: "Başarılı",
          description: "Tüm veriler silindi",
        });
      } catch (error) {
        toast({
          title: "Hata",
          description: "Veriler silinemedi",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-purple-500" />
          <h1 className="text-2xl font-bold text-white">Depolama Yönetimi</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleBackup}
            disabled={loading}
          >
            <Download className="h-4 w-4" />
            Yedekle
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 gap-2"
            onClick={handleSaveConfig}
            disabled={loading}
          >
            <Save className="h-4 w-4" />
            Kaydet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <HardDrive className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Kullanılan Alan</p>
              <p className="text-2xl font-bold text-white">
                {storageStats.used} MB
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <RefreshCw className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Son Senkronizasyon</p>
              <p className="text-sm text-white">
                {new Date(storageStats.lastSync).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Download className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Son Yedekleme</p>
              <p className="text-sm text-white">
                {new Date(storageStats.lastBackup).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-6">
            Depolama Ayarları
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Veri Kalıcılığı</p>
                <p className="text-sm text-gray-400">
                  Verileri yerel depolamada sakla
                </p>
              </div>
              <Switch
                checked={config.persistData}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, persistData: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">
                Senkronizasyon Aralığı (dk)
              </label>
              <Input
                type="number"
                value={config.syncInterval}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    syncInterval: parseInt(e.target.value),
                  })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Otomatik Yedekleme</p>
                <p className="text-sm text-gray-400">Günlük yedek al</p>
              </div>
              <Switch
                checked={config.backupEnabled}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, backupEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Veri Şifreleme</p>
                <p className="text-sm text-gray-400">Hassas verileri şifrele</p>
              </div>
              <Switch
                checked={config.encryptData}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, encryptData: checked })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-6">
            Depolama Durumu
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Depolama Kullanımı</span>
                <span className="text-white">
                  {storageStats.used}/{config.maxStorageSize} MB
                </span>
              </div>
              <Progress
                value={(storageStats.used / config.maxStorageSize) * 100}
                className="h-2"
              />
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full gap-2 text-yellow-500 hover:text-yellow-400"
                onClick={() => {
                  calculateStorageUsage();
                  toast({
                    title: "Başarılı",
                    description: "Depolama kullanımı güncellendi",
                  });
                }}
              >
                <RefreshCw className="h-4 w-4" />
                Kullanımı Hesapla
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2 text-red-500 hover:text-red-400"
                onClick={handleClearStorage}
              >
                <Trash2 className="h-4 w-4" />
                Tüm Verileri Temizle
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-yellow-600/20 border-0 p-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Veri kalıcılığı ayarlarını değiştirmeden önce mevcut verilerinizi
            yedeklemeniz önerilir.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PersistentStorage;
