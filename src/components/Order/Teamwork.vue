<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>拼团订单</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-form :inline="true">
        <el-form-item label="订单状态：">
          <el-select v-model="filter.state" placeholder="全部订单" @change="changestate">
            <el-option label="全部订单" value="0"></el-option>
            <el-option label="待发货" value="1"></el-option>
            <el-option label="待收货" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.name" placeholder="请输入订单号/店铺名称/收货人" style="min-width: 225px;" ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="block">
            <span class="demonstration">请选择下单时间：</span>
            <el-date-picker v-model="filter1.date" type="daterange" range-separator="/" @change="getSTime" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="getlist">搜索</el-button>
          <el-button size="medium" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" border stripe size="small" id="out-table">
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
        </el-table-column>
        <el-table-column prop="name" label="下单时间" min-width="200" align="center">
        </el-table-column>

        <el-table-column label="操作" min-width="200" align="center">
         <template slot-scope="scope">

         </template>
       </el-table-column>
     </el-table>
     <el-button type="primary" style="float:left;margin-top:10px;" @click="exportExcel()">导出Excel表</el-button>
     <el-pagination style="float:left;margin:20px 0 0 30px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
     </el-pagination>
   </el-col>


 </el-row>
</template>



<script>


  import baseUrl from '../../api/api';

  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    data() {
      return {
        list:[{
          name:'11'
        }],
        currentPage: 1,
        count:100,
        limit:10,
        filter:{
          name:'',
          state:'',
          start:'',
          end:''
        },
        filter1:{
          date:''
        }
      };
    },

    methods:{

      getlist(){

      },

      exportExcel () {
       var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
       var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
       try {FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '拼团订单.xlsx')}
       catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
       return wbout
     },

     getSTime(val){
      this.filter.start=val[0];
      this.filter.end=val[1];
      console.log(this.filter)
      // this.getlist();
    },

    changestate(val){
      this.filter.state=val;
      this.getlist();
    },

    clear(){
      this.filter={
        name:'',
        state:'',
        start:'',
        end:''
      }
      this.filter1={
        date:''
      }
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
