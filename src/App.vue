<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useColorMode, useDark} from "@vueuse/core";

const mode = useColorMode()
mode.value="auto"
</script>

<template>
    <RouterView/>
    <h2 class="vinfo">V2304091422-R3</h2>

</template>

<style>
body {
    margin: 0;
}

.vinfo {
    position: fixed;
    margin: 0;
    right: 2px;
    bottom: 2px;
    color: #409eff;
}
</style>
