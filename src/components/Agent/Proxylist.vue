<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>代理管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
         <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入代理名称/手机号码" style="min-width: 240px;" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium"  @click="getlist">搜索</el-button>
          <el-button @click="clearss" size="medium" >清空</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="list" highlight-current-row style="width: 95%;"  size="small" border> 

      <el-table-column prop="id" label="ID" width="60" align="center">
      </el-table-column>
      <el-table-column prop="user.nickname" label="昵称" min-width="140" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="140" align="center">
      </el-table-column>

      <el-table-column prop="user.avatarUrl" label="头像" min-width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.user.avatarUrl" style="width:40px;height:40px;border-radius:50%;margin:5px 0 -5px 0;" />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话号码" min-width="140" align="center">
      </el-table-column>
      <el-table-column prop="user.created_at" label="注册时间" min-width="100" align="center">
      </el-table-column>
<!--       <el-table-column prop="" label="已返还金额" min-width="120" align="center">
      </el-table-column>
      <el-table-column prop="" label="未返还金额" min-width="120" align="center">
      </el-table-column>
      <el-table-column label="佣金发放记录" min-width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="seecomm(scope.row)">查看</el-button>
        </template>
      </el-table-column> -->


      <el-table-column label="操作" width="80" align="center">
<!--        <template slot-scope="scope">
        <el-switch v-model="scope.row.state == 1?true:false" @change="stopshop(scope.row)" ></el-switch>
      </template> -->
    </el-table-column>
  </el-table>


  <el-pagination style="float:left;margin: 20px 0px 0px 0px;" :current-page="currentPage" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页"></el-pagination>
</el-col>






<el-col>
  <el-dialog title="填写备注：" :visible.sync="noteVisible" style="min-width:400px;">
    <el-form :data="note" label-width="120px" style="width:80%;">
      <el-form-item label="备注:">
        <el-input  type="textarea" v-model="note.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitnote()">确 定</el-button>
    </el-form>
  </el-dialog>
</el-col>

</el-row>

</template>


<script>
  import { agentGet } from '../../api/api';


  export default {
    data() {
      return {
        list: [

        ],
        note:{
          remark:'',
          id:''
        }, 
        agentid:'',
        currentPage: 1,
        count:0,
        limit:10,
        filters: {
          name: ''
        },
        users: [],
        form: {},
        dialogVisible: false,
        noteVisible: false
      }
    },
    methods: {

      getlist: function () {
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit + '&search=' + this.filters.name;
        agentGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count;
        });
      },



      clearss:function(){
        this.filters.name='';
        this.getlist();
      },

      stopshop(row){

        var allParams =  row.id;
        agentChange(allParams).then((res) => {
          this.getlist();
        });
      },




      //页码更改
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getlist();
      },

      //改变每页条数
      handleSizeChange(val){
        this.limit = val;
        this.getlist();
      },


    },
    mounted() {
      this.getlist();
    }
  }
</script>


<style scoped>

</style>
