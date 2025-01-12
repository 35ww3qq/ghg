import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Clock, Search } from "lucide-react";

const tickets = [
  {
    id: "TIC-001",
    subject: "Backlink Sorunu",
    status: "open",
    priority: "high",
    lastUpdate: "2 saat önce",
    messages: 3,
  },
  {
    id: "TIC-002",
    subject: "Ödeme Problemi",
    status: "pending",
    priority: "medium",
    lastUpdate: "5 saat önce",
    messages: 2,
  },
];

const Support = () => {
  return (
    <div className="min-h-screen bg-[#1e1f2e] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Destek</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <MessageSquare className="h-4 w-4 mr-2" />
          Yeni Ticket Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Açık Ticketlar</h3>
          <p className="text-2xl font-bold text-white">3</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Bekleyen Yanıtlar</h3>
          <p className="text-2xl font-bold text-yellow-500">2</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Çözülen Ticketlar</h3>
          <p className="text-2xl font-bold text-green-500">15</p>
        </Card>
        <Card className="bg-[#2a2b3d] p-4 border-0">
          <h3 className="text-gray-400 mb-2">Ortalama Yanıt Süresi</h3>
          <p className="text-2xl font-bold text-purple-500">2s 15d</p>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-4">
            <Phone className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">
              Telefon Desteği
            </h3>
          </div>
          <p className="text-gray-400 mb-4">
            7/24 telefon desteği için bizi arayın
          </p>
          <p className="text-white font-bold">+90 (555) 123 45 67</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">
              E-posta Desteği
            </h3>
          </div>
          <p className="text-gray-400 mb-4">E-posta ile destek almak için</p>
          <p className="text-white font-bold">destek@hacklinkmarket.com</p>
        </Card>

        <Card className="bg-[#2a2b3d] p-6 border-0">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-white">
              Çalışma Saatleri
            </h3>
          </div>
          <p className="text-gray-400 mb-4">Teknik destek çalışma saatleri</p>
          <p className="text-white font-bold">Hafta içi: 09:00 - 18:00</p>
        </Card>
      </div>

      <Card className="bg-[#2a2b3d] p-6 border-0">
        <h3 className="text-lg font-semibold text-white mb-6">Son Ticketlar</h3>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 border-b border-gray-700"
            >
              <div>
                <h4 className="text-white font-medium">{ticket.subject}</h4>
                <p className="text-sm text-gray-400">{ticket.lastUpdate}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={`${
                    ticket.priority === "high"
                      ? "bg-red-500"
                      : ticket.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  } text-white border-0`}
                >
                  {ticket.priority === "high"
                    ? "Yüksek"
                    : ticket.priority === "medium"
                      ? "Orta"
                      : "Düşük"}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${ticket.status === "open" ? "bg-green-500" : "bg-yellow-500"} text-white border-0`}
                >
                  {ticket.status === "open" ? "Açık" : "Beklemede"}
                </Badge>
                <Button
                  variant="ghost"
                  className="text-purple-500 hover:text-purple-400"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {ticket.messages}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Support;
