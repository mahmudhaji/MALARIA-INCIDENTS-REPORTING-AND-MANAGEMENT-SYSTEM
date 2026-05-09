
import { AppSidebar } from "@/components/dashboard/Sidebar";
import { UserNav } from "@/components/dashboard/UserNav";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b bg-background/95 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-primary md:hidden">PataMalaria</h2>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
