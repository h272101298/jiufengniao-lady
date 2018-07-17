<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>广告管理</el-breadcrumb-item>
        <el-breadcrumb-item>广告列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
     <el-row>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="轮播设置" name="banner">

         <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" size="medium" @click="newone" v-show="checkper1">新增广告</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="list" border stripe size="small" style="width:95%">
          <el-table-column prop="id" label="广告编号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="pic" label="广告图片" min-width="500" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.pic" style="max-width:90px;max-height:90px;" />
            </template>
          </el-table-column>


          <el-table-column label="操作" min-width="300" align="center">
           <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" v-show="checkper1">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" v-show="checkper2">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
      </el-pagination>

    </el-tab-pane>



    <el-tab-pane label="集卡牌海报" name="card" style="padding-left: 100px;">

      <el-form label-width="" width="900px" center style="width: 1000px" v-show="havecard">
        <el-form-item label="" v-show="havecard">
          <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="cardsuccess" :show-file-list="false" accept="image/*">
            <img :src="cardpost" class="pre-img cardpost">
            <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为1:2</p>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savecard()" size="small">提交</el-button>
          <el-button @click="cancelcard" size="small">取 消</el-button>
        </el-form-item>
      </el-form>

      <div v-show="!havecard" class="cardbox">
        <img :src="cardshow" class="cardpost" @click="editcard()">
      </div>

      <el-button type="primary" @click="editcard()" size="small" v-show="!havecard">设置</el-button>

    </el-tab-pane>






    <el-tab-pane label="砍价背景" name="kan" style="padding-left: 100px;">

      <el-form label-width="" width="900px" center style="width: 1000px" v-show="havekan">
        <el-form-item label="" v-show="havekan">
          <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="kansuccess" :show-file-list="false" accept="image/*">
            <img :src="kanpost" class="pre-img kanpost">
            <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为9:16</p>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savekan()" size="small">提交</el-button>
          <el-button @click="cancelkan" size="small">取 消</el-button>
        </el-form-item>
      </el-form>

      <div v-show="!havekan" class="kanbox">
        <img :src="kanshow" class="kanpost" @click="editkan()">
      </div>

      <el-button type="primary" @click="editkan()" size="small" v-show="!havekan">设置</el-button>

    </el-tab-pane>




    <el-tab-pane label="分销海报" name="agent" style="padding-left: 100px;">

      <el-form label-width="" width="900px" center style="width: 1000px" v-show="haveagent">
        <el-form-item label="" v-show="haveagent">
          <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="agentsuccess" :show-file-list="false" accept="image/*">
            <img :src="agentpost" class="pre-img agentpost">
            <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为9:16</p>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveagent()" size="small">提交</el-button>
          <el-button @click="cancelagent" size="small">取 消</el-button>
        </el-form-item>
      </el-form>

      <div v-show="!haveagent" class="agentbox">
        <img :src="agentshow" class="agentpost" @click="editagent()">
      </div>

      <el-button type="primary" @click="editagent()" size="small" v-show="!haveagent">设置</el-button>


    </el-tab-pane>


  </el-tabs>


</el-row>
</el-col>




