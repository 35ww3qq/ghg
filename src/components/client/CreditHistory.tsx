import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { creditApi } from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "purchase" | "usage" | "refund";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const CreditHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionsData, balanceData] = await Promise.all([
        creditApi.getTransactions(),
        creditApi.getBalance(),
      ]);
      setTransactions(transactionsData);
      setBalance(balanceData.balance);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kredi bilgileri alınamadı",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Kredi Geçmişi</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Mevcut Bakiye:</span>
          <div className="flex items-center gap-1 text-white font-bold">
            <span>🪙</span>
            <span>{balance}</span>
          </div>
        </div>
      </div>

      <Card className="bg-[#2a2b3d] border-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2a2b3d] border-b border-gray-700">
              <TableHead className="text-gray-400">İŞLEM</TableHead>
              <TableHead className="text-gray-400">MİKTAR</TableHead>
              <TableHead className="text-gray-400">AÇIKLAMA</TableHead>
              <TableHead className="text-gray-400">TARİH</TableHead>
              <TableHead className="text-gray-400">DURUM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="hover:bg-[#3a3b4d] border-b border-gray-700"
              >
                <TableCell className="text-white">
                  {transaction.type === "purchase"
                    ? "Kredi Alımı"
                    : transaction.type === "usage"
                      ? "Kredi Kullanımı"
                      : "İade"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-white">
                    <span>🪙</span>
                    <span
                      className={
                        transaction.type === "usage"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {transaction.type === "usage" ? "-" : "+"}
                      {transaction.amount}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {transaction.description}
                </TableCell>
                <TableCell className="text-white">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      transaction.status === "completed"
                        ? "bg-green-500"
                        : transaction.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } text-white border-0`}
                  >
                    {transaction.status === "completed"
                      ? "Tamamlandı"
                      : transaction.status === "pending"
                        ? "Beklemede"
                        : "Başarısız"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CreditHistory;
