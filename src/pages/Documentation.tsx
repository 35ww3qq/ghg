import React from "react";
import { Card } from "@/components/ui/card";
import { Search, Book, FileText, Video, HelpCircle } from "lucide-react";

const documentationSections = [
  {
    title: "Başlangıç Kılavuzu",
    icon: <Book className="h-6 w-6 text-purple-500" />,
    items: [
      "Platform Tanıtımı",
      "Hesap Oluşturma",
      "İlk Backlink Satın Alma",
      "Kredi Sistemi",
    ],
  },
  {
    title: "Link Market",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
    items: [
      "Backlink Seçimi",
      "DA/PA Değerleri",
      "Link Türleri",
      "Ödeme Yöntemleri",
    ],
  },
  {
    title: "Video Rehberler",
    icon: <Video className="h-6 w-6 text-green-500" />,
    items: [
      "Platform Kullanım Rehberi",
      "Backlink Stratejileri",
      "SEO İpuçları",
      "Premium Indexer Kullanımı",
    ],
  },
  {
    title: "Sıkça Sorulan Sorular",
    icon: <HelpCircle className="h-6 w-6 text-yellow-500" />,
    items: [
      "Genel Sorular",
      "Teknik Sorular",
      "Ödeme Soruları",
      "Güvenlik Soruları",
    ],
  },
];

const Documentation = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dökümanlar</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Döküman ara..."
            className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {documentationSections.map((section, index) => (
          <Card key={index} className="bg-[#2a2b3d] p-6 border-0">
            <div className="flex items-center gap-4 mb-6">
              {section.icon}
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href="#"
                  className="block p-3 rounded-md hover:bg-[#3a3b4d] transition-colors"
                >
                  <p className="text-gray-200 hover:text-white">{item}</p>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
