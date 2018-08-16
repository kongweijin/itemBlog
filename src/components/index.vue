<template>
  <div class="index">
    <blogHead :indexhead="indexhead" :headmidd="headmidd" ></blogHead>
    <div class="index_all" :style="minheight">
      <div class="index_left">
        <!-- 轮播图开始 -->
        <div class="index_word" @mouseenter="off"  @mouseleave="no"><!-- off鼠标悬停时禁止 no移除启动 -->
          <a class="left_jiantou" @click="world_left" v-if="xtzz">←</a>
          <a class="right_jiantou" @click="world_right" v-if="xtzz">→</a>
          <ul class="allBTbiaoqian">
            <li v-for="(item,index) in imga" :key="index" class="BTbiaoqian" :class="{wirth:index==b}" @click="toindex(index)"></li>
          </ul>
          <transition-group  :name="fade" tag="ul">
          <div v-for="(item,index) in imga" :key="item" class="imag" v-show="index == b "><a ><img :src="item"></a></div>
          </transition-group>
        </div>
        <!-- 专题开始 -->
        <div class="class_zt">
          <a class="class_one" @click="qbfl">
            <div class="class_head"></div>
            <div class="class_name">全部分类</div>
          </a>
          <a v-for="(item,index) in all_class" :key="index" class="class_one" @click="getret(item.class_name)" v-if="index<classnum">
            <div class="class_head"></div>
            <div class="class_name">{{item.class_name}}</div>
          </a>
          <a class="class_more" v-if="class_gd" @click="classGd">更多分类</a> <!-- 五个以下不显示 -->
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
        <a class="mold_gd" :style="{display:dispnone}" @click="moreArticle">阅读更多</a><!-- 十个以下不显示，点击文章数量每次十个递增 -->
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
            <li v-for="item in all_user" :key="item" @click="tohome(item.user_id)">{{item.user_name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <appfoot></appfoot>
  </div>
</template>

<script>
import {server_img_url,server_url} from "../main.js"
import blogHead from '../components/blogHead'
import appfoot from '../components/appfoot'
export default {
  name: 'index',
  data () {
    return {
      show: true,
      imga:[require('../assets/1.jpg'),require('../assets/2.jpg'),require('../assets/3.jpg')],
      b:0,//轮播图索引
      indexnum:10,//默认只显示10片文章
      all_article:[],
      all_class:[],
      indexhead:1440,//头长度
      headmidd:960,//头中间长度
      ret:"",
      all_user:[],
      blogname:[],
      classnum:5,//默认只显示五个分类
      class_gd:false,//分类数量在5以下不显示
      timer:null,//窗口定时器
      xtzz:true, //指针是否显示
      fade:"ddd",
      minheight:{
        "height":0
      }
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
      if(!this.ret){
        ret = this.all_article
        return ret
      }else{
      for(var i=0;this.all_article.length>i;i++){
        if(this.all_article[i].article_class==this.ret){
          ret.push(this.all_article[i])
        }
      }
      return ret
      }
    }
  },
  methods:{
    //轮播图定时
    play(){
      this.timer = setInterval(this.autoplay,6000)
    },
    autoplay(){
      this.b++;
      if(this.b===3){
        this.b = 0
    }
   },
   //轮播图下标签选取图片
   toindex(aa){
     if(window.time == 0){
       window.time = 1
       var index = setInterval(function(){
         window.time --
         if(window.time ==0){
           clearInterval(index)
         }
       },2000)
      this.b = aa
     }else{
       console.log('bukedian')
     }
   },
   //点击更多文章 十次递增
   moreArticle(){
     if(this.indexnum < this.all_article.length){
       this.indexnum += 10
     }else{
       alert('没了，别给老子点了')
     }
   },
   //获取文章
   get_all_article(){
     this.$http.post(server_url+'get_article/').then(response =>{
       this.all_article = response.data
       
     })
   },
   //获取所有分类
   get_all_class(){
      this.$http.post(server_url+'get_article_class/').then(response =>{
       this.all_class = response.data
       if(response.data.length>5){
         this.class_gd = true
       }
      },response =>{
       console.log(response.data)
      })
   },
   //获取所有用户 blog名
   get_all_user(){
      this.$http.get(server_url+'get_user_list/').then(response =>{
        this.all_user = response.data
        for(var i = 0;this.all_user.length>i;i++){
          var params = new URLSearchParams();
          params.append('user_name',this.all_user[i].user_name)
          this.$http.post(server_url+'get_user_site_setting/',params).then(response =>{
            this.blogname.push(this.all_user.blog_name)
          })
        }
      },response =>{
       console.log(response.data)
      })
   },
   //
   tohome(userid){
     this.$router.push('/home/'+userid)
   },
   toarticle(articleid,userid){
     this.$router.push('/article/'+articleid+'/'+userid)
   },
   //文章分类同步
   getret(a){
     this.ret = a
   },
   //轮播图定时右指针
   world_right(){
     if(window.time == 0){
       window.time = 1
       var index = setInterval(function(){
         window.time --
         if(window.time ==0){
           clearInterval(index)
         }
       },2000)
        if(this.b<this.imga.length-1){
        this.b+=1
     }else if(this.b==this.imga.length-1){
       this.b = 0
     }
     }else{
       console.log('bukedian')
     }
    
   },
   //轮播图定时左指针
   world_left(){
     if(window.time == 0){
       window.time = 1
       var index = setInterval(function(){
         window.time --
         console.log(11,this.b)
         if(window.time ==0){
           clearInterval(index)
         }
       },2000)
        if(this.b>0){
       this.b-=1
      }else if(this.b = 0){
       this.b = 3
      }
     }else{
       console.log(window.time)
     }

     
    },
    //轮播图开关
    off(){
     clearInterval(this.timer)
    },
    no(){
     this.timer = setInterval(this.autoplay,6000)
    },
    //分类无限
    classGd(){
      this.classnum = 100
      this.class_gd = false
    },
    //全部分类
    qbfl(){
      this.ret = ""
    }
  },
  mounted(){
   this.get_all_article()
   this.get_all_class()
   this.get_all_user()
  },
  created(){
    this.play()
    window.time = 0
    this.minheight.height = (window.screen.height-260)+'px'
  },
   components:{
    blogHead:blogHead,
    appfoot:appfoot
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*轮播图右-------------*/
.fade-enter-active {
  transition: all 1s  ease-in-out;
}
.fade-leave-active {
  transition: all 1s  ease-in-out;
  transform: translateX(0%);
}
.fade-enter
/* 进入前一刻*/ {
  transition: all 1s  ease-in-out;
  transform: translateX(-100%);
}
/* 与leave-enter同步进行*/ 
.fade-leave-to{
  transform: translateX(100%);
} 

/*轮播图左------------*/
.ddd-enter-active {
  transition: all 1s  ease-in-out;
}
.ddd-leave-active {
  transition: all 1s  ease-in-out;
  transform: translateX(0%);
}
.ddd-enter
/* 进入前一刻*/ {
  transition: all 1s  ease-in-out;
  transform: translateX(100%);
}
/* 与leave-enter同步进行*/ 
.ddd-leave-to{
  transform: translateX(-100%);
} 

/*图片*/
.imag{
  width: 100%;
  height: 270px;
  background-color: hsla(0,0%,71%,.2);
  background-color: white;
  position: absolute;
  left: 0;
  overflow: hidden;
}
.imag img{
  height: 100%;
}

/*整体*/
.index_all{
  position: relative;
  width: 960px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
}

/*左边*/
.index_left{
  width: 66.6667%;
  float: left;
  padding-top:30px;
}

/*轮播窗口*/
.index_word{
  overflow: hidden;
  width: 100%;
  border-radius:10px;
  position: relative;
  margin-bottom: 35px;
  height: 270px;
}


/*轮播图箭头*/
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

/*轮播图下面标签*/
.BTbiaoqian{
  width: 25px;
  height: 2px;
  background-color: hsla(0,0%,47%,.4);
  margin: 1px;
  cursor: pointer;
  border-radius: 10px;
  display: inline-block;
  transition: 1s  ease-in-out;
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
  background: #fff;
  transition: 2s  ease-in-out;
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
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.article_title:hover{
  text-decoration: underline
}
.article_text{
  color: #999;
  font-size: 13px;
  margin: 0 0 8px;
  line-height: 24px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
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
  margin-bottom: 15px;
}
.index_article li:hover{
  list-style:underline;
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
  text-align: left;
  cursor: pointer;
  color: #333
}
.right_ariter li:hover{
  color: #969696;
}
</style>
