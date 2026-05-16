
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, MapPin, User, Activity, Loader2, CheckCircle2 } from "lucide-react";
import { saveCase } from "@/lib/case-store";
import { getCurrentUser } from "@/lib/auth-store";
import { MalariaCase } from "@/lib/types";

const reportSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(0).max(120),
  gender: z.enum(["Male", "Female", "Other"]),
  area: z.string().min(2, "Area is required"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  symptoms: z.string().min(5, "Please list at least one symptom"),
  testResult: z.enum(["Positive", "Negative", "Pending"]),
  contactNumber: z.string().optional(),
});

export default function ReportPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = getCurrentUser();

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      patientName: "",
      age: 0,
      gender: "Male",
      area: "",
      latitude: -1.2921,
      longitude: 36.8219,
      symptoms: "",
      testResult: "Pending",
      contactNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof reportSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const caseId = `CSE-${Math.floor(Math.random() * 9000) + 1000}`;
      const newCase: MalariaCase = {
        id: caseId,
        ...values,
        symptoms: values.symptoms.split(",").map(s => s.trim()),
        status: "Reported",
        reportedBy: currentUser?.id || "unknown",
        reportedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveCase(newCase);

      toast({
        title: "Incident Successfully Reported",
        description: `New case for ${values.patientName} has been logged and assigned Case ID: ${caseId}`,
        className: "bg-green-600 text-white border-none",
      });
      
      form.reset();
      setIsSubmitting(false);
      
      // Redirect to cases registry to show the table area with the new data
      router.push("/dashboard/cases");
    }, 1500);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">New Field Report</h1>
        <p className="text-muted-foreground font-medium italic">Accurate reporting saves lives. Ensure all mandatory fields marked with * are completed.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-none shadow-xl">
            <CardHeader className="flex flex-row items-center gap-4 bg-primary/5 rounded-t-lg">
              <div className="p-2 bg-primary/10 rounded-full border border-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Patient Information</CardTitle>
                <CardDescription>Demographic and identification details</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 pt-6">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter patient full name" {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Age *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Gender *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+254..." {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl">
            <CardHeader className="flex flex-row items-center gap-4 bg-primary/5 rounded-t-lg">
              <div className="p-2 bg-primary/10 rounded-full border border-primary/20">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Location Details</CardTitle>
                <CardDescription>Precise location of the incident report</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 pt-6">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="font-bold text-slate-600">Area / Sub-county *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Kibera Village 4, Nairobi" {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} className="bg-slate-50 border-slate-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl">
            <CardHeader className="flex flex-row items-center gap-4 bg-primary/5 rounded-t-lg">
              <div className="p-2 bg-primary/10 rounded-full border border-primary/20">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Clinical Overview</CardTitle>
                <CardDescription>Reported symptoms and initial screening</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Reported Symptoms *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g. High fever, persistent chills, headache, joint pain..." 
                        className="min-h-[120px] bg-slate-50 border-slate-200"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>Separate symptoms with commas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="testResult"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-600">Rapid Diagnostic Test (RDT) Result</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Select test outcome" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Positive">Positive (+)</SelectItem>
                        <SelectItem value="Negative">Negative (-)</SelectItem>
                        <SelectItem value="Pending">Pending / Not Conducted</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 pb-12">
            <Button variant="outline" type="button" size="lg" className="px-10 font-bold border-slate-200 text-slate-600 hover:bg-slate-50" onClick={() => form.reset()}>Clear Form</Button>
            <Button type="submit" size="lg" className="px-10 font-bold shadow-lg bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Report...</>
              ) : (
                <><CheckCircle2 className="mr-2 h-4 w-4" /> Submit Report</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
