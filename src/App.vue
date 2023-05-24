<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useColorMode, useDark} from "@vueuse/core";

const mode = useColorMode()
mode.value = "auto"
</script>

<template>
      <RouterView/>
      <el-backtop :right="10" :bottom="35">
        <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">UP</div>
      </el-backtop>
      <h2 class="vinfo">V1.R9-230523</h2>

</template>

<style>

body {
  margin: 0;
}

.vinfo {
  position: fixed;
  margin: 0;
  right: 2px;
  bottom: 2px;
  color: #409eff;
}
</style>
