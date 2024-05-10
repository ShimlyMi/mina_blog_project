import { http } from "@/utils/http";

export type NoticeResult = {
  code: number;
  message: string;
  result: any;
};

/** 获取消息推送 */
export const getNoticeList = (data?: object) => {
  return http.request<NoticeResult>("post", "/api/notify/getNotifyList", {
    data
  });
};
