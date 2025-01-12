import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface MetricsDisplayProps {
  metrics?: {
    da: number;
    pa: number;
    spamScore: number;
  };
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
}

const defaultMetrics = {
  da: 35,
  pa: 28,
  spamScore: 2,
};

const MetricsDisplay = ({
  metrics = defaultMetrics,
  showLabels = true,
  size = "md",
}: MetricsDisplayProps) => {
  const sizeClasses = {
    sm: "p-2 text-sm",
    md: "p-4 text-base",
    lg: "p-6 text-lg",
  };

  const getProgressColor = (value: number, type: "da" | "pa" | "spamScore") => {
    if (type === "spamScore") {
      return value <= 2
        ? "bg-green-500"
        : value <= 5
          ? "bg-yellow-500"
          : "bg-red-500";
    }
    return value >= 40
      ? "bg-green-500"
      : value >= 20
        ? "bg-yellow-500"
        : "bg-red-500";
  };

  return (
    <Card className="bg-white dark:bg-slate-900">
      <CardContent className={`space-y-4 ${sizeClasses[size]}`}>
        <div className="space-y-3">
          {/* Domain Authority */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              {showLabels && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Domain Authority</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Measures domain's predictive ranking strength</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              <Badge variant="outline">{metrics.da}/100</Badge>
            </div>
            <Progress
              value={metrics.da}
              className={`h-2 ${getProgressColor(metrics.da, "da")}`}
            />
          </div>

          {/* Page Authority */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              {showLabels && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Page Authority</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Predicts how well a page will rank</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              <Badge variant="outline">{metrics.pa}/100</Badge>
            </div>
            <Progress
              value={metrics.pa}
              className={`h-2 ${getProgressColor(metrics.pa, "pa")}`}
            />
          </div>

          {/* Spam Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              {showLabels && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Spam Score</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Lower score indicates less spammy content</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              <Badge variant="outline">{metrics.spamScore}/10</Badge>
            </div>
            <Progress
              value={metrics.spamScore * 10}
              className={`h-2 ${getProgressColor(metrics.spamScore, "spamScore")}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsDisplay;
