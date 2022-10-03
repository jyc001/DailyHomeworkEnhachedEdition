<script setup lang="ts">
import HelloWorld from "@/App.vue";
import {nextTick, onMounted, reactive, ref} from "vue";
import api from "@/api";
import {ElMessage} from "element-plus";
import QRCode from "qrcode";

let QrBase64 = ref<string | null>()
api.genQrCode().then(data => {
  QRCode.toDataURL("https://zuoye.lulufind.com/mp/qrcode/" + data.data.code, {
    width: 260,
    errorCorrectionLevel: "H"
  }).then(url => {
    QrBase64.value = url
  }).catch(err => {
    ElMessage.error("二维码生成错误请重试！")
  })
})

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
