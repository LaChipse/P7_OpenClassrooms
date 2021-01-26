import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/loggin',
    name: 'Loggin',
    component: () => import('@/views/Loggin.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: () => import('@/views/Accueil.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('@/views/Profil.vue')
  },
  {
    path: '/profil/post',
    name: 'MyPost',
    component: () => import('@/views/MyPost.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/Post.vue')
  }
]

const router = new VueRouter({
  routes, mode: "history"
})

export default router
