import { useQuery } from "@tanstack/react-query";
import { dashboardRepository } from "@/infrastructure/api/dashboard.repository";

export const DASHBOARD_QUERY_KEY = ["dashboard"] as const;

export function useDashboard() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardRepository.getDashboard(),
    staleTime: 60 * 1000, // 1 menit — data dashboard tidak perlu real-time
    refetchOnWindowFocus: false,
  });
}
