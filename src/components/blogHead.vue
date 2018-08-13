<template>
  <div class="blogHead">
   <div class="head_head">
     <div class="headHead_cear" :style="{maxWidth:indexhead + 'px'}">
        <!--左上角LOGO -->
        <a href="/" class="head_logo">
        <img src="../assets/2dog.png" alt="logo">
        </a>
        <!--写文章，登录，主页 -->
        <a class="head_write" @click="towrite">写文章</a>
        <a class="head_login" v-if="status" @click="setuser">{{blogname}}</a>
        <a href="/login/" class="head_login" v-else >登录</a>
        <div class="head_middo" :style="{width:headmidd + 'px'}">
          <a href="/"><span class="head_fist">首页</span></a>
          <input type="text" placeholder="搜索" class="head_input" v-model="seach">
          <button style="margin-top:15px;margin-left:15px;height:30px;background:none" @click="ceachto">搜索</button>
        </div>
      </div>
   </div>
  </div>
</template>

<script>

import {server_img_url,server_url} from "../main.js"

export default {
  name: 'blogHead',
  data () {
    return {
      b:"",
      blogname:"",
      status:false,
      seach:""
    }
  },
  computed:{
   
  },
  methods:{
   get_login(){
     this.$http.get(server_url+'get_login/').then(response =>{
         this.status = response.data.status
         sessionStorage.setItem("user_id",response.data.user_id)
       })
   },
   get_blogname(){
     var blogname = sessionStorage.getItem('user_id')
      var params = new URLSearchParams();
        params.append('user_id',blogname)
       this.$http.post(server_url+'get_user_site_setting/',params).then(response =>{
         this.blogname = response.data.blog_name
       })
   },
   setuser(){
     var userid = sessionStorage.getItem('user_id')
     this.$router.push('/user/'+userid)
   },
   towrite(){
    var userid = sessionStorage.getItem('user_id')
     this.$router.push('/write/'+userid)
   },
   ceachto(){
     if(this.seach){
       this.$router.push('/seach/'+this.seach)
     }else{
       alert('搜索内容不能为空')
     }
     
   }
  },
  mounted(){
    this.get_login()
    this.get_blogname()
  },
  props:["indexhead","headmidd"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blogHead{
  height: 60px;
}
.head_head{
  border-bottom: 1px solid #f0f0f0;
  height: 60px;
  position: fixed;
  right: 0;
  left: 0;
  z-index:1001;
  background-color: rgba(255, 255, 255, 0.9);
}
.headHead_cear{
  min-width: 768px;
  margin: 0 auto;
  filter:none;
}
.head_logo{
  height: 56px;
  float: left;
}
.head_logo img{
  height: 100%;
}
.head_write{
  float: right;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin: 8px 15px 0;
  border-radius: 20px;
  font-size: 15px;
  color: #fff;
  background-color: #ea6f5a;
  text-align: center;
  cursor: pointer;
}
.head_login{
  color: #969696;
  float: right;
  font-size: 15px;
  margin: 18px 6px 0 10px;
  text-align: center;
  cursor: pointer;
}
.head_login:hover{
  color: #111
}
.head_input{
  width: 240px;
  height: 38px;
  font-size: 14px;
  border: 1px solid #eee;
  border-radius: 40px;
  background: #eee;
  float: left;
  text-indent: 20px;
  margin-top: 10px
}
.head_fist{
  float: left;
  color: #ea6f5a;
  font-size: 17px;
  margin-top:17px;
  margin-right: 100px
}
.head_middo{
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
  height: 60px;
}
.head_middo button{
  color: #969696
}
.head_middo button:hover{
  color: #111
}
</style>
