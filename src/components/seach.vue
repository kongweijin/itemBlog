<template>
  <div class="seach">
    <blogHead :indexhead="indexhead" :headmidd="headmidd"></blogHead>
    <div class="seach_body">
      <div class="seach_all"  v-if="aa">
        <div class="seach_left">
          <ul>
            <li v-for="(item,index) in title" :key="item" :class="{seach_leftLibg:index == 0}"><span>{{item}}</span></li>
          </ul>
        </div>
        <div class="seach_right">
          <ul class="seachul">
            <li v-for="item in Seacharticle" :key="item.article_id">
              <a class="article_title" @click="toarticle(item.article_id,item.user_id)">{{item.article_title}}</a>
                <p class="article_text">{{item.article_text}}</p>
                <div class="article_dataname">
                  <a href="" class="article_name" @click="tohome(item.user_id)">{{item.user_name}}</a>
                  <span class="article_data">{{item.article_date}}</span>
                </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="Seacharticleslse">{{error}}</div>
    </div>
  </div>
</template>

<script>
import blogHead from '../components/blogHead'
export default {
  name: 'seach',
  data () {
    return {
      indexhead:"1440",
      headmidd:"960",
      Seacharticle:[],
      title:["全部文章"],
      aa:true,
      error:""
    }
  },
  computed:{
   
  },
  methods:{
    getseach(){
    var params = new URLSearchParams();
     params.append('search',this.seach)
     this.$http.post('http://www.awanmo.com/search/',params).then(response=>{
       if(response.data.status){
         this.Seacharticle = response.data
         this.aa = true
       }else{
         this.aa = false
         this.error = response.data.error
       }
       console.log('aa2',response.data)
     },response=>{
       console.log('aa2',response.data)
     })
    },
    toarticle(userid,articleid){
     this.$router.push('/article/'+articleid+userid)
   },
   tohome(userid){
     this.$router.push('/home/'+userid)
   },
  },
  mounted(){
    this.getseach()
  },
  watch:{
    seach:'getseach'
  },
  components:{
    blogHead:blogHead
  },
  props:['seach']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.seach_body{
  position: relative;
  width: 960px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
}
.seach_all{
  margin-top: 30px
}
.seach_left{
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 108px 0 0;
  padding: 0 0 30px;
  width: 280px;
  overflow: auto;
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





.seach_right{
  width: 66.66667%;
  margin-left: 33.33333%;
  padding-left: 0;
}
.seachul{
  padding-top: 10px;
  clear: both;
}
.seachul li{
  position: relative;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 2px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  word-wrap: break-word;
  line-height: 20px;
}

.seach_left li{
  
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 15px;
}
.seach_left li span{
  display: block;
  height: 32px;
  line-height: 32px
}
.seach_left li:hover{
 background-color: #f0f0f0;
}
.seach_leftLibg{
 background-color: #f0f0f0;
}
.Seacharticleslse{
  display: block;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px
}
</style>
