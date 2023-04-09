<script lang="ts" setup>

import {useRouteParams} from "@vueuse/router";
import {$ref} from "vue/macros";
import {api} from "@/api";
import WorkDetail from "./WorkDetail.vue";

const workId = useRouteParams('workId')
let work = $ref<any>({})
api.Works.getWorkDetail(workId.value as unknown as number).then(data => {
    work = data
    console.log(work)
})
</script>

<template>
  作业id：{{ workId }}
    <div>{{ work.workTime }}{{ work.submitText }}的{{ work.subject }}作业</div>
    <textarea :value="work.workDetail" disabled/>
    <el-collapse>
        <el-collapse-item v-for="user in work.submitUser">
            <template #title>
                <el-text type="primary" v-if="user.submitFlag">{{ user.bindName }}:{{ user.submitText }}</el-text>
                <el-text v-if="!user.submitFlag">{{ user.bindName }}:{{ user.submitText }}</el-text>

            </template>
            <img v-for="imageUrl in user.submitCoverList" :src="imageUrl"/>
        </el-collapse-item>
    </el-collapse>
</template>

<style scoped>

</style>
