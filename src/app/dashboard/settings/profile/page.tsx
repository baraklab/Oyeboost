import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAccessTokenCookie } from "@/lib/auth/session";
import { fetchCurrentUser } from "@/lib/auth/functions";

export const metadata: Metadata = { title: "Profile settings" };
export const dynamic = "force-dynamic";

export default async function ProfileSettingsPage() {
  const accessToken = await getAccessTokenCookie();
  if (!accessToken) redirect("/login");

  const user = await fetchCurrentUser(accessToken);
  if (!user) redirect("/login");

  return (
    <div>
      <div className="mt-6 flex max-w-md flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">Name</span>
          <p className="text-sm text-foreground">{user.name}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">Email</span>
          <p className="text-sm text-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
