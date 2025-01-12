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
import { Search, Filter, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Package {
  id: string;
  siteAddress: string;
  da: number;
  pa: number;
  credit: number;
  linkType: "PHP" | "JS";
  status: "Eklenmedi" | "Eklendi";
  date: string;
  isNew?: boolean;
  insufficientBalance?: boolean;
}

interface PackageTableProps {
  packages?: Package[];
  onSelect?: (id: string) => void;
}

const defaultPackages: Package[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  siteAddress: `example${i + 1}.com`,
  da: Math.floor(Math.random() * 50) + 20,
  pa: Math.floor(Math.random() * 40) + 15,
  credit: Math.floor(Math.random() * 3) + 1,
  linkType: Math.random() > 0.5 ? "PHP" : "JS",
  status: Math.random() > 0.7 ? "Eklendi" : "Eklenmedi",
  date: "11.11.2024",
  isNew: Math.random() > 0.8,
  insufficientBalance: Math.random() > 0.9,
}));

const PackageTable = ({
  packages = defaultPackages,
  onSelect = () => {},
}: PackageTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = packages.filter((pkg) =>
    pkg.siteAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalPages = Math.ceil(filteredPackages.length / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Site ara..."
            className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
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
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0 hover:bg-[#3a3b4d] gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </div>
      </div>

      <div className="w-full bg-[#1e1f2e] rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">SİTE ADRESİ</TableHead>
              <TableHead className="text-gray-400">DA</TableHead>
              <TableHead className="text-gray-400">PA</TableHead>
              <TableHead className="text-gray-400">KREDİ</TableHead>
              <TableHead className="text-gray-400">EKLENME TÜRÜ</TableHead>
              <TableHead className="text-gray-400">ALINMA DURUMU</TableHead>
              <TableHead className="text-gray-400">EKLENME TARİHİ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPackages.map((pkg) => (
              <TableRow
                key={pkg.id}
                className="hover:bg-[#2a2b3d] border-b border-gray-700 cursor-pointer"
                onClick={() => onSelect(pkg.id)}
              >
                <TableCell className="font-medium text-gray-200">
                  <div className="flex items-center gap-2">
                    {pkg.isNew && (
                      <Badge
                        variant="secondary"
                        className="bg-green-600 text-white"
                      >
                        Yeni
                      </Badge>
                    )}
                    {pkg.insufficientBalance && (
                      <Badge
                        variant="secondary"
                        className="bg-red-600 text-white"
                      >
                        Bakiye Yetersiz
                      </Badge>
                    )}
                    {pkg.siteAddress}
                  </div>
                </TableCell>
                <TableCell className="text-gray-200">{pkg.da}</TableCell>
                <TableCell className="text-gray-200">{pkg.pa}</TableCell>
                <TableCell className="text-gray-200">
                  <div className="flex items-center gap-1">
                    <span>🪙</span>
                    <span>{pkg.credit}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${pkg.linkType === "PHP" ? "bg-purple-500" : "bg-green-500"} text-white border-0`}
                  >
                    {pkg.linkType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${pkg.status === "Eklendi" ? "bg-green-500" : "bg-red-500"} text-white border-0`}
                  >
                    {pkg.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-200">{pkg.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Toplam {filteredPackages.length} kayıttan{" "}
          {(currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(currentPage * pageSize, filteredPackages.length)} arası
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

export default PackageTable;
