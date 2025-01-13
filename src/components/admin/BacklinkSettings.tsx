import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  AlertCircle,
  Zap,
  Shield,
  Settings2,
  Globe2,
  Database,
  Server,
  Gauge,
} from "lucide-react";

const BacklinkSettings = () => {
  const [settings, setSettings] = useState({
    minDA: 20,
    minPA: 15,
    maxSpamScore: 3,
    autoIndex: true,
    autoRenew: false,
    notifyExpiry: true,
    notifyIndexing: true,
    apiRateLimit: 100,
    cacheTimeout: 30,
  });

  const handleSaveSettings = () => {
    // API ayarlarını kaydet
    alert("Ayarlar başarıyla kaydedildi!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Backlink Ayarları</h1>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleSaveSettings}
        >
          Değişiklikleri Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Metrik Ayarları */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Gauge className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">
              Metrik Ayarları
            </h3>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Minimum DA</span>
                <span className="text-white">{settings.minDA}</span>
              </div>
              <Slider
                value={[settings.minDA]}
                onValueChange={(value) =>
                  setSettings({ ...settings, minDA: value[0] })
                }
                max={100}
                step={1}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Minimum PA</span>
                <span className="text-white">{settings.minPA}</span>
              </div>
              <Slider
                value={[settings.minPA]}
                onValueChange={(value) =>
                  setSettings({ ...settings, minPA: value[0] })
                }
                max={100}
                step={1}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Maksimum Spam Score</span>
                <span className="text-white">{settings.maxSpamScore}</span>
              </div>
              <Slider
                value={[settings.maxSpamScore]}
                onValueChange={(value) =>
                  setSettings({ ...settings, maxSpamScore: value[0] })
                }
                max={10}
                step={1}
              />
            </div>
          </div>
        </Card>

        {/* Otomatik İşlemler */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Zap className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-white">
              Otomatik İşlemler
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Otomatik İndexleme</p>
                <p className="text-sm text-gray-400">
                  Yeni backlinkleri otomatik indexle
                </p>
              </div>
              <Switch
                checked={settings.autoIndex}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoIndex: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Otomatik Yenileme</p>
                <p className="text-sm text-gray-400">
                  Süresi biten backlinkleri otomatik yenile
                </p>
              </div>
              <Switch
                checked={settings.autoRenew}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoRenew: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Sona Erme Bildirimi</p>
                <p className="text-sm text-gray-400">
                  Backlink süresi dolmadan bildirim gönder
                </p>
              </div>
              <Switch
                checked={settings.notifyExpiry}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, notifyExpiry: checked })
                }
              />
            </div>
          </div>
        </Card>

        {/* API Ayarları */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Server className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">API Ayarları</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 mb-2 block">
                API Rate Limit (istek/dk)
              </label>
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

            <div>
              <label className="text-gray-400 mb-2 block">
                Cache Timeout (dk)
              </label>
              <Input
                type="number"
                value={settings.cacheTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    cacheTimeout: parseInt(e.target.value),
                  })
                }
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="bg-blue-500/10 p-4 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-500">
                API rate limit değişiklikleri sistem performansını
                etkileyebilir.
              </p>
            </div>
          </div>
        </Card>

        {/* Güvenlik Ayarları */}
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-white">
              Güvenlik Ayarları
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">SSL Doğrulama</p>
                <p className="text-sm text-gray-400">
                  Backlink sitelerinde SSL kontrolü
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">IP Kısıtlaması</p>
                <p className="text-sm text-gray-400">
                  Belirli IP aralıklarına izin ver
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Güvenlik Logları</p>
                <p className="text-sm text-gray-400">
                  Detaylı güvenlik logları tut
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </div>

      {/* Uyarı */}
      <Card className="bg-yellow-600/20 border-0 p-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Ayarları değiştirdikten sonra değişikliklerin etkili olması için
            sistemi yeniden başlatmanız gerekebilir.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BacklinkSettings;
