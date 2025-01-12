import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  amount: number;
  credits: number;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
  invoice: string;
}

const defaultOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-15",
    amount: 499.99,
    credits: 500,
    status: "completed",
    paymentMethod: "Kredi Kartı",
    invoice: "INV-2024-001.pdf",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024-01-20",
    amount: 999.99,
    credits: 1000,
    status: "pending",
    paymentMethod: "Havale/EFT",
    invoice: "INV-2024-002.pdf",
  },
];

const OrderHistory = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Sipariş Geçmişi</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Sipariş ara..."
            className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Sipariş</h3>
          <p className="text-2xl font-bold text-white">24</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Harcama</h3>
          <p className="text-2xl font-bold text-green-500">12,499.99 ₺</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Kredi</h3>
          <p className="text-2xl font-bold text-purple-500">12,500</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bekleyen Ödemeler</h3>
          <p className="text-2xl font-bold text-yellow-500">2</p>
        </Card>
      </div>

      <div className="bg-[#1e1f2e] rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">SİPARİŞ NO</TableHead>
              <TableHead className="text-gray-400">TARİH</TableHead>
              <TableHead className="text-gray-400">TUTAR</TableHead>
              <TableHead className="text-gray-400">KREDİ</TableHead>
              <TableHead className="text-gray-400">DURUM</TableHead>
              <TableHead className="text-gray-400">ÖDEME YÖNTEMİ</TableHead>
              <TableHead className="text-gray-400">FATURA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defaultOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-[#2a2b3d] border-b border-gray-700"
              >
                <TableCell className="text-white font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell className="text-white">{order.date}</TableCell>
                <TableCell className="text-white">
                  {order.amount.toFixed(2)} ₺
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-white">
                    <span>🪙</span>
                    <span>{order.credits}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      order.status === "completed"
                        ? "bg-green-500"
                        : order.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } text-white border-0`}
                  >
                    {order.status === "completed"
                      ? "Tamamlandı"
                      : order.status === "pending"
                        ? "Beklemede"
                        : "Başarısız"}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">
                  {order.paymentMethod}
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
      </div>
    </div>
  );
};

export default OrderHistory;
