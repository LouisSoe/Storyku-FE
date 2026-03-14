// src/presentation/components/layout/Topbar.tsx
import { useLocation } from "react-router-dom";

function getTitle(pathname: string): string {
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  if (pathname.includes("/chapters/") && pathname.endsWith("/edit"))
    return "Edit Chapter";
  if (pathname.includes("/chapters/new")) return "Add Chapter";
  if (pathname.endsWith("/edit")) return "Edit Story";
  if (pathname.endsWith("/new")) return "Add Story";
  if (pathname.match(/\/stories\/[^/]+$/)) return "Story Detail";
  if (pathname === "/stories") return "Story List";
  if (pathname === "/categories") return "Category Management";
  if (pathname === "/tags") return "Tag Management";
  return "Storyku";
}

export function Topbar() {
  const { pathname } = useLocation();

  return (
    <header className="fixed left-60 right-0 top-0 z-10 h-16 bg-white border-b border-gray-200 flex items-center px-6">
      <h1 className="text-base font-semibold text-gray-900">
        {getTitle(pathname)}
      </h1>
    </header>
  );
}