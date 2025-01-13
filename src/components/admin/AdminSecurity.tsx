import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  AlertTriangle,
  UserCheck,
  Lock,
  Key,
  Fingerprint,
  Globe,
  AlertCircle,
  RefreshCw,
  LogOut,
} from "lucide-react";

const AdminSecurity = () => {
  const [securityScore, setSecurityScore] = useState(85);

  const activeSessions = [
    {
      device: "Chrome - Windows 10",
      ip: "192.168.1.1",
      location: "İstanbul, TR",
      lastActive: "Şimdi",
    },
    {
      device: "Safari - MacOS",
      ip: "192.168.1.2",
      location: "Ankara, TR",
      lastActive: "5 dk önce",
    },
  ];

  const securityEvents = [
    {
      event: "Başarısız Giriş Denemesi",
      time: "10 dakika önce",
      ip: "192.168.1.1",
      status: "blocked",
    },
    {
      event: "Yeni Cihaz Girişi",
      time: "1 saat önce",
      ip: "192.168.1.2",
      status: "approved",
    },
    {
      event: "Şüpheli Aktivite",
      time: "2 saat önce",
      ip: "192.168.1.3",
      status: "investigating",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Güvenlik Yönetimi</h1>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Güvenlik Taraması
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Güvenlik Skoru</h3>
          <p className="text-2xl font-bold text-green-500">
            {securityScore}/100
          </p>
          <Progress value={securityScore} className="mt-2 h-2" />
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Oturumlar</h3>
          <p className="text-2xl font-bold text-white">3</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Son Giriş</h3>
          <p className="text-2xl font-bold text-white">2 dk önce</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Başarısız Girişler</h3>
          <p className="text-2xl font-bold text-red-500">12</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Güvenlik Durumu
            </h3>
            <Shield className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">İki Faktörlü Doğrulama</p>
                <p className="text-sm text-gray-400">
                  Google Authenticator ile
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Güvenli Oturum</p>
                <p className="text-sm text-gray-400">
                  30 dakika sonra otomatik çıkış
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">IP Kısıtlaması</p>
                <p className="text-sm text-gray-400">
                  Belirli IP'lerden erişime izin ver
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Güvenlik Bildirimleri</p>
                <p className="text-sm text-gray-400">
                  E-posta ve SMS ile bildirim
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Son Güvenlik Olayları
            </h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {securityEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{event.event}</p>
                  <p className="text-sm text-gray-400">
                    {event.time} - {event.ip}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    event.status === "blocked"
                      ? "bg-red-500"
                      : event.status === "approved"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                  } text-white border-0`}
                >
                  {event.status === "blocked"
                    ? "Engellendi"
                    : event.status === "approved"
                      ? "Onaylandı"
                      : "İnceleniyor"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Aktif Oturumlar
            </h3>
            <UserCheck className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {activeSessions.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-700"
              >
                <div>
                  <p className="text-white">{session.device}</p>
                  <p className="text-sm text-gray-400">
                    {session.ip} - {session.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {session.lastActive}
                  </span>
                  <Button variant="destructive" size="sm">
                    Oturumu Kapat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Güvenlik Ayarları
            </h3>
            <Lock className="h-5 w-5 text-purple-500" />
          </div>
          <div className="space-y-4">
            <Button className="w-full justify-start gap-2" variant="outline">
              <Key className="h-4 w-4" />
              Şifre Değiştir
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Fingerprint className="h-4 w-4" />
              2FA Ayarları
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Globe className="h-4 w-4" />
              IP Kısıtlamaları
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Shield className="h-4 w-4" />
              Güvenlik Logları
            </Button>
          </div>
        </Card>
      </div>

      <Card className="bg-yellow-600/20 border-0 p-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>
            Son güvenlik taraması 3 gün önce yapıldı. Düzenli güvenlik
            taramaları için otomatik taramayı aktifleştirin.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminSecurity;
