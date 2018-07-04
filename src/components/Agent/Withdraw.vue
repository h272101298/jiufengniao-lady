<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>提现列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-table :data="list" v-loading="loading" border stripe size="small">
        <el-table-column prop="name" label="用户编号" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="用户名称" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="code" label="联系电话" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="code" label="提现金额" min-width="200" align="center">
        </el-table-column>

        <el-table-column label="操作" min-width="200" align="center">
          <el-button type="primary" size="medium" @click="handleEdit">确认提现</el-button>
          <el-button type="primary" size="medium" @click="handleDel">拒绝</el-button>
        </el-table-column>
      </el-table>

      <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
      </el-pagination>
    </el-col>

    <el-col>
      <el-dialog title="此操作不可恢复，是否确定拒绝？" :visible.sync="dialogDelVisible" width="30%">
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDelVisible  = false">取 消</el-button>
          <el-button type="primary" @click="submitdel()">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>



<script>


  // import baseUrl from '../../api/api';

  export default {
    data() {
      return {
        currentPage: 1,
        list:[],
        loading: false,
        count:0,
        limit:10,
        dialogDelVisible:false,
      };
    },

    methods:{
      getlist(){

      },

      handleEdit(){
      
      },

      handleDel(){
        this.dialogDelVisible=true
      },

      submitdel(){
        this.dialogDelVisible=false
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
    }
  }
</script>


<style>

</style>
