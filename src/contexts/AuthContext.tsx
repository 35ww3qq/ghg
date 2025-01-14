import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  role: "admin" | "client";
  name: string;
  credits?: number;
  status?: "active" | "suspended";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify token and get user data
          const response = await api.auth.verifyToken();
          if (response.success && response.data) {
            setUser(response.data.user);
          } else {
            // Token is invalid
            localStorage.removeItem("token");
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await api.auth.login(email, password);

      if (response.success && response.data) {
        const { token, user } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        toast({
          title: "Başarılı",
          description: "Giriş başarılı",
        });
        navigate(user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        throw new Error(response.error || "Giriş başarısız");
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Giriş başarısız",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await api.auth.register(data);

      if (response.success && response.data) {
        const { token, user } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        toast({
          title: "Başarılı",
          description: "Kayıt başarılı",
        });
        navigate("/dashboard");
      } else {
        throw new Error(response.error || "Kayıt başarısız");
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Kayıt başarısız",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } finally {
      setUser(null);
      localStorage.removeItem("token");
      toast({
        title: "Başarılı",
        description: "Çıkış yapıldı",
      });
      navigate("/login");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await api.auth.resetPassword(email);

      if (response.success) {
        toast({
          title: "Başarılı",
          description:
            "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi",
        });
      } else {
        throw new Error(response.error || "Şifre sıfırlama başarısız");
      }
    } catch (error) {
      toast({
        title: "Hata",
        description:
          error instanceof Error ? error.message : "Şifre sıfırlama başarısız",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      const response = await api.auth.updateProfile(data);

      if (response.success && response.data) {
        setUser(response.data);
        toast({
          title: "Başarılı",
          description: "Profil güncellendi",
        });
      } else {
        throw new Error(response.error || "Profil güncelleme başarısız");
      }
    } catch (error) {
      toast({
        title: "Hata",
        description:
          error instanceof Error
            ? error.message
            : "Profil güncelleme başarısız",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
