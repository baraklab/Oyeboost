import {
  LayoutDashboard,
  PenSquare,
  Megaphone,
  ClipboardCheck,
  Users,
  KeyRound,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardNavItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Campaign", href: "/dashboard/create", icon: PenSquare },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "Deliverables", href: "/dashboard/deliverables", icon: ClipboardCheck },
  { label: "Influencer Profile", href: "/dashboard/channels", icon: Users },
  { label: "AI", href: "/dashboard/ai", icon: KeyRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
