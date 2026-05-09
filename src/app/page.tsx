import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-destructive/20 mb-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16">
               {/* Simple Mosquito Icon Surrogate */}
               <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-destructive"/>
               <path d="M30,50 L70,50 M50,30 L50,70" stroke="currentColor" strokeWidth="2" className="text-destructive"/>
               <line x1="35" y1="35" x2="65" y2="65" stroke="currentColor" strokeWidth="2" className="text-destructive"/>
               <line x1="65" y1="35" x2="35" y2="65" stroke="currentColor" strokeWidth="2" className="text-destructive"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Malaria Incidents Reporting and Management System
          </h1>
          <p className="text-sm text-slate-500">Please sign in to your account</p>
        </div>

        <Card className="shadow-lg border-none">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input id="username" placeholder="Username" className="pl-10" />
                <span className="absolute left-3 top-2.5 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type="password" placeholder="Password" className="pl-10" />
                <span className="absolute left-3 top-2.5 text-slate-400">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
            <div className="text-center">
              <Link href="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}