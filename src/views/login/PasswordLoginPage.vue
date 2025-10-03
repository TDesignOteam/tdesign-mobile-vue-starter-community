<script setup lang="ts">
import PasswordLoginForm from './components/PasswordLoginForm.vue'

defineOptions({
  name: 'PasswordLoginPage',
})
</script>

<template>
  <div class="login-container">
    <PasswordLoginForm />
  </div>
</template>

<style lang='scss' scoped>
.login-container {
  margin-top: 4px;
}
</style>
