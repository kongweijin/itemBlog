<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>



export default {
  name: 'App',
  components:{
    
  }
}
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
  box-sizing:border-box;
  -webkit-text-stroke-width: 0px;
}

.app{
  min-height: 1500px;
}

body{
  color: #333;
  font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  background-color: #fff;
}
a{
  text-decoration: none;
  color: #333
}
li{
  list-style: none;
}
input,textarea,button{
  vertical-align: bottom;
  width: auto;
  outline: none;
  border: 0;
}
img{
  vertical-align: middle;
  border: 0;
  outline: none
}
html,body,#app,.index{height: 100%;min-height: 800px}
</style>
