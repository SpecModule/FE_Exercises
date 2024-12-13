import { createRouter, createWebHistory } from 'vue-router'
import DictionaryView from '../views/DictionaryView.vue'
import GreetingView from '@/views/GreetingView.vue'
import CalculatorView from '@/views/CalculatorView.vue'
import EmployeeView from '@/views/EmployeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dictionary',
      component: DictionaryView,
    },
    {
      path: '/dictionary',
      name: 'Dictionary',
      component: DictionaryView,
    },
    {
      path: '/greeting',
      name: 'Greeting',
      component: GreetingView,
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: CalculatorView,
    },
    {
      path: '/employee',
      name: 'Employee',
      component: EmployeeView,
    },
  ],
})

export default router
