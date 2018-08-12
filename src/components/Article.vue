<template>
  <div class="Article">
    <blogHead :indexhead="indexhead" :headmidd="headmidd"></blogHead>
    <div class="article_body">
      <h1 class="body_title">{{articleData.article_title}}</h1>
      <div class="author">
        <a class="authorimg" @click="tohome"><img src="../assets/1.jpg" alt=""></a>
        <div class="user">
          <a class="username" @click="tohome">{{articleData.user_name}}</a>
          <span class="articledata">{{articleData.article_date}}</span>
        </div>
      </div>
      <div class="article_text">
          <p>{{articleData.article_text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import blogHead from '../components/blogHead'
export default {
  name: 'Article',
  data () {
    return {
      indexhead:"1440",
      headmidd:"960",
      articleData:[]
    }
  },
  computed:{
   
  },
  methods:{
   get_article(){
      var params = new URLSearchParams();
     params.append('article_id',this.articleid)
     this.$http.post('http://www.awanmo.com/get_article/',params).then(response=>{
       this.articleData = response.data
       console.log('aa1',response.data)
     },response=>{
       console.log('aa2',response.data)
     })
   },
   tohome(){
     this.$router.push('/home/'+this.userid)
   }
  },
  mounted(){
   this.get_article()
  },
  components:{
    blogHead:blogHead
  },
  props:['articleid','userid']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article_body{
  width: 620px;
  margin: 0 auto;
  padding-top: 50px
}
.body_title{
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}
.author{
  margin: 30px 0 40px;
  float: left;
}
.authorimg{
  width: 48px;
  height: 48px;
  display: block;
  float: left;
}
.authorimg img{
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 50%;
}
.user{
  float: left;
  padding-left: 10px
}
.username{
  clear: both;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  padding-top: 6px;
  display: block
}
.articledata{
  padding-top: 5px;
  display: block;
  clear: both;
  font-size: 12px;
  color: #969696;
}
.article_text{
  display: block;
  clear: both;
}
</style>
