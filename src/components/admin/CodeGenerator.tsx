import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code2, Copy, Download, CheckCircle, AlertCircle } from "lucide-react";
import { generateSiteId } from "@/lib/utils";

const CodeGenerator = () => {
  const [domain, setDomain] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("php");

  const generateCode = (
    language: string,
    siteId: string = generateSiteId(),
  ) => {
    const codes = {
      php: `<?php
// Backlink sistemi entegrasyonu
$domain = $_SERVER['HTTP_HOST'];
$domain = preg_replace('/^www\./', '', strtolower(trim($domain)));

// Panel URL ve Site ID
$panel_url = '${settings.apiUrl}';
$site_id = '${siteId}'; // Otomatik oluşturulan benzersiz site ID
$api_key = '${settings.apiKey}'; // API Key

// API'den backlink verilerini al
$backlink_url = $panel_url . '/backlinks/fetch?domain=' . urlencode($domain) . '&site_id=' . urlencode($site_id);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $backlink_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $api_key,
    'Accept: application/json'
));

$response = curl_exec($ch);
curl_close($ch);

if ($response) {
    echo $response;
}
?>`,
      javascript: `<!-- Backlink sistemi entegrasyonu -->
<script>
  (function() {
    const domain = window.location.hostname.replace('www.', '');
    const siteId = '${siteId}'; // Otomatik oluşturulan benzersiz site ID
    const apiKey = '${settings.apiKey}'; // API Key
    const panelUrl = '${settings.apiUrl}';

    fetch(\`\${panelUrl}/backlinks/fetch?domain=\${domain}&site_id=\${siteId}\`, {
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Accept': 'application/json'
      }
    })
      .then(response => response.text())
      .then(html => {
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);
      })
      .catch(error => console.error('Backlink yükleme hatası:', error));
  })();
</script>`,
      html: `<!-- Backlink sistemi entegrasyonu -->
<div id="backlink-container" data-site-id="${siteId}" data-api-key="${settings.apiKey}">
  <script src="${settings.apiUrl}/backlinks/loader.js" async></script>
</div>`,
    };

    return codes[language as keyof typeof codes] || "";
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = (code: string, language: string) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backlink-integration.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Code2 className="h-6 w-6 text-purple-500" />
        <h1 className="text-2xl font-bold text-white">Entegrasyon Kodları</h1>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-400">Site Domain</label>
            <div className="flex gap-2">
              <Input
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="bg-[#1e1f2e] border-0"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                <CheckCircle className="h-4 w-4" />
                Doğrula ve Oluştur
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="php"
            className="w-full"
            onValueChange={setSelectedLanguage}
          >
            <TabsList className="bg-[#1e1f2e] border-b border-gray-700">
              <TabsTrigger value="php">PHP</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
            </TabsList>

            {["php", "javascript", "html"].map((lang) => (
              <TabsContent key={lang} value={lang} className="mt-4">
                <div className="relative">
                  <pre className="bg-[#1e1f2e] p-4 rounded-md overflow-x-auto">
                    <code className="text-white text-sm font-mono">
                      {generateCode(lang)}
                    </code>
                  </pre>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-purple-500/20 hover:text-purple-500"
                      onClick={() => handleCopyCode(generateCode(lang))}
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-purple-500/20 hover:text-purple-500"
                      onClick={() =>
                        handleDownloadCode(generateCode(lang), lang)
                      }
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Kurulum Adımları
            </h3>
            <div className="space-y-2">
              <p className="text-gray-400">
                1. Domain adını girin ve doğrulayın
              </p>
              <p className="text-gray-400">
                2. Tercih ettiğiniz entegrasyon yöntemini seçin
              </p>
              <p className="text-gray-400">3. Kodu sitenize ekleyin:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>PHP: header.php veya footer.php dosyasına ekleyin</li>
                <li>
                  JavaScript: &lt;head&gt; veya &lt;body&gt; tagları arasına
                  ekleyin
                </li>
                <li>HTML: Sayfanızda istediğiniz yere ekleyin</li>
              </ul>
            </div>

            <div className="bg-yellow-600/20 p-4 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-yellow-500">
                <p className="font-medium">Önemli Notlar:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Her site için benzersiz bir Site ID oluşturulur</li>
                  <li>Kodun çalışması için SSL sertifikası gereklidir</li>
                  <li>API Key'inizi güvenli bir şekilde saklayın</li>
                  <li>Rate limit aşımına dikkat edin</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CodeGenerator;
