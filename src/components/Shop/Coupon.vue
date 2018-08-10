<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>优惠券</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="small" @click="newone">新增优惠券</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border stripe size="small" style="width:95%">
      <el-table-column prop="name" label="店铺名称" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="title" label="优惠券标题" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="start" label="有效时间" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="man" label="使用条件" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="jina" label="优惠金额" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="code" label="创建时间" min-width="200" align="center">
      </el-table-column>
    </el-table>

    <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
    </el-pagination>
  </el-col>

  <el-col>
    <el-dialog title="新增优惠券" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
      <el-form ref="newcoupon" :model="newcoupon" label-width="120px" :rules="rules">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="newcoupon.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="有效时间:">
          <el-date-picker v-model="date" type="datetimerange" :picker-options="pickerOptions" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss" @change="getSTime" style="width:500px;" :editable=false start-placeholder="开始时间" end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="使用条件:" prop="man">
          <el-input v-model="newcoupon.man" placeholder="请输入使用条件"></el-input>
        </el-form-item>

        <el-form-item label="优惠金额:" prop="jian">
          <el-input v-model="newcoupon.jian" placeholder="请输入优惠金额"></el-input>
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


  import { couponPost } from '../../api/api';
  import { couponGet } from '../../api/api';

  export default {
    data() {
      var checkvalue = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('此项不能为空'));
        }
        setTimeout(() => {
          if (Math.sign(value) == 1) {
            if(value%1 === 0){
             callback();
           }else{
            callback();
          }
        } else if(Math.sign(value) == 0) {
          callback(new Error('不能为0'));
        } else if(Math.sign(value) == -1) {
          callback(new Error('请输入正数'));
        }else{
          callback(new Error('请输入数字'));
        }
      }, 100);
      };

      return {
        currentPage: 1,
        list:[],
        count:0,
        limit:10,
        dialogNewVisible:false,
        newcoupon:{
          title:'',
          man:'',
          jian:'',
          start:'',
          end:''
        },
        date:'',
        rules: {
          title: [{required: true, trigger: 'blur',message: '请输入标题'}],
          man: [{required: true, validator: checkvalue, trigger: 'blur'}],
          jian: [{required: true, validator: checkvalue, trigger: 'blur'}],
        },

        pickerOptions:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      };
    },

    methods:{
      getlist(){

      },

      newone(){
        this.dialogNewVisible=true
      },

      getSTime(val){
        this.newcoupon.start=val[0];
        this.newcoupon.end=val[1];
      },

      save(){
        if(this.newcoupon.start=='' || this.newcoupon.end==''){
          this.$message.error(`请选择有效时间`);
          return
        }

        this.$refs.newcoupon.validate((valid) => {
          if (valid) {
            console.log(this.newcoupon)
            var allParams={

            }

            couponPost(allParams).then((res) => {
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });

               this.newcoupon={
                title:'',
                man:'',
                jian:'',
                start:'',
                end:''
              };
              this.date=''

              this.dialogNewVisible=false
            } else {
             this.$message({
              message: res.msg,
              type: 'error'
            });
           }
         });
          }else{
            return false;
          }
        })



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
