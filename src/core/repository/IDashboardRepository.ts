import type { ApiResponse } from "@/core/domain/common";
import type { DashboardData } from "@/core/domain/dashboard";

export interface IDashboardRepository {
  getDashboard(): Promise<ApiResponse<DashboardData>>;
}
