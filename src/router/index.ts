import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/home/home.vue';
import HomeView from '../views/home/index.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
        },
        {
          path: 'message',
          name: 'message',
          component: () => import('../views/home/message.vue'),
        },
        {
          path: 'my',
          name: 'my',
          component: () => import('../views/home/my.vue'),
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/index.vue'),
    },
    {
      path: '/release',
      name: 'release',
      component: () => import('../views/release/index.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
    },
  ],
});

export default router;
