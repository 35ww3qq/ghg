import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  credits: number;
  status: "active" | "suspended" | "pending";
  totalSpent: number;
  joinDate: string;
}

const CustomerManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsAddDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Müşteri Yönetimi</h1>
        <Button
          className="bg-purple-600 hover:bg-purple-700 gap-2"
          onClick={handleAddCustomer}
        >
          <Plus className="h-4 w-4" />
          Yeni Müşteri
        </Button>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Müşteri ara..."
              className="pl-10 bg-[#1e1f2e] border-0"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400 font-medium">Müşteri</th>
                <th className="pb-3 text-gray-400 font-medium">İletişim</th>
                <th className="pb-3 text-gray-400 font-medium">Kredi</th>
                <th className="pb-3 text-gray-400 font-medium">
                  Toplam Harcama
                </th>
                <th className="pb-3 text-gray-400 font-medium">Durum</th>
                <th className="pb-3 text-gray-400 font-medium">Kayıt Tarihi</th>
                <th className="pb-3 text-gray-400 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "1",
                  name: "John Doe",
                  email: "john@example.com",
                  phone: "+90 555 123 4567",
                  credits: 500,
                  status: "active",
                  totalSpent: 1500,
                  joinDate: "2024-01-15",
                },
              ].map((customer) => (
                <tr key={customer.id} className="border-b border-gray-700">
                  <td className="py-4">
                    <div>
                      <p className="text-white font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-400">ID: {customer.id}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="h-4 w-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone className="h-4 w-4" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-white">
                      <span>🪙</span>
                      <span>{customer.credits}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-white">
                      <CreditCard className="h-4 w-4" />
                      <span>{customer.totalSpent} ₺</span>
                    </div>
                  </td>
                  <td className="py-4">
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
                  </td>
                  <td className="py-4 text-white">{customer.joinDate}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-blue-500/20 hover:text-blue-500"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-red-500/20 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCustomer ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>İsim Soyisim</Label>
              <Input
                placeholder="John Doe"
                defaultValue={selectedCustomer?.name}
              />
            </div>
            <div className="space-y-2">
              <Label>E-posta</Label>
              <Input
                type="email"
                placeholder="ornek@email.com"
                defaultValue={selectedCustomer?.email}
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                placeholder="+90 555 123 4567"
                defaultValue={selectedCustomer?.phone}
              />
            </div>
            <div className="space-y-2">
              <Label>Başlangıç Kredisi</Label>
              <Input
                type="number"
                placeholder="100"
                defaultValue={selectedCustomer?.credits}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                İptal
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                {selectedCustomer ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManager;
