<template>
  <div class="login">
    <a href="/" class="login_head">
      <img src="../assets/2dog.png">
    </a>
    <div class="login_user">
      <p>Login</p>
      <div class="login_user_text">
        <input type="text" placeholder="帐号" v-model="user_name">
      </div>
      <div class="login_user_paswd"> 
        <input type="password" placeholder="密码" v-model="user_paswd">
      </div> 
      <div class="login_user_button">
        <button @click="tologin">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      user_name:"",
      user_paswd:"",
      alert:"",
    }
  },
  methods:{
    tologin(){
       var params = new URLSearchParams();
        params.append('user_name',this.user_name)
        params.append('user_passwd',this.user_paswd)

        this.$http.post('http://www.awanmo.com/login/',params).then(response =>{

        if(this.user_name&&this.user_paswd){
          if(response.data.status){
            this.$store.commit('set_login',this.user_name)
            sessionStorage.setItem("user_id",response.data.user_id)
            console.log(response.data.user_id)
            this.$router.push('/')
          }else{
            this.alert = response.data.error
            console.log(this.alert)
          }
        }else{
          this.alert =  response.data.error
          console.log(this.alert)
        }
  
        },response =>{
          
        })
      
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_user{
  background: rgb(255, 255, 255);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 10px;
}
.login_head{
  height: 150px;
  padding-top:30px;
  padding-left: 30px;
  margin-bottom: 100px;
  display: block
}
img{
  height:100%
}
.login_user{
  width: 360px;
  padding:20px;
  vertical-align: middle;
  margin: 0 auto;
  text-align: center
}
input{
  height: 50px;
  border: 1px solid rgba(204, 204, 204,0.5);
  border-radius: 5px;
  width: 100%;
  font-size: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) inset;
  text-indent: 15px
}
p{
  width: 100%;
  margin:30px 0px;
  font-size: 25px;
  font-weight: bold;
  
}
button{
  width: 100%;
  height:50px;
  margin:50px 0;
  border-radius: 10px;
  background: rgb(253, 255, 250);
  border: none;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.1) ;
  color: #909399;
  font-size: 20px
}
button:hover{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.2) inset ;
}
input:hover{
   box-shadow: 0 2px 12px 0 rgba(0,0,0,.2) inset;
}
</style>
