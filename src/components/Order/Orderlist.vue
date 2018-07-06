<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>购物订单</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-form :inline="true">
<!--         <el-form-item label="订单状态：">
          <el-select v-model="filter.state" placeholder="全部订单" @change="changestate">
            <el-option label="全部订单" value="0"></el-option>
            <el-option label="待发货" value="1"></el-option>
            <el-option label="待收货" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-input v-model="filter.search" placeholder="请输入订单号/店铺名称/收货人" style="min-width: 225px;" ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="block">
            <span class="demonstration">请选择下单时间：</span>
            <el-date-picker v-model="filter1.date" type="daterange" range-separator="/" @change="getSTime" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getlist">搜索</el-button>
          <el-button size="small" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" border stripe size="small" id="out-table">
        <el-table-column prop="id" label="ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="number" label="订单号" min-width="100" align="center">
        </el-table-column>

        <el-table-column prop="user" label="用户" min-width="100" align="center">
        </el-table-column>
<!--         <el-table-column prop="name" label="商品名称" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="name" label="商家" min-width="200" align="center">
        </el-table-column> -->
        <el-table-column prop="price" label="总计" min-width="200" align="center">
        </el-table-column>

        <el-table-column prop="state" label="订单状态" width="160" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-show="scope.row.state=='created'" @click="">未付款</el-tag>
            <el-tag type="primary" v-show="scope.row.state=='paid'" @click="">已支付</el-tag>
            <el-tag type="warning" v-show="scope.row.state=='delivery'" @click="">已发货</el-tag>
            <el-tag type="success" v-show="scope.row.state=='fihished'" @click="">已完成</el-tag>
            <el-tag type="success" v-show="scope.row.state=='closed'" @click="">已完成</el-tag>
            <el-tag type="info" v-show="scope.row.state=='canceled'" @click="">已取消</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="created_at" label="下单时间" min-width="200" align="center">
        </el-table-column>

        <el-table-column label="操作" min-width="200" align="center">
         <template slot-scope="scope">
          <el-button type="" size="mini" @click="handleSee(scope.row)">订单详情</el-button>

          <el-button type="primary" v-show="scope.row.state=='paid'" size="mini" @click="handleSend(scope.row)">发货</el-button>

<!--           <el-button type="primary" size="small" @click="handleSee(scope.row)">订单详情</el-button>
          <el-button type="primary" size="small" @click="handleSee(scope.row)">订单详情</el-button>
          <el-button type="primary" size="small" @click="handleSee(scope.row)">订单详情</el-button>
        -->

      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="float:left;margin:20px 0 200px 0px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>


<el-button type="primary" style="float:left;margin:20px 50px;" @click="exportExcel()" size="small">导出Excel表</el-button>
</el-col>





<el-col>
  <el-dialog title="快递信息" :visible.sync="dialogSendVisible" width="800px" center>
    <el-form :model="kuaidi" ref="kuaidi" label-width="120px" :rules="sendrule">
      <el-form-item label="快递名称：" label-width="120px" prop="express">

        <el-select v-model="kuaidi.express" placeholder="全部" @change="xzkauidi">
          <el-option v-for="item in expressarr" :label="item.title" :value="item.id" :key="item.id"></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="快递单号：" label-width="120px" prop="express_number">
       <el-input v-model="kuaidi.express_number" placeholder="请输入快递单号" type="number"></el-input>
     </el-form-item>
     <el-button type="primary" size="small" @click="submitsend" style="margin-left: calc(50% - 28px);">提交</el-button>
   </el-form>
 </el-dialog>
</el-col>


