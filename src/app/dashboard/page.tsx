
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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileDown, Eye, User, Calendar, MapPin, Activity, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DashboardPage() {
  const { toast } = useToast();
  const [cases, setCases] = useState<MalariaCase[]>([]);
  const [managedUsers, setManagedUsers] = useState<any[]>([]);
  const [viewingCase, setViewingCase] = useState<MalariaCase | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
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

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Global system activity PDF has been downloaded successfully.",
        className: "bg-primary text-white",
      });
      setIsExporting(false);
    }, 800);
  };

  const handleViewDetails = (c: MalariaCase) => {
    setViewingCase(c);
    setIsViewOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Welcome, {currentUser?.name || "User"}</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
            {isAdmin ? "System Administration Overview" : "Surveillance Summary"}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleExport} disabled={isExporting} className="bg-slate-800 hover:bg-slate-700 shadow-lg font-bold">
            {isExporting ? "Generating..." : <><FileDown className="mr-2 h-4 w-4" /> Download Global PDF</>}
          </Button>
        )}
      </div>

      {isAdmin && (
        <div className="space-y-6">
          <div className="space-y-3">
             <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Staff Management</h3>
             <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <StatCard 
                title="Total CHWs" 
                value={userStats.chw} 
                variant="blue"
              />
              <StatCard 
                title="Medical Doctors" 
                value={userStats.doctor} 
                variant="blue"
              />
              <StatCard 
                title="Health Officers" 
                value={userStats.officer} 
                variant="blue"
              />
              <StatCard 
                title="Registered Users" 
                value={userStats.total} 
                variant="blue"
              />
            </div>
          </div>
          <Separator />
        </div>
      )}

      <div className="space-y-3">
        {isAdmin && <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Case & Treatment Overview</h3>}
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
      </div>

      <Card className="border shadow-sm overflow-hidden">
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
                <TableHead className="text-[11px] font-bold uppercase text-slate-500">Date</TableHead>
                <TableHead className="text-[11px] font-bold uppercase text-slate-500">Status</TableHead>
                <TableHead className="text-right text-[11px] font-bold uppercase text-slate-500">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="hover:bg-slate-50">
                  <TableCell className="text-sm font-mono font-bold text-primary">{caseItem.id}</TableCell>
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
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-primary font-bold hover:bg-primary/5"
                      onClick={() => handleViewDetails(caseItem)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {recentCases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-1">
                       <p className="font-bold">No data found.</p>
                       <p className="text-xs">Start by adding new field reports or users to see them here.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Case View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          {viewingCase && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-primary p-6 text-white relative">
                <DialogHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <DialogTitle className="text-2xl font-black text-white flex items-center gap-2">
                        MALARIA CASE FILE
                      </DialogTitle>
                      <DialogDescription className="text-blue-100 font-medium">
                        Comprehensive record for Case ID: {viewingCase.id}
                      </DialogDescription>
                    </div>
                    <Badge className="bg-white text-primary font-black px-4 py-1 text-xs">
                      {viewingCase.status.toUpperCase()}
                    </Badge>
                  </div>
                </DialogHeader>
              </div>

              <div className="p-8 space-y-8 bg-white">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <User className="h-3 w-3" /> Patient Identification
                      </p>
                      <p className="text-lg font-bold text-slate-800 leading-tight">{viewingCase.patientName}</p>
                      <p className="text-xs font-semibold text-slate-500">{viewingCase.age} Years Old | {viewingCase.gender}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Phone className="h-3 w-3" /> Contact Information
                      </p>
                      <p className="text-sm font-bold text-slate-700">{viewingCase.contactNumber || "No contact provided"}</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" /> Reported Location
                      </p>
                      <p className="text-sm font-bold text-slate-700">{viewingCase.area}</p>
                      <p className="text-[10px] font-mono text-slate-400">{viewingCase.latitude.toFixed(4)}, {viewingCase.longitude.toFixed(4)}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Activity className="h-3 w-3" /> Diagnostic Result
                      </p>
                      <Badge variant={viewingCase.testResult === 'Positive' ? 'destructive' : 'secondary'} className="font-bold px-3">
                        RDT: {viewingCase.testResult}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                   <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Activity className="h-3 w-3" /> Clinical Symptoms
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {viewingCase.symptoms.map((s, i) => (
                          <Badge key={i} variant="outline" className="bg-white border-slate-200 text-slate-600 font-semibold px-2">
                            {s}
                          </Badge>
                        ))}
                      </div>
                   </div>

                   {viewingCase.treatment && (
                     <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-2">Prescribed Treatment Regimen</p>
                        <p className="text-sm font-bold text-blue-900">{viewingCase.treatment}</p>
                     </div>
                   )}
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-100/50 p-4 rounded-lg">
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Field Officer ID</p>
                      <p className="text-xs font-bold text-slate-600">{viewingCase.reportedBy}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Last Registry Update</p>
                      <div className="flex items-center justify-end gap-1 text-xs font-bold text-slate-600">
                        <Clock className="h-3 w-3" /> {format(new Date(viewingCase.updatedAt), "MMM d, HH:mm")}
                      </div>
                   </div>
                </div>
              </div>

              <DialogFooter className="p-6 bg-slate-50 border-t">
                <Button variant="outline" className="font-bold w-full sm:w-auto" onClick={() => setIsViewOpen(false)}>Close Record</Button>
                <Button className="font-bold w-full sm:w-auto shadow-md" onClick={handleExport}>
                  <FileDown className="h-4 w-4 mr-2" /> Export Case PDF
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
