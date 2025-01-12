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
import { Search } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  credits: number;
  totalSpent: number;
  activeLinks: number;
  status: "active" | "suspended" | "pending";
  joinDate: string;
}

const defaultCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    credits: 500,
    totalSpent: 1500,
    activeLinks: 25,
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    credits: 200,
    totalSpent: 800,
    activeLinks: 12,
    status: "active",
    joinDate: "2024-01-20",
  },
];

const CustomerManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Müşteri Yönetimi</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Müşteri ara..."
            className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Müşteri</h3>
          <p className="text-2xl font-bold text-white">1,234</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Müşteriler</h3>
          <p className="text-2xl font-bold text-green-500">892</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Kredi Kullanımı</h3>
          <p className="text-2xl font-bold text-purple-500">45,678</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Backlink Sayısı</h3>
          <p className="text-2xl font-bold text-blue-500">3,456</p>
        </Card>
      </div>

      <div className="bg-[#1e1f2e] rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">MÜŞTERİ</TableHead>
              <TableHead className="text-gray-400">KREDİ</TableHead>
              <TableHead className="text-gray-400">TOPLAM HARCAMA</TableHead>
              <TableHead className="text-gray-400">AKTİF LİNKLER</TableHead>
              <TableHead className="text-gray-400">DURUM</TableHead>
              <TableHead className="text-gray-400">KATILIM TARİHİ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defaultCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                className="hover:bg-[#2a2b3d] border-b border-gray-700"
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-white">{customer.name}</p>
                    <p className="text-sm text-gray-400">{customer.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-white">
                    <span>🪙</span>
                    <span>{customer.credits}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-white">
                    <span>🪙</span>
                    <span>{customer.totalSpent}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {customer.activeLinks}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      customer.status === "active"
                        ? "bg-green-500"
                        : customer.status === "suspended"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    } text-white border-0`}
                  >
                    {customer.status === "active"
                      ? "Aktif"
                      : customer.status === "suspended"
                        ? "Askıya Alındı"
                        : "Beklemede"}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">
                  {customer.joinDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerManagement;
