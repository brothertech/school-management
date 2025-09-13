import type { Metadata } from "next";
import AdminLayout from "@/app/(admin)/layout";

export const metadata: Metadata = {
  title: "Timetable Management",
  description: "Manage class timetables and schedules",
};

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}