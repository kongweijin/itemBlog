import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex) // 在我们的main.js 注册 Vuex 发一个身份证

export const vuex = new Vuex.Store({
    state:{
        login:false,
        user_name:''
    },
    getters:{
        is_login:(state)=>{
            return state.login
        },
        ret_user_name:(state)=>{
            return state.user_name
        }
    },
    mutations:{
        set_login:(state,user_name)=>{
            state.user_name = user_name
            state.login = true
        },
    }
})

