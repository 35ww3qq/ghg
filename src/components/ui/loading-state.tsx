import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center p-4"
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </motion.div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="h-12 w-12 rounded-full bg-gradient-primary p-1">
          <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </div>
        <p className="text-muted-foreground">Yükleniyor...</p>
      </motion.div>
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
