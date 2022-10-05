<script setup lang="ts">
import {ref} from "vue";
import api from "@/api";
import {ElMessage} from "element-plus";
import QRCode from "qrcode";
let QrBase64 = ref<string | null>()
let tim1=0
api.genQrCode().then(resp => {
  // console.log(resp.data.data.code)
  QRCode.toDataURL("https://zuoye.lulufind.com/mp/qrcode/" + resp.data.data.code, {
    width: 260,
    errorCorrectionLevel: "H"
  }).then(url => {
    QrBase64.value = url
    tim1=setInterval(checkQrCode,2500,resp.data.data.code)
  }).catch(err => {
    ElMessage.error("二维码生成错误请重试！")
  })
})

const checkQrCode = function (code:string) {
  // console.log(code)
  api.checkQrCode(code)
  console.log(tim1)
  // clearTimeout(tim1)
}
</script>

<template>
  <h1>Login in </h1>
  请使用手机微信或每日交作业小程序扫码
  <el-image :src="QrBase64" fit="fill"/>
</template>

<style scoped>
.el-image {
  width: 260px;
  height: 260px;
}
</style>
