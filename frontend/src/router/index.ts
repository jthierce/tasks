import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '@/views/TaskView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: TaskView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: {
        loginFree: true,
        authentificationPage: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        loginFree: true,
        authentificationPage: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  if (!localStorage.getItem('jwt_token') && !to.meta.loginFree) {
    return { name: 'login' }
  } else if (to.meta.authentificationPage && localStorage.getItem('jwt_token')) {
    return { name: 'tasks' }
  }
})

export default router
