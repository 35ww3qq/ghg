import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Başlangıç",
    price: 99,
    credits: 100,
    features: [
      "DA 20+ Backlink",
      "PA 15+ Backlink",
      "Manuel Kontrol",
      "30 Gün Garanti",
    ],
  },
  {
    name: "Professional",
    price: 199,
    credits: 250,
    popular: true,
    features: [
      "DA 30+ Backlink",
      "PA 25+ Backlink",
      "Manuel Kontrol",
      "60 Gün Garanti",
      "Premium Destek",
    ],
  },
  {
    name: "Enterprise",
    price: 399,
    credits: 600,
    features: [
      "DA 40+ Backlink",
      "PA 35+ Backlink",
      "Manuel Kontrol",
      "90 Gün Garanti",
      "Premium Destek",
      "Öncelikli İndexleme",
    ],
  },
];

const Packages = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e] p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Paketler</h1>

      <div className="grid grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <Card
            key={index}
            className={`bg-[#2a2b3d] border-0 relative ${pkg.popular ? "ring-2 ring-purple-500" : ""}`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                  En Popüler
                </span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">
                  {pkg.price} ₺
                </span>
                <span className="text-gray-400">/ay</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span>🪙</span>
                <span className="text-white">{pkg.credits} Kredi</span>
              </div>
              <div className="space-y-3">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Paketi Seç
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Packages;
