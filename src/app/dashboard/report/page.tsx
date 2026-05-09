
"use client";

import { useState } from "react";
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
import { FileText, MapPin, User, Activity } from "lucide-react";

const reportSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(0).max(120),
  gender: z.string(),
  area: z.string().min(2, "Area is required"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  symptoms: z.string().min(5, "Please list at least one symptom"),
  testResult: z.string(),
  contactNumber: z.string().optional(),
});

export default function ReportPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Incident Reported",
        description: "The case has been successfully logged in the system.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Report Malaria Incident</h1>
        <p className="text-muted-foreground">Complete the form below to report a new suspected or confirmed malaria case.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Personal details and contact info</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <FormField
                control= {form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter patient name" {...field} />
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
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+254..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Location Details</CardTitle>
                <CardDescription>Geographic location of the incident</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Area / Village Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Kibera Village 4" {...field} />
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
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
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
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Clinical Presentation</CardTitle>
                <CardDescription>Symptoms and initial test results</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reported Symptoms</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List symptoms separated by commas..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>Include onset time if known.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="testResult"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rapid Test / Microscopy Result</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Positive">Positive</SelectItem>
                        <SelectItem value="Negative">Negative</SelectItem>
                        <SelectItem value="Pending">Pending / Not Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => form.reset()}>Cancel</Button>
            <Button type="submit" className="px-8" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Report Incident"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
