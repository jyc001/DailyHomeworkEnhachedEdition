<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <RouterView/>
  <h2 class="vinfo">V221210130700</h2>

</template>

<style>
body{
  margin: 0;
}
.vinfo{
  position: absolute;
  margin: 0;
  right: 2px;
  bottom: 2px;
  color: #409eff;
}
</style>
