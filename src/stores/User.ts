import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import type {UserInfo} from "@/interface/User";

export const useUserStore = defineStore('userInfo', () => {
    const token = ref("")
    const userInfo = ref<UserInfo>({} as UserInfo);
    const userRealName = computed((state) => {
        return userInfo.value.userRealName
    })
    const openId = computed((state) => {
        return userInfo.value.openId
    })


    return {token,userInfo,userRealName,openId}
})

