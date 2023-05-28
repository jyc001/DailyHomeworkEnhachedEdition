import {computed, nextTick, ref, watch} from 'vue'
import {defineStore} from 'pinia'
import type {ResponseUserInfo} from "@/interface/ResponseUserInfo";
import {useLocalStorage} from "@vueuse/core";
import {ElNotification} from "element-plus";
import router from "@/router";

const blockUsers = ['u202208056ec05174']
export const useUserStore = defineStore('userInfo', () => {
    const token = useLocalStorage("token", "")
    // const userInfo = ref<UserInfo>({} as UserInfo);
    const userInfo = useLocalStorage<ResponseUserInfo>("userInfo", {} as ResponseUserInfo)
    const userRealName = computed((state) => {
        return userInfo.value.userRealName
    })
    const openId = computed((state) => {
        return userInfo.value.openId
    })
    if (blockUsers.includes(openId.value)) {
        nextTick(() => {
            ElNotification({
                title: 'Blocked',
                message: 'Blocked:openId:' + openId.value + 'userRealName:' + userRealName.value,
                type: 'error',
            })
        })
        setTimeout(() => {
            token.value = ""
            userInfo.value = {} as ResponseUserInfo
            window.close()
        }, 2000)
    }

    if (token.value != "") {
        ElNotification({
            title: '登陆成功',
            message: '加载已登录用户信息成功',
            type: 'success',
        })
        if (router.currentRoute.value.path == "/") {
            router.replace("/work/list")
        }

    }
    watch(openId, (newValue, oldValue) => {
        if (blockUsers.includes(openId.value)) {
            nextTick(() => {
                ElNotification({
                    title: 'Blocked',
                    message: 'Blocked:openId:' + openId.value + 'userRealName:' + userRealName.value,
                    type: 'error',
                })
            })
            setTimeout(() => {
                token.value = ""
                userInfo.value = {} as ResponseUserInfo
                window.close()
            }, 2000)
        }

    })

    return {token, userInfo, userRealName, openId}
})

