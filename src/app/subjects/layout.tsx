import { Metadata } from "next";
import AdminLayout from "../(admin)/layout";

export const metadata: Metadata = {
  title: "Subject Management",
  description: "Manage subjects and curriculum",
};

export default function SubjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 return <AdminLayout>{children}</AdminLayout>;
}