import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  Settings,
  Users,
  Building2,
  LogOut,
  ChevronLeft,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: typeof LayoutDashboard;
  label: string;
  path: string;
}

interface AppSidebarProps {
  role: 'client' | 'admin';
}

const clientNavItems: NavItem[] = [
  { icon: Ticket, label: 'My Tickets', path: '/support/tickets' },
  { icon: HelpCircle, label: 'Help Center', path: '/support/help' },
  { icon: Settings, label: 'Settings', path: '/support/settings' },
];

const adminNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/support' },
  { icon: Ticket, label: 'All Tickets', path: '/admin/support/tickets' },
  { icon: Users, label: 'Team', path: '/admin/support/team' },
  { icon: Building2, label: 'Companies', path: '/admin/support/companies' },
  { icon: Settings, label: 'Settings', path: '/admin/support/settings' },
];

export function AppSidebar({ role }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = role === 'admin' ? adminNavItems : clientNavItems;

  return (
    <aside
      className={cn(
        'h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 border-r border-sidebar-border',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Ticket className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">SupportDesk</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'p-1.5 text-sidebar-foreground hover:bg-sidebar-accent',
            collapsed && 'mx-auto'
          )}
        >
          <ChevronLeft
            className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                collapsed && 'justify-center'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Role Switcher (for demo) */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => navigate(role === 'admin' ? '/support/tickets' : '/admin/support')}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <Users className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <span>Switch to {role === 'admin' ? 'Client' : 'Admin'}</span>
          )}
        </button>
      </div>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div
          className={cn(
            'flex items-center gap-3 px-3 py-2',
            collapsed && 'justify-center'
          )}
        >
          <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {role === 'admin' ? 'Support Admin' : 'Acme Corp'}
              </p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
