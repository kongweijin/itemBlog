<template>
  <div class="home">
    <blogHead :indexhead="indexhead" :headmidd="headmidd"></blogHead>
    <div class="home_body">
      <div class="bodyHead">
        <a class="headIMG"><img src="../assets/3.jpg" alt="0"></a>
        <div class="headRight">
          <a class="homeName">{{blogname}}</a>
          <p class="homeQM">{{bloginfo}}</p>
        </div>
      </div>
      <!-- 文章加标签页-->
      <div class="bodyArticle">
        <!-- 文章左部分-->
        <div class="article">
          <ul>
            <li v-for="(item,index) in Aiticle" :key="index.article_data">
              <a class="article_title" @click="toarticle(item.article_id,item.user_id)">{{item.article_title}}</a>
              <p class="article_text">{{item.article_text}}</p>
              <div class="article_fppt">
                <span class="article_class">{{item.article_class}}</span>
                <span class="article_data">{{item.article_date}}</span>
                </div>
            </li>
          </ul>
        </div>
        <!-- 标签页右部分-->
        <div class="title">
          <ul>
            <li v-for="(item,index) in nameClass" :key="item.class_name" @click="classarticle(index,item.class_name)" :class="{classcolor:index==num}">{{item.class_name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogHead from '../components/blogHead'
export default {
  name: 'home',
  data () {
    return {
      indexhead:"1440",
      headmidd:"960",
      blogname:"",
      bloginfo:"",
      homeArticle:[],
      nameClass:[],
      num:0,
      key:""
    }
  },
  computed:{
    Aiticle(){
      var ret = []
      for(var i = 0;i < this.homeArticle.length;i++){
        if(this.homeArticle[i].article_class == this.key){
          ret.push(this.homeArticle[i])
        }
      }
      return ret
    }
  },
  methods:{
   userArticle(){
     var params = new URLSearchParams();
     params.append('user_id',this.userid)
     this.$http.post('http://www.awanmo.com/get_article/',params).then(response=>{
       this.homeArticle = response.data
     })
   },
   userblog(){
     var params = new URLSearchParams();
     params.append('user_id',this.userid)
     this.$http.post('http://www.awanmo.com/get_user_site_setting/',params).then(response=>{
       this.blogname = response.data.blog_name
       this.bloginfo = response.data.blog_info
     })
   },
   nameclass(){
     var params = new URLSearchParams();
     params.append('user_id',this.userid)
     this.$http.post('http://www.awanmo.com/get_article_class/',params).then(response=>{
       this.nameClass = response.data
       this.key = response.data[0].class_name
     })
   },
   classarticle(index,key){
     this.num = index
     this.key = key
   },
   toarticle(articleid,userid){
     this.$router.push('/article/'+articleid+'/'+userid)
   }
  },
  mounted(){
   this.userArticle()
   this.userblog()
   this.nameclass()
  },
  components:{
    blogHead:blogHead
  },
  props:['userid']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home_body{
  width:960px;
  padding-top: 30px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}
.headIMG{
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
  float: left;
  transition:transform .9s;
  cursor: pointer; 
}
.headIMG:hover{
  transform:rotate(360deg);
}
.headIMG img{
  height: 100%;
  width: 100%;
}
.homeName{
  display: block;
  font-size: 21px;
  font-weight: 700;
  padding-top:15px;
}
.homeQM{
  display: block;
  font-size: 12px;
  padding-top:10px;
}
.headRight{
  padding-left: 100px;
}
.article{
  width: 66.66667%;
  float: left;
  padding-top:30px;
}
.bodyArticle{
  clear: both;
}
.article ul li{
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;;
  line-height: 20px;
  margin-bottom: 15px
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
  width:100%;
  /* 显示两行*/
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.article_class{
  font-size: 12px;
  font-weight: 400;
  line-height: 20px
}
.article_data{
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  margin-left: 20px
}
/*右边标签分类开始*/
.title{
  width: 29.16667%;
  float: left;
  padding-top:30px;
  padding-left: 80px ;
}
.title ul li{
  color: #999;
  margin-bottom: 10px;
  font-size: 17px;
  cursor: pointer;
}
.title ul li:hover{
  color: #555
}
.title .classcolor{
  color: #333;
  font-weight: 600
}
</style>
