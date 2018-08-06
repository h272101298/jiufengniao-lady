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
        <el-tab-pane label="签到设置" name="list">

          <el-form ref="signset" :model="signset" label-width="160px" class="form" status-icon size="small" style="width:600px;">

            <el-form-item label="连续签到1天奖励：" prop="app_id">
              <el-input placeholder="请输入奖励数量" v-show="show" ></el-input>
              <el-radio-group v-model="signset.one" @change="onechange" size="small" class="mt5" v-show="show">
                <el-radio label="积分"></el-radio>
                <el-radio label="零钱"></el-radio>
              </el-radio-group>
              <label v-show="set">1</label>
              <label v-show="set">积分</label>
            </el-form-item>

            <el-form-item label="连续签到2天奖励：" prop="app_id">
              <el-input placeholder="请输入奖励数量" v-show="show" ></el-input>
              <el-radio-group v-model="signset.one" @change="onechange" size="small" class="mt5" v-show="show">
                <el-radio label="积分"></el-radio>
                <el-radio label="零钱"></el-radio>
              </el-radio-group>
              <label v-show="set">1</label>
              <label v-show="set">积分</label>
            </el-form-item>

            <el-form-item label="连续签到3天奖励：" prop="app_id">
              <el-input placeholder="请输入奖励数量" v-show="show" ></el-input>
              <el-radio-group v-model="signset.one" @change="onechange" size="small" class="mt5" v-show="show">
                <el-radio label="积分"></el-radio>
                <el-radio label="零钱"></el-radio>
              </el-radio-group>
              <label v-show="set">1</label>
              <label v-show="set">积分</label>
            </el-form-item>

            <el-form-item label="连续签到4天奖励：" prop="app_id">
              <el-input placeholder="请输入奖励数量" v-show="show" ></el-input>
              <el-radio-group v-model="signset.one" @change="onechange" size="small" class="mt5" v-show="show">
                <el-radio label="积分"></el-radio>
                <el-radio label="零钱"></el-radio>
              </el-radio-group>
              <label v-show="set">1</label>
              <label v-show="set">积分</label>
            </el-form-item>

            <el-form-item label="连续签到5天奖励：" prop="app_id">
              <el-input placeholder="请输入奖励数量" v-show="show" ></el-input>
              <el-radio-group v-model="signset.one" @change="onechange" size="small" class="mt5" v-show="show">
                <el-radio label="积分"></el-radio>
                <el-radio label="零钱"></el-radio>
              </el-radio-group>
              <label v-show="set">1</label>
              <label v-show="set">积分</label>
            </el-form-item>

            <el-form-item label="连续签到6天奖励：" prop="app_id">
              <el-input placeholder="请输入奖励数量" v-show="show" ></el-input>
              <el-radio-group v-model="signset.one" @change="onechange" size="small" class="mt5" v-show="show">
                <el-radio label="积分"></el-radio>
                <el-radio label="零钱"></el-radio>
              </el-radio-group>
              <label v-show="set">1</label>
              <label v-show="set">积分</label>
            </el-form-item>

            <el-form-item label="连续签到7天奖励：" prop="app_id">
              <el-input placeholder="请输入奖励数量" v-show="show" ></el-input>
              <el-radio-group v-model="signset.one" @change="onechange" size="small" class="mt5" v-show="show">
                <el-radio label="积分"></el-radio>
                <el-radio label="零钱"></el-radio>
              </el-radio-group>
              <label v-show="set">1</label>
              <label v-show="set">积分</label>
            </el-form-item>




            <el-form-item>
              <el-button v-if="set && checkper1" size="small" type="primary" style="margin-left:0px;margin-top:20px;" @click="changebase" >编辑</el-button>
              <el-button v-if="show" size="small" type="primary" style="margin-left:0px;margin-top:20px;" @click="confirm">提交</el-button>
              <el-button v-if="show" size="small" @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>





        <el-tab-pane label="积分设置" name="config">

          <el-form ref="modeldata" :model="modeldata" label-width="160px" class="form" status-icon size="small" style="width:600px;">

            <el-form-item label="兑换比例：" prop="collage_notify">
              <el-input placeholder="请输入兑换比例" v-show="modelshow">
                <template slot="prepend">积分：零钱</template>
                <template slot="append">：￥1</template>
              </el-input>
              <label v-show="modelset">20：￥1</label>
            </el-form-item>


            <el-form-item>
              <el-button v-if="modelset" size="small" type="primary" style="margin-top:20px;" @click="changemodel">编辑</el-button>
              <el-button v-if="modelshow" size="small" type="primary" style="margin-top:20px;" @click="postmodel">提交</el-button>
              <el-button v-if="modelshow" size="small" @click="cancelmodel">取消</el-button>     
            </el-form-item>

          </el-form>





        </el-tab-pane>
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
  import { wxmodelPost } from '../../api/api';
  import { wxmodelGet } from '../../api/api';

  import { Message } from 'element-ui';


  export default {
    data() {
      return {
        base:base+'/upload',
        activeName:'list',

        show:false,
        set:true,

        checkper1:false,

        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,


        signset:{
          one:'积分'
        },

        wxset:{},


        modelshow:false,
        modelset:true,
        modeldata:{

        },



      };
    },

    methods:{
      checkPer(){
        var per = sessionStorage.getItem('permissions');
        if(per.indexOf('txConfig')>-1){
          this.checkper1=true;
        }
      },


      onechange(e){
        // console.log(e)
      },

      clickradio(e){
        console.log(e)
      },




      handleSuccess(res, file) {
        this.signset.File.push(res.data.url)
        console.log(res.data.url)
      },


      handleRemove(file, fileList) {
        this.signset.File=[]
        for(var i=0;i<fileList.length;i++){
          this.signset.File.push(res.data.url)
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
        this.$refs.signset.validate((valid) => {
          if (valid) {
           // console.log(this.signset.File.length!==2)
           if(this.signset.File.length!==2){
            Message({
              message: "请上传两个证书",
              type: 'error'
            });
          }else{
            var allParams={
              app_id:this.signset.app_id,
              app_secret:this.signset.app_secret,
              mch_id:this.signset.mch_id,
              api_key:this.signset.api_key,
              ssl_cert:this.signset.File[0],
              ssl_key:this.signset.File[1],
            }
            console.log(allParams)
            wxconfigPost(allParams).then((res) => {
              console.log(res)
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               this.getconfig()
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
      },

      changemodel(){
        this.modelshow=true
        this.modelset=false
      },

      postmodel(){//wxmodelPost

        this.$refs.modeldata.validate((valid) => {
          if (valid) {

            var allParams=this.modeldata
            console.log(allParams)
            wxmodelPost(allParams).then((res) => {
              console.log(res)
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               this.modelshow=false
               this.modelset=true
               // this.getmodel()
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


      cancelmodel(){
        this.modelshow=false
        this.modelset=true
      },
    },

    mounted: function(){

      this.checkPer();
    }
  }
</script>

<style scoped>
.grey{
  color: #aaa;
  float: left;
}
.mt5{
  margin-top: 5px;display: inline-block;
}
</style>