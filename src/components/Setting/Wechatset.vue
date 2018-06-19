<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>基本设置</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">
    <el-row>

      <el-form ref="baseset" :model="baseset" label-width="170px" class="form" status-icon size="small">
        <h3>微信参数：</h3>

        <el-form-item label="微信APPID：">
          <el-input v-model="baseset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
          <label v-show="set">{{baseset.upsize}}</label>
        </el-form-item>

        <el-form-item label="微信APPSECRET：">
          <el-input v-model="baseset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
          <label v-show="set">{{baseset.upsize}}</label>
        </el-form-item>

        <el-form-item label="微信商户号：">
          <el-input v-model="baseset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
          <label v-show="set">{{baseset.upsize}}</label>
        </el-form-item>

        <el-form-item label="key：">
          <el-input v-model="baseset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
          <label v-show="set">{{baseset.upsize}}</label>
        </el-form-item>

        <el-button v-show="set" size="small" type="primary" style="margin-left:162px;margin-top:20px;" @click="changebase">修改</el-button>

        <el-button v-show="show" size="small" type="primary" style="margin-left:122px;margin-top:20px;" @click="confirm">提交</el-button>
        <el-button v-show="show" size="small" @click="cancel">取消</el-button>
      </el-form>


      <el-form ref="baseset" :model="baseset" label-width="170px" class="form" status-icon size="small">
        <h3>微信模板设置：</h3>

        <el-form-item label="模板参数：">
          <el-input v-model="baseset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
          <label v-show="set">{{baseset.upsize}}</label>
        </el-form-item>

        <el-form-item label="赠送优惠券提醒：">
          <el-input v-model="baseset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
          <label v-show="set">{{baseset.upsize}}</label>
        </el-form-item>

        <el-form-item label="商品到货提醒：">
          <el-input v-model="baseset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
          <label v-show="set">{{baseset.upsize}}</label>
        </el-form-item>

        <el-button v-show="set" size="small" type="primary" style="margin-left:162px;margin-top:20px;" @click="changebase">修改</el-button>

        <el-button v-show="show" size="small" type="primary" style="margin-left:122px;margin-top:20px;" @click="confirm">提交</el-button>
        <el-button v-show="show" size="small" @click="cancel">取消</el-button>
      </el-form>
    </el-row>
  </el-col>


</el-row>
</template>

<style>
.form{
  width:380px;
  border:1px solid #ccc;
  margin-left:20px;
  padding:0 20px;
  float: left;
  height:500px;
  border-radius: 20px;
}
</style>

<script>


  import baseUrl from '../../api/api';

  export default {
    data() {
      return {
        baseset:{
          upsize:'2MB'
        },
        show:false,
        set:true
      };
    },

    methods:{
      changebase(){
        this.show=true
        this.set=false
      },

      confirm(){
        this.show=false
        this.set=true
      },
      cancel(){
        this.show=false
        this.set=true
      }

    },

    mounted: function () {

    }
  }
</script>
