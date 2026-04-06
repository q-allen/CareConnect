"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, Calendar, MessageCircle, Users, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', href: '/doctor', icon: Home },
  { label: 'Queue', href: '/doctor/queue', icon: Clock },
  { label: 'Appointments', href: '/doctor/appointments', icon: Calendar },
  { label: 'Messages', href: '/doctor/messages', icon: MessageCircle },
  { label: 'Patients', href: '/doctor/patients', icon: Users },
  { label: 'Prescriptions', href: '/doctor/prescriptions', icon: FileText },
];

interface DoctorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function DoctorSidebar({ isOpen, onToggle }: DoctorSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 hidden lg:flex flex-col',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <Link href="/doctor" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground font-bold">
            NS
          </div>
          {isOpen && <span className="text-lg font-bold">NowServing</span>}
        </Link>
        <Button variant="ghost" size="icon" onClick={onToggle} className="hidden lg:flex">
          <span className="sr-only">Toggle sidebar</span>
          <div className="h-5 w-5 border border-border rounded-md" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
