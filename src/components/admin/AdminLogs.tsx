import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Download,
  Filter,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Log {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  source: string;
  timestamp: string;
  details: string;
}

const generateLogs = (count: number): Log[] => {
  const types: Log["type"][] = ["error", "warning", "info"];
  const sources = ["System", "User", "API", "Database", "Security"];

  return Array.from({ length: count }, (_, i) => ({
    id: `LOG-${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    message: `Sample log message ${i + 1}`,
    source: sources[Math.floor(Math.random() * sources.length)],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    details: `Detailed information for log ${i + 1}`,
  }));
};

const AdminLogs = () => {
  const logs = generateLogs(50);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Sistem Logları</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Log ara..."
              className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-[#2a2b3d] border-0">
              <SelectValue placeholder="Log Tipi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Loglar</SelectItem>
              <SelectItem value="error">Hatalar</SelectItem>
              <SelectItem value="warning">Uyarılar</SelectItem>
              <SelectItem value="info">Bilgiler</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0 hover:bg-[#3a3b4d] gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2b3d] text-white border-0 hover:bg-[#3a3b4d] gap-2"
          >
            <Download className="h-4 w-4" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Log</h3>
          <p className="text-2xl font-bold text-white">{logs.length}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Hatalar</h3>
          <p className="text-2xl font-bold text-red-500">
            {logs.filter((log) => log.type === "error").length}
          </p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Uyarılar</h3>
          <p className="text-2xl font-bold text-yellow-500">
            {logs.filter((log) => log.type === "warning").length}
          </p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bilgiler</h3>
          <p className="text-2xl font-bold text-blue-500">
            {logs.filter((log) => log.type === "info").length}
          </p>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] border-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">TİP</TableHead>
              <TableHead className="text-gray-400">MESAJ</TableHead>
              <TableHead className="text-gray-400">KAYNAK</TableHead>
              <TableHead className="text-gray-400">TARİH</TableHead>
              <TableHead className="text-gray-400">İŞLEM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow
                key={log.id}
                className="hover:bg-[#3a3b4d] border-b border-gray-700"
              >
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      log.type === "error"
                        ? "bg-red-500"
                        : log.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    } text-white border-0 flex items-center gap-2`}
                  >
                    {log.type === "error" ? (
                      <AlertCircle className="h-3 w-3" />
                    ) : log.type === "warning" ? (
                      <AlertTriangle className="h-3 w-3" />
                    ) : (
                      <Info className="h-3 w-3" />
                    )}
                    {log.type === "error"
                      ? "Hata"
                      : log.type === "warning"
                        ? "Uyarı"
                        : "Bilgi"}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">{log.message}</TableCell>
                <TableCell className="text-white">{log.source}</TableCell>
                <TableCell className="text-white">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-purple-500/20 hover:text-purple-500"
                  >
                    Detaylar
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

export default AdminLogs;
