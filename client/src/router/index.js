import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import CreatePost from '../views/CreatePost'
import PostView from '../views/PostView'
import User from '../views/User'
import PostEdit from '../views/PostEdit'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/post/:id',
    name: 'PostView',
    component: PostView
  },
  {
    path: '/user/:username',
    name: 'User',
    component: User
  },
  {
    path: '/post/:id/edit',
    name: 'PostEdit',
    component: PostEdit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
