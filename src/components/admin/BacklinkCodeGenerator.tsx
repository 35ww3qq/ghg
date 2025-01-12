import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Code2 } from "lucide-react";

interface BacklinkCodeGeneratorProps {
  apiUrl?: string;
}

const BacklinkCodeGenerator = ({
  apiUrl = "https://batuna.vn/kj/panel/api/client-backlinks.php",
}: BacklinkCodeGeneratorProps) => {
  const phpCode = `<?php
// Backlink sistemi
$domain = $_SERVER['HTTP_HOST'];
$domain = preg_replace('/^www\./', '', strtolower(trim($domain)));
$backlink_url = '${apiUrl}?site=' . urlencode($domain);

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
    echo $response;
}
?>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="bg-[#2a2b3d] p-6 border-0">
      <div className="flex items-center gap-4 mb-6">
        <Code2 className="h-6 w-6 text-purple-500" />
        <h3 className="text-lg font-semibold text-white">Entegrasyon Kodu</h3>
      </div>

      <div className="relative">
        <pre className="bg-[#1e1f2e] p-4 rounded-md overflow-x-auto text-white">
          <code>{phpCode}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 hover:bg-purple-500/20 hover:text-purple-500"
          onClick={() => copyToClipboard(phpCode)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 space-y-2 text-gray-400">
        <p>📌 PHP kodunu WordPress temanızın functions.php dosyasına ekleyin</p>
        <p>📌 Kod otomatik olarak backlinkleri ekler ve yönetir</p>
        <p>📌 SSL sertifikası kontrolü devre dışı bırakıldı</p>
        <p>📌 5 saniyelik timeout süresi ayarlandı</p>
      </div>
    </Card>
  );
};

export default BacklinkCodeGenerator;
