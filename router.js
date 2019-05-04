import Vue from 'vue'
import Router from 'vue-router'
//
import Index from './vue/Index.vue'
import Train from './vue/Train.vue'
import Recognition from './vue/Recognition.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/辨識',
      name: 'recognition',
      component: Recognition,
    },
    {
      path: '/訓練',
      name: 'train',
      component: Train,
    },
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    { path: '*', redirect: '/' }
  ]
})
