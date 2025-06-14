import { createRouter, createWebHistory } from 'vue-router'
import MyResume from '@/views/MyResume.vue'
import App from '../App.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        component: App // This should actually be done in `main.ts` instead.
      },
      {
        path: '/MyResume',
        name: 'MyResume',
        component: MyResume
      } 
    ],
  })

export default router
