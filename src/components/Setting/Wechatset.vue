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

          <el-form ref="wechatset" :model="wechatset" label-width="120px" class="form" status-icon size="small" :rules="rules1" style="width:600px;">



            <el-form-item label="小程序AppId：" prop="app_id">
              <el-input v-model="wechatset.app_id" placeholder="请输入小程序AppId" v-show="show"></el-input>
              <label v-show="set">{{wxset.app_id}}</label>
            </el-form-item>

            <el-form-item label="AppSecret：" prop="app_secret">
              <el-input v-model="wechatset.app_secret" placeholder="请输入AppSecret" v-show="show"></el-input>
              <label v-show="set">{{wxset.app_secret}}</label>
            </el-form-item>

            <el-form-item label="微信商户号：" prop="mch_id">
              <el-input v-model="wechatset.mch_id" placeholder="请输入微信商户号" v-show="show"></el-input>
              <label v-show="set">{{wxset.mch_id}}</label>
            </el-form-item>

            <el-form-item label="AppKey：" prop="api_key">
              <el-input v-model="wechatset.api_key" placeholder="请输入AppKey" v-show="show"></el-input>
              <label v-show="set">{{wxset.api_key}}</label>
            </el-form-item>

            <el-form-item label="商户证书：">

              <label v-show="set">{{wxset.ssl_cert}}</label>
              <label v-show="set">{{wxset.ssl_key}}</label>

<!--               <el-upload v-show="show" :action="upurl" :data="uptoken" :on-remove="handleRemove" :on-success="handleSuccess" :limit="2" :on-exceed="handleExceed" :file-list="wechatset.File">
                <el-button size="small" type="primary">上传证书</el-button>
              </el-upload> -->

              <el-upload v-show="show" :action="base" :on-remove="handleRemove" :on-success="handleSuccess" :limit="2" :on-exceed="handleExceed" :on-error="handleError" :file-list="wechatset.File">
                <el-button size="small" type="primary">上传证书</el-button>
              </el-upload> 


              <span v-show="show">提示：证书为pem格式文件，第一个为证书部分，第二个为秘钥部分，请按顺序上传</span>
            </el-form-item>

            <el-button v-show="set" size="small" type="primary" style="margin-left:162px;margin-top:20px;" @click="changebase">编辑</el-button>

            <el-button v-show="show" size="small" type="primary" style="margin-left:122px;margin-top:20px;" @click="confirm">提交</el-button>
            <el-button v-show="show" size="small" @click="cancel">取消</el-button>
          </el-form>


        </el-tab-pane>


<!--         <el-tab-pane label="模板消息" name="config">


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

        </el-tab-pane> -->
      </el-tabs>

    </el-row>
  </el-col>


</el-row>
</template>



<script>


  import qiniu from '../../api/qiniu';

  import base from '../../api/api';

  import { wxconfigPost } from '../../api/api';
  import { wxconfigGet } from '../../api/api';

  import { Message } from 'element-ui';


  export default {
    data() {
      return {
        base:base+'/upload',
        activeName:'list',

        show:false,
        set:true,

        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,


        wechatset:{
          // app_id:'wx5671bd47b7d2166c',
          // app_secret:'4b213482683bc98f412d2f6e37494070',
          // mch_id:'1507375401',
          // api_key:'babihu20180327geckopaymentsecret',
          app_id:'',
          app_secret:'',
          mch_id:'',
          api_key:'',
          File:[],
          // ssl_cert:'',
          // ssl_key:''
        },

        wxset:{},

        rules1:{
          app_id: [
          {required: true, message: '请输入AppId', trigger: 'blur'},
          ],
          app_secret: [
          {required: true, message: '请输入AppSecret', trigger: 'blur'},
          ],
          mch_id: [
          {required: true, message: '请输入商户号', trigger: 'blur'},
          ],
          api_key: [
          {required: true, message: '请输入AppKey', trigger: 'blur'},
          ],

        },


        baseset:{
          upsize:'2MB'
        }

      };
    },

    methods:{

      getconfig(){

        var allParams = '';
        wxconfigGet(allParams).then((res) => {
          this.wxset=res.data
        });
      },

      handleSuccess(res, file) {
        this.wechatset.File.push(res.data.url)
        console.log(res.data.url)
      },


      handleRemove(file, fileList) {
        this.wechatset.File=[]
        for(var i=0;i<fileList.length;i++){
          this.wechatset.File.push(res.data.url)
        }
      },

      handleExceed(files, fileList) {
        this.$message.warning(`只能上传 2 个文件`);
      },

      handleError(err, file, fileLis){
        Message({
          message: "请上传pem格式文件",
          type: 'error'
        });
        // console.log(typeof err)
        //  err=err.Remove(0,6);
        // console.log(JSON.parse(err))
      },
      



      changebase(){
        this.show=true
        this.set=false
      },

      confirm(){
        this.$refs.wechatset.validate((valid) => {
          if (valid) {
           // console.log(this.wechatset.File.length!==2)
           if(this.wechatset.File.length!==2){
            Message({
              message: "请上传两个证书",
              type: 'error'
            });
          }else{

            var allParams={
              app_id:this.wechatset.app_id,
              app_secret:this.wechatset.app_secret,
              mch_id:this.wechatset.mch_id,
              api_key:this.wechatset.api_key,
              ssl_cert:this.wechatset.File[0],
              ssl_key:this.wechatset.File[1],
            }


            console.log(allParams)

            wxconfigPost(allParams).then((res) => {
              console.log(res)
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               // this.getlist();

               this.show=false
               this.set=true
             } else {
               this.$message({
                message: res.msg,
                type: 'error'
              });
             }
           });


          }

        }else{
          return false;
        }
      })

      },


      cancel(){
        this.show=false
        this.set=true
      }

    },

    mounted: function () {
      this.getconfig()

    }
  }
</script>

<style>

</style>