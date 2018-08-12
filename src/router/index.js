import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import login from '../components/login'
import write from '../components/write'
import home from '../components/home'
import Article from '../components/Article'
import user from '../components/user'
import edit from '../components/edit'
import ceshi from '../components/ceshi'
import seach from '../components/seach'
import axios from 'axios'
import { vuex } from '../vuex/vuex'



Vue.use(Router)

export const router = new Router({
  mode:'history', // 干净路由
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home/:userid',
      name: 'home',
      component: home,
      props:true
    },
    {
      path: '/write/:userid',
      name: 'write',
      component: write,
      props:true
    },
    {
      path: '/article/:articleid/:userid',
      name: 'Article',
      component: Article,
      props:true
    },
    {
      path: '/user/:userid',
      name: 'user',
      component: user,
      props:true
    },
    {
      path: '/edit/:articleid/:userid',
      name: 'edit',
      component: edit,
      props:true
    },
    {
      path: '/seach/:seach',
      name: 'seach',
      component: seach,
      props:true
    },
  ]
})

function get_userft(t,f){
  axios.get('http://www.awanmo.com/get_login/').then((response)=>{
    if(response.data.status){
      t(response)
    }else{
      f(response)
    }
  })
}


router.beforeEach((to,from,next) =>{
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


