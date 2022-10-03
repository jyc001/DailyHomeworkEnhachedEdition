<script setup lang="ts">
import HelloWorld from "@/App.vue";
import {onMounted, reactive, ref} from "vue";
import api from "@/api";
import {ElMessage} from "element-plus";

let QrId = ref<string|null>()
api.genQrCode().then(data=>{QrId.value=data.data.code})
console.log(QrId)

</script>

<template>
  <h1>Login in </h1>
  请使用手机微信或每日交作业小程序扫码
  <h1>{{QrId}}</h1>
</template>

<style scoped>

</style>
