
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
  ShieldCheck
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Report Case', href: '/dashboard/report', icon: PlusCircle },
  { name: 'Case Management', href: '/dashboard/cases', icon: ClipboardList },
  { name: 'Incident Map', href: '/dashboard/map', icon: MapIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Surge Alerts', href: '/dashboard/alerts', icon: Bell },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
          P
        </div>
        <span className="text-xl font-bold text-primary tracking-tight">PataMalaria</span>
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
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-1">
        <Link
          href="/dashboard/admin"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
        >
          <ShieldCheck className="h-4 w-4" />
          Admin Settings
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
