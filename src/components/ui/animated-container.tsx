import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedContainer({
  children,
  className,
  delay = 0,
}: AnimatedContainerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      className={cn(
        "bg-gradient-to-br from-card/50 to-card border border-border/50 shadow-xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({
  children,
  className,
  delay = 0,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
