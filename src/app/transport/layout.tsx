import AdminLayout from "../(admin)/layout";

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   return <AdminLayout>{children}</AdminLayout>;

}
