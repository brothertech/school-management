import type { Metadata } from "next";
import AdminLayout from "@/app/(admin)/layout";

export const metadata: Metadata = {
  title: "Attendance Management",
  description: "Manage student and staff attendance records",
};

export default function AnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
