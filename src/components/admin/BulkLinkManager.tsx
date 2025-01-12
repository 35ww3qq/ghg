import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Play, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const BulkLinkManager = () => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImport = () => {
    setIsProcessing(true);
    // Simüle edilmiş ilerleme
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        setIsImportDialogOpen(false);
      }
    }, 500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Toplu Link Yönetimi</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setIsImportDialogOpen(true)}
          >
            <Upload className="h-4 w-4" />
            İçe Aktar
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Toplu Link Ekle
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Hedef Site</Label>
              <Input
                placeholder="example.com"
                className="bg-[#1e1f2e] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label>Linkler (Her satıra bir link)</Label>
              <Textarea
                placeholder="https://site1.com&#13;&#10;https://site2.com&#13;&#10;https://site3.com"
                className="min-h-[200px] bg-[#1e1f2e] border-0"
              />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 gap-2">
              <Play className="h-4 w-4" />
              İşlemi Başlat
            </Button>
          </div>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <h3 className="text-lg font-semibold text-white mb-4">
            Toplu Link Sil
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Domain Listesi (Her satıra bir domain)</Label>
              <Textarea
                placeholder="site1.com&#13;&#10;site2.com&#13;&#10;site3.com"
                className="min-h-[200px] bg-[#1e1f2e] border-0"
              />
            </div>
            <div className="bg-yellow-600/20 p-4 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-500">
                Bu işlem geri alınamaz. Seçilen domainlere ait tüm backlinkler
                kalıcı olarak silinecektir.
              </p>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 gap-2">
              <Play className="h-4 w-4" />
              Silme İşlemini Başlat
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>CSV Dosyası İçe Aktar</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              <Input type="file" className="hidden" id="csv-upload" />
              <Label
                htmlFor="csv-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-gray-400">
                  CSV dosyanızı buraya sürükleyin veya seçin
                </span>
              </Label>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">İşleniyor...</span>
                  <span className="text-white">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsImportDialogOpen(false)}
                disabled={isProcessing}
              >
                İptal
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handleImport}
                disabled={isProcessing}
              >
                İçe Aktar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkLinkManager;
