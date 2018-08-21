import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import login from '../components/login'
import write from '../components/write'
import home from '../components/home'
import Article from '../components/Article'
import user from '../components/user'
import edit from '../components/edit'
//import ceshi from '../components/ceshi'
import seach from '../components/seach'
import axios from 'axios'
import { vuex } from '../vuex/vuex'
import {server_img_url,server_url} from "../main.js"

Vue.use(Router)

export const router = new Router({
  mode:'history', // 干净路由
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        title:'首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        title:'登录'
      }
    },
    {
      path: '/home/:userid',
      name: 'home',
      component: home,
      props:true,
      meta:{
        title:'个人主页'
      }
    },
    {
      path: '/write/:userid',
      name: 'write',
      component: write,
      props:true,
      meta:{
        title:'添加文章'
      }
    },
    {
      path: '/article/:articleid/:userid',
      name: 'Article',
      component: Article,
      props:true,
      meta:{
        title:'文章'
      }
    },
    {
      path: '/user/:userid',
      name: 'user',
      component: user,
      props:true,
      meta:{
        title:'用户设置'
      }
    },
    {
      path: '/edit/:articleid/:userid',
      name: 'edit',
      component: edit,
      props:true,
      meta:{
        title:'用户设置2'
      }
    },
    {
      path: '/seach/:seach',
      name: 'seach',
      component: seach,
      props:true,
      meta:{
        title:'搜索'
      }
    },
  ]
})

function get_userft(t,f){
  axios.get(server_url + 'get_login/').then((response)=>{
    if(response.data.status){
      t(response)
    }else{
      f(response)
    }
  })
}


router.beforeEach((to,from,next) =>{
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if(to.name === 'login'){
    if(vuex.getters.is_login){
      next({path:'/'})
    }else{
      get_userft((response)=>{
        vuex.commit("set_login",response.data.user_name)
        //console.log(response.data.status)
        next({path:'/'})
      },(response)=>{
        next()
      })
    }
  }else if(to.name === 'user'||to.name === 'write'||to.name === 'edit'){
    if(vuex.getters.is_login){
      next()
    }else{
      get_userft((response)=>{
        vuex.commit("set_login",response.data.user_name)
        next()
      },(response)=>{
        next({path:'/login'})
      })
    }
  }
  next()
})


