
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  CalendarDays, 
  ChefHat, 
  ClipboardList, 
  Home, 
  Settings, 
  Users, 
  Coffee, 
  Menu,
  BookOpen
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem = ({ to, icon, label, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-restaurant-gold text-restaurant-dark font-medium"
          : "text-white/70 hover:text-white hover:bg-white/10"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function DashboardSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="h-screen fixed left-0 top-0 z-40 flex w-64 flex-col bg-restaurant-primary text-white">
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Coffee size={24} className="text-restaurant-gold" />
          <span className="text-lg font-playfair font-medium tracking-wider">City West Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Main
            </h2>
            <div className="space-y-1">
              <SidebarItem
                to="/dashboard"
                icon={<Home size={20} />}
                label="Dashboard"
                isActive={pathname === '/dashboard'}
              />
              <SidebarItem
                to="/dashboard/bookings"
                icon={<CalendarDays size={20} />}
                label="Reservations"
                isActive={pathname.includes('/dashboard/bookings')}
              />
              <SidebarItem
                to="/dashboard/orders"
                icon={<ClipboardList size={20} />}
                label="Orders"
                isActive={pathname.includes('/dashboard/orders')}
              />
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Management
            </h2>
            <div className="space-y-1">
              <SidebarItem
                to="/dashboard/menu"
                icon={<Menu size={20} />}
                label="Menu Items"
                isActive={pathname.includes('/dashboard/menu')}
              />
              <SidebarItem
                to="/dashboard/tables"
                icon={<BookOpen size={20} />}
                label="Tables"
                isActive={pathname.includes('/dashboard/tables')}
              />
              <SidebarItem
                to="/dashboard/team"
                icon={<Users size={20} />}
                label="Team"
                isActive={pathname.includes('/dashboard/team')}
              />
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              System
            </h2>
            <div className="space-y-1">
              <SidebarItem
                to="/dashboard/settings"
                icon={<Settings size={20} />}
                label="Settings"
                isActive={pathname.includes('/dashboard/settings')}
              />
            </div>
          </div>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
            <ChefHat size={18} className="text-restaurant-gold" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-white/60">Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
