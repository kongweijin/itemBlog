<template>
  <div class="admin_id">
      <p class="admin_id_title">文章管理</p>
      <div class="admin_id_body">
        <div class="admin_id_head">
            <select v-model="aa">
                <option v-for="item in title" :key="item" selected="selected">{{item}}</option>
            </select> 
            <input type="botton" value="添加" @click="towrite">
        </div>
        <div class="admin_id_artlce">
            <p class="admin_id_artlceP" v-for="item in articleTitles " :key="item.article_title" ><span class="articlet_titles">{{item.article_title}}</span><span class="adimdel" @click="adimdel(item.article_id)">删除</span><span class="adimdel" @click="setarticle(item.article_id,item.user_id)">编辑</span></p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'admin_id',
  data () {
    return {
      title:[],
      articleTitle:[],
      aa:"kong的默认分类"
    }
  },
  methods:{
    get_userxinxi(){
        var params = new URLSearchParams();
        params.append('user_id',this.userid)
         this.$http.post('http://www.awanmo.com/get_article_class/',params).then(response =>{
             for(var i =0;i<response.data.length;i++){
                 this.title.push(response.data[i].class_name)
             }
      },response =>{
        console.log(response)
      })
    },
    get_userartcle(){
         var params = new URLSearchParams();
         params.append('user_id',this.userid)
         this.$http.post('http://www.awanmo.com/get_article/',params).then(response =>{
         this.articleTitle = response.data
      },response =>{
        console.log(response)
      })
    },
    toadd(){
        this.$router.push('/addarticle/'+this.userid)
    },
    adimdel(articleid){
        var params = new URLSearchParams();
        params.append('do','del')
        params.append('article_id',articleid)
        params.append('article_title',0)
        params.append('article_text',0)
        params.append('article_class_id',1)
        
      this.$http.post('http://www.awanmo.com/article_manage/',params).then(response => {
        console.log(response.data)
        this.get_userartcle()
        alert('删除成功')
        }, response => {
        console.log(response);
        })
    },
    setarticle(articleid,userid){
        this.$router.push('/edit/'+articleid+'/'+userid)
    },
    towrite(){
     this.$router.push('/write/'+this.userid)
   }
  },
   computed:{
      articleTitles(){
        var arti = []
        for(var i =0;i<this.articleTitle.length;i++){
          if(this.articleTitle[i].article_class === this.aa){
            arti.push(this.articleTitle[i])
            }
        } 
        return arti
      }
  },
  watch:{
      
  },
  mounted(){
      this.get_userxinxi()
      this.get_userartcle()
  },
  props:['userid']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin_id{
    width: 800px;
    margin: 0 auto;
    background: #fff;
    height: 100%;
}
.admin_id_body{
    padding: 20px
}
.admin_id_head select{
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    height: 35px;
    line-height: 35px;
    width: 150px;
    text-indent: 10px;
    cursor: pointer;
}
.admin_id_head input{
    background: rgb(231, 39, 39);
    border-radius: 4px;
    height: 35px;
    line-height: 35px;
    width: 60px;
    text-align: center;
    color: #fff;
    float: right;
    cursor: pointer;
}
.admin_id_head input:hover{
    background: rgba(255, 0, 0, 0.555)
}
.admin_id_artlce{
    margin-top: 30px;
    margin-bottom: 30px;
}
.admin_id_title{
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    font-size: 17px;
    border-bottom: 1px solid #dadada;
    margin-bottom: 30px
}
.adimdel{
    float: right;
    cursor: pointer;
    color: blue;
    margin-left: 20px;
}
.admin_id_artlceP{
    clear: both
}
</style>

