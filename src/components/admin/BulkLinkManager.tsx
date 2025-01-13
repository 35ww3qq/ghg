import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Download,
  Play,
  AlertCircle,
  FileText,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useBacklinks } from "@/hooks/useBacklinks";

interface ProcessResult {
  url: string;
  status: "success" | "error" | "pending";
  message?: string;
}

const BulkLinkManager = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [links, setLinks] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processResults, setProcessResults] = useState<ProcessResult[]>([]);
  const [progress, setProgress] = useState(0);
  const { bulkCreateBacklinks } = useBacklinks();

  const handleBulkAdd = async () => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setProcessResults([]);

      // Linkleri satır satır ayır ve temizle
      const linkList = links
        .split("\n")
        .map((link) => link.trim())
        .filter((link) => link.length > 0);

      // Her bir site için işlem yap
      for (let i = 0; i < linkList.length; i++) {
        const url = linkList[i];
        try {
          await bulkCreateBacklinks(targetUrl, [url]);
          setProcessResults((prev) => [
            ...prev,
            { url, status: "success", message: "Başarıyla eklendi" },
          ]);
        } catch (error) {
          setProcessResults((prev) => [
            ...prev,
            {
              url,
              status: "error",
              message:
                error instanceof Error ? error.message : "Bilinmeyen hata",
            },
          ]);
        }
        setProgress(((i + 1) / linkList.length) * 100);
      }
    } catch (error) {
      console.error("Toplu ekleme hatası:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setLinks(content);
      };
      reader.readAsText(file);
    }
  };

  const downloadTemplate = () => {
    const template = "site1.com\nsite2.com\nsite3.com";
    const blob = new Blob([template], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backlink-sites-template.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getResultStats = () => {
    const total = processResults.length;
    const success = processResults.filter((r) => r.status === "success").length;
    const error = processResults.filter((r) => r.status === "error").length;
    return { total, success, error };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Toplu Link Yönetimi</h1>
        <Button variant="outline" className="gap-2" onClick={downloadTemplate}>
          <Download className="h-4 w-4" />
          Şablon İndir
        </Button>
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
              <div className="relative">
                <Textarea
                  placeholder="https://site1.com\nhttps://site2.com\nhttps://site3.com"
                  className="min-h-[200px] bg-[#1e1f2e] border-0"
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                />
                <div className="absolute top-2 right-2">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".txt,.csv"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-purple-500/20 hover:text-purple-500"
                      type="button"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 p-4 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-500 space-y-2">
                <p>Önemli Notlar:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Her satıra bir site gelecek şekilde giriş yapın</li>
                  <li>URL'leri http:// veya https:// ile başlatın</li>
                  <li>Maksimum 100 site ekleyebilirsiniz</li>
                  <li>.txt veya .csv dosyası yükleyebilirsiniz</li>
                </ul>
              </div>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
              onClick={handleBulkAdd}
              disabled={isProcessing || !targetUrl || !links}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  İşlem Devam Ediyor...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  İşlemi Başlat
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            İşlem Sonuçları
          </h3>

          {isProcessing && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">İşlem durumu</span>
                <span className="text-white">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {processResults.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1e1f2e] p-4 rounded-md">
                  <p className="text-gray-400 text-sm">Toplam</p>
                  <p className="text-2xl font-bold text-white">
                    {getResultStats().total}
                  </p>
                </div>
                <div className="bg-[#1e1f2e] p-4 rounded-md">
                  <p className="text-gray-400 text-sm">Başarılı</p>
                  <p className="text-2xl font-bold text-green-500">
                    {getResultStats().success}
                  </p>
                </div>
                <div className="bg-[#1e1f2e] p-4 rounded-md">
                  <p className="text-gray-400 text-sm">Başarısız</p>
                  <p className="text-2xl font-bold text-red-500">
                    {getResultStats().error}
                  </p>
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {processResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#1e1f2e] rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      {result.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-white">{result.url}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        result.status === "success"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white border-0`}
                    >
                      {result.status === "success" ? "Başarılı" : "Başarısız"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isProcessing && processResults.length === 0 && (
            <div className="flex items-center justify-center h-[200px] text-gray-400">
              <FileText className="h-16 w-16 opacity-50" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BulkLinkManager;
