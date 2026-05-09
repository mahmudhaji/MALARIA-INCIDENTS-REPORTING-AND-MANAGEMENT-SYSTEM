
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
}

export function StatCard({ title, value, icon: Icon, description, trend, trendType }: StatCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-primary">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {trend && (
              <p className={`text-xs mt-2 font-medium ${
                trendType === 'up' ? 'text-red-500' : trendType === 'down' ? 'text-green-500' : 'text-muted-foreground'
              }`}>
                {trend}
              </p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
