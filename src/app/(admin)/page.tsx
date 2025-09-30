
"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function SchoolDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const role = normalizeRole(user.primary_role);
    if (role !== 'superadmin') {
      // Redirect non-admin users to their appropriate dashboards
      const redirectPath = getRoleBasedRedirectPath(role);
      router.replace(redirectPath);
    }
  }, [user, router]);

  const normalizeRole = (role: string): string => {
    return role.trim().toLowerCase().replace(/[\s_\-]+/g, '');
  };

  const getRoleBasedRedirectPath = (normalizedRole: string): string => {
    switch (normalizedRole) {
      case 'student':
        return '/students';
      case 'parent':
        return '/parent-portal';
      case 'teacher':
        return '/teacher-portal';
      // If role not matched, default to home (admin landing)
      default:
        return '/';
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to School Management System</h1>
        <p className="text-gray-600">Please sign in to access your dashboard.</p>
      </div>
    );
  }

  // Show loading for non-admin users while redirecting
  if (normalizeRole(user.primary_role) !== 'superadmin') {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        {/* <p className="text-center text-gray-600 mt-4">Redirecting to your dashboard...</p> */}
      </div>
    );
  }

  // Only render admin dashboard for admin users
  return <AdminDashboard user={user} />;
}
