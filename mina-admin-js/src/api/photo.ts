import { http } from "@/utils/http";

export type photoResult = {
  code: number;
  message: string;
  result: any;
};

/** 新增相册 */
export const addAlbum = (data?: any) => {
  return http.request<photoResult>("post", "/api/album/add", { data });
};

/** 分页获取相册列表 */
export const getAlbumList = (data?: any) => {
  return http.request<photoResult>("post", "/api/album/getAlbumList", { data });
};

/** 删除相册 */
export const deleteAlbum = (id: number) => {
  return http.request<photoResult>("delete", "/api/album/delete" + id, {});
};

/** 修改相册 */
export const updateAlbum = (data?: any) => {
  return http.request<photoResult>("put", "/api/album/update", { data });
};

/** 批量新增图片 */
export const addPhotos = (data?: any) => {
  return http.request<photoResult>("post", "/api/photo/add", { data });
};

/** 分页获取相册 */
export const getPicListByAlbumId = (data?: any) => {
  return http.request<photoResult>("get", "/api/photo/getPicListByAlbumId", {
    data
  });
};

/** 批量删除图片 */
export const deletePictures = (data?: any) => {
  return http.request<photoResult>("get", "/api/photo/delete", { data });
};

/** 批量恢复图片 */
export const revertPictures = (data?: any) => {
  return http.request<photoResult>("get", "/api/photo/revert", { data });
};

