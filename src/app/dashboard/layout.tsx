import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { UserMenu } from "@/components/dashboard/user-menu";
import { ToastProvider } from "@/components/ui/toast";
import { getAccessTokenCookie } from "@/lib/auth/session";
import { fetchCurrentUser } from "@/lib/auth/functions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const accessToken = await getAccessTokenCookie();
  if (!accessToken) redirect("/login");

  const user = await fetchCurrentUser(accessToken);
  if (!user) redirect("/login");

  return (
    <ToastProvider>
      <div className="flex h-dvh overflow-hidden bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
            <MobileSidebar />
            <div className="hidden md:block" />
            <UserMenu name={user.name} email={user.email} />
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
