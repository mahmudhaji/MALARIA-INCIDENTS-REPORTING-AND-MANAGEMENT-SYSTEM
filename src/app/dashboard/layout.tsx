import { AppSidebar } from "@/components/dashboard/Sidebar";
import { UserNav } from "@/components/dashboard/UserNav";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-primary">MALARIA INCIDENTS REPORTING AND MANAGEMENT SYSTEM</h2>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}