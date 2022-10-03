<script setup lang="ts">
import HelloWorld from "@/App.vue";
import {nextTick, onMounted, reactive, ref} from "vue";
import api from "@/api";
import {ElMessage} from "element-plus";
import QrcodeVue from 'qrcode.vue'

let QrId = ref<string|null>()
api.genQrCode().then(data=>{QrId.value=data.data.code})
// console.log(QrId)

</script>

<template>
  <h1>Login in </h1>
  请使用手机微信或每日交作业小程序扫码
<!--  <h1>{{QrId}}</h1>-->
  <qrcode-vue :value='"https://zuoye.lulufind.com/mp/qrcode/"+QrId'/>
</template>


<style scoped>

</style>
