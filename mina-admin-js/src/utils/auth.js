import Cookies from "js-cookie";
import {useUserStoreHook} from "@/stores/modules/user";

export const sessionKey = "user-info"

export const TokenKey = "authorized-token"

// 获取 token
export function getToken() {
    return Cookies.get(TokenKey)
        ? JSON.parse(Cookies.get(TokenKey))
        : sessionStorage.getItem(sessionKey)
}

// 设置 token
export function setToken(data) {
    const {token} = data

    function setSessionKey(user_name, role) {
        useUserStoreHook().SET_USERNAME(user_name)
    }
}

export function removeToken() {
    Cookies.remove(TokenKey);
    sessionStorage.clear()
}

