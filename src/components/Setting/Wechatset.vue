<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>微信设置</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">
    <el-row>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="微信配置" name="list">

          <el-form ref="wechatset" :model="wechatset" label-width="120px" class="form" status-icon size="small" :rules="rules1" style="width:400px;">



            <el-form-item label="小程序AppId：">
              <el-input v-model="wechatset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
              <label v-show="set">{{wechatset.upsize}}</label>
            </el-form-item>

            <el-form-item label="AppSecret：">
              <el-input v-model="wechatset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
              <label v-show="set">{{wechatset.upsize}}</label>
            </el-form-item>

            <el-form-item label="微信商户号：">
              <el-input v-model="wechatset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
              <label v-show="set">{{wechatset.upsize}}</label>
            </el-form-item>

            <el-form-item label="AppKey：">
              <el-input v-model="wechatset.upsize" placeholder="请输入业务名称" v-show="show"></el-input>
              <label v-show="set">{{wechatset.upsize}}</label>
            </el-form-item>

            <el-form-item label="证书：">
              <label v-show="set">{{wechatset.upsize}}</label>

              <el-upload v-show="show" :action="upurl" :data="uptoken" :on-remove="handleRemove" :on-success="handleSuccess" :limit="2" :on-exceed="handleExceed" :file-list="wechatset.File">
                <el-button size="small" type="primary">上传证书</el-button>
              </el-upload>
            </el-form-item>

            <el-button v-show="set" size="small" type="primary" style="margin-left:162px;margin-top:20px;" @click="changebase">修改</el-button>

            <el-button v-show="show" size="small" type="primary" style="margin-left:122px;margin-top:20px;" @click="confirm">提交</el-button>
            <el-button v-show="show" size="small" @click="cancel">取消</el-button>
          </el-form>


        </el-tab-pane>


        <el-tab-pane label="模板消息" name="config">


          <el-form ref="baseset" :model="baseset" label-width="170px" class="form" status-icon size="small">

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

        </el-tab-pane>
      </el-tabs>

    </el-row>
  </el-col>


</el-row>
</template>



<script>


  import qiniu from '../../api/qiniu';

  export default {
    data() {
      return {
        activeName:'list',

        show:false,
        set:true,

        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,


        wechatset:{
          AppId:'',
          AppSecret:'',
          MchId:'',
          AppKey:'',
          File:[],
        },

        rules1:{
          AppId: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          ],
          AppSecret: [
          {required: true, message: '请输入商品详情', trigger: 'blur'},
          ],
          MchId: [
          {required: true, message: '请输入分销佣金', trigger: 'blur'},
          ],
          AppKey: [
          {required: true, message: '请输入分享标题', trigger: 'blur'},
          ],

        },








        baseset:{
          upsize:'2MB'
        }

      };
    },

    methods:{
      handleSuccess(res, file) {
        // this.wechatset.File =qiniu.showurl+ res.key
        console.log(res)
      },


      handleRemove(file, fileList) {
        // this.wechatset.File=[]
        // for(var i=0;i<fileList.length;i++){
        //   this.wechatset.File.push(qiniu.showurl+ fileList[i].response.key)
        // }
      },

      handleExceed(files, fileList) {
        this.$message.warning(`只能上传 1 个文件`);
      },

      






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

<style>

</style>