import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Mail,
  Bell,
  Lock,
  Globe,
  Database,
  Palette,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AdminSettings = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Sistem Ayarları</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Mail className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">
              E-posta Ayarları
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Bildirim E-postaları</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Pazarlama E-postaları</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Güvenlik Bildirimleri</span>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Bell className="h-6 w-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">
              Bildirim Ayarları
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Masaüstü Bildirimleri</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Ses Bildirimleri</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tarayıcı Bildirimleri</span>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Lock className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-white">
              Güvenlik Ayarları
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">2FA Doğrulama</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">IP Kısıtlaması</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Oturum Kilidi</span>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Globe className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-white">Site Ayarları</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Bakım Modu</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Yeni Kayıtlar</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Site Önbelleği</span>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Database className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-white">
              Sistem Ayarları
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Otomatik Yedekleme</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Hata Günlüğü</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Performans Modu</span>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-6">
            <Palette className="h-6 w-6 text-pink-500" />
            <h3 className="text-lg font-semibold text-white">
              Görünüm Ayarları
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Karanlık Mod</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Animasyonlar</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Kompakt Mod</span>
              <Switch />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
