<script setup lang="ts">
import QrLogin from "@/components/Login/QrLogin.vue";
import img1 from "@/assets/20200306154952.jpg"
import UsernameAndPasswordLogin from "@/components/Login/UsernameAndPasswordLogin.vue";
import {ElMessage} from "element-plus";

function onLoginSuccess() {
    ElMessage.success('登陆成功，后续待开发');
}

</script>

<template>

  <div class="login-container">
    <el-image class="img1" :src="img1" fit="cover"/>
    <div class="login-card">
      <h2 style="margin: 0;text-align: center;">欢迎使用每日交作业增强版</h2>
      <el-main>
        <el-tabs type="card" class="card">
          <el-tab-pane label="二维码登录">
            <QrLogin  @loginSuccess="onLoginSuccess"/>
          </el-tab-pane>
          <el-tab-pane label="密码登录">
            <UsernameAndPasswordLogin/>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </div>
  </div>

</template>


<style scoped>
.login-container {
  display: flex;
  position: fixed;
  justify-content: space-between;
  /*align-content: center;*/
  align-items: center;
  width: 100%;
  height: 100%
}

.title {
  margin: 0;
  padding-top: 3px;
  padding-left: 3px;
  padding-bottom: 5px;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 1px 0 5px #888888;
}

.img1 {
  width: 100%;
  height: 100%;
  flex-basis: 50%;


}


.login-card {
  /*flex-basis: 50%;*/
  align-self: center;
  margin-right: 15vw;
  /*flex-grow: 1;*/


}

.card {
  /*box-shadow: 0px 3px 4px 0px #909399;*/
  /*border-radius: 0 0 1em 1em;*/

}


@media only screen and (max-width: 991px) {
  .img1 {
    display: none;
  }

  .login-card {
    margin: 0;
  }

  .login-container {
    justify-content: center;
  }
}

</style>
