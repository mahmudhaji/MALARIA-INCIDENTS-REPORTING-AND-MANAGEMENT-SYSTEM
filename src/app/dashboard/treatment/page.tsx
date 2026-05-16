
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Activity, MapPin, Search, CheckCircle2 } from "lucide-react";
import { getCases, updateCase } from "@/lib/case-store";
import { MalariaCase } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const treatmentSchema = z.object({
  caseId: z.string().min(1, "Case ID is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  medication: z.string().min(1, "Medication is required"),
  dosage: z.string().min(1, "Dosage is required"),
  followUpDate: z.string().min(1, "Follow-up date is required"),
  outcome: z.string().min(1, "Outcome is required"),
});

type TreatmentFormValues = z.infer<typeof treatmentSchema>;

export default function TreatmentFormPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cases, setCases] = useState<MalariaCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<MalariaCase | null>(null);

  useEffect(() => {
    // Fetch cases that are either Reported or already Under Treatment
    const allCases = getCases();
    setCases(allCases.filter(c => c.testResult === 'Positive'));
  }, []);

  const form = useForm<TreatmentFormValues>({
    resolver: zodResolver(treatmentSchema),
    defaultValues: {
      caseId: "",
      diagnosis: "Uncomplicated Malaria",
      medication: "",
      dosage: "",
      followUpDate: "",
      outcome: "Improving",
    },
  });

  const handleCaseChange = (id: string) => {
    const caseData = cases.find(c => c.id === id);
    if (caseData) {
      setSelectedCase(caseData);
      form.setValue("caseId", id);
      // Pre-fill if already exists
      if (caseData.treatment) {
        // Logic to extract medication/dosage if they were concatenated could go here
        // For prototype, we just clear previous errors
      }
    }
  };

  function onSubmit(values: TreatmentFormValues) {
    if (!selectedCase) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const updatedData: MalariaCase = {
        ...selectedCase,
        status: values.outcome === 'Recovered' ? 'Recovered' : 'Under Treatment',
        treatment: `${values.medication} (${values.dosage})`,
        updatedAt: new Date().toISOString()
      };

      updateCase(updatedData);

      toast({
        title: "Treatment Record Updated",
        description: `Clinical details for ${selectedCase.patientName} have been saved successfully.`,
        className: "bg-green-600 text-white",
      });
      
      setIsSubmitting(false);
      form.reset();
      setSelectedCase(null);
    }, 400);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Clinical Treatment Form</h1>
        <p className="text-muted-foreground font-medium">Log diagnosis and prescribe medication for confirmed malaria cases.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Search className="h-4 w-4" />
                Select Patient Case
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Active Case ID</label>
                  <Select onValueChange={handleCaseChange} value={form.watch("caseId")}>
                    <SelectTrigger className="bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Choose a case ID..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cases.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.id} - {c.patientName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCase ? (
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-4 animate-in slide-in-from-left-2 duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Patient</p>
                        <p className="text-sm font-bold text-slate-800">{selectedCase.patientName}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <p className="text-[10px] uppercase font-bold text-muted-foreground">Age/Gender</p>
                         <p className="text-xs font-semibold">{selectedCase.age}Y | {selectedCase.gender}</p>
                       </div>
                       <div>
                         <p className="text-[10px] uppercase font-bold text-muted-foreground">Location</p>
                         <p className="text-xs font-semibold truncate flex items-center gap-1">
                           <MapPin className="h-3 w-3" /> {selectedCase.area}
                         </p>
                       </div>
                    </div>
                    <Separator className="bg-blue-100" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2 flex items-center gap-1">
                        <Activity className="h-3 w-3" /> Reported Symptoms
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedCase.symptoms.map((s, i) => (
                          <Badge key={i} variant="outline" className="bg-white text-[10px] px-1.5 py-0">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-slate-50/50">
                    <User className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium">Select a Case ID above to view patient medical history and symptoms.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-primary text-white py-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                Medical Assessment & Prescription
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="diagnosis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-slate-600">Diagnosis Detail *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-50 border-slate-200">
                                <SelectValue placeholder="Select final diagnosis" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Uncomplicated Malaria">Uncomplicated Malaria</SelectItem>
                              <SelectItem value="Severe Malaria">Severe Malaria</SelectItem>
                              <SelectItem value="Recurrent Malaria">Recurrent (Relapse) Malaria</SelectItem>
                              <SelectItem value="Complicated (Organ Failure)">Complicated (Organ Failure)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="medication"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-600">Medication *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-slate-50 border-slate-200">
                                  <SelectValue placeholder="Prescribe drug" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Artemether-lumefantrine (AL)">AL (ACT)</SelectItem>
                                <SelectItem value="Dihydroartemisinin-piperaquine">DHA-PPQ (ACT)</SelectItem>
                                <SelectItem value="Injectable Quinine">Injectable Quinine</SelectItem>
                                <SelectItem value="Artesunate Injection">Artesunate Injection</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dosage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-600">Dosage Regimen *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2 tabs BID x 3 days" {...field} className="bg-slate-50 border-slate-200" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="followUpDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-600">Review Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="bg-slate-50 border-slate-200" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="outcome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-slate-600">Clinical Outcome *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-slate-50 border-slate-200">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Improving">Improving (Stable)</SelectItem>
                                <SelectItem value="Deteriorating">Deteriorating (Critical)</SelectItem>
                                <SelectItem value="Recovered">Full Recovery (Discharged)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-primary hover:bg-primary/90 font-bold shadow-lg"
                      disabled={isSubmitting || !selectedCase}
                    >
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Medical Record...</>
                      ) : (
                        <><CheckCircle2 className="mr-2 h-4 w-4" /> Finalize Treatment</>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="px-8 font-bold border-slate-200 text-slate-600"
                      onClick={() => {
                        form.reset();
                        setSelectedCase(null);
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
