import imageCompression from "browser-image-compression";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/auth";
import Axios from "axios";
import { http } from "@/utils/http";

export type SiteResult = {
  code: number;
  message: string;
  result: any;
};
/** 获取网站config */
export const getConfigDetail = () => {
  return http.request<SiteResult>("get", "/api/config/detail", {});
};

/** 修改网站config */
export const updateConfigDetail = data => {
  return http.request<SiteResult>("post", "/api/config/update", { data });
};

/** 图片上传接口 */
export const imgUpload = async data => {
  // 文件压缩 太大了上传不了，我的服务器比较垃圾
  let res;
  // 没有raw.size 就表示已经压缩过了（多图片上传那里我压缩了一次） 有的话小于800不用压缩
  if (data.raw.size > 820) {
    const file = await conversion(data.raw);
    if (!file) {
      ElMessage.error("图片上传失败");
      return;
    } else {
      res = file;
    }
  } else {
    res = data.raw;
  }
  const formData = new FormData();
  formData.append("file", res);
  const token = getToken();

  return new Promise<SiteResult>(resolve => {
    Axios({
      method: "post",
      url: "/api/upload/img",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token.token
      }
    }).then(response => {
      resolve(response.data);
    });
  });
};
export const conversion = file => {
  return new Promise<Blob>(resolve => {
    imageCompression(file, { maxSizeMB: 0.8 }).then(res => {
      resolve(res);
    });
  });
};
