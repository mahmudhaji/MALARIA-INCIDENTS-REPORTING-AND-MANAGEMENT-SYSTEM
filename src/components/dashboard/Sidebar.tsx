
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCurrentUser, logout } from "@/lib/auth-store";
import { User as UserType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  Map as MapIcon, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  ChevronDown,
  Users,
  Stethoscope,
  FileText
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<UserType | null>(null);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully signed out.",
    });
    router.push("/");
  };

  const getNavigation = () => {
    if (!user) return [];

    const baseNav = [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ];

    if (user.role === 'CHW') {
      return [
        ...baseNav,
        { name: 'Report Case', href: '/dashboard/report', icon: PlusCircle },
        { name: 'My Submissions', href: '/dashboard/cases', icon: ClipboardList },
      ];
    }

    if (user.role === 'Doctor') {
      return [
        ...baseNav,
        { name: 'Report Case', href: '/dashboard/report', icon: PlusCircle },
        { name: 'Patient Cases', href: '/dashboard/cases', icon: ClipboardList },
        { name: 'Treatment Form', href: '/dashboard/treatment', icon: Stethoscope },
        { name: 'Treatment Records', href: '/dashboard/treatment/records', icon: FileText },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
      ];
    }

    if (user.role === 'Health Officer') {
      return [
        ...baseNav,
        { name: 'Incident Map', href: '/dashboard/map', icon: MapIcon },
        { name: 'Data Analysis', href: '/dashboard/analytics', icon: BarChart3 },
        { name: 'Notifications', href: '/dashboard/alerts', icon: Bell },
      ];
    }

    if (user.role === 'Administrator') {
      return [
        ...baseNav,
        { 
          name: 'User Management', 
          href: '/dashboard/users', 
          icon: Users,
          subItems: [
            { name: 'CHWs', href: '/dashboard/users?role=CHW' },
            { name: 'Doctors', href: '/dashboard/users?role=Doctor' },
            { name: 'Health Officers', href: '/dashboard/users?role=Health%20Officer' },
          ]
        },
        { name: 'System Alerts', href: '/dashboard/alerts', icon: Bell },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
      ];
    }

    return baseNav;
  };

  const navigation = getNavigation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 shadow-2xl">
      <div className="p-6 flex items-center gap-3 bg-sidebar-accent/30 border-b border-sidebar-border">
        <div className="w-10 h-10 bg-destructive rounded-xl flex items-center justify-center text-white font-bold shadow-lg transform -rotate-3">
           <svg viewBox="0 0 100 100" className="w-7 h-7">
               <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="6"/>
               <line x1="30" y1="30" x2="70" y2="70" stroke="white" strokeWidth="6"/>
            </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black text-white leading-tight">PataMalaria</span>
          <span className="text-[10px] text-sidebar-foreground/50 font-bold uppercase tracking-widest">
            {user?.role || "System"}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <h3 className="px-3 text-[10px] font-bold text-sidebar-foreground/30 uppercase tracking-[0.2em] mb-4">Main Menu</h3>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const hasSubItems = item.subItems && item.subItems.length > 0;

              if (hasSubItems) {
                return (
                  <Collapsible
                    key={item.name}
                    open={isUsersOpen}
                    onOpenChange={setIsUsersOpen}
                    className="w-full"
                    onMouseEnter={() => setIsUsersOpen(true)}
                    onMouseLeave={() => setIsUsersOpen(false)}
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        className={cn(
                          "flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-white",
                          (isActive || pathname.startsWith('/dashboard/users')) && "bg-sidebar-accent/50 text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </div>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isUsersOpen && "rotate-180")} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-12 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block py-2 text-xs font-medium text-sidebar-foreground/40 hover:text-white transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/30" 
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-sidebar-foreground/40")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/10">
        <div className="p-3 bg-sidebar-accent/20 rounded-xl mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.[0] || "?"}
          </div>
          <div className="flex flex-col min-w-0">
             <span className="text-xs font-bold text-white truncate">{user?.name || "User"}</span>
             <span className="text-[10px] text-sidebar-foreground/40 truncate">{user?.email || ""}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-lg transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
