<script lang="ts" setup>
import {useUserStore} from "@/stores/User";
import {storeToRefs} from "pinia";
import {toRefs} from "vue";
import {$ref} from "vue/macros";
import {api} from "@/api";
import {ElMessage} from "element-plus";

const user=useUserStore()
// console.log(user.openId)
let {userRealName}=$(storeToRefs(user))
let works=$ref({})
api.findWork.findWorkNewVersion2().then(resp=>{
    works=resp.data
})
</script>

<template>
<h1>用户名：{{userRealName}}</h1>
  <textarea>{{works}}</textarea>
</template>

<style scoped>

</style>
