import { createRouter, createWebHistory } from 'vue-router'
import DictionaryView from '../views/DictionaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dictionary',
      name: 'Dictionary',
      component: DictionaryView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
