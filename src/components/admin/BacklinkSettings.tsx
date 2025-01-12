import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BacklinkSettings = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Backlink Ayarları</h1>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Genel Ayarlar
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 mb-2 block">API URL</label>
              <Input
                defaultValue="https://api.example.com/backlinks"
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">
                Cache Süresi (saat)
              </label>
              <Input
                type="number"
                defaultValue="1"
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">
                Maksimum Link/Yazı
              </label>
              <Input
                type="number"
                defaultValue="5"
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">
                Link Yerleşim Pozisyonu
              </label>
              <Select defaultValue="random">
                <SelectTrigger className="bg-[#1e1f2e] border-0">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Başlangıç</SelectItem>
                  <SelectItem value="middle">Orta</SelectItem>
                  <SelectItem value="end">Son</SelectItem>
                  <SelectItem value="random">Rastgele</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Gelişmiş Ayarlar
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Debug Modu</span>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">SSL Doğrulama</span>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tıklama Takibi</span>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Otomatik İndexleme</span>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">IP Takibi</span>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Metrik Toplama</span>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            SEO Ayarları
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 mb-2 block">Minimum DA</label>
              <Input
                type="number"
                defaultValue="20"
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">Minimum PA</label>
              <Input
                type="number"
                defaultValue="15"
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">
                Maksimum Spam Score
              </label>
              <Input
                type="number"
                defaultValue="3"
                className="bg-[#1e1f2e] border-0"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">nofollow Kullan</span>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Güvenlik Ayarları
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">XSS Koruması</span>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">CSRF Koruması</span>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Rate Limiting</span>
              <Switch defaultChecked />
            </div>

            <div>
              <label className="text-gray-400 mb-2 block">API Key</label>
              <Input
                type="password"
                defaultValue="your-api-key-here"
                className="bg-[#1e1f2e] border-0"
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Varsayılana Döndür</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Ayarları Kaydet
        </Button>
      </div>
    </div>
  );
};

export default BacklinkSettings;
