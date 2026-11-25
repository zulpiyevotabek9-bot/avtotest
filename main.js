import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Auth from './pages/Auth.vue'
import Tests from './pages/Tests.vue'
import Exam from './pages/Exam.vue'
import Rules from './pages/Rules.vue'
import Admin from './pages/Admin.vue'
import { account, initialize } from './services/api.js'
import './styles.css'
import './platform.css'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Auth },
    { path: '/register', component: Auth, props: { register: true } },
    { path: '/tests', component: Tests },
    { path: '/attempt/:id', component: Exam, meta: { auth: true } },
    { path: '/rules', component: Rules },
    { path: '/signs', component: Rules, props: { signs: true } },
    { path: '/privacy', component: () => import('./pages/Privacy.vue') },
    { path: '/admin', component: Admin },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
router.beforeEach(async to => {
  await initialize()
  if (to.meta.auth && !account.value) return { path: '/login', query: { next: to.fullPath } }
})
createApp(App).use(router).mount('#app')
