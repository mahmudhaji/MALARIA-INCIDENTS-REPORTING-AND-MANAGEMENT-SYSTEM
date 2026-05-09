
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Users,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { MOCK_STATS, TREND_DATA } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Line,
  LineChart
} from "recharts";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Overview</h1>
        <p className="text-muted-foreground">Welcome back, Health Officer Sarah. Here's a summary of malaria reports.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Reports" 
          value={MOCK_STATS.totalCases} 
          icon={Activity} 
          trend="+12% from last month"
          trendType="up"
        />
        <StatCard 
          title="Positive Rate" 
          value={`${MOCK_STATS.positiveRate}%`} 
          icon={AlertTriangle} 
          description="Avg. positivity"
          trend="-2% from last month"
          trendType="down"
        />
        <StatCard 
          title="Recovered Cases" 
          value={MOCK_STATS.recoveredCount} 
          icon={CheckCircle2} 
          trendType="neutral"
        />
        <StatCard 
          title="Active Hotspots" 
          value="4" 
          icon={Users} 
          description="Across 3 regions"
          trendType="up"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-md">
          <CardHeader>
            <CardTitle>Incidence Trend</CardTitle>
            <CardDescription>Daily reports for the current week</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ChartContainer config={{
                cases: { label: "New Cases", color: "hsl(var(--primary))" }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TREND_DATA}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest case updates from the field</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "John Doe", area: "Nairobi Central", status: "Positive", time: "2h ago" },
                { name: "Mary W.", area: "Mombasa Port", status: "Pending", time: "5h ago" },
                { name: "Peter K.", area: "Kisumu West", status: "Recovered", time: "1d ago" },
                { name: "Anna S.", area: "Eldoret North", status: "Under Treatment", time: "1d ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${activity.status === 'Positive' ? 'bg-red-500' : 'bg-primary'}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.area}</p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-primary hover:text-primary hover:bg-primary/10" asChild>
              <Link href="/dashboard/cases">
                View All Cases <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-md bg-primary text-white">
          <CardHeader>
            <CardTitle className="text-white">Need to report a case?</CardTitle>
            <CardDescription className="text-primary-foreground/80">Submit details for new malaria incidents quickly and easily.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/dashboard/report">
                Go to Reporting Form <PlusCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Regional Statistics</CardTitle>
            <CardDescription>Compare cases across monitored regions</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[
                 { name: "Coast Region", count: 420, percentage: 85 },
                 { name: "Lake Basin", count: 310, percentage: 65 },
                 { name: "Nairobi Area", count: 180, percentage: 40 },
               ].map((region, i) => (
                 <div key={i} className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="font-medium">{region.name}</span>
                     <span className="text-muted-foreground">{region.count} cases</span>
                   </div>
                   <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                     <div className="h-full bg-accent" style={{ width: `${region.percentage}%` }} />
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
