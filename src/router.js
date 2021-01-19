import Vue from 'vue'
import VueRouter from 'vue-router'
import LogViewer from './components/LogViewer.vue'
import About from './components/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/log/:id',
    name: 'LogViewer',
    component: LogViewer
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
