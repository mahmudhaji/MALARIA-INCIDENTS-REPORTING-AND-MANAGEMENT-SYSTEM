import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, HeartPulse, Activity, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E0F9E5] p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg text-white">
              <HeartPulse className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">PataMalaria</h1>
          </div>
          <h2 className="text-5xl font-extrabold text-[#1a4d23] leading-tight">
            Advanced Malaria <span className="text-primary">Surveillance</span> & Response
          </h2>
          <p className="text-lg text-[#2d5a35] max-w-md">
            A comprehensive reporting and management system for health workers to track, analyze, and eliminate malaria through data-driven insights and AI-powered surge detection.
          </p>
          <div className="flex gap-4">
             <Button size="lg" className="px-8" asChild>
               <Link href="/dashboard">Get Started</Link>
             </Button>
             <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
               Learn More
             </Button>
          </div>
        </div>

        <Card className="shadow-2xl border-none">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Secure Access</CardTitle>
            <CardDescription>Authorized personnel login only</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold">Role-Based Access</p>
                <p className="text-muted-foreground">CHWs, Doctors, and Officers have tailored interfaces based on their duties.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full h-12 text-base" asChild>
                <Link href="/dashboard">Login as Health Officer</Link>
              </Button>
              <Button variant="outline" className="w-full h-12 text-base border-primary/20 hover:bg-primary/5" asChild>
                <Link href="/dashboard">Login as Field CHW</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
             <p className="text-xs text-muted-foreground text-center">
               By logging in, you agree to the privacy policy and data security guidelines of the Ministry of Health.
             </p>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-24 text-[#2d5a35] text-sm font-medium flex gap-8">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" /> 24/7 Monitoring
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" /> HIPAA Compliant
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> AI Diagnostics
        </div>
      </div>
    </div>
  );
}
