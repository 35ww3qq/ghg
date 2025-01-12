import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Code2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BacklinkCodeGeneratorProps {
  apiUrl?: string;
}

const BacklinkCodeGenerator = ({
  apiUrl = "https://api.example.com/backlinks",
}: BacklinkCodeGeneratorProps) => {
  const [activeTab, setActiveTab] = useState("php");

  const phpCode = `<?php
/**
 * Backlink Entegrasyon Sistemi v2.0
 */

// Ayarlar
$config = array(
    'api_url' => '${apiUrl}',
    'site_id' => 'YOUR_SITE_ID', // Müşteri panelinden alınacak
    'cache_time' => 3600, // 1 saat
    'debug' => false
);

// Cache kontrolü
$cache_file = sys_get_temp_dir() . '/backlinks-' . md5($config['site_id']) . '.json';
if (file_exists($cache_file) && (time() - filemtime($cache_file) < $config['cache_time'])) {
    $backlinks = json_decode(file_get_contents($cache_file), true);
} else {
    // API'den backlink verilerini al
    $ch = curl_init($config['api_url'] . '?site_id=' . $config['site_id']);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_TIMEOUT => 5
    ]);
    
    $response = curl_exec($ch);
    $backlinks = json_decode($response, true);
    curl_close($ch);
    
    // Cache'e kaydet
    if ($backlinks) {
        file_put_contents($cache_file, json_encode($backlinks));
    }
}

// Backlinkleri yerleştir
if (!empty($backlinks)) {
    foreach ($backlinks as $backlink) {
        // Link HTML'i oluştur
        $link = sprintf(
            '<a href="%s" title="%s" class="backlink" data-id="%s" rel="noopener">%s</a>',
            htmlspecialchars($backlink['url']),
            htmlspecialchars($backlink['title']),
            htmlspecialchars($backlink['id']),
            htmlspecialchars($backlink['keyword'])
        );
        
        // İçeriğe ekle (WordPress için)
        add_filter('the_content', function($content) use ($link) {
            // İlk paragraftan sonra ekle
            $pos = strpos($content, '</p>');
            if ($pos !== false) {
                return substr_replace($content, $link, $pos + 4, 0);
            }
            return $content . $link;
        });
    }
}
?>`;

  const jsCode = `<!-- Backlink Entegrasyon Kodu -->
<script>
(function() {
    // Ayarlar
    const config = {
        apiUrl: '${apiUrl}',
        siteId: 'YOUR_SITE_ID', // Müşteri panelinden alınacak
        cacheTime: 3600, // 1 saat (saniye)
        selector: 'article, .content, .post-content' // İçerik alanı seçici
    };

    // Cache kontrolü
    const getCachedData = () => {
        const cached = localStorage.getItem('backlinks');
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (timestamp + (config.cacheTime * 1000) > Date.now()) {
                return data;
            }
        }
        return null;
    };

    // API'den veri al
    const fetchBacklinks = async () => {
        try {
            const cached = getCachedData();
            if (cached) return cached;

            const response = await fetch(config.apiUrl + '?site_id=' + config.siteId);
            const data = await response.json();
            
            // Cache'e kaydet
            localStorage.setItem('backlinks', JSON.stringify({
                data,
                timestamp: Date.now()
            }));
            
            return data;
        } catch (error) {
            console.error('Backlink verisi alınamadı:', error);
            return [];
        }
    };

    // Backlinkleri yerleştir
    const insertBacklinks = (backlinks) => {
        const content = document.querySelector(config.selector);
        if (!content || !backlinks.length) return;

        const paragraphs = content.getElementsByTagName('p');
        if (paragraphs.length < 2) return;

        backlinks.forEach((backlink, index) => {
            // Link elementi oluştur
            const link = document.createElement('a');
            link.href = backlink.url;
            link.textContent = backlink.keyword;
            link.title = backlink.title;
            link.className = 'backlink';
            link.dataset.id = backlink.id;
            link.rel = 'noopener';

            // Rastgele bir paragrafa ekle (ilk ve son paragraf hariç)
            const position = Math.floor(Math.random() * (paragraphs.length - 2)) + 1;
            paragraphs[position].appendChild(document.createTextNode(' '));
            paragraphs[position].appendChild(link);
        });
    };

    // Tıklama takibi
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.backlink');
        if (link) {
            const data = {
                linkId: link.dataset.id,
                url: link.href,
                timestamp: new Date().toISOString()
            };
            
            // Beacon API ile tıklama verisi gönder
            navigator.sendBeacon(config.apiUrl + '/track', JSON.stringify(data));
        }
    });

    // Başlat
    fetchBacklinks().then(insertBacklinks);
})();
</script>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Code2 className="h-6 w-6 text-purple-500" />
        <h1 className="text-2xl font-bold text-white">Entegrasyon Kodları</h1>
      </div>

      <Tabs defaultValue="php" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="php">PHP (WordPress)</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>

        <TabsContent value="php">
          <Card className="bg-[#2a2b3d] p-6 border-0">
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
              <p>📌 WordPress için kurulum:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>functions.php dosyasına ekleyin</li>
                <li>
                  YOUR_SITE_ID yerine müşteri panelinden aldığınız ID'yi yazın
                </li>
                <li>Cache süresini isteğe göre ayarlayın</li>
              </ol>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="js">
          <Card className="bg-[#2a2b3d] p-6 border-0">
            <div className="relative">
              <pre className="bg-[#1e1f2e] p-4 rounded-md overflow-x-auto text-white">
                <code>{jsCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 hover:bg-purple-500/20 hover:text-purple-500"
                onClick={() => copyToClipboard(jsCode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>📌 JavaScript kurulumu:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Kodu sitenizin footer.php veya body tag'i kapanmadan önce
                  ekleyin
                </li>
                <li>
                  YOUR_SITE_ID yerine müşteri panelinden aldığınız ID'yi yazın
                </li>
                <li>selector değişkenini sitenize göre ayarlayın</li>
                <li>Cache süresini isteğe göre değiştirin</li>
              </ol>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BacklinkCodeGenerator;
