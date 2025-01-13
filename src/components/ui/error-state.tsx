import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "./button";
import { motion } from "framer-motion";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Bir hata oluştu",
  message = "İşlem sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="mb-6 rounded-full bg-destructive/10 p-3 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-6 text-muted-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Tekrar Dene
        </Button>
      )}
    </motion.div>
  );
}

export function ErrorPage({
  title = "Sayfa Bulunamadı",
  message = "Aradığınız sayfa bulunamadı veya erişim izniniz yok.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md text-center"
      >
        <ErrorState title={title} message={message} onRetry={onRetry} />
      </motion.div>
    </div>
  );
}
