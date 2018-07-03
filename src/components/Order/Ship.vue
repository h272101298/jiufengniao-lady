<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>发货</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">


      <el-table :data="list" border stripe size="small">
        <el-table-column prop="name" label="ID" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="订单号" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="name" label="商家" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="name" label="总计" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="name" label="订单状态" min-width="200" align="center">
         <template slot-scope="scope">
          <div class="cell">待发货</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="下单时间" min-width="200" align="center">
      </el-table-column>

      <el-table-column label="操作" min-width="200" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handleEdit">订单详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination style="float:left;margin:20px 0 0 0px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>
</el-col>


</el-row>
</template>



<script>


  // import { shiporderGet } from '../../api/api';

  export default {
    data() {
      return {
        list:[],
        currentPage: 1,
        count:0,
        limit:10,
      };
    },

    methods:{

      getlist(){
        // var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        // shiporderGet(allParams).then((res) => {
        //   this.list=res.data.data;
        //   this.count=res.data.count
        // });
      },

      handleEdit(index, row){

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
