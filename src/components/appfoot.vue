<template>
  <div class="appFoot">
    <div class="footcear">
      <a href="/" class="aaa"><img src="../assets/2dog.png"> <span>皖ICP备16011660号-4</span></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appfoot',
  data () {
    return {
      
    }
  },
  computed:{
    
  },
  methods:{
    
  },
  mounted(){
   
  },
  components:{
    
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .aaa{
    text-align: center;
    padding: 10px 0;
    width: 100%;
    line-height: 1.5;
    display: block;
    color: #000000;
  }
  .aaa img{
    height: 40px;
    width: auto;
    padding-bottom: 5px;
  }
  .footcear{
    margin: 0 auto;
  }
  .appFoot{
    clear: both;
  }
</style>

