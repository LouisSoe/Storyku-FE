import httpClient from "./http.client";
import type { IDashboardRepository } from "@/core/repository/IDashboardRepository";
import type { DashboardData } from "@/core/domain/dashboard";
import type { ApiResponse } from "@/core/domain/common";

class DashboardRepository implements IDashboardRepository {
  async getDashboard(): Promise<ApiResponse<DashboardData>> {
    const res = await httpClient.get("/dashboard");
    return res.data;
  }
}

export const dashboardRepository = new DashboardRepository();
