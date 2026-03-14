// src/presentation/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { BookOpen, Tag, Layers, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/stories", label: "Stories", icon: BookOpen },
  { to: "/categories", label: "Categories", icon: Layers },
  { to: "/tags", label: "Tags", icon: Tag },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <LayoutDashboard size={16} className="text-white" />
        </div>
        <span className="font-bold text-gray-900 text-base tracking-tight">
          Storyku
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