<el-col>
  <el-dialog title="订单详情" :visible.sync="dialogSeeVisible" width="1200px" center>
    <el-form label-position="right" label-width="110px">

      <el-form-item label="订单状态：" class="fw6">
        <span v-show="currow.state=='created'" class="fw4">未付款</span>
        <span v-show="currow.state=='paid'" class="fw4">已支付</span>
        <span v-show="currow.state=='delivery'" class="fw4">已发货</span>
      </el-form-item>

      <el-form-item label="物流信息：" class="fw6" v-show="currow.state=='delivery'">
        <div class="fw4">快递公司： {{currow.express}}</div>
        <div class="fw4">快递编号： {{currow.express_number}}</div>
      </el-form-item>


      <el-form-item label="用户名称：" class="fw6">
        <span class="fw4">{{currow.user.nickname}}</span>
      </el-form-item>

      <el-form-item label="收货信息：" class="fw6">
        <div class="fw4">地址： {{currow.address[0].address}}</div>
        <div class="fw4">电话： {{currow.address[0].phone}}</div>
        <div class="fw4">邮编： {{currow.address[0].zip_code}}</div>
      </el-form-item>


      <el-form-item label="商铺名称：" class="fw6">
        <template slot-scope="scope">
          <div class="fw4" id="detail">{{currow.store.name}}</div>
        </template>
      </el-form-item>

      <el-form-item label="商铺掌柜：" class="fw6">
        <template slot-scope="scope">
          <div class="fw4" id="detail">{{currow.store.manager}}</div>
        </template>
      </el-form-item>

      <el-form-item label="商品信息：" class="fw6">

        <el-table :data="currow.stocks" border stripe size="small" id="out-table">
          <el-table-column prop="cover" label="商品缩略图" width="100" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.cover" style="max-width:60px;max-height:60px;" />
            </template>
          </el-table-column>

          <el-table-column prop="name" label="商品名称" min-width="100" align="center">
          </el-table-column>

          <el-table-column prop="price" label="单价" min-width="100" align="center">
          </el-table-column>

          <el-table-column prop="number" label="数量" min-width="200" align="center">
          </el-table-column>

        </el-table>
      </el-form-item>

      <el-form-item label="总计：" class="fw6">
        <div class="fw4" id="detail">{{currow.price}}</div>
      </el-form-item>

    </el-form>
  </el-dialog>
</el-col>


</el-row>
</template>

<script>

  import { allorderGet } from '../../api/api';
  import { oneorderGet } from '../../api/api';
  import { shipgoods } from '../../api/api';
  import { deliveryGet } from '../../api/api';

  import { Message } from 'element-ui';

  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'


  export default {
    data() {
      return {
        list:[],
        currentPage: 1,
        count:0,
        limit:10,
        dialogSeeVisible:false,
        dialogSendVisible:false,
        filter:{
          search:'',
          state:'',
          start:'',
          end:''
        },
        filter1:{
          date:''
        },

        sendId:'',
        expressarr:[],

        kuaidi:{
          express:'',
          express_number:''
        },
        sendrule:{
          // express: [
          // {required: true, message: '请选择快递公司', trigger: 'change'},
          // ],
          express_number: [
          {required: true, message: '请输入快递单号', trigger: 'blur'},
          ],
        },



        currow:{
         id: 0,
         number: "",
         price: "",
         state: "",
         user: {
           nickname: "",
           avatarUrl: "",
         },
         store: {
           name: "",
           manager: "",
         },
         address: [{
           id: 0,
           order_id: 0,
           name: "",
           phone: "",
           address: "",
           zip_code: "",
         }],
       },
     };
   },

   methods:{


    getlist(){
      var allParams = '?page='+ this.currentPage + '&limit=' + this.limit+ '&search=' + this.filter.search+'&start=' + this.filter.start+'&end=' + this.filter.end;
      allorderGet(allParams).then((res) => {
        this.list=res.data.data;
        this.count=res.data.count
      });
    },

    exportExcel () {
     var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
     try {FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '购物订单.xlsx')}
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
        search:'',
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



    handleSee(row){
      var allParams = '?id='+row.id;
      oneorderGet(allParams).then((res) => {
        this.currow=res.data;
        // console.log(this.currow)
      });

      this.dialogSeeVisible = true;
    },



    getexpress(){
      var allParams = '?page=1&limit=10000';
      deliveryGet(allParams).then((res) => {
        // console.log(res.data.data)
        this.expressarr=res.data.data;
      });
    },

    xzkauidi(val){
      this.kuaidi.express=val
    },


    handleSend(row){
      this.kuaidi={
        id:row.id,
        express:'',
        express_number:''
      },
      this.dialogSendVisible = true;
    },

    submitsend(){
      var that =this;
      that.$refs.kuaidi.validate((valid) => {
        if (valid) {
          var allParams = that.kuaidi;
          // console.log(allParams)
          shipgoods(allParams).then((res) => {
            // console.log(res)
            this.getlist();
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.dialogSendVisible = false;
          });
        }else{
          return false;
        }
      })
    },

  },

  mounted: function () {
    this.getlist();
    this.getexpress();
  }
}
</script>


<style>

</style>
