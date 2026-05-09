
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth-store";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { UserCircle, Lock, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Artificial delay for better UX
    setTimeout(() => {
      const user = login(username, password);
      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}! Accessing ${user.role} dashboard.`,
          className: "bg-primary text-white",
        });
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Unidentified credentials. Please check your username and password and try again.",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl border-4 border-primary/10 mb-2">
            <svg viewBox="0 0 100 100" className="w-12 h-12">
               <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"/>
               <path d="M30,50 L70,50 M50,30 L50,70" stroke="hsl(var(--destructive))" strokeWidth="3"/>
               <line x1="35" y1="35" x2="65" y2="65" stroke="hsl(var(--primary))" strokeWidth="3"/>
               <line x1="65" y1="35" x2="35" y2="65" stroke="hsl(var(--primary))" strokeWidth="3"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            PataMalaria Portal
          </h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Incident Surveillance System</p>
        </div>

        <Card className="shadow-2xl border-none overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <CardContent className="pt-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input 
                    id="username" 
                    placeholder="Enter your username" 
                    className="pl-10 h-12"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-slate-400">
                    <UserCircle className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="#" 
                    className="text-xs text-primary hover:underline font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Account Recovery",
                        description: "Please contact your system administrator to reset your password.",
                      });
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="absolute left-3 top-3.5 text-slate-400">
                     <Lock className="h-5 w-5" />
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-bold shadow-lg" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
              </Button>
            </form>
            <div className="text-center pt-2">
              <Link href="#" className="text-sm text-primary font-medium hover:underline">Trouble signing in? Contact IT Support</Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span>Security Compliant</span>
          <span>•</span>
          <span>Region V1.4</span>
        </div>
      </div>
    </div>
  );
}
