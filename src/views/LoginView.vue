<script setup lang="ts">
import QrLogin from "@/components/Login/QrLogin.vue";
import img1 from "@/assets/20200306154952.jpg"

</script>

<template>

  <div class="login-container">
    <el-image class="img1" :src="img1" fit="cover"/>
    <el-main class="main-card">
      <el-tabs type="border-card">
        <el-tab-pane label="二维码登录">
          <QrLogin/>
        </el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
      </el-tabs>
    </el-main>
  </div>

</template>


<style scoped>
.login-container {
  display: flex;
  position: fixed;
  justify-content: flex-start;
  align-content: center;
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
@media only screen and (max-width: 991px){
  .img1{
    display: none;
  }

}

.main-card {

  flex-basis: 50%;

}
</style>
