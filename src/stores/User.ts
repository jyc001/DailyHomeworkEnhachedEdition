import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import type {UserInfo} from "@/interface/User";
import {useLocalStorage} from "@vueuse/core";
import {ElNotification} from "element-plus";
import router from "@/router";

export const useUserStore = defineStore('userInfo', () => {
    const token = useLocalStorage("token","")
    // const userInfo = ref<UserInfo>({} as UserInfo);
    const userInfo = useLocalStorage<UserInfo>("userInfo",{} as UserInfo)
    const userRealName = computed((state) => {
        return userInfo.value.userRealName
    })
    const openId = computed((state) => {
        return userInfo.value.openId
    })
    if(token.value!=""){
        ElNotification({
            title: '登陆成功',
            message: '加载已登录用户信息成功',
            type: 'success',
        })
        router.replace("/work/list")

    }


    return {token,userInfo,userRealName,openId}
})

