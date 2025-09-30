"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.replace("/auth/login");
      } else if (user.role !== "admin") {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated || !user || user.role !== "admin") {
    return null; // Redirecting
  }

  return <AdminDashboard user={user} />;
}