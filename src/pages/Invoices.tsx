import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";

const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-15",
    amount: 499.99,
    status: "paid",
    package: "Professional",
    paymentMethod: "Kredi Kartı",
  },
  {
    id: "INV-2024-002",
    date: "2024-01-20",
    amount: 999.99,
    status: "pending",
    package: "Enterprise",
    paymentMethod: "Havale/EFT",
  },
];

const Invoices = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Faturalar</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Fatura ara..."
            className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bu Ay</h3>
          <p className="text-2xl font-bold text-white">2,499.99 ₺</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Geçen Ay</h3>
          <p className="text-2xl font-bold text-white">1,999.99 ₺</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Ödeme</h3>
          <p className="text-2xl font-bold text-white">12,499.99 ₺</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bekleyen Ödemeler</h3>
          <p className="text-2xl font-bold text-yellow-500">999.99 ₺</p>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] border-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">FATURA NO</TableHead>
              <TableHead className="text-gray-400">TARİH</TableHead>
              <TableHead className="text-gray-400">PAKET</TableHead>
              <TableHead className="text-gray-400">TUTAR</TableHead>
              <TableHead className="text-gray-400">ÖDEME YÖNTEMİ</TableHead>
              <TableHead className="text-gray-400">DURUM</TableHead>
              <TableHead className="text-gray-400">İŞLEM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="hover:bg-[#3a3b4d] border-b border-gray-700"
              >
                <TableCell className="text-white font-medium">
                  {invoice.id}
                </TableCell>
                <TableCell className="text-white">{invoice.date}</TableCell>
                <TableCell className="text-white">{invoice.package}</TableCell>
                <TableCell className="text-white">
                  {invoice.amount.toFixed(2)} ₺
                </TableCell>
                <TableCell className="text-white">
                  {invoice.paymentMethod}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${invoice.status === "paid" ? "bg-green-500" : "bg-yellow-500"} text-white border-0`}
                  >
                    {invoice.status === "paid" ? "Ödendi" : "Beklemede"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-purple-500/20 hover:text-purple-500"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Invoices;
