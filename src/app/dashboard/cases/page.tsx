
"use client";

import { useState, useEffect } from "react";
import { getCases, updateCase, deleteCase } from "@/lib/case-store";
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
  Edit2, 
  Trash2, 
  Filter,
  Loader2,
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  Activity,
  Phone
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MalariaCase } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

export default function CaseManagementPage() {
  const { toast } = useToast();
  const [cases, setCases] = useState<MalariaCase[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<MalariaCase | null>(null);
  const [viewingCase, setViewingCase] = useState<MalariaCase | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCases(getCases());
  }, []);

  const filteredCases = cases.filter(c => 
    c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCase = (id: string, name: string) => {
    if (confirm(`Are you sure you want to archive the case for ${name}?`)) {
      const updated = deleteCase(id);
      setCases(updated);
      toast({
        title: "Action Successful",
        description: `Case ${id} (${name}) has been archived.`,
        variant: "destructive"
      });
    }
  };

  const handleEditClick = (caseItem: MalariaCase) => {
    setEditingCase({ ...caseItem });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (caseItem: MalariaCase) => {
    setViewingCase(caseItem);
    setIsViewDialogOpen(true);
  };

  const handleUpdateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;
    setIsSubmitting(true);
    
    // Faster response time (300ms instead of 800ms)
    setTimeout(() => {
      const updated = updateCase(editingCase);
      setCases(updated);
      toast({
        title: "Success",
        description: `Medical records for ${editingCase.patientName} have been updated.`,
        className: "bg-green-600 text-white",
      });
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
    }, 300);
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const caseToUpdate = cases.find(c => c.id === id);
    if (!caseToUpdate) return;

    const nextStatus = currentStatus === 'Recovered' ? 'Under Treatment' : 'Recovered';
    const updated = updateCase({ ...caseToUpdate, status: nextStatus as any });
    setCases(updated);
    
    toast({
      title: "Status Updated",
      description: `Case ${id} status moved to ${nextStatus}.`,
      className: "bg-primary text-white"
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Case Registry</h1>
          <p className="text-muted-foreground font-medium">Manage patient records and update treatment progress.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="font-bold border-primary/20 text-primary">
             <Filter className="mr-2 h-4 w-4" /> Filter
           </Button>
           <Button size="sm" className="font-bold shadow-md">Export PDF Report</Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients, IDs, or areas..."
            className="pl-9 bg-white border-slate-200 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b">
            <TableRow>
              <TableHead className="font-bold text-slate-700">CASE ID</TableHead>
              <TableHead className="font-bold text-slate-700">PATIENT INFO</TableHead>
              <TableHead className="font-bold text-slate-700">LOCATION</TableHead>
              <TableHead className="font-bold text-slate-700">TEST</TableHead>
              <TableHead className="font-bold text-slate-700">STATUS</TableHead>
              <TableHead className="font-bold text-slate-700">DATE</TableHead>
              <TableHead className="text-right font-bold text-slate-700">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((caseItem) => (
              <TableRow key={caseItem.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-mono text-xs font-bold text-primary">{caseItem.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{caseItem.patientName}</span>
                    <span className="text-[10px] text-muted-foreground font-semibold">{caseItem.age}Y | {caseItem.gender}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">{caseItem.area}</TableCell>
                <TableCell>
                  <Badge variant={caseItem.testResult === 'Positive' ? 'destructive' : caseItem.testResult === 'Negative' ? 'secondary' : 'outline'} className="text-[10px] uppercase font-bold">
                    {caseItem.testResult}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={
                    caseItem.status === 'Recovered' ? 'bg-green-100 text-green-700 border-green-200' :
                    caseItem.status === 'Under Treatment' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    'bg-slate-100 text-slate-700 border-slate-200'
                  }>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-medium text-slate-500">
                  {format(new Date(caseItem.reportedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleViewClick(caseItem)}>
                        <Eye className="mr-2 h-4 w-4 text-blue-500" /> View File
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditClick(caseItem)}>
                        <Edit2 className="mr-2 h-4 w-4 text-amber-500" /> Edit Case
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(caseItem.id, caseItem.status)}>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Toggle Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive font-bold" onClick={() => handleDeleteCase(caseItem.id, caseItem.patientName)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Archive Case
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredCases.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                    <Search className="h-8 w-8 opacity-20" />
                    <p className="font-bold">No matching records found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Case Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          {viewingCase && (
            <div className="animate-in fade-in duration-200">
              <div className="bg-primary p-6 text-white">
                <DialogHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                        <Eye className="h-6 w-6" />
                        Patient Case File
                      </DialogTitle>
                      <DialogDescription className="text-blue-100 mt-1">
                        Detailed overview for Case {viewingCase.id}
                      </DialogDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white text-primary font-bold px-3 py-1">
                      {viewingCase.status}
                    </Badge>
                  </div>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <User className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Patient Name</p>
                        <p className="text-sm font-bold text-slate-800">{viewingCase.patientName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Demographics</p>
                        <p className="text-sm font-bold text-slate-800">{viewingCase.age} Years | {viewingCase.gender}</p>
                      </div>
                    </div>
                    {viewingCase.contactNumber && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <Phone className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Contact</p>
                          <p className="text-sm font-bold text-slate-800">{viewingCase.contactNumber}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <MapPin className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Location</p>
                        <p className="text-sm font-bold text-slate-800">{viewingCase.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Activity className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Test Result</p>
                        <Badge variant={viewingCase.testResult === 'Positive' ? 'destructive' : 'secondary'} className="h-5 text-[10px] font-bold">
                          {viewingCase.testResult}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-2">
                    <Activity className="h-3 w-3" /> Reported Symptoms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {viewingCase.symptoms.map((symptom, idx) => (
                      <Badge key={idx} variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 py-1">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                {viewingCase.treatment && (
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                    <p className="text-[10px] uppercase font-bold text-blue-700 tracking-wider mb-2">Prescribed Treatment</p>
                    <p className="text-sm font-medium text-slate-800">{viewingCase.treatment}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-[10px] text-muted-foreground bg-slate-50 p-3 rounded-lg border">
                  <div>
                    <span className="font-bold">Reported By:</span> {viewingCase.reportedBy}
                  </div>
                  <div className="text-right">
                    <span className="font-bold">Last Updated:</span> {format(new Date(viewingCase.updatedAt), "PPP p")}
                  </div>
                </div>
              </div>

              <DialogFooter className="p-6 bg-slate-50 border-t">
                <Button variant="outline" className="font-bold" onClick={() => setIsViewDialogOpen(false)}>Close Record</Button>
                <Button className="font-bold" onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditClick(viewingCase);
                }}>
                  <Edit2 className="h-4 w-4 mr-2" /> Modify Record
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Case Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {editingCase && (
            <form onSubmit={handleUpdateCase}>
              <DialogHeader>
                <DialogTitle className="text-primary flex items-center gap-2">
                  <Edit2 className="h-5 w-5" />
                  Edit Patient Record
                </DialogTitle>
                <DialogDescription>
                  Modify details for Case {editingCase.id}. All changes are logged for audit.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Patient Full Name</Label>
                  <Input 
                    id="edit-name" 
                    value={editingCase.patientName} 
                    onChange={(e) => setEditingCase({...editingCase, patientName: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-age">Age</Label>
                    <Input 
                      id="edit-age" 
                      type="number" 
                      value={editingCase.age} 
                      onChange={(e) => setEditingCase({...editingCase, age: Number(e.target.value)})}
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Current Status</Label>
                    <Select 
                      value={editingCase.status} 
                      onValueChange={(val: any) => setEditingCase({...editingCase, status: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reported">Reported</SelectItem>
                        <SelectItem value="Under Treatment">Under Treatment</SelectItem>
                        <SelectItem value="Recovered">Recovered</SelectItem>
                        <SelectItem value="Deceased">Deceased</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-area">Area / Region</Label>
                  <Input 
                    id="edit-area" 
                    value={editingCase.area} 
                    onChange={(e) => setEditingCase({...editingCase, area: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
