<script lang="ts" setup>
import {ref} from "vue";
import QRCode from "qrcode";
import {ElMessage} from "element-plus";
import {api} from "@/api";
import {useUserInfoStore} from "@/stores/User";

const emit = defineEmits(["loginSuccess"])
let QrBase64 = ref<string | null>()
let tim1 = 0
let tim2 = 0
const userInfo=useUserInfoStore();
function GenQrCode() {
    clearInterval(tim1);
    clearTimeout(tim2);
    console.log("Start to genrate QR Code!")
    api.Login.genQrCode().then(resp => {
        QRCode.toDataURL("https://zuoye.lulufind.com/mp/qrcode/" + resp.data.data.code, {
            width: 260,
            errorCorrectionLevel: "H"
        })
            .then(url => {
                QrBase64.value = url
                tim1 = setInterval(checkQrCode, 1000, resp.data.data.code)
                // console.log(timeStampNow)
                const expTime = (resp.data.data.expireAt - (Date.parse(new Date().toString()) / 1000))*1000
                console.log(`QR expire after:${expTime} ms`)
                tim2 = window.setTimeout(GenQrCode, expTime)
            }).catch(() => {
            ElMessage.error("二维码生成错误请重试！")
        })
    })
}

GenQrCode();

function checkQrCode(code: string) {
    // console.log(code)
    api.Login.checkQrCode(code).then(resp => {
        console.log(resp.data)
        if (resp.data.data.token) {
            clearInterval(tim1);
            clearTimeout(tim2);
            // ElMessage.success("登陆成功，后续待开发");
            userInfo.token=resp.data.data.token
            userInfo.userInfo=resp.data.data.user
            console.log(resp.data.data.user.userRealName);
            // userRealName.value = resp.data.data.user.userRealName
            emit("loginSuccess")
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
<!--        <h1 v-show="userRealName">登录成功，欢迎{{ userRealName }}</h1>-->
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
