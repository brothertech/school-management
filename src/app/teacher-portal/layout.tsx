import { Metadata } from "next";
import AdminLayout from "../(admin)/layout";

export const metadata: Metadata = {
  title: "Teacher Portal | School Management System",
  description: "Teacher dashboard for managing classes, students, and academic activities",
};

export default function TeacherPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return <AdminLayout>{children}</AdminLayout>;
}