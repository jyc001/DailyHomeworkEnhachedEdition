import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {UserInfo} from "@/interface/User";

export const useUserInfoStore = defineStore('userInfo', () => {
    const token = ref("")
    const userInfo = ref<UserInfo>({} as UserInfo);


    return {token, userInfo}
})

