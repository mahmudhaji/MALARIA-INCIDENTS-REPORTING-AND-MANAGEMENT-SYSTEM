
"use client";

import { useState } from "react";
import { MOCK_CASES as INITIAL_CASES } from "@/lib/mock-data";
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
import { Search, MoreVertical, Eye, Edit2, Trash2, Filter } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function CaseManagementPage() {
  const { toast } = useToast();
  const [cases, setCases] = useState(INITIAL_CASES);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = cases.filter(c => 
    c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCase = (id: string) => {
    if (confirm("Are you sure you want to archive this case?")) {
      setCases(cases.filter(c => c.id !== id));
      toast({
        title: "Case Archived",
        description: `Case ${id} has been moved to the archive.`,
        variant: "destructive"
      });
    }
  };

  const handleUpdateStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Recovered' ? 'Under Treatment' : 'Recovered';
    setCases(cases.map(c => c.id === id ? { ...c, status: nextStatus as any } : c));
    toast({
      title: "Status Updated",
      description: `Case ${id} status updated to ${nextStatus}.`,
      className: "bg-primary text-white"
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Case Management</h1>
          <p className="text-muted-foreground">Monitor and update statuses of all reported malaria cases.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm">
             <Filter className="mr-2 h-4 w-4" /> Filter
           </Button>
           <Button size="sm">Export Report</Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients, IDs, or areas..."
            className="pl-9 bg-card border-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-md overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Test Result</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reported Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((caseItem) => (
              <TableRow key={caseItem.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-primary">{caseItem.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{caseItem.patientName}</span>
                    <span className="text-xs text-muted-foreground">{caseItem.age}y, {caseItem.gender}</span>
                  </div>
                </TableCell>
                <TableCell>{caseItem.area}</TableCell>
                <TableCell>
                  <Badge variant={caseItem.testResult === 'Positive' ? 'destructive' : caseItem.testResult === 'Negative' ? 'secondary' : 'outline'}>
                    {caseItem.testResult}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={
                    caseItem.status === 'Recovered' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                    caseItem.status === 'Under Treatment' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                    'bg-gray-100 text-gray-700 hover:bg-gray-100'
                  }>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(caseItem.reportedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast({ title: "Viewing Case", description: `Loading details for ${caseItem.id}...` })}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(caseItem.id, caseItem.status)}>
                        <Edit2 className="mr-2 h-4 w-4" /> Toggle Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCase(caseItem.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Archive Case
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredCases.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No cases found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
