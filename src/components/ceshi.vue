<template>
  <div class="index">
    <blogHead :indexhead="indexhead" :headmidd="headmidd"></blogHead>
    <div class="index_all">
      <div class="index_left">
        <!-- 滚蛋窗口开始 -->
        <div class="index_word">
          <a class="left_jiantou" @click="right_to">←</a>
          <a class="right_jiantou" @click="left_to">→</a>
          <ul class="allBTbiaoqian">
            <li v-for="(item,index) in wordImg" :key="item" class="BTbiaoqian" :class="{wirth:index==b}" @click="toindex(index)"></li>
          </ul>
          <transition-group  name="fade" tag="ul">
          <div class ="word_false " v-for="(item,index) in wordImg" :key="item" v-show="index ==b">
            <a href="/">
            <img :src="item" :alt="index">
            </a>
          </div>
          </transition-group>
        </div>
        <!-- 专题开始 -->
        <div class="class_zt">
          <a v-for="item in all_class" :key="item" class="class_one" @click="getret(item.class_name)">
            <div class="class_head"></div>
            <div class="class_name">{{item.class_name}}</div>
          </a>
          <a class="class_more">更多热门专题</a>
        </div>
        <!-- 文章内荣开始 -->
        <div class="index_article">
          <ul>
            <li v-for="(item,index) in articleclass" :key="index.article_title" :class="{borderTop:index==0}" v-if="index<indexnum">
              <a></a>
              <div class="all_article">
                <a target="_blank" class="article_title" @click="toarticle(item.article_id,item.user_id)">{{item.article_title}}</a>
                <p class="article_text">{{item.article_text}}</p>
                <div class="article_dataname">
                  <a href="" class="article_name" @click="tohome(item.user_id)">{{item.user_name}}</a>
                  <span class="article_data">{{item.article_date}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <a class="mold_gd" :style="{display:dispnone}" @click="moreArticle">阅读更多</a>
      </div>
       <!-- 右边开始 -->
      <div class="index_right">
        <div class="right_head">
          <a href="/">
          <img src="../assets/7.png" alt="7">
          </a>
          <a href="/">
          <img src="../assets/30r.png" alt="7">
          </a>
          <a href="/">
          <img src="../assets/lz.png" alt="7">
          </a>
          <a href="/">
          <img src="../assets/js.png" alt="7">
          </a>
          <a href="/">
          <img src="../assets/dxt.png" alt="7">
          </a>
        </div>
        <div class="right_ariter">
          <div class="Writeariter">抄写作者</div>
          <ul>
            <li v-for="item in all_user" :key="item">{{item.user_name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {server_img_url,server_url} from "../main.js"
import blogHead from '../components/blogHead'
export default {
  name: 'index',
  data () {
    return {
      wordImg:[require('../assets/1.jpg'),require('../assets/2.jpg'),require('../assets/3.jpg')],
      b:0,
      indexnum:10,
      all_article:[],
      all_class:[],
      indexhead:1440,//头长度
      headmidd:960,//头中间长度
      ret:"",
      all_user:[],
      blogname:[]
      }
  },
  computed:{
    dispnone(){
      if(this.all_article.length>10){
        return 'block'
      }else{
        return 'none'
      }
    },
    articleclass(){
      var ret=[];
      for(var i=0;this.all_article.length>i;i++){
        if(this.all_article[i].article_class==this.ret){
          ret.push(this.all_article[i])
        }
      }
      return ret
    }
  },
  watch:{
    
  },
  methods:{
   left_to(){
      this.b +=1;
      if(this.b===this.all_article.length-1)
        this.b = 0
   },
   right_to(){
     this.b -= 1;
     if(this.b === -1){
       this.b = this.wordImg.length-1
     }
     console.log(this.b)
   },
   moreArticle(){
     if(this.indexnum < this.all_article.length){
       this.indexnum += 5
     }else{
       alert('没了，别给老子点了')
     }
   },
   autoplay(){
     this.b++;
     if(this.b===3){
       this.b = 0
     }
   },
   play(){
     setInterval(this.autoplay,6000)
     
   },
   toindex(index){
     this.b = index
   },
   get_all_article(){
     this.$http.post(server_url+'get_article/').then(response =>{
       this.all_article = response.data
       this.ret = response.data[0].article_class
     })
   },
   get_all_class(){
      this.$http.post(server_url+'get_article_class/').then(response =>{
       this.all_class = response.data
      },response =>{
       console.log(response.data)
      })
   },
   get_all_user(){
      this.$http.get(server_url+'get_user_list/').then(response =>{
       this.all_user = response.data
       for(var i = 0;this.all_user.length>i;i++){
         console.log(222,this.all_user[i])
        var params = new URLSearchParams();
        params.append('user_name',this.all_user.user_id[i])
        this.$http.post(server_url+'get_user_site_setting/',params).then(response =>{
          this.blogname.push(this.all_user.blog_name)
          console.log(11111,this.all_user.blog_name)
        })
       }
      },response =>{
       console.log(response.data)
      })
      
   },
   tohome(userid){
     this.$router.push('/home/'+userid)
   },
   toarticle(userid,articleid){
     this.$router.push('/article/'+articleid+userid)
   },
   getret(a){
     this.ret = a
     console.log(this.ret)
   }
  },
  mounted(){
   this.get_all_article()
   this.get_all_class()
   this.get_all_user()
  },
  components:{
    blogHead:blogHead
  },
  created(){
    this.play()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index_all{
  width: 960px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
}
/*左半部分开始*/
.index_left{
  width: 66.6667%;
  float: left;
  padding-top:30px;
}
/*窗口开始*/
.index_word{
  overflow: hidden;
  width: 100%;
  border-radius:10px;
  position: relative;
  margin-bottom: 35px;
  height: 270px;
}
.word_false img{
  width: 100%;
  height: 270px;
  background-color: hsla(0,0%,71%,.2);
  background-color: white;
}
.word_false{
  position: absolute;
  top: 0;
  left:0;
  transition: all 5s;
}

.left_jiantou{
  position: absolute;
  background-image: none;
  background-color: rgba(0,0,0,.4);
  height: 50px;
  width: 40px;
  top: 40%;
  left:0;
  bottom: 0;
  text-align: center;
  line-height: 45px;
  font-size: 30px;
  border-radius: 0px 5px 5px 0px;
  opacity: 0;
  cursor: pointer;
  z-index: 11;
}
.right_jiantou{
  position: absolute;
  opacity: 0;
  background-image: none;
  background-color: rgba(0,0,0,.4);
  height: 50px;
  width: 40px;
  top: 40%;
  right: 0;
  bottom: 0;
  text-align: center;
  line-height: 45px;
  font-size: 30px;
  border-radius: 5px 0px 0px 5px;
  cursor: pointer;
  z-index: 11;
}
.index_word:hover .right_jiantou{
  opacity: 1;
  transition: .1s ease-in;
}
.index_word:hover .left_jiantou{
  opacity: 1;
  transition: .1s ease-in;
}
.word_left{
  display: block;
  transform:translate3d(100%,0,0);
  bottom: 0;
  transition: .6s ease-in-out;
}
.word_right{
  display: block;
  transform:translate3d(0,0,0);
  transition: .6s ease-in-out; 
}
.BTbiaoqian{
  width: 25px;
  height: 2px;
  background-color: hsla(0,0%,47%,.4);
  margin: 1px;
  cursor: pointer;
  border-radius: 10px;
  display: inline-block
}
.allBTbiaoqian{
  margin-bottom: 8px;
  width: 80%;
  left: 40%;
  position: absolute;
  z-index: 11;
  margin-left: -30%;
  text-align: center;
  padding-left: 0;
  bottom: 0;
}
.wirth{
  background: #fff
}

/*文章窗口滚动开始*/
.fade-enter-active {
  transition: all 6s ;
}
.fade-leave-active {
  transition: all 6s ;
  transform: translateX(0%);
}
.fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transition: all 6s ;
  transform: translateX(-100%);
}
.fade-leave-to{
  transform: translateX(100%);
} 
/*文章专题开始*/
.class_zt{
  margin-bottom: 20px
}
.class_one{
  display: inline-block;
  margin: 0 18px 18px 0;
  min-height: 32px;
  background-color: #f7f7f7;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  vertical-align: top;
  overflow: hidden;
  cursor: pointer;
}
.class_head{
  width: 32px;
  height: 32px;
  background: #0c79b1;
  float: left;
}
.class_name{
  float: left;
  padding: 0 11px 0 6px;
  font-size: 14px;
  line-height: 32px
}
.class_more{
  display: inline-block;
  margin-top: 7px;
  font-size: 14px;
  color: #787878;
  line-height: 23px
}
/*文章部分开始*/
.all_article{
  width: 100%;
}
.article_title{
  color: #333;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin: -7px 0 4px;
  line-height: 1.5;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
  display: inherit
}
.article_text{
  color: #999;
  font-size: 13px;
  margin: 0 0 8px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp:2;
  width:100%;
  white-space:keep-all
}
.article_dataname{
  font-size: 12px;
  font-weight: 400;
  line-height: 20px
}
.article_name{
  color: #b4b4b4;
  margin-right: 10px;
  cursor: pointer;
}
.article_data{
  color: #b4b4b4;
}
.index_article li{
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;;
  line-height: 20px;
  margin-bottom: 15px
}
.index_article .borderTop{
  border-top: 1px solid #f0f0f0;
  padding-top:30px
}
.mold_gd{
  width: 100%;
  height: 40px;
  margin: 30px auto 60px;
  padding: 10px 15px;
  text-align: center;
  font-size: 15px;
  border-radius: 20px;
  color: #fff;
  background-color: #a5a5a5;
  display: block;
  cursor: pointer;
}
.mold_gd:hover{
  background-color: #9b9b9b;
}
/*有半部分开始*/
.index_right{
  width: 29.16667%;
  margin-left: 4.16667%;
  padding: 30px 0 0;
  float: left;
}
.right_head{
  margin-top: -4px;
  padding-bottom: 4px;
  min-height: 228px;
}
.right_head img{
  width: 100%;
  min-height: 50px;
  margin-bottom: 6px;
  border-radius: 4px;
}
.right_ariter{
  margin-bottom: 20px;
  padding-top: 0;
  font-size: 13px;
  text-align: center;
  margin-top: 50px
}
.Writeariter{
  text-align: center;
  font-size: 14px;
  color: #969696;
}
.right_ariter li{
  margin-top: 15px;
  text-align: left
}
.wordleft{
  left: 0%;
  
}
</style>
