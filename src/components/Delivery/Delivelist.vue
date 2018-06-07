<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>快递配置</el-breadcrumb-item>
        <el-breadcrumb-item>快递列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="medium" @click="newone">新增快递</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="loading" border stripe size="small">
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="快递名称" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="code" label="快递简码" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="created_at" label="添加时间" min-width="200" align="center">
      </el-table-column>
    </el-table>

    <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
    </el-pagination>
  </el-col>

  <el-col>
    <el-dialog title="新增快递" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
      <el-form ref="newdelive" :model="newdelive" label-width="120px" :rules="rules">
        <el-form-item label="快递名称:">
          <el-input v-model="newdelive.name" placeholder="请输入快递名称"></el-input>
        </el-form-item>
        <el-form-item label="快递简码:">
          <el-input v-model="newdelive.code" placeholder="请输入快递简码"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: calc(50% - 200px);">
          <el-button type="primary" @click="save()">保 存</el-button>
          <el-button @click="dialogNewVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
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
        count:100,
        limit:10,
        dialogNewVisible:false,
        newdelive:{
          name:'',
          code:''
        },
        rules: {
          name: [{required: true, trigger: 'blur',message: '请输入快递名称'}],
          code: [{required: true, trigger: 'blur',message: '请输入快递简码'}]
        },
      };
    },

    methods:{
      getlist(){

      },

      newone(){
        this.dialogNewVisible=true
      },

      save(){
        this.dialogNewVisible=false
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
