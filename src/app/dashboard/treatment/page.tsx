
"use client";

import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

  const form = useForm<TreatmentFormValues>({
    resolver: zodResolver(treatmentSchema),
    defaultValues: {
      caseId: "CSE-0012",
      diagnosis: "",
      medication: "",
      dosage: "",
      followUpDate: "",
      outcome: "Improving",
    },
  });

  function onSubmit(values: TreatmentFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Treatment Saved",
        description: "The treatment details have been updated for case " + values.caseId,
      });
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-lg border-none overflow-hidden">
        <CardHeader className="bg-primary p-4">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            5. TREATMENT FORM (DOCTOR)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Add Treatment Details</h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="caseId"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 items-center gap-4 space-y-0">
                    <FormLabel className="text-sm font-bold text-slate-600">Case ID</FormLabel>
                    <FormControl className="col-span-2">
                      <Input {...field} className="bg-slate-50 border-slate-200" readOnly />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 items-center gap-4 space-y-0">
                    <FormLabel className="text-sm font-bold text-slate-600">Diagnosis <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="col-span-2">
                        <SelectTrigger className="bg-white border-slate-200">
                          <SelectValue placeholder="Select diagnosis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Uncomplicated Malaria">Uncomplicated Malaria</SelectItem>
                        <SelectItem value="Severe Malaria">Severe Malaria</SelectItem>
                        <SelectItem value="Recurrent Malaria">Recurrent Malaria</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="col-start-2 col-span-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medication"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 items-center gap-4 space-y-0">
                    <FormLabel className="text-sm font-bold text-slate-600">Medication <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="col-span-2">
                        <SelectTrigger className="bg-white border-slate-200">
                          <SelectValue placeholder="Select medication" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Artemisinin Combination Therapy (ACT)">Artemisinin Combination Therapy (ACT)</SelectItem>
                        <SelectItem value="Quinine">Quinine</SelectItem>
                        <SelectItem value="Chloroquine">Chloroquine</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="col-start-2 col-span-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 items-center gap-4 space-y-0">
                    <FormLabel className="text-sm font-bold text-slate-600">Dosage <span className="text-red-500">*</span></FormLabel>
                    <FormControl className="col-span-2">
                      <Input placeholder="e.g. 2 Tablets twice daily for 3 days" {...field} className="bg-white border-slate-200" />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="followUpDate"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 items-center gap-4 space-y-0">
                    <FormLabel className="text-sm font-bold text-slate-600">Follow-up Date <span className="text-red-500">*</span></FormLabel>
                    <FormControl className="col-span-2">
                      <Input type="date" {...field} className="bg-white border-slate-200" />
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outcome"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 items-center gap-4 space-y-0">
                    <FormLabel className="text-sm font-bold text-slate-600">Outcome <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="col-span-2">
                        <SelectTrigger className="bg-white border-slate-200">
                          <SelectValue placeholder="Select outcome" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Improving">Improving</SelectItem>
                        <SelectItem value="Stable">Stable</SelectItem>
                        <SelectItem value="Deteriorating">Deteriorating</SelectItem>
                        <SelectItem value="Recovered">Recovered</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="col-start-2 col-span-2" />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4 ml-[33.33%]">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 px-8 font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Treatment"}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="px-8 font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
                  onClick={() => form.reset()}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
