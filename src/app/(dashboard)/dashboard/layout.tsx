import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import AdminLayout from "../_components/admin-layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CartWeb. - Admin",
  description: "CartWeb. - Admin",
};

export default function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <Toaster />
          <AdminLayout>{children}</AdminLayout>
        </SidebarProvider>
      </SignedIn>

      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <SignIn fallbackRedirectUrl="/dashboard" routing="hash" />
        </div>
      </SignedOut>
    </>
  );
}
