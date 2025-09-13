import type { Metadata } from "next";
import AdminLayout from "@/app/(admin)/layout";

export const metadata: Metadata = {
  title: "Exams & Results Management",
  description: "Manage exam schedules, enter marks, and generate report cards",
};

export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
