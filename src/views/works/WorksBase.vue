<script lang="ts" setup>
import {useUserStore} from "@/stores/User";
import {storeToRefs} from "pinia";
import {toRefs} from "vue";
import {$ref} from "vue/macros";
import {api} from "@/api";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const user = useUserStore()
const router = useRouter()
// console.log(user.openId)
let {token, userRealName} = $(storeToRefs(user))
let works = $ref<any[]>([])
let disabled = $ref<boolean>(false)
let count = 0

function loadData() {
    api.Works.findWorkNewVersion(count).then(data => {
        // console.log(data)
        works.push(...data)
        // console.log(works)
        works.sort((a, b) => {
            a = new Date(a.workTime).getTime()
            b = new Date(b.workTime).getTime()
            // console.log(a)
            // console.log(b)
            return -(a - b)
        })
    }).catch(errCode => {
        switch (errCode as unknown as number) {
            case 201:
                disabled = true

        }
        // console.log(disabled)
    })
    count += 12
}

loadData();
</script>

<template>
    <el-button type="danger" @click="token='';router.replace('/')">退出登录</el-button>
    <h1>用户名：{{ userRealName }}</h1>
    <textarea disabled>{{works}}</textarea>
    <el-collapse v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled">
        <el-collapse-item v-for="work in works">
            <template #title>
                <router-link :to='`/work/${work.workId}/detail`'>
                    <el-text>{{ work.workTime }}{{ work.submitText }}的{{ work.subject }}作业</el-text>
                </router-link>
            </template>
            <el-text>{{ work.workDetail }}</el-text>
        </el-collapse-item>
    </el-collapse>
</template>

<style scoped>

</style>
