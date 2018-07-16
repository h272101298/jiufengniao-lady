<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>限时砍价</el-breadcrumb-item>
        <el-breadcrumb-item>通过列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="通过列表" name="list">

          <el-table :data="list" border stripe style="width:95%" size="small">
            <el-table-column prop="product.name" label="商品名称" width="100" align="center">
            </el-table-column>

            <el-table-column prop="description" label="活动描述" width="160" align="center">
            </el-table-column>

            <el-table-column prop="list" label="卡牌图片" width="240" align="center">
              <template slot-scope="scope">
                <img v-for="item in scope.row.list" :src="item.cover" style="max-width:35px;max-height:60px;margin-right: 5px;" />
              </template>
            </el-table-column>

            <el-table-column prop="start" label="活动开始时间" width="150" align="center">
            </el-table-column>
            <el-table-column prop="end" label="活动开始时间" width="150" align="center">
            </el-table-column>
            <el-table-column prop="offer" label="折扣" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="number" label="库存" min-width="80" align="center">
            </el-table-column>

            <el-table-column prop="clickCount" label="总点击数" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="exchangeCount" label="已兑换数" min-width="80" align="center">
            </el-table-column>

            <el-table-column prop="" label="平均点击数" min-width="100" align="center">
              <template slot-scope="scope">
                <span v-show="scope.row.exchangeCount!==0">{{ scope.row.clickCount / scope.row.exchangeCount}}</span>
                <span v-show="scope.row.exchangeCount==0">0</span>
              </template>
            </el-table-column>

            <el-table-column prop="clickNum" label="期望平均点击数" min-width="110" align="center">
            </el-table-column>

            <el-table-column prop="enable" label="状态" min-width="110" align="center">
             <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" v-show="scope.row.enable==1">上线</el-button>
              <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)" v-show="scope.row.enable==0">下线</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" min-width="100" align="center">
           <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
      </el-pagination>

    </el-tab-pane>

    <el-tab-pane label="卡牌设置" name="base">

      <el-form label-width="120px" width="900px" center style="width: 1000px" ref="defaultcard" :model="defaultcard" v-show="havecard">
        <el-form-item prop="images" label="上传图片：">
          <el-upload :action="upurl" :data="uptoken" list-type="picture-card" :on-remove="handleRemove" :on-success="handlelistSuccess" :file-list="defaultcard.images" :multiple="true" accept="image/*" :on-exceed="handleExceed" :limit="5">
            <img src="../../../static/images/default1.png" class="pre-img" style="width:145px;height:144px;display: block" >
          </el-upload>
        </el-form-item>

        <el-form-item style="">
          <el-button type="primary" @click="save()" size="medium">提交</el-button>
          <el-button @click="cancel" size="medium">取 消</el-button>
        </el-form-item>
      </el-form>



      <div v-show="!havecard" class="cardbox">

        <img v-for="item in defcard" :src="item.cover" class="card">

      </div>

      <!-- <p v-show="!havecard">请设置默认卡牌图片</p> -->
      <el-button type="primary" @click="editcard()" size="medium" v-show="!havecard">设置</el-button>

    </el-tab-pane>
  </el-tabs>
</el-col>



<el-col>
  <el-dialog title="删除不可恢复，是否确定删除？" :visible.sync="dialogDelVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitdel()">确 定</el-button>
      <el-button @click="dialogDelVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-col>

</el-row>
</template>



<script>

  import { CardcheckGet } from '../../api/api';
  import { DefaultCardPost } from '../../api/api';
  import { DefaultCardGet } from '../../api/api';
  import { Cardupdown } from '../../api/api';
  import { Carddelete } from '../../api/api';

  import qiniu from '../../api/qiniu';

  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,

        activeName:'list',

        currentPage: 1,
        list:[],
        count:0,
        limit:10,
        dialogNewVisible:false,
        dialogDelVisible:false,
        filter:{

        },
        editId:'',
        delId:'',

        checkper1:false,
        checkper2:false,

        defcard:[
        {cover:'../static/images/default1.png'},
        {cover:'../static/images/default1.png'},
        {cover:'../static/images/default1.png'},
        {cover:'../static/images/default1.png'},
        {cover:'../static/images/default1.png'}
        ],
        havecard:false,

        defaultcard:{
          images:[]
        },

      };
    },

    methods:{
      checkPer(){
      // var per = sessionStorage.getItem('permissions');
      // if(per.indexOf('productTypeAdd')>-1){
      //   this.checkper1=true;
      // }

      // if(per.indexOf('productTypeDel')>-1){
      //   this.checkper2=true;
      // }
    },


    getlist(){
      var allParams = '?page='+ this.currentPage + '&limit=' + this.limit + '&state=2';
      CardcheckGet(allParams).then((res) => {
        this.list=res.data.data;
        this.count=res.data.count
      });
    },


    clear(){
      this.filter={
        title:'',
        level:''
      }
    },


    handleEdit(index, row){
      // Cardupdown

      var allParams = '?id='+row.id;
      Cardupdown(allParams).then((res) => {
        this.$message.success(`修改成功`);
        this.getlist()
      });
    },

    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.delId = row.id;
    },

    submitdel(){
      this.dialogDelVisible = false;
      var allParams='?id='+this.delId
      Carddelete(allParams).then((res) => {
        // console.log(res)
        if (res.msg === "ok") {
         this.$message({
          message: '删除成功',
          type: 'success'
        });
         this.getlist();
         this.dialogDelVisible = false;
       } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    },













    beforeUpload(file) {
      // const isLt1M = file.size / 1024 / 1024 < 1;
      // if (!isLt1M) {
      //   this.$message.error('图片大小不能超过 1MB!');
      // }
      // return isLt1M;
    },


    handlelistSuccess(res, file,fileList){
      this.defaultcard.images=[]
      for(var i=0;i<fileList.length;i++){
        this.defaultcard.images.push(qiniu.showurl+ fileList[i].response.key)
      }
    },

    handleRemove(file, fileList) {
      this.defaultcard.images=[]
      for(var i=0;i<fileList.length;i++){
        this.defaultcard.images.push(qiniu.showurl+ fileList[i].response.key)
      }
    },

    handleExceed(files, fileList) {
      this.$message.warning(`只能上传5张图片`);
    },



    editcard(){
      var that= this
      that.havecard=true

    },


    getdefcard(){//DefaultCardGet
      var allParams = '';
      DefaultCardGet(allParams).then((res) => {

        if(res.data==''){
          this.havecard=false
        }else{
          this.defcard=res.data;
          this.havecard=false
        }
      });
    },

    save(){//DefaultCardPost
      // console.log(this.defaultcard.images)

      var allParams={list:this.defaultcard.images}
      console.log(typeof allParams)
      DefaultCardPost(allParams).then((res) => {
        // console.log(res)
        if (res.msg === "ok") {
         this.$message({
          message: '提交成功',
          type: 'success'
        });
         this.havecard=true
         this.getdefcard();
       } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
    },


    cancel(){

    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },


    handleSizeChange(val){
      this.limit = val;
      this.getlist();
    },
  },

  mounted: function () {
    this.getlist();
    this.getdefcard();
    this.checkPer();
  }
}
</script>


<style scope>
.icon{
  width: 20px;
  height: 20px;
  margin: 2px;
}
.cardbox{
  width: 600px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
}
.card{

  /*float: left;*/
  width: 100px;
  height: 150px;
  margin-right: 20px;
  border:1px solid #aaa; 
}


.el-button+.el-button {
  margin-left: 0px!important;
}
</style>
