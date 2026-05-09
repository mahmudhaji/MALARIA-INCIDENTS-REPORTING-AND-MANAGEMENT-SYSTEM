"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  Map as MapIcon, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  User,
  ShieldCheck
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Report Case', href: '/dashboard/report', icon: PlusCircle },
  { name: 'My Cases', href: '/dashboard/cases', icon: ClipboardList },
  { name: 'Notifications', href: '/dashboard/alerts', icon: Bell },
  { name: 'Incident Map', href: '/dashboard/map', icon: MapIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
           <svg viewBox="0 0 100 100" className="w-6 h-6">
               <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="4"/>
               <line x1="30" y1="30" x2="70" y2="70" stroke="white" strokeWidth="4"/>
            </svg>
        </div>
        <span className="text-lg font-bold text-white tracking-tight">PataMalaria</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white rounded-md"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}