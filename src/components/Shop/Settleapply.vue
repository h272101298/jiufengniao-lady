<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>入驻申请</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-table :data="list" border stripe size="small">
        <el-table-column prop="name" label="申请人姓名" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="申请人电话" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="所在城市" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="店铺名称" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="申请类型" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="主营类目" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="申请时间" min-width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="申请状态" min-width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="handleEdit">通过</el-button>
            <el-button type="danger" size="medium" @click="handleDelete">删除</el-button>
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


  // import baseUrl from '../../api/api';

  export default {
    data() {
      return {
        list:[{
          name:2,
        }],
        currentPage: 1,
        count:100,
        limit:10,
        dialogDelVisible:false
      };
    },

    methods:{
      getlist(){

      },

      handleEdit(index, row){

      },

      handleDelete(index, row) {
        this.dialogDelVisible = true;
        this.delId = row.id;
      },

      submitdel(){
        this.dialogDelVisible = false;
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
.logo{
  max-width: 300px;
  margin-left: 20px;
}
</style>
