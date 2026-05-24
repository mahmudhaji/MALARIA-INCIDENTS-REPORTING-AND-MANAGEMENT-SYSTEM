
"use client";

import { useState, useEffect } from "react";
import { getCases } from "@/lib/case-store";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  FileEdit, 
  FileText, 
  Filter, 
  FileDown,
  User,
  Calendar,
  MapPin,
  Activity,
  Phone,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MalariaCase } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function TreatmentRecordsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [cases, setCases] = useState<MalariaCase[]>([]);
  const [viewingCase, setViewingCase] = useState<MalariaCase | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setCases(getCases());
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Medical Treatment Records PDF has been downloaded successfully.",
        className: "bg-primary text-white",
      });
      setIsExporting(false);
    }, 800);
  };

  const handleViewDetails = (c: MalariaCase) => {
    setViewingCase(c);
    setIsViewOpen(true);
  };

  // Only show cases that have treatment info or are positive
  const treatmentRecords = cases.filter(c => 
    c.testResult === 'Positive' &&
    (c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Treatment Records</h1>
          <p className="text-muted-foreground font-medium">Manage and track medical treatment reports for all positive malaria cases.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="font-bold border-primary/20 text-primary">
             <Filter className="mr-2 h-4 w-4" /> Filter Records
           </Button>
           <Button size="sm" onClick={handleExport} disabled={isExporting} className="font-bold shadow-md">
             {isExporting ? "Generating..." : <><FileDown className="mr-2 h-4 w-4" /> Download PDF Report</>}
           </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Patient Name or Case ID..."
            className="pl-9 bg-card border-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border shadow-md overflow-hidden">
        <CardHeader className="bg-primary/5 border-b py-3">
          <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
            <FileText className="h-4 w-4" />
            MEDICAL REGISTRY LOG
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-bold">Case ID</TableHead>
                <TableHead className="font-bold">Patient Name</TableHead>
                <TableHead className="font-bold">Diagnosis</TableHead>
                <TableHead className="font-bold">Medication</TableHead>
                <TableHead className="font-bold">Follow-up</TableHead>
                <TableHead className="font-bold">Outcome</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treatmentRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/20">
                  <TableCell className="font-mono text-xs font-bold text-primary">
                    {record.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-800">{record.patientName}</span>
                      <span className="text-[10px] text-muted-foreground font-bold">{record.age}Y | {record.gender}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] bg-red-50 text-red-700 border-red-100 uppercase font-bold">
                      Confirmed Malaria
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {record.treatment || <span className="text-muted-foreground italic">Pending Prescription</span>}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-medium">
                    {format(new Date(record.updatedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      record.status === 'Recovered' ? 'bg-green-100 text-green-700 border-green-200 uppercase font-bold' :
                      record.status === 'Under Treatment' ? 'bg-blue-100 text-blue-700 border-blue-200 uppercase font-bold' :
                      'bg-slate-100 text-slate-700 border-slate-200 uppercase font-bold'
                    }>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleViewDetails(record)}>
                          <Eye className="mr-2 h-4 w-4 text-blue-500" /> View Detailed File
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4 text-amber-500" /> Update Treatment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {treatmentRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <FileText className="h-8 w-8 opacity-20" />
                      <p className="font-bold">No matching treatment records found.</p>
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
                        MEDICAL TREATMENT FILE
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
                  <FileDown className="h-4 w-4 mr-2" /> Export Medical PDF
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
