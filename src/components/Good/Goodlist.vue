<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="medium" @click="newone">新增商品</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filter.name" placeholder="请输入商品名称/分类/商家名称" style="min-width: 260px;" ></el-input>
      </el-form-item>

      <el-form-item label="商品状态：">
        <el-select v-model="filter.state" placeholder="全部" @change="changestate">
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="medium" @click="getlist">搜索</el-button>
        <el-button size="medium" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="loading" border stripe size="small" @cell-click="cellclick">
      <el-table-column prop="name" label="编号" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="url" label="图片" min-width="200" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.url" style="max-width:100px;max-height:100px;" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="分类" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="价格" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="name" label="所属商家" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="库存" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="state" label="状态" min-width="150" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.state==1">上架</el-tag>
          <el-tag type="info" v-show="scope.row.state==2">下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="审核状态" min-width="150" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
       <template slot-scope="scope">
        <el-tooltip class="icon" effect="dark" content="编辑" placement="top">
          <img src="../../../static/images/icon/edit.png" @click="handleEdit(scope.$index, scope.row)">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="预览" placement="bottom">
          <img src="../../../static/images/icon/look.png">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="生成二维码" placement="top">
          <img src="../../../static/images/icon/ewcode.png">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="审核" placement="bottom">
          <img src="../../../static/images/icon/check.png">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="删除" placement="top">
          <img src="../../../static/images/icon/delete.png" @click="handleDelete(scope.$index, scope.row)">
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>
</el-col>




<el-col>
  <el-dialog title="删除不可恢复，是否确定删除？" :visible.sync="dialogDelVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="submitdel()">确 定</el-button>
      <el-button type="primary" @click="dialogDelVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-col>

</el-row>
</template>



<script>




  export default {
    data() {
      return {


        list:[{
          name:'11',
          state:1,
          url:'../static/images/gold.jpg'
        }],
        loading: false,
        currentPage: 1,
        count:0,
        limit:10,
        dialogDelVisible:false,
        filter:{
          name:'',
          state:''
        },
        putorup:'up',
        diatitle:'新增商品',
        editId:'',
        delId:'',



        editable:[]
      };
    },

    methods:{
      getlist(){

      },

      newone(){
        this.$router.push({ path: '/Good/Goodnew' });
      },

      changestate(val){
        this.filter.state=val
      },

      clear(){
        this.filter={
          name:'',
          state:''
        }
      },

      handleEdit(index, row){
        this.$router.push({ path: '/Good/Goodnew' });
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



      cellclick(row, column, cell, event){
      // console.log(row, column, cell, event)
      console.log([cell][0].innerText)
      this.editable =true
    },


    submit(){
      this.editable =false
    }
  },

  mounted: function () {
    this.getlist();
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