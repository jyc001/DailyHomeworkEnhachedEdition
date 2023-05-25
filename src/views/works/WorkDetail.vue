<script lang="ts" setup>

import {$ref} from "vue/macros";
import {api} from "@/api";
import WorkDetail from "./WorkDetail.vue";
import router from "@/router";
import type {RouteLocationRaw} from "vue-router";
import type {ResponseWorkDetail} from "@/interface/ResponseWorkDetail";
import {useRouteParams} from "@vueuse/router";

const workId = useRouteParams('workId')
let work = $ref<ResponseWorkDetail>({} as ResponseWorkDetail)
let workDetailList = $ref<Array<string>>()
api.Works.getWorkDetail(workId.value as unknown as number).then(data => {
  work = data
  workDetailList = work.workDetail.split("\n")
  // console.log(work)
})
</script>

<template>
  <div aria-label="A complete example of page header">
    <el-page-header @back="router.push('/work/list')">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{name:'workList'}">
            作业列表
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ workId }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <el-avatar
              class="mr-3"
              :size="32"
              :src="work.subjectImage"
          />
          <span class="font-600 mr-3"> {{ work.className }} </span>
          <span
              class="text-sm mr-2"
              style="color: var(--el-text-color-regular)"
          >
            Sub title
          </span>
          <el-tag>Default</el-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button>Print</el-button>
          <el-button type="primary" class="ml-2">Edit</el-button>
        </div>
      </template>

      <el-descriptions :column="3" size="small" class="mt-4">
        <el-descriptions-item label="Username"
        >kooriookami
        </el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
        >18100000000
        </el-descriptions-item
        >
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
      <p class="mt-4 text-sm">
        Element Plus team uses <b>weekly</b> release strategy under normal
        circumstance, but critical bug fixes would require hotfix so the actual
        release number <b>could be</b> more than 1 per week.
      </p>
    </el-page-header>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <!--        <span>{{ work.workTime }}{{ work.submitText }}的{{ work.subject }}作业</span>-->
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
                :preview-src-list="user.submitCoverList?user.submitCoverList:[]"
                :src="imageUrl"
                :infinite="false"
                :initial-index="index"
                fit="contain"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped>
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.mr-3 {
  margin-right: 0.75rem;
}

.font-600 {
  font-weight: 600;
}

.text-sm, [text~="sm"] {
  font-size: 0.875rem;
  line-height: normal;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>
