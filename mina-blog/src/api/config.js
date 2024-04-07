import http from "@/config/request.js";

/**  */
export const getConfig = () => {
    return new Promise((resolve) => {
        http.get("/api/config/detail", {}).then((res) => {
            resolve(res);
        })
    })
};
