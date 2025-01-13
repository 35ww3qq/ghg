import React, { useState } from "react";
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
  Calendar,
  RefreshCw,
  FileText,
  Trash2,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Log {
  id: string;
  type: "error" | "warning" | "info";
  message: string;
  source: string;
  timestamp: string;
  details: string;
  ip?: string;
  user?: string;
}

const AdminLogs = () => {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [dateRange, setDateRange] = useState("today");
  const [logType, setLogType] = useState("all");

  // Örnek log verileri
  const logs: Log[] = Array.from({ length: 50 }, (_, i) => ({
    id: `LOG-${i + 1}`,
    type: ["error", "warning", "info"][
      Math.floor(Math.random() * 3)
    ] as Log["type"],
    message: `Örnek log mesajı ${i + 1}`,
    source: ["System", "User", "API", "Database", "Security"][
      Math.floor(Math.random() * 5)
    ],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    details: `Log detayları ${i + 1}`,
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
    user: Math.random() > 0.5 ? "admin@example.com" : "user@example.com",
  }));

  const stats = {
    total: logs.length,
    errors: logs.filter((log) => log.type === "error").length,
    warnings: logs.filter((log) => log.type === "warning").length,
    info: logs.filter((log) => log.type === "info").length,
  };

  const handleExport = () => {
    // Log verilerini dışa aktar
    console.log("Exporting logs...");
  };

  const handleClearLogs = () => {
    // Logları temizle
    console.log("Clearing logs...");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Sistem Logları</h1>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] bg-[#2a2b3d] border-0">
              <SelectValue placeholder="Tarih Aralığı" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Bugün</SelectItem>
              <SelectItem value="yesterday">Dün</SelectItem>
              <SelectItem value="last-7-days">Son 7 Gün</SelectItem>
              <SelectItem value="last-30-days">Son 30 Gün</SelectItem>
              <SelectItem value="custom">Özel Aralık</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Log ara..."
              className="pl-10 pr-4 py-2 bg-[#2a2b3d] border-0 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none w-[300px]"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Dışa Aktar
          </Button>
          <Button variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Logları Temizle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Toplam Log</h3>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Hatalar</h3>
          <p className="text-2xl font-bold text-red-500">{stats.errors}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Uyarılar</h3>
          <p className="text-2xl font-bold text-yellow-500">{stats.warnings}</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bilgiler</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.info}</p>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] border-0">
        <div className="p-4 border-b border-gray-700 flex items-center gap-4">
          <Select value={logType} onValueChange={setLogType}>
            <SelectTrigger className="w-[180px] bg-[#1e1f2e] border-0">
              <SelectValue placeholder="Log Tipi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Loglar</SelectItem>
              <SelectItem value="error">Hatalar</SelectItem>
              <SelectItem value="warning">Uyarılar</SelectItem>
              <SelectItem value="info">Bilgiler</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Yenile
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">TİP</TableHead>
              <TableHead className="text-gray-400">MESAJ</TableHead>
              <TableHead className="text-gray-400">KAYNAK</TableHead>
              <TableHead className="text-gray-400">IP</TableHead>
              <TableHead className="text-gray-400">KULLANICI</TableHead>
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
                <TableCell className="text-white">{log.ip}</TableCell>
                <TableCell className="text-white">{log.user}</TableCell>
                <TableCell className="text-white">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-purple-500/20 hover:text-purple-500"
                    onClick={() => setSelectedLog(log)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Detayları</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Log ID</p>
                  <p className="text-white">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tarih</p>
                  <p className="text-white">
                    {new Date(selectedLog.timestamp).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tip</p>
                  <Badge
                    variant="outline"
                    className={`${
                      selectedLog.type === "error"
                        ? "bg-red-500"
                        : selectedLog.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    } text-white border-0 mt-1`}
                  >
                    {selectedLog.type === "error"
                      ? "Hata"
                      : selectedLog.type === "warning"
                        ? "Uyarı"
                        : "Bilgi"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Kaynak</p>
                  <p className="text-white">{selectedLog.source}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Mesaj</p>
                <p className="text-white">{selectedLog.message}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Detaylar</p>
                <pre className="mt-1 p-4 bg-[#1e1f2e] rounded-md text-white overflow-x-auto">
                  {selectedLog.details}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogs;
