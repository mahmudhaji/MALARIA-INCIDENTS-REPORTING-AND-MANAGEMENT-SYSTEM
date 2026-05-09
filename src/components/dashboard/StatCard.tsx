import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  variant?: 'blue' | 'green' | 'orange' | 'red';
}

export function StatCard({ title, value, variant = 'blue' }: StatCardProps) {
  const variantClasses = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    orange: 'bg-orange-500 text-white',
    red: 'bg-red-500 text-white',
  };

  return (
    <Card className={cn("overflow-hidden border-none shadow-md", variantClasses[variant])}>
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-xs font-medium opacity-90">{title}</div>
      </CardContent>
    </Card>
  );
}