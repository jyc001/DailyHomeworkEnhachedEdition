<script lang="ts" setup>
import {ref} from "vue";
import QRCode from "qrcode";
import {ElMessage} from "element-plus";
import {api} from "@/api";

let QrBase64 = ref<string | null>()
let tim1 = 0
let userRealName = ref<string | null>()
api.Login.genQrCode().then(resp => {
  QRCode.toDataURL("https://zuoye.lulufind.com/mp/qrcode/" + resp.data.data.code, {
    width: 260,
    errorCorrectionLevel: "H"
  })
      .then(url => {
        QrBase64.value = url
        tim1 = setInterval(checkQrCode, 1000, resp.data.data.code)
      }).catch(() => {
    ElMessage.error("二维码生成错误请重试！")
  })
})

const checkQrCode = function (code: string) {
  // console.log(code)
  api.Login.checkQrCode(code).then(resp => {
    console.log(resp.data)
    if (resp.data.data.token) {
      clearInterval(tim1);
      ElMessage.success("登陆成功，后续待开发");
      console.log(resp.data.data.user.userRealName);
      userRealName.value = resp.data.data.user.userRealName
    }

  })
  // console.log(tim1)
  // clearInterval(tim1)
}
</script>

<template style="align-items: center">
  <div class="qr-login">
    <h5>请使用手机微信或每日交作业小程序扫码</h5>
    <el-image :src="QrBase64" fit="contain" class="el-image"/>
    <h1 v-show="userRealName">登录成功，欢迎{{ userRealName }}</h1>
  </div>
</template>

<style scoped>
h5 {
  /*text-align: center;*/
}

.qr-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.el-image {
  width: 260px;
  height: 260px;
}
</style>
