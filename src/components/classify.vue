<template>
  <div class="classify">
    <p class="classify_title">分类管理</p>
    <div class="classify_cear">
        <div class="operating">
            <button @click="dialogVisible = true">添加分类</button>
        </div>
        <table>
            <tr>
                <th>类别</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item,index) in class_list" :key="index.class_name">
                <td>
                    <div class="edit_value" v-if="index == edit_num">
                        <input type="text"  v-model="item.class_name">
                        <span class="blue" @click="save_edit(item)">保存</span>
                        <span class="red" @click="cancle_edit(item)">取消</span>
                    </div>
                    <div class="show_value" v-else>
                        <span>{{ item.class_name }}</span>
                    </div>  
                </td>
                <td style="text-align:center;"> 
                    <div>
                        <span class="blue" @click="click_edit(index,item.class_name)">编辑</span>
                        <span class="red"  @click="delete_class(item)">删除</span>
                    </div>
                </td>
            </tr>
        </table>      
    </div>
    <el-dialog
        title="添加分类"
        :visible.sync="dialogVisible"
        width="30%">
        <span>添加分类 </span><input class="new_class_input" v-model="new_class" />
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="click_add">添加</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {server_img_url,server_url} from "../main.js"
export default {
  name: 'classify',
  data () {
    return {
      edit_num:-1,
      class_list:'',
      temp_name:'',
      dialogVisible: false,
      new_class:''
    }
  },
  methods:{
      update_class(){
        var params = new URLSearchParams();
        params.append('user_id',this.userid)
        this.$http.post(server_url+'get_article_class/',params).then(response => {
            this.class_list = response.data
        }, response => {
            console.log(response);
        })
      },
      click_edit(index,class_name){
          this.edit_num = index
          this.temp_name = class_name
      },
      cancle_edit(item){
        item.class_name = this.temp_name
        this.edit_num = -1
      },
      delete_class(item){
        var params = new URLSearchParams();
        params.append('do','del')
        params.append('class_id',item.class_id)
        params.append('class_name',item.class_name)
        this.$http.post(server_url+'class_manage/',params).then(response => {
            if(response.data.status){
                this.update_class()
                alert("删除成功")
            }else{
                alert("删除失败:"+response.data.error)
            }
        }, response => {
            console.log(response);
        })
      },
      save_edit(item){
        if(item.class_name != this.temp_name && item.class_name != ''){
            var params = new URLSearchParams();
            params.append('do','update')
            params.append('class_id',item.class_id)
            params.append('class_name',item.class_name)
            this.$http.post(server_url+'class_manage/',params).then(response => {
                this.edit_num = -1
                if(response.data.status){
                    console.log('更新成功~')
                }else{
                    alert("更新失败:"+response.data.error)
                }
            }, response => {
                console.log(response);
            })
        }else{
            item.class_name = this.temp_name
            this.edit_num = -1
        }
      },
      click_add(){

          this.dialogVisible = false

          if(this.new_class != ''){
            var params = new URLSearchParams();
            params.append('do','add')
            params.append('class_id',0)
            params.append('class_name',this.new_class)
            this.$http.post(server_url+'class_manage/',params).then(response => {
                if(response.data.status){
                    this.update_class()
                    console.log('添加成功')
                }else{
                    alert("添加失败:"+response.data.error)
                }
            }, response => {
                console.log(response);
            })
          }else{
              console.log('无内容')
          }
      }
  },
  props:['userid'],
  mounted(){
      this.update_class()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.operating{
    height: 30px;
    margin-bottom: 15px;
}

.operating button{
    float: right;
    width: 100px;
    height: 30px;
    border-radius: 3px;
    color: #FFF;
    background-color: #349EDF;
    cursor: pointer;
}

.classify{
    margin: 0 auto;
    width: 800px;
    background: #fff;
}
.classify_title{
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    font-size: 17px;
    border-bottom: 1px solid #dadada;
}

.classify_body{
    height:30px;
    line-height: 30px;
    font-size: 15px;
    margin-bottom: 20px
}
.classify_cear{
    padding: 20px;
}


span{
    cursor: pointer;
    margin-left:10px; 
    line-height: 30px;
}

.blue{
    color:  #349EDF;
}
.red{
    color:  red;
}


.classify_foot_smoll{
    float: left;
    font-size: 10px;
    color: #349EDF;
    margin-left: 15px
}

table{
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
}

tr{ 
    height: 40px;
    border-top: 1px solid #E9E9E9; 
}


tr:hover{ 
    cursor: pointer;
    background-color: #E9E9E9; 
}

td{
    padding:0 20px 0 20px;
}

.edit_num{
    text-align: center;
    width: 20px;
}


.edit_value input[type="text"]{
    
    height: 30px;
    width: 200px;
    font-size: 15px;
    text-indent: 10px;
    border:1px solid #dadada ;
    
}

.new_class_input{
    height: 30px;
    width: 80%;
    font-size: 15px;
    text-indent: 10px;
    border:1px solid #dadada ;
}


</style>
