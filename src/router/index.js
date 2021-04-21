import Vue from 'vue'
import VueRouter from 'vue-router'
// import Info from '../views/Info.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:txHash',
    name: 'Certification',
    component: () => import(/* webpackChunkName: "certificate" */ '../views/Certificate.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
