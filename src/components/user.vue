<template>
  <div class="user">
    <blogHead :indexhead="indexhead" :headmidd="headmidd"></blogHead>
    <div class="user_body">
      <div class="admin_title">
      <ul>
            <li class="admin_titleLI" v-for="(item,index) in title" :key="index" @click="toadmin('Admin_'+index,index)" :class="{admin_titleBcss:index==num}">{{item}}</li>
      </ul>
      </div>
    <component :is="admin_id" :userid="userid"></component>
    </div>
  </div>
</template>

<script>
import {server_img_url,server_url} from "../main.js"
import blogHead from '../components/blogHead'
import Admin_0 from './setusername.vue'
import Admin_1 from './setuser.vue'
import Admin_2 from './admin_id.vue'
import Admin_3 from './classify.vue'
export default {
  name: 'user',
  data () {
    return {
      indexhead:1440,//头长度
      headmidd:960,//头中间长度
      title:["个人信息","账号设置","文章管理","分类管理"],
      admin_id:"Admin_0",
      admin_titleBcss:"admin_titleBcss",
      num:0,
    }
  },
  computed:{
    getalert(){
      return this.$store.getters.get_alert
    },
  },
  methods:{
    toadmin(index,item){
      this.admin_id = index
      this.num = item
    },
    get_useradmin(){
      var params = new URLSearchParams();
      params.append('user_id',this.userid)
      console.log(this.userid)
      this.$http.post(server_url+'get_user_site_setting/',params).then(response => {
      
        }, response => {
        console.log(response);
        })
    },
    to_title(id){
     this.$router.push(id)
   }
  },
  mounted(){
   this.get_useradmin()
  },
  components:{
    blogHead,Admin_0,Admin_1,Admin_2,Admin_3
  },
  props:['userid']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin_title{
  height: 50px;
}
.admin_titleLI{
  float: left;
  line-height: 29px;
  cursor: pointer;
  padding: 10px
}
.admin_titleLI:hover{
  background:#999999;
  color: #ffffff 
}
.admin_title ul{
  width: 800px;
  margin: 0 auto
}
.admin_titleBcss{
  background:#999999;
  color: #ffffff 
}
</style>

