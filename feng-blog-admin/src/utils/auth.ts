import Cookie from 'js-cookie';
import { storageSession } from "@pureadmin/utils";
import { useUserStoreHook } from "@/stores/modules/user";

export interface DataInfo<T> {
    /** token */
    token: string;
    /** 用户名 */
    user_name: string;
    /** 当前登录用户的角色 */
    role?: number;
}
export const sessionKey = "user-info";

export const TokenKey = "authorized-token";

/** 获取 token */

export function getToken(): DataInfo<any> {

}