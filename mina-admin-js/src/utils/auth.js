import Cookies from "js-cookie";
import {useUserStoreHook} from "@/stores/modules/user";
import {storageSession} from "@pureadmin/utils";

export const sessionKey = "user-info"

export const TokenKey = "authorized-token"

// 获取 token
export function getToken() {
    return Cookies.get(TokenKey)
        ? JSON.parse(Cookies.get(TokenKey))
        : storageSession().getItem(sessionKey)
}

// 设置 token
export function setToken(data) {
    const {token} = data

    function setSessionKey(user_name, role) {
        useUserStoreHook().SET_USERNAME(user_name)
        useUserStoreHook().SET_ROLE(role)
        storageSession().setItem(sessionKey, JSON.stringify({user_name, role}))
    }

    Cookies.set(TokenKey, JSON.stringify({token}))
    if (data.user_name && data.role) {
        const {user_name, role} = data
        setSessionKey(user_name, role)
    } else {
        const user_name = storageSession().getItem(sessionKey)?.user_name ?? ""
        const role = storageSession().getItem(sessionKey)?.role ?? ""
        setSessionKey(user_name, role)
    }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
    Cookies.remove(TokenKey);
    sessionStorage.clear()
}

