import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false);
  const loginInfo = ref({
    name: 'Novlan1',
    avatar: '/images/chat/avatar.png',
  });
  const updateLogin = (value: boolean) => {
    isLogin.value = value;
  };
  const updateUserInfo = (value: { name?: string; avatar?: string }) => {
    loginInfo.value = {
      ...loginInfo.value,
      ...value,
    };
  };

  return { isLogin, loginInfo, updateLogin, updateUserInfo };
});
