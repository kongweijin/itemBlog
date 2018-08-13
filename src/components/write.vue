<template>
  <div class="write">
    <blogHead :indexhead="indexhead" :headmidd="headmidd"></blogHead>
    <div class="edit_body">
      <div class="bianji">
        <input type="text" placeholder="请输入文章标题" v-model="articletitle">
        <mavon-editor ref="edits" v-model="articletext" class="editor" :style="edit_class" @imgAdd="imgAdd"/>
      </div>
      <div class="voltage">
        <span>文章分类</span>
        <select id="select">
          <option v-for="item in class_list" :key="item.class_name" :value="item.class_id">{{item.class_name}}</option>
        </select> 
      </div>
      <div class="publish ">
        <input type="button" value="发表文章" @click="set_article">
        <input type="button" value="返回" @click="toadmin">
      </div>
    </div>
  </div>
</template>

<script>
import blogHead from '../components/blogHead'
import {server_img_url,server_url} from "../main.js"

export default {
  name: 'index',
  data () {
    return {
      indexhead:1440,//头长度
      headmidd:960,//头中间长度
      articletitle:"",
      articleclassId:0,
      articletext:"",
      edit_class:{
          "height":0,
      },
      class_list:[]
    }
  },
  computed:{
   
  },
  methods:{
   imgAdd(pos,imgfile){
    var formdata = new FormData();
    formdata.append('file',imgfile);
    this.$http({
        url: 'http://www.awanmo.com/upload/',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      var temp_url = server_img_url + response.data.name
      this.$refs.edits.$img2Url(pos,temp_url)
      return 0
    })
   },
   set_article(){
      var select = document.getElementById("select");
      var index = select.selectedIndex;
      this.articleclassId = select.options[index].value;

      var params = new URLSearchParams();
        params.append('do','add')
        params.append('article_id',0)
        params.append('article_title',this.articletitle)
        params.append('article_text',this.articletext)
        params.append('article_class_id',this.articleclassId)
        
      this.$http.post('http://www.awanmo.com/article_manage/',params).then(response => {
        this.$router.push('/home/'+this.userid)
      }, response => {
        console.log(response);
      })
    },
    update_class(){
        var params = new URLSearchParams();
        params.append('user_id',this.userid)
        this.$http.post('http://www.awanmo.com/get_article_class/',params).then(response => {
            this.class_list = response.data
        }, response => {
            console.log(response);
        })
      },
      toadmin(){
          this.$router.push('/user/'+this.userid)
      }
  },
  mounted(){
   this.update_class()
  },
  watch:{
    
  },
  created(){
    this.edit_class.height = (window.screen.height-500)+'px'
  },
  components:{
    blogHead:blogHead
  },
  props:['userid']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editor{
  height: 500px;
  width: 100%
}
.bianji input{
  height: 35px;
  width: 100%;
  background: #eee;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  text-indent: 20px
}
.edit_body{
  padding: 50px;
  width: 70%;
  margin: 0 auto;
  background: #ffffff;
  margin-top: 20px;
  border: 1px solid #ddd;
  box-shadow:0 2px 5px 0 rgba(25, 27, 25, 0.2);
}
.voltage{
  margin-top: 20px;
}
.publish input{
  width: 80px;
  text-align: center;
  background: #ffffff;
  border: 1px solid red;
  border-radius: 5px;
  height: 35px;
  line-height: 35px;
  margin-right: 10px;
  cursor: pointer;
  color: red;
}
.publish input:hover{
  background: rgb(173, 6, 6);
  color: #ffffff
}
.publish{
  margin-top: 20px;
}

</style>
