import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      // Başarılı girişten sonra yönlendirme
      navigate(email.includes("admin") ? "/admin" : "/dashboard");
    } catch (err) {
      setError("Geçersiz e-posta veya şifre");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1f2e] p-4">
      <Card className="w-full max-w-md bg-[#2a2b3d] border-0 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Hoş Geldiniz</h1>
          <p className="text-gray-400">Devam etmek için giriş yapın</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="email"
                placeholder="E-posta"
                className="pl-10 bg-[#1e1f2e] border-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="password"
                placeholder="Şifre"
                className="pl-10 bg-[#1e1f2e] border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>

          <div className="text-center text-sm text-gray-400">
            <p>Demo Hesapları:</p>
            <p>Admin: admin@example.com / admin123</p>
            <p>Müşteri: client@example.com / client123</p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
