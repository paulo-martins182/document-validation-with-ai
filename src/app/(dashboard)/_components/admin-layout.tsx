"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import AdminNavbar from "./admin-navbar";
import Loading from "@/components/loading";
import { AdminSidebar } from "./admin-sidebar";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SectionCards } from "@/components/admin/section-cards";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchIsAdmin = async () => {
    setIsAdmin(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchIsAdmin();
  }, []);

  return loading ? (
    <Loading />
  ) : isAdmin ? (
    <>
      <AdminSidebar />
      <SidebarInset>
        <AdminNavbar />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl sm:text-4xl font-semibold opacity-30/4">
        You are not authorized to access this page
      </h1>
      <Link
        href="/"
        className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full"
      >
        Go to home <ArrowRightIcon size={18} />
      </Link>
    </div>
  );
};

export default AdminLayout;
