<script lang="ts" setup>

import {useRouteParams} from "@vueuse/router";
import {$ref} from "vue/macros";
import {api} from "@/api";
import WorkDetail from "./WorkDetail.vue";

const workId = useRouteParams('workId')
let work = $ref<object>({})
let workDetailList = $ref<Array<string>>()
api.Works.getWorkDetail(workId.value as unknown as number).then(data => {
  work = data
  workDetailList = work.workDetail.split("\n")
  // console.log(work)
})
</script>

<template>
  <router-link to="/work/list">
    <el-button type="primary">返回</el-button>
  </router-link>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ work.workTime }}{{ work.submitText }}的{{ work.subject }}作业</span>
        <el-divider direction="vertical"/>
        <span>作业ID:{{ workId }}</span>
      </div>
    </template>
    <div v-for="line in workDetailList">{{ line }}</div>
  </el-card>
  <!--  作业id：{{ workId }}-->
  <!--    <div></div>-->
  <!--    <textarea :value="work.workDetail" disabled/>-->
  <el-collapse>
    <el-collapse-item v-for="user in work.submitUser">
      <template #title>
        <el-text type="primary" v-if="user.submitFlag">{{ user.bindName }}:{{ user.submitText }}</el-text>
        <el-text v-if="!user.submitFlag">{{ user.bindName }}:{{ user.submitText }}</el-text>

      </template>
      <el-image v-for="(imageUrl,index) in user.submitCoverList" style="width: 100px; height: 100px"
                :zoom-rate="1.2"
                :preview-src-list="user.submitCoverList"
                :src="imageUrl"
                :infinite="false"
                :initial-index="index"
                fit="contain"
                loading="lazy"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped>

</style>
