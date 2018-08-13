<template>
  <div class="setuser">
      <p class="setuser_title">个人信息</p>
      <div class="setusername">
        <span class="xiuGzl" @click="open">修改个人资料</span>
        <dl class="user_left" @click="to_home()">
            <dt><img :src="user_head"></dt>
        </dl>
        <dl class="user_right">
            <dt>{{blogName}}</dt>
            <dd>{{blogInfo}}</dd>
        </dl>
        <div style="margin-top:10px">
            <el-upload
                class="upload-demo"
                :action="upload_url"
                :on-success = "modeify_user_head"
                :with-credentials = true
                :show-file-list = false
                :file-list="fileList">
                <el-button size="small" type="primary">修改头像</el-button>
            </el-upload>
        </div>
        <span class="is_error">{{ error }}</span>
        
      </div>
      <el-dialog
        title="用户简介"
        :visible.sync="is_show"
        width="30%">
        <span class="xiuGzl_Nc">用户名 :{{ user.user_name }}</span>
        <span class="xiuGzl_Nc">昵称 :<input type="text" v-model="blogName"></span>
        <span class="xiuGzl_Gs">概述 :<textarea maxlength="12" v-model="blogInfo"></textarea>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="set_user">保存</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {server_img_url,server_url} from "../main.js"
export default {
  name: 'setusername',
  data () {
    return {
      user:0,
      user_head:0,
      username:"",
      is_show:false,
      black_style:{"height":0,"width":0},
      blogName:"",
      blogInfo:"",
      upload_url:server_url + "upload/",
      fileList:[],
      error:"",
    }
  },
  methods:{
    modeify_user_head(response, file, fileList){

        if(response.status){
            var params = new URLSearchParams();
            params.append('do','re_head')
            params.append('user_head',response.name)
            this.$http.post(server_url+'set_user/',params).then(response =>{
                if(response.data.status){
                    this.error = '修改成功'
                }
            },response =>{
                this.error = '修改失败'
                console.log(response)
            })
        }else{
            this.error = '修改失败'
        }

    },
    open(){
        this.is_show = true
    },
    get_username(){
        var params = new URLSearchParams();
        params.append('user_id',this.userid)
        this.$http.post(server_url+'get_user_site_setting/',params).then(response =>{
            this.blogName = response.data.blog_name
            this.blogInfo = response.data.blog_info
        },response =>{
            console.log(response)
        })
    },
    get_user(){
        var urls = server_url+'get_user_list/?user_id='+this.userid
        this.$http.get(urls).then(response=>{
            this.user = response.data[0]
            this.user_head = server_img_url + this.user.user_head
        },response=>{
            console.log('错误',response.data)
        })
    },
    set_user(){
        var params = new URLSearchParams();
        params.append('blog_name',this.blogName)
        params.append('blog_info',this.blogInfo)
        params.append('blog_head_color',0)
        params.append('blog_bgm',0)
         this.$http.post(server_url+'set_user_site/',params).then(response =>{
            this.is_show = false
            this.get_username()
      },response =>{
        console.log(response)
      })
    },
    to_home(){
        this.$router.push('/home/'+this.userid)
    }
  },
  mounted(){
    this.get_user()
    this.get_username()
  },
  created(){
    this.black_style.height = (document.body.scrollHeight)+'px'
    this.black_style.width = (document.body.scrollWidth)+'px'
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
}
.setusername{
    width: 100%;
    height: 100%;
    padding: 20px;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px
}
.user_left dt{
    height: 150px;
    width: 150px;
    cursor: pointer;
}
.user_left{
    margin-right: 50px
}
.user_left img{
    height: 100%;
    width: 100%;
}
.user_left,.user_rght{
    float: left;
}
.user_right{
    margin-top: 20px
}
.user_right dt{
    font-size: 24px;
    margin-bottom: 20px
}
.xiuGzl{
    position: absolute;
    right: 20px;
    cursor: pointer;
    color: #5C9BF3
}

.xiuGzl_div{
    background: #fff;
    position: absolute;
    z-index: 9999;
    width: 400px;
    border: 1px solid #dadada;
    left: 50%;
    top: 20%;
    margin-left: -200px;
}
.xiuGzl_p{
    font-size: 24px;
    border-bottom: 1px solid #dadada;
    text-indent: 20px;
    height: 40px;
    line-height: 40px
}
.xiuGzl_user{
    background: #dadada;
    height: 35px;
    line-height: 35px;
    font-size: 17px;
    display: block;
    border-bottom: 1px solid #dadada;
    text-indent: 10px
}
.xiuGzl_Gs{
    display: block;
    height: 30px;
    line-height: 30px
}
.xiuGzl_body{
    padding: 10px;
    margin: 15px 0px
}
.xiuGzl_foot{
margin: 10px
}
.xiuGzl_Nc{
    margin-bottom: 30px;
    display: block;
    height: 30px;
    line-height: 30px
}
.xiuGzl_Nc input{
    height: 100%;
    border: 1px solid #dadada;
    margin-left: 10px;
    width: 325px;
    line-height: 30px;
    text-indent: 10px
}
.xiuGzl_Gs textarea{
    height: 30px;
    border: 1px solid #dadada;
    margin-left: 10px;
    width: 325px;
    line-height: 30px;
    text-indent: 10px
}
.xiuGzl_x{
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
}
.xiuGzl_x:hover{
    color: #dadada
}
.xiuGzl_qb span{
    display: inline-block;;
    height: 28px;
    line-height: 28px;
    font-size: 15px;
    width: 80px;
    text-align:center;
    color: #fff;
}
.xiuGzl_qb_del{
    background: #999;
    margin-left: 10px
}
.xiuGzl_qb_pus{
    background: red
}
.xiuGzl_qb{
    text-align: right;
    padding: 10px;
}
.black{
    background: black;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9998;
    opacity: 0.5
}
.setuser_title{
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    font-size: 17px;
    border-bottom: 1px solid #dadada;
    margin-bottom: 30px
}
.is_error{
    padding-top:10px;
    color: red;
}
</style>

