import { login, getInfo } from "@/api/user-store.js";
import { getToken, setToken, removeToken } from "@/utils/auth.js";
import { resetRouter } from "@/router/index.js";

const getDefaultState = () => {
    return {
        token: getToken(),
        nick_name: '',
        avatar: '',
    }
}

const state = getDefaultState();

const  mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, nick_name) => {
        state.nick_name = nick_name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // user user
    login({ commit }, userInfo) {
        const { user_name, password } = userInfo;
        return new Promise((resolve,reject) => {
            login({ user_name: user_name.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve,reject) => {
            getInfo(state.token).then(response => {
                const { data } = response
                if (!data) {
                    return reject("登陆失败，请重新登录")
                }
                const { nick_name, avatar } = data
                commit('SET_NAME', nick_name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
