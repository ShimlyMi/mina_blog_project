import { http } from "@/utils/http";

export type photoResult = {
  code: number;
  message: string;
  result: any;
};

/** 新增相册 */
export const getStatistic = () => {
  return http.request<photoResult>("get", "/api/statistic/", {});
};
