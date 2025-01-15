import { api } from "./api";

export const indexerApi = {
  // Tekli indexleme
  indexUrl: async (url: string) => {
    return await api.post("/indexer/index", { url });
  },

  // Toplu indexleme
  bulkIndex: async (urls: string[]) => {
    return await api.post("/indexer/bulk-index", { urls });
  },

  // İndexleme durumu kontrolü
  checkStatus: async (id: string) => {
    return await api.get(`/indexer/status/${id}`);
  },

  // Premium indexleme özellikleri
  premiumIndex: async (url: string) => {
    return await api.post("/indexer/premium", { url });
  },

  // İndexleme raporları
  getReports: async () => {
    return await api.get("/indexer/reports");
  },

  // İndexleme ayarları
  getSettings: async () => {
    return await api.get("/indexer/settings");
  },

  updateSettings: async (settings: any) => {
    return await api.put("/indexer/settings", settings);
  },
};
