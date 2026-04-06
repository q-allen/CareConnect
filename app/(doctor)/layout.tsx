"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store';
import { useNotifications } from '@/hooks/useNotifications';

interface DoctorLayoutProps {
  children: ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  useNotifications();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/signin');
  }, [isLoading, user, router]);

  if (isLoading || !user) return null;

  return <DashboardLayout>{children}</DashboardLayout>;
}
