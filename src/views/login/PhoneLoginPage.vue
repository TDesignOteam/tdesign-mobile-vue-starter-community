<script setup lang="ts">
import PhoneLoginForm from './components/PhoneLoginForm.vue'

defineOptions({
  name: 'PhoneLoginPage',
})
</script>

<template>
  <div class="login-container">
    <PhoneLoginForm />
  </div>
</template>

<style lang='scss' scoped>
.login-container {
  margin-top: 4px;
}
</style>
