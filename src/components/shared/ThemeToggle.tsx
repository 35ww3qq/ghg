import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeToggleProps {
  theme?: "light" | "dark";
  onToggle?: () => void;
}

const ThemeToggle = ({
  theme = "light",
  onToggle = () => {},
}: ThemeToggleProps) => {
  return (
    <div className="bg-background p-2 rounded-md">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-9 w-9 rounded-md"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all" />
              ) : (
                <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ThemeToggle;
