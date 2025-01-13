import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Play, AlertCircle } from "lucide-react";
import { useBacklinks } from "@/hooks/useBacklinks";

const BulkLinkManager = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [links, setLinks] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { bulkCreateBacklinks } = useBacklinks();

  const handleBulkAdd = async () => {
    try {
      setIsProcessing(true);

      // Linkleri satır satır ayır ve temizle
      const linkList = links
        .split("\n")
        .map((link) => link.trim())
        .filter((link) => link.length > 0);

      // Her bir site için backlink HTML'i oluştur
      const backlinkHtml = `<a href="${targetUrl}" title="Backlink" rel="dofollow">Backlink</a>`;

      // Her bir siteye backlink ekle
      await bulkCreateBacklinks(targetUrl, linkList);

      // Başarılı mesajı göster
      alert(`${linkList.length} siteye başarıyla backlink eklendi!`);

      // Formu temizle
      setLinks("");
      setTargetUrl("");
    } catch (error) {
      console.error("Backlink ekleme hatası:", error);
      alert("Backlink eklenirken bir hata oluştu!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Toplu Link Yönetimi</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Toplu Link Ekle
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-400">Hedef Site URL</label>
              <Input
                placeholder="https://example.com"
                className="bg-[#1e1f2e] border-0"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-400">
                Backlink Eklenecek Siteler (Her satıra bir site)
              </label>
              <Textarea
                placeholder="https://site1.com\nhttps://site2.com\nhttps://site3.com"
                className="min-h-[200px] bg-[#1e1f2e] border-0"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
              />
            </div>

            <div className="bg-yellow-600/20 p-4 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-500 space-y-2">
                <p>Eklenecek HTML kodu:</p>
                <code className="block bg-[#1e1f2e] p-2 rounded">
                  {`<a href="${targetUrl || "https://example.com"}" title="Backlink" rel="dofollow">Backlink</a>`}
                </code>
              </div>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
              onClick={handleBulkAdd}
              disabled={isProcessing || !targetUrl || !links}
            >
              <Play className="h-4 w-4" />
              {isProcessing ? "İşlem Devam Ediyor..." : "İşlemi Başlat"}
            </Button>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Yardım & Talimatlar
          </h3>
          <div className="space-y-4 text-gray-400">
            <div className="space-y-2">
              <h4 className="font-medium text-white">Nasıl Çalışır?</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Hedef site URL'sini girin (backlink verilecek site)</li>
                <li>
                  Her satıra bir tane olacak şekilde backlink eklenecek siteleri
                  girin
                </li>
                <li>"İşlemi Başlat" butonuna tıklayın</li>
                <li>
                  Sistem otomatik olarak her siteye backlink kodunu ekleyecektir
                </li>
              </ol>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-white">Önemli Notlar</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  URL'leri https:// veya http:// ile başlayacak şekilde girin
                </li>
                <li>Her sitenin erişilebilir olduğundan emin olun</li>
                <li>
                  Çok fazla sayıda site eklerken işlemin tamamlanmasını bekleyin
                </li>
                <li>İşlem sırasında sayfadan ayrılmayın</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BulkLinkManager;
