import { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "@/components/ui/use-toast";

// Rate limiting için istek sayacı
const requestCounts = new Map<string, { count: number; timestamp: number }>();

// Rate limit kontrolü
export const rateLimitMiddleware = (config: AxiosRequestConfig) => {
  const endpoint = config.url || "";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 dakika
  const maxRequests = 60; // Dakikada maksimum 60 istek

  const current = requestCounts.get(endpoint) || { count: 0, timestamp: now };

  // Zaman penceresi dışındaysa sıfırla
  if (now - current.timestamp > windowMs) {
    current.count = 0;
    current.timestamp = now;
  }

  // İstek limitini kontrol et
  if (current.count >= maxRequests) {
    toast({
      title: "Hata",
      description: "Çok fazla istek gönderildi. Lütfen biraz bekleyin.",
      variant: "destructive",
    });
    return Promise.reject(new Error("Rate limit exceeded"));
  }

  // İstek sayacını güncelle
  current.count++;
  requestCounts.set(endpoint, current);

  return config;
};

// Input validasyonu
export const validateInput = (data: any, schema: any) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: "Validasyon Hatası",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
};

// Hata işleme
export const handleApiError = (error: AxiosError) => {
  let message = "Bir hata oluştu";

  if (error.response) {
    // HTTP hata durumları
    switch (error.response.status) {
      case 400:
        message = "Geçersiz istek";
        break;
      case 401:
        message = "Oturum süresi doldu";
        break;
      case 403:
        message = "Yetkisiz erişim";
        break;
      case 404:
        message = "Kaynak bulunamadı";
        break;
      case 429:
        message = "Çok fazla istek gönderildi";
        break;
      case 500:
        message = "Sunucu hatası";
        break;
      default:
        message = "Bir hata oluştu";
    }
  } else if (error.request) {
    message = "Sunucuya ulaşılamıyor";
  }

  toast({
    title: "Hata",
    description: message,
    variant: "destructive",
  });

  return Promise.reject(error);
};