<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
    <el-form ref="newadv" :model="newadv" label-width="120px" :rules="rules">

      <el-form-item label="上传图片：">
        <el-upload class="upload-demo" list-type="picture-card" :action="upurl" :data="uptoken" :before-upload="beforeUpload" :on-success="handleSuccess" :on-exceed="handleExceed" :file-list="postarr" :limit="1" :show-file-list="true" accept="image/*">
          <i class="el-icon-plus"></i>
          <!-- <img :src="imgSrc" class="pre-img" style="max-width:60%;max-height:30%;border:2px dashed #ccc;border-radius:10px;display: block" > -->
          <!-- <el-button size="small" type="primary" style="display: block;margin-top: 20px;">选取文件</el-button> -->
          <div slot="tip" class="el-upload__tip">可上传JPG/PNG文件，建议图片比例为5:4</div>
        </el-upload>
      </el-form-item>

      <el-form-item style="margin-left: calc(50% - 200px);">
        <el-button type="primary" @click="save()">保 存</el-button>
        <el-button @click="dialogNewVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
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


  import {advertsGet} from '../../api/api';
  import {advertPost} from '../../api/api';
  import {advertDel} from '../../api/api';
  import {posterGet} from '../../api/api';
  import {posterPost} from '../../api/api';

  import qiniu from '../../api/qiniu';


  export default {
    data() {
      return {
        activeName:'banner',

        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,
        currentPage: 1,
        list:[],
        count:0,
        limit:10,
        dialogNewVisible:false,
        dialogDelVisible:false,
        filter:{
          name:''
        },
        putorup:'up',
        imgSrc:"",
        newadv:{
          link:'',
          intro:'',
          positionid:''
        },
        diatitle:'新增广告',
        postarr:[],
        rules: {
          // link: [{required: true, trigger: 'blur',message: '请输入广告链接'}],
          // intro: [{required: true, trigger: 'blur',message: '请输入广告描述'}]
        },
        editId:'',
        delId:'',

        checkper1:false,
        checkper2:false,


        havecard:false,
        cardshow:'../../../static/images/default.png',
        cardpost:'../../../static/images/default.png',

        havekan:false,
        kanshow:'../../../static/images/default1.png',
        kanpost:'../../../static/images/default1.png',

        haveagent:false,
        agentshow:'../../../static/images/default1.png',
        agentpost:'../../../static/images/default1.png',

      };
    },

    methods:{
      getpsoter(){
        var allParams = ''
        posterGet(allParams).then((res) => {
          console.log(res.data.card_poster)
          if(res.data.card_poster){
            this.cardshow=res.data.card_poster
          }else{
            this.cardshow='../../../static/images/default.png'
          }

          if(res.data.bargain_poster){
            this.kanshow=res.data.bargain_poster
          }else{
            this.kanshow='../../../static/images/default1.png'
          }

          if(res.data.proxy_poster){
            this.agentshow=res.data.proxy_poster
          }else{
            this.agentshow='../../../static/images/default1.png'
          }

          // this.kanshow=res.data.bargain_poster
          // this.agentshow=res.data.proxy_poster

        });
      },

      editcard(){
        this.havecard=true
        this.cardpost='../../../static/images/default.png'
      },

      cardsuccess(res, file,fileList){
        // console.log(fileList)
        this.cardpost=qiniu.showurl+ fileList[0].response.key
      },

      savecard(){//posterPost

        if(this.cardpost=='../../../static/images/default.png'){
          this.$message({
            message: '请选择图片',
            type: 'error'
          });
        }else{
          var allParams={
            card_poster:this.cardpost
          }
          posterPost(allParams).then((res) => {
            console.log(res)
            if (res.msg === "ok") {
             this.$message({
              message: '提交成功',
              type: 'success'
            });
             this.getpsoter();
             this.havecard=false
           } else {
             this.$message({
              message: res.msg,
              type: 'error'
            });
           }
         });
        }
      },

      cancelcard(){
        this.havecard=false
      },





      editkan(){
        this.havekan=true
        this.kanpost='../../../static/images/default.png'
      },

      kansuccess(res, file,fileList){
        // console.log(fileList)
        this.kanpost=qiniu.showurl+ fileList[0].response.key
      },

      savekan(){

        if(this.kanpost=='../../../static/images/default1.png'){
          this.$message({
            message: '请选择图片',
            type: 'error'
          });
        }else{
          var allParams={
            bargain_poster:this.kanpost
          }
          posterPost(allParams).then((res) => {
            console.log(res)
            if (res.msg === "ok") {
             this.$message({
              message: '提交成功',
              type: 'success'
            });
             this.getpsoter();
             this.havekan=false
           } else {
             this.$message({
              message: res.msg,
              type: 'error'
            });
           }
         });
        }
      },

      cancelkan(){
        this.havekan=false
      },






      editagent(){
        this.haveagent=true
        this.agentpost='../../../static/images/default1.png'
      },

      agentsuccess(res, file,fileList){
        // console.log(fileList)
        this.agentpost=qiniu.showurl+ fileList[0].response.key
      },

      saveagent(){

        if(this.agentpost=='../../../static/images/default1.png'){
          this.$message({
            message: '请选择图片',
            type: 'error'
          });
        }else{
          var allParams={
            proxy_poster:this.agentpost
          }
          posterPost(allParams).then((res) => {
            console.log(res)
            if (res.msg === "ok") {
             this.$message({
              message: '提交成功',
              type: 'success'
            });
             this.getpsoter();
             this.haveagent=false
           } else {
             this.$message({
              message: res.msg,
              type: 'error'
            });
           }
         });
        }
      },

      cancelagent(){
        this.haveagent=false
      },












      checkPer(){
        var per = sessionStorage.getItem('permissions');

        if(per.indexOf('advertAdd')>-1){
          this.checkper1=true;
        }

        var per = sessionStorage.getItem('permissions');

        if(per.indexOf('advertDel')>-1){
          this.checkper2=true;
        }
      },


      getlist(){

        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        advertsGet(allParams).then((res) => {
          // console.log(res.msg)
          this.list=res.data.data;
          this.count=res.data.count;
        });
      },

      newone(){
       this.putorup='up';
       this.postarr=[];
       this.diatitle='新增广告',
       this.dialogNewVisible=true
     },

     beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 1MB!');
      }
      return isLt1M;
    },

    handleSuccess(res, file) {
      // this.upimgurl =qiniu.showurl+ res.key
      this.imgSrc =qiniu.showurl+ res.key
      // this.imgSrc = URL.createObjectURL(file.raw);
      // this.upimgurl = res.data.url;
    },

    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$message.warning(`只能上传1张图片`);
    },

    save(){
      if(this.imgSrc==''){
        this.$message({
          message: '请选择图片',
          type: 'error'
        });
      }else{
        if( this.putorup=='put'){
          var allParams = {
            pic:this.imgSrc,
            category_id:1,
            type:1,
            id:this.editId
          };
        }else{
          var allParams = {
            pic:this.imgSrc,
            category_id:1,
            type:1
          };
        }
        advertPost(allParams).then((res) => {
          if (res.msg === "ok") {
           this.$message({
            message: '提交成功',
            type: 'success'
          });
           this.getlist();
           this.dialogNewVisible=false
         } else {
           this.$message({
            message: res.msg,
            type: 'error'
          });
         }
       });
      }
    },

    handleEdit(index, row){
      this.diatitle='编辑广告';
      this.dialogNewVisible = true;
      this.putorup='put';
      console.log(row.pic)
      this.editId = row.id;
      // this.imgSrc=row.pic;`
      this.postarr.push(Object.assign({},{"url":row.pic}));

    },

    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.delId = row.id;
    },

    submitdel(){
      this.dialogDelVisible = false;
      var allParams='?id='+this.delId
      advertDel(allParams).then((res) => {
        console.log(res)
        if (res.msg === "ok") {
         this.$message({
          message: '删除成功',
          type: 'success'
        });
         this.getlist();
         this.dialogDelVisible = false;
       } else {
         this.$message({
          message: res.msg,
          type: 'error'
        });
       }
     });
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
    this.getpsoter();
    this.checkPer();
  }
}
</script>


<style scoped>

.cardbox{
  width: 600px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
}

.cardpost{
  width:300px;
  height:150px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block
}

.kanbox{
  width: 600px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
}

.kanpost{
  width:180px;
  height:320px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block
}

.agentbox{
  width: 600px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
}

.agentpost{
  width:180px;
  height:320px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block
}
</style>
