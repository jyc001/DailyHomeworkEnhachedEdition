<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useColorMode, useDark} from "@vueuse/core";

const mode = useColorMode()
mode.value = "auto"
</script>

<template>
    <RouterView/>
    <h2 class="vinfo">V1.R9.1-230605</h2>

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
