
"use client";

import { useState } from "react";
import { MOCK_CASES } from "@/lib/mock-data";
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
import { Search, MoreVertical, Eye, FileEdit, FileText, Filter } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TreatmentRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Only show cases that have treatment info or are positive
  const treatmentRecords = MOCK_CASES.filter(c => 
    c.testResult === 'Positive' &&
    (c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Treatment Records</h1>
          <p className="text-muted-foreground">Manage and track medical treatment reports for all positive malaria cases.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm">
             <Filter className="mr-2 h-4 w-4" /> Filter Records
           </Button>
           <Button size="sm">Download PDF Report</Button>
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
            TREATMENT REPORT LISTING
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
                      <span className="font-semibold text-sm">{record.patientName}</span>
                      <span className="text-[10px] text-muted-foreground">{record.age}y, {record.gender}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] bg-red-50 text-red-700 border-red-100">
                      Confirmed Malaria
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {record.treatment || "Not Assigned"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(record.updatedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      record.status === 'Recovered' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                      record.status === 'Under Treatment' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                      'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4" /> Update Treatment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {treatmentRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No treatment reports found.
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
