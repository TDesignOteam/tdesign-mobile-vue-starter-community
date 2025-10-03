<script setup lang="ts">
import VerifyCodeForm from './components/VerifyCodeForm.vue'

defineOptions({
  name: 'VerifyCodePage',
})
</script>

<template>
  <div class="login-container">
    <VerifyCodeForm />
  </div>
</template>

<style lang='scss' scoped>
.login-container {
  margin-top: 4px;
}
</style>
