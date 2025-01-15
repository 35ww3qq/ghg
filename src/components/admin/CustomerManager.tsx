import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { adminApi } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Edit2, Trash2, Mail, Phone, CreditCard } from "lucide-react";

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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    credits: "0",
    status: "active" as const,
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getUsers();
      if (response.success) {
        setCustomers(response.data);
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Müşteriler alınamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      credits: "0",
      status: "active",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      credits: customer.credits.toString(),
      status: customer.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditDialogOpen && selectedCustomer) {
        // Müşteri güncelleme
        await adminApi.updateUser(selectedCustomer.id, formData);
        toast({
          title: "Başarılı",
          description: "Müşteri güncellendi",
        });
        setIsEditDialogOpen(false);
      } else {
        // Yeni müşteri ekleme
        await adminApi.createUser(formData);
        toast({
          title: "Başarılı",
          description: "Müşteri eklendi",
        });
        setIsAddDialogOpen(false);
      }
      await fetchCustomers(); // Listeyi yenile
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem başarısız",
        variant: "destructive",
      });
    }
  };

  const handleAddCredits = async () => {
    if (selectedCustomer && creditAmount) {
      try {
        await adminApi.addUserCredits(
          selectedCustomer.id,
          parseInt(creditAmount),
        );
        await fetchCustomers(); // Listeyi yenile
        setIsAddCreditsOpen(false);
        setCreditAmount("");
        toast({
          title: "Başarılı",
          description: "Kredi eklendi",
        });
      } catch (error) {
        toast({
          title: "Hata",
          description: "Kredi eklenemedi",
          variant: "destructive",
        });
      }
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: Customer["status"],
  ) => {
    try {
      await adminApi.updateUser(userId, { status: newStatus });
      await fetchCustomers(); // Listeyi yenile
      toast({
        title: "Başarılı",
        description: "Müşteri durumu güncellendi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Durum güncellenemedi",
        variant: "destructive",
      });
    }
  };

  // Arama filtrelemesi
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Müşteri Yönetimi</h1>
        <Button
          className="bg-purple-600 hover:bg-purple-700 gap-2"
          onClick={handleAddCustomer}
        >
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredCustomers.map((customer) => (
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
                        onClick={() =>
                          handleStatusChange(
                            customer.id,
                            customer.status === "suspended"
                              ? "active"
                              : "suspended",
                          )
                        }
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

      {/* Add/Edit Customer Dialog */}
      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={() => {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>İsim Soyisim</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>E-posta</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Başlangıç Kredisi</Label>
              <Input
                type="number"
                value={formData.credits}
                onChange={(e) =>
                  setFormData({ ...formData, credits: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Durum</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Customer["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="suspended">Askıya Alındı</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setIsEditDialogOpen(false);
                }}
              >
                İptal
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isEditDialogOpen ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Credits Dialog */}
      <Dialog open={isAddCreditsOpen} onOpenChange={setIsAddCreditsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kredi Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Kullanıcı</Label>
              <p className="text-white">{selectedCustomer?.name}</p>
            </div>
            <div className="space-y-2">
              <Label>Kredi Miktarı</Label>
              <Input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="bg-[#1e1f2e] border-0"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddCreditsOpen(false)}
              >
                İptal
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handleAddCredits}
              >
                Ekle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManager;
