<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>集卡牌</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="small" @click="newone">发布活动</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border stripe style="width:95%" size="small">
      <el-table-column prop="id" label="商品名称" width="100" align="center">
      </el-table-column>

      <el-table-column prop="id" label="商品分类" width="100" align="center">
      </el-table-column>

      <el-table-column prop="logo" label="卡牌图片" width="260" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.logo" style="max-width:50px;max-height:100px;" />
        </template>
      </el-table-column>

      <el-table-column prop="title" label="活动有效时间" width="260" align="center">
      </el-table-column>
      <el-table-column prop="level" label="折扣" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="level" label="库存" min-width="100" align="center">
      </el-table-column>

      <el-table-column prop="level" label="总点击数" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="level" label="已兑换数" min-width="100" align="center">
      </el-table-column>

      <el-table-column prop="level" label="期望平均点击数" min-width="110" align="center">
      </el-table-column>
      <el-table-column prop="level" label="平均点击数" min-width="100" align="center">
      </el-table-column>

      <el-table-column label="操作" min-width="240" align="center">
       <template slot-scope="scope">
        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>


  </el-table>

  <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>


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


  import {typeGet} from '../../api/api';
  import {typePost} from '../../api/api';
  import {typeDel} from '../../api/api';

  import qiniu from '../../api/qiniu';

  import { Message } from 'element-ui';

  export default {
    data() {
      return {


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
      // var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
      // typeGet(allParams).then((res) => {
      //   this.list=res.data.data;
      //   this.count=res.data.count
      // });
    },


    clear(){
      this.filter={
        title:'',
        level:''
      }
    },


    handleEdit(index, row){

    },

    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.delId = row.id;
    },

    submitdel(){
      this.dialogDelVisible = false;
      var allParams='?id='+this.delId
      typeDel(allParams).then((res) => {
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

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },


    handleSizeChange(val){
      this.limit = val;
      this.getlist();
    },

    newone(){
      sessionStorage.setItem('newcardtype', 'shop');
      this.$router.push({ path: '/Card/Cardnew' });
    }
  },

  mounted: function () {
    this.getlist();
    this.checkPer();
  }
}
</script>


<style>
.icon{
  width: 20px;
  height: 20px;
  margin: 2px;
}
</style>
