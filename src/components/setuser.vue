<template>
  <div class="setuser">
      <p class="setuser_title">账号设置</p>
    <div class="setuser_body">
        <span>用户名称 ：<input type="text" v-model="username" disabled class="inusername"></span>
        <span>用户密码 ：<input type="text" v-model="userpaswd"></span>
        <span>修改密码 ：<input type="text" v-model="setpaswold"></span>
        <span>重复密码 ：<input type="text" v-model="userDpaswd"></span>
    </div>
    <p class="setuser_pus" @click="put_xinxi">确认</p>
  </div>
</template>

<script>
import {server_img_url,server_url} from "../main.js"
export default {
  name: 'setuser',
  data () {
    return {
      username:"",
      userpaswd:"",
      setpaswold:"",
      userDpaswd:"",
      get:"用户密码修改成功！",
      out:"用户密码修改失败！",
      no:"密码输入不一致"
    }
  },
  methods:{
      put_xinxi(){
          if(this.setpaswold!=this.userDpaswd){
            alert("密码不一致")
          }else{
          var params = new URLSearchParams();
          params.append('do','re_passwd')
          params.append('old_passwd',this.userpaswd)
          params.append('new_passwd',this.userDpaswd)

        this.$http.post(server_url+'set_user/',params).then(response =>{
            if(response.data.status){
                alert('密码修改成功')
                this.username = ""
                this.userpaswd = ""
                this.userDpaswd = ""
            }else{
                alert('密码错误')
                this.userpaswd = ""
            }
           
        })
      }
    },
    get_username(){
        var params = new URLSearchParams();
        params.append('user_id',this.userid)
         this.$http.post(server_url+'get_user_site_setting/',params).then(response =>{
             this.username = response.data.blog_name
      },response =>{
        console.log(response)
      })
    }
  },
  mounted(){
    this.get_username()
  },
  props:['userid']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setuser{
    margin: 0 auto;
    width: 800px;
    background: #fff;
    padding-bottom: 50px
}
.setuser_body{
    padding: 20px;
    margin: 0 auto;
    width: 400px;
}
.setuser_body span{
    display: block;
    margin-right: 10px;
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    margin-bottom: 20px;

}
.setuser_body input{
    height: 100%;
    border: 1px solid #dadada;
    width: 220px;
}
.setuser_title{
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    font-size: 17px;
    border-bottom: 1px solid #dadada;
    margin-bottom: 30px
}
.setuser_pus{
    height: 28px;
    width: 80px;
    background: red;
    text-align: center;
    line-height: 30px;
    margin: 0 auto
}
.setuser_body .inusername{
    border: none;
    background: none
}
</style>
