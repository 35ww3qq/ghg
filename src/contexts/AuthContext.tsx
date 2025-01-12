import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  role: "admin" | "client";
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Session kontrolü
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Örnek kullanıcılar (gerçek uygulamada API'den gelecek)
      const users = {
        "admin@example.com": {
          id: "1",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
          name: "Admin User",
        },
        "client@example.com": {
          id: "2",
          email: "client@example.com",
          password: "client123",
          role: "client",
          name: "Client User",
        },
      };

      const user = users[email as keyof typeof users];

      if (!user || user.password !== password) {
        throw new Error("Invalid credentials");
      }

      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword as User);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
