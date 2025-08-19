import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';
import { 
  Home, 
  Building2, 
  Users, 
  Calendar, 
  PenTool, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  Plus,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
  isActive?: boolean;
}

const navigation: NavItem[] = [
  { name: "דשבורד", icon: Home, href: "/" },
  { name: "נכסים", icon: Building2, href: "/properties", badge: 12 },
  { name: "לקוחות", icon: Users, href: "/clients", badge: 5 },
  { name: "משימות", icon: Calendar, href: "/tasks", badge: 3 },
  { name: "מעצב באנרים", icon: PenTool, href: "/designer" },
  { name: "דוחות", icon: BarChart3, href: "/reports" },
  { name: "הגדרות", icon: Settings, href: "/settings" },
];

export function DashboardNav() {
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  const userInitials = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                RealSmart
              </h1>
              <p className="text-xs text-muted-foreground">הנדל״ן שלך, חכם יותר</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "relative gap-2 transition-all duration-200",
                      isActive && "bg-gradient-primary shadow-md hover:shadow-lg"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors",
                searchFocused ? "text-primary" : "text-muted-foreground"
              )} />
              <input
                type="text"
                placeholder="חיפוש חכם..."
                className={cn(
                  "w-64 h-9 pl-4 pr-10 rounded-lg border bg-background/50 transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  searchFocused && "bg-background shadow-md"
                )}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* Add New */}
            <Button size="sm" className="bg-gradient-success hover:shadow-lg transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              הוסף חדש
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>פרופיל</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>התנתק</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}