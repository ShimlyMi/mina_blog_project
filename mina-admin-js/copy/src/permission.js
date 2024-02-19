import router from "@/router";
import {useUserStoreHook} from "@/stores";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import getPageTitle from "@/get-page-title";
import {getToken} from "@/utils/auth";
import {storeToRefs} from 'pinia'
import {ElMessage} from "element-plus";


// 白名单
const whiteList = ['/login', '/register']

/** 路由前置守卫 */
router.beforeEach(async (to, from, next) => {
    // start progress bar
    // NProgress.start()

    // document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()
    console.log(hasToken)
    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'})
            // NProgress.done()
        } else {
            const hasGetUserInfo = storeToRefs(useUserStoreHook().user_name)
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    await useUserStoreHook.saveUserInfo()
                    next()
                } catch (err) {
                    await useUserStoreHook.resetToken
                    ElMessage({
                        type: 'error',
                        message: err || 'Has Error'
                    })
                    next(`/login?redirect=${to.path}`)
                    // NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            // NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
