import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Code2, Plus } from "lucide-react";
import { generateSiteId } from "@/lib/utils";
import { useBacklinks } from "@/hooks/useBacklinks";

interface BacklinkCodeGeneratorProps {
  apiUrl?: string;
}

const BacklinkCodeGenerator = ({
  apiUrl = "https://api.example.com/backlinks",
}: BacklinkCodeGeneratorProps) => {
  const [domain, setDomain] = useState("");
  const { createBacklink } = useBacklinks();

  const handleAddSite = async () => {
    try {
      const siteId = generateSiteId();

      // Yeni siteyi backlink sistemine ekle
      await createBacklink({
        url: domain,
        siteId: siteId,
        status: "pending",
      });

      // PHP kodunu oluştur
      const phpCode = generatePhpCode(siteId);

      // Kodu panoya kopyala
      copyToClipboard(phpCode);

      alert(
        `Site başarıyla eklendi! Site ID: ${siteId}\nPHP kodu panoya kopyalandı.`,
      );
      setDomain("");
    } catch (error) {
      alert("Site eklenirken bir hata oluştu!");
    }
  };

  const generatePhpCode = (siteId: string) => {
    return `<?php
// Backlink sistemi
$domain = $_SERVER['HTTP_HOST'];
$domain = preg_replace('/^www\./', '', strtolower(trim($domain)));

// Panel URL ve Site ID
$panel_url = '${apiUrl}';
$site_id = '${siteId}'; // Otomatik oluşturulan benzersiz site ID

// API'den backlink verilerini al
$backlink_url = $panel_url . '/fetch-backlinks?domain=' . urlencode($domain) . '&site_id=' . urlencode($site_id);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $backlink_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$response = curl_exec($ch);
curl_close($ch);

if ($response) {
    // Backlink HTML'ini ekrana yazdır
    echo $response;
}
?>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Code2 className="h-6 w-6 text-purple-500" />
        <h1 className="text-2xl font-bold text-white">Backlink Kodu</h1>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <label className="text-gray-400">Site Domain</label>
            <div className="flex gap-2">
              <Input
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="bg-[#1e1f2e] border-0"
              />
              <Button
                onClick={handleAddSite}
                className="bg-purple-600 hover:bg-purple-700 gap-2"
              >
                <Plus className="h-4 w-4" />
                Site Ekle
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-gray-400">
          <p>📌 Kurulum Adımları:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Domain adını girin ve "Site Ekle" butonuna tıklayın</li>
            <li>Sistem otomatik olarak bir Site ID oluşturacak</li>
            <li>Oluşturulan PHP kodunu kopyalayın</li>
            <li>
              Kodu sitenizin header.php veya footer.php dosyasına yapıştırın
            </li>
            <li>Site otomatik olarak panelde görünecektir</li>
          </ol>
        </div>
      </Card>
    </div>
  );
};

export default BacklinkCodeGenerator;
