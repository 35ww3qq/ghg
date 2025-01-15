import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { adminApi } from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Edit2, Ban, CreditCard, UserPlus } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  status: "active" | "suspended" | "pending";
  lastLogin: string;
  totalSpent: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kullanıcılar alınamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (
    userId: string,
    newStatus: User["status"],
  ) => {
    try {
      await adminApi.updateUser(userId, { status: newStatus });
      await fetchUsers(); // Listeyi yenile
      toast({
        title: "Başarılı",
        description: "Kullanıcı durumu güncellendi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kullanıcı durumu güncellenemedi",
        variant: "destructive",
      });
    }
  };

  const handleAddCredits = async () => {
    if (selectedUser && creditAmount) {
      try {
        await adminApi.addUserCredits(selectedUser.id, parseInt(creditAmount));
        await fetchUsers(); // Listeyi yenile
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

  // Arama filtrelemesi
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Kullanıcı Yönetimi</h2>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          <UserPlus className="h-4 w-4" />
          Yeni Kullanıcı
        </Button>
      </div>

      <Card className="bg-[#2a2b3d] border-0">
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Kullanıcı ara..."
              className="pl-10 bg-[#1e1f2e] border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">KULLANICI</TableHead>
              <TableHead className="text-gray-400">KREDİ</TableHead>
              <TableHead className="text-gray-400">TOPLAM HARCAMA</TableHead>
              <TableHead className="text-gray-400">SON GİRİŞ</TableHead>
              <TableHead className="text-gray-400">DURUM</TableHead>
              <TableHead className="text-gray-400">İŞLEMLER</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-[#3a3b4d] border-b border-gray-700"
              >
                <TableCell>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-white">
                    <span>🪙</span>
                    <span>{user.credits}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {user.totalSpent} ₺
                </TableCell>
                <TableCell className="text-white">{user.lastLogin}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      user.status === "active"
                        ? "bg-green-500"
                        : user.status === "suspended"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    } text-white border-0`}
                  >
                    {user.status === "active"
                      ? "Aktif"
                      : user.status === "suspended"
                        ? "Askıya Alındı"
                        : "Beklemede"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-purple-500/20 hover:text-purple-500"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsAddCreditsOpen(true);
                      }}
                    >
                      <CreditCard className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-blue-500/20 hover:text-blue-500"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-red-500/20 hover:text-red-500"
                      onClick={() =>
                        handleStatusChange(
                          user.id,
                          user.status === "suspended" ? "active" : "suspended",
                        )
                      }
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isAddCreditsOpen} onOpenChange={setIsAddCreditsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kredi Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Kullanıcı</label>
              <p className="text-white">{selectedUser?.name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Kredi Miktarı</label>
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

export default UserManagement;
