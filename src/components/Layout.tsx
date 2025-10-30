import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Calendar, LayoutDashboard, LogOut, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Панель управления", href: "/dashboard", icon: LayoutDashboard },
  { name: "Пациенты", href: "/patients", icon: User },
  { name: "Календарь", href: "/calendar", icon: Calendar },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-sidebar-background transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between gap-2 border-b border-sidebar-border px-6">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-sidebar-foreground hidden sm:block">ВекЗдоровья</span>
              <span className="text-sm font-semibold text-sidebar-foreground sm:hidden">ВЗ</span>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                <span className="text-sm font-semibold">ДР</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Доктор Петров
                </p>
                <p className="text-xs text-muted-foreground truncate hidden sm:block">Реабилитолог</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-border bg-background lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="h-10 w-10"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">ВекЗдоровья</span>
            </div>
            <div className="w-10" /> {/* Spacer for center alignment */}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
