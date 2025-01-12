import React, { useState } from "react";
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
import { Search, Filter, ExternalLink, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Link {
  id: string;
  targetSite: string;
  keyword: string;
  addedSite: string;
  da: number;
  pa: number;
  status: "active" | "pending" | "removed";
  addedDate: string;
  expiryDate: string;
}

const generateLinks = (count: number): Link[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    targetSite: `example${i + 1}.com`,
    keyword: `Keyword ${i + 1}`,
    addedSite: `blog${i + 1}.com`,
    da: Math.floor(Math.random() * 50) + 20,
    pa: Math.floor(Math.random() * 40) + 15,
    status: ["active", "pending", "removed"][
      Math.floor(Math.random() * 3)
    ] as Link["status"],
    addedDate: "2024-01-15",
    expiryDate: "2025-01-15",
  }));
};

const MyLinks = () => {
  const [links] = useState(generateLinks(100));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.targetSite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || link.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalPages = Math.ceil(filteredLinks.length / pageSize);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Linklerim</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Link ara..."
              className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-[#2a2b3d] border-0">
                <SelectValue placeholder="Durum Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="removed">Kaldırıldı</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={pageSize.toString()}
              onValueChange={(val) => setPageSize(Number(val))}
            >
              <SelectTrigger className="w-[180px] bg-[#2a2b3d] border-0">
                <SelectValue placeholder="Sayfa başına göster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 kayıt</SelectItem>
                <SelectItem value="20">20 kayıt</SelectItem>
                <SelectItem value="50">50 kayıt</SelectItem>
                <SelectItem value="100">100 kayıt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Link</h3>
          <p className="text-2xl font-bold text-white">{links.length}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Aktif Linkler</h3>
          <p className="text-2xl font-bold text-green-500">
            {links.filter((l) => l.status === "active").length}
          </p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bekleyen Linkler</h3>
          <p className="text-2xl font-bold text-yellow-500">
            {links.filter((l) => l.status === "pending").length}
          </p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Kaldırılan Linkler</h3>
          <p className="text-2xl font-bold text-red-500">
            {links.filter((l) => l.status === "removed").length}
          </p>
        </Card>
      </div>

      <div className="bg-[#1e1f2e] rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">HEDEF SİTE</TableHead>
              <TableHead className="text-gray-400">ANAHTAR KELİME</TableHead>
              <TableHead className="text-gray-400">EKLENDİĞİ SİTE</TableHead>
              <TableHead className="text-gray-400">DA/PA</TableHead>
              <TableHead className="text-gray-400">DURUM</TableHead>
              <TableHead className="text-gray-400">EKLENME TARİHİ</TableHead>
              <TableHead className="text-gray-400">BİTİŞ TARİHİ</TableHead>
              <TableHead className="text-gray-400">İŞLEMLER</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLinks.map((link) => (
              <TableRow
                key={link.id}
                className="hover:bg-[#2a2b3d] border-b border-gray-700"
              >
                <TableCell className="text-white">{link.targetSite}</TableCell>
                <TableCell className="text-white">{link.keyword}</TableCell>
                <TableCell className="text-white">{link.addedSite}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="bg-purple-500 text-white border-0"
                    >
                      DA: {link.da}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-500 text-white border-0"
                    >
                      PA: {link.pa}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${link.status === "active" ? "bg-green-500" : link.status === "pending" ? "bg-yellow-500" : "bg-red-500"} text-white border-0`}
                  >
                    {link.status === "active"
                      ? "Aktif"
                      : link.status === "pending"
                        ? "Beklemede"
                        : "Kaldırıldı"}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">{link.addedDate}</TableCell>
                <TableCell className="text-white">{link.expiryDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-purple-500/20 hover:text-purple-500"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-blue-500/20 hover:text-blue-500"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Toplam {filteredLinks.length} kayıttan{" "}
          {(currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(currentPage * pageSize, filteredLinks.length)} arası
          gösteriliyor
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Önceki
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyLinks;
