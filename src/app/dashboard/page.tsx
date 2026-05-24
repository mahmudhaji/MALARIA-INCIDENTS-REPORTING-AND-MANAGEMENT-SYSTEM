
"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getCases } from "@/lib/case-store";
import { getManagedUsers } from "@/lib/user-store";
import { getCurrentUser } from "@/lib/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MalariaCase } from "@/lib/types";

export default function DashboardPage() {
  const [cases, setCases] = useState<MalariaCase[]>([]);
  const [managedUsers, setManagedUsers] = useState<any[]>([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    setCases(getCases());
    setManagedUsers(getManagedUsers());
  }, []);

  const isAdmin = currentUser?.role === 'Administrator';

  // Case Stats
  const stats = {
    total: cases.length,
    pending: cases.filter(c => c.status === 'Reported').length,
    treated: cases.filter(c => c.status === 'Recovered').length,
    active: cases.filter(c => c.status === 'Under Treatment').length
  };

  // User Stats (For Admin)
  const userStats = {
    total: managedUsers.length,
    chw: managedUsers.filter(u => u.role === 'CHW').length,
    doctor: managedUsers.filter(u => u.role === 'Doctor').length,
    officer: managedUsers.filter(u => u.role === 'Health Officer').length,
  };

  const recentCases = cases.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Welcome, {currentUser?.name || "User"}</h1>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
          {isAdmin ? "System Administration Dashboard" : "Surveillance Summary"}
        </p>
      </div>

      {isAdmin ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <StatCard 
            title="Total CHWs" 
            value={userStats.chw} 
            variant="blue"
          />
          <StatCard 
            title="Medical Doctors" 
            value={userStats.doctor} 
            variant="green"
          />
          <StatCard 
            title="Health Officers" 
            value={userStats.officer} 
            variant="orange"
          />
          <StatCard 
            title="Registered Users" 
            value={userStats.total} 
            variant="red"
          />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <StatCard 
            title="Total Cases Reported" 
            value={stats.total} 
            variant="blue"
          />
          <StatCard 
            title="Pending Review" 
            value={stats.pending} 
            variant="green"
          />
          <StatCard 
            title="Treated Cases" 
            value={stats.treated} 
            variant="orange"
          />
          <StatCard 
            title="Active Cases" 
            value={stats.active} 
            variant="red"
          />
        </div>
      )}

      <Card className="border shadow-sm">
        <CardHeader className="bg-slate-50 border-b py-3">
          <CardTitle className="text-sm font-bold text-slate-700">
            {isAdmin ? "Latest Registered Cases" : "Recent Case Submissions"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="text-[11px] font-bold uppercase text-slate-500">Case ID</TableHead>
                <TableHead className="text-[11px] font-bold uppercase text-slate-500">Patient Name</TableHead>
                <TableHead className="text-[11px] font-bold uppercase text-slate-500">Location</TableHead>
                <TableHead className="text-[11px] font-bold uppercase text-slate-500">Date Reported</TableHead>
                <TableHead className="text-[11px] font-bold uppercase text-slate-500">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="hover:bg-slate-50">
                  <TableCell className="text-sm font-medium text-slate-600">{caseItem.id}</TableCell>
                  <TableCell className="text-sm font-medium">{caseItem.patientName}</TableCell>
                  <TableCell className="text-sm text-slate-600">{caseItem.area}</TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {format(new Date(caseItem.reportedAt), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[10px] py-0",
                      caseItem.status === 'Recovered' ? 'bg-green-50 text-green-700 border-green-200' :
                      caseItem.status === 'Under Treatment' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    )}>
                      {caseItem.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {recentCases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-1">
                       <p className="font-bold">No data found.</p>
                       <p className="text-xs">Start by adding new field reports or users.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
