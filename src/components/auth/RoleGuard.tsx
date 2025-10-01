'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface RoleGuardProps {
  allow: Array<'Super Admin' | 'Admin' | 'Teacher' | 'Student' | 'Parent'>;
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function RoleGuard({ allow, children, fallback, redirectTo }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const hasAccess = () => {
    if (!user) return false;
    const primary = user.primary_role as any;
    if (allow.includes('Super Admin') && user.roles?.includes?.('Super Admin')) return true;
    return allow.includes(primary);
  };

  useEffect(() => {
    if (mounted && !isLoading && isAuthenticated && !hasAccess() && redirectTo) {
      router.replace(redirectTo);
    }
  }, [mounted, isLoading, isAuthenticated, user, redirectTo]);

  if (!mounted) return null;
  if (isLoading) return fallback ?? null;
  if (!isAuthenticated) return null;
  if (!hasAccess()) return fallback ?? null;
  return <>{children}</>;
}