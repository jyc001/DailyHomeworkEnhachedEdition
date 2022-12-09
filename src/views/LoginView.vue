<script setup lang="ts">
import QrLogin from "@/components/Login/QrLogin.vue";
import img1 from "@/assets/20200306154952.jpg"

</script>

<template>
  <!--  <el-header class="header">-->

  <h2 class="title">每日交作业</h2>
  <!--  </el-header>-->
  <div style="display:flex;">
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
.el-image {
  width: 260px;
  height: 260px;
}

.title {
  margin: 0;
  padding-top: 3px;
  padding-left: 3px;
  padding-bottom: 5px;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 1px 0 5px #888888;
}

.main-card {

  justify-content: center;
  /*width: 25vh;*/
  align-self: center;
  align-items:center;
}
</style>
