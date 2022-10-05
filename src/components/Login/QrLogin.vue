<script lang="ts" setup>
import {ref} from "vue";
import api from "@/api";
import QRCode from "qrcode";
import {ElMessage} from "element-plus";

let QrBase64 = ref<string | null>()
let tim1=0
api.genQrCode().then(resp => {
  QRCode.toDataURL("https://zuoye.lulufind.com/mp/qrcode/" + resp.data.data.code, {
    width: 260,
    errorCorrectionLevel: "H"
  }).then(url => {
    QrBase64.value = url
    tim1=setInterval(checkQrCode,1000,resp.data.data.code)
  }).catch(err => {
    ElMessage.error("二维码生成错误请重试！")
  })
})

const checkQrCode = function (code:string) {
  // console.log(code)
  api.checkQrCode(code)
  console.log(tim1)
  clearInterval(tim1)
}
</script>

<template>
  请使用手机微信或每日交作业小程序扫码
  <el-image :src="QrBase64" fit="fill"/>
</template>

<style scoped>

</style>
