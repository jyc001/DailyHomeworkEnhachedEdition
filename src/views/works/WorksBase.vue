<script lang="ts" setup>
import {useUserStore} from "@/stores/User";
import {storeToRefs} from "pinia";
import {toRefs} from "vue";
import {$ref} from "vue/macros";
import {api} from "@/api";
import {ElMessage} from "element-plus";

const user = useUserStore()
// console.log(user.openId)
let {userRealName} = $(storeToRefs(user))
let works = $ref<any[]>([])
let disabled = $ref<boolean>(false)
let count = 0

function loadData() {
    api.Works.findWorkNewVersion(count).then(data => {
        works.push(...data)
        // console.log(works)
    })
        .catch(errCode => {
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
