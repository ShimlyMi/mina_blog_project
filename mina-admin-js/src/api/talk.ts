import { http } from "@/utils/http";

export type TalkResult = {
  code: number;
  message: string;
  result: any;
};

export const host = "http://localhost:8888"; // 代理请求

/** 获取说说的列表 */
export const getTalkList = (data?: object) => {
  return http.request<TalkResult>("post", "/api/talk/getTalkList", { data });
};

/** 新增说说 */
export const addTalk = (data?: object) => {
  return http.request<TalkResult>("post", "/api/talk/publishTalk", { data });
};

/** 修改说说 */
export const editTalk = (data?: object) => {
  return http.request<TalkResult>("post", "/api/talk/updateTalk", { data });
};

/** 删除说说 */
export const deleteTalkById = (id: number, status: number) => {
  return http.request<TalkResult>(
    "delete",
    `/api/talk/deleteTalkById/${id}/${status}`,
    {}
  );
};

/** 恢复说说 */
export const revertTalk = (id: number) => {
  return http.request<TalkResult>("put", `/api/talk/revertTalk/${id}`, {});
};

/** 公开 / 私密说说 */
export const togglePublic = (id: number, status: number) => {
  return http.request<TalkResult>(
    "put",
    `/api/talk/togglePublic/${id}/${status}`,
    {}
  );
};

/** 置顶 / 取消置顶说说 */
export const toggleTop = (id: number, is_top: number) => {
  return http.request<TalkResult>(
    "put",
    `/api/talk/toggleTop/${id}/${is_top}`,
    {}
  );
};

/** 获取说说详情 */
export const getTalkById = (id: number) => {
  return http.request<TalkResult>("get", `/api/talk/getTalkById/${id}`, {});
};
