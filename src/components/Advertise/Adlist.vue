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
        <el-tab-pane label="首页轮播" name="banner">

         <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" size="medium" @click="newone" v-show="checkper1">新增轮播</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="list" border stripe size="small" style="width:1001px">
          <el-table-column prop="id" label="轮播编号" width="200" align="center">
          </el-table-column>
          <el-table-column prop="pic" label="轮播图片" width="500" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.pic" style="max-width:90px;max-height:90px;" />
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300" align="center">
           <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" v-show="checkper1">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" v-show="checkper2">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
      </el-pagination>
    </el-tab-pane>


    <el-tab-pane label="首页海报" name="poster">
<!--      <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="medium" @click="newpost">编辑海报</el-button>
      </el-form-item>
    </el-form> -->

    <el-table :data="indexpostarr" border size="small" style="width:1001px">
      <el-table-column prop="id" label="海报编号" width="200" align="center">
      </el-table-column>
      <el-table-column prop="pic" label="海报图片" width="500" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.pic" style="max-width:90px;max-height:90px;" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handlepostEdit(scope.$index, scope.row)" v-show="checkper1">编辑</el-button>
      </template>
    </el-table-column>

  </el-table>

</el-tab-pane>

<el-tab-pane label="分销海报" name="agent" style="padding-left: 100px;">
  <el-form label-width="" width="900px" center style="width: 1000px" v-show="haveagent">
    <el-form-item label="" v-show="haveagent">
      <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="agentsuccess" :show-file-list="false" accept="image/*">
        <img :src="agentpost" class="pre-img agentpost">
        <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为16:9</p>
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


<el-tab-pane label="集卡牌海报" name="card" style="padding-left: 100px;">
  <el-form label-width="" width="900px" center style="width: 1000px" v-show="havecard">
    <el-form-item label="" v-show="havecard">
      <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="cardsuccess" :show-file-list="false" accept="image/*">
        <img :src="cardpost" class="pre-img cardpost">         
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="savecard()" size="small">提交</el-button>
      <el-button @click="cancelcard" size="small">取 消</el-button>
    </el-form-item>
    <el-form-item>
      <p class="">可上传JPG/PNG文件，建议图片长宽比为16:9</p>
    </el-form-item>
  </el-form>
  <div v-show="!havecard" class="cardbox">
    <img :src="cardshow" class="cardpost" @click="editcard()">
  </div>
  <el-button type="primary" @click="editcard()" size="small" v-show="!havecard">设置</el-button>
</el-tab-pane>


<el-tab-pane label="砍价海报" name="kan" style="padding-left: 100px;">
  <el-form label-width="" width="900px" center style="width: 1000px" v-show="havekan">
    <el-form-item label="" v-show="havekan">
      <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="kansuccess" :show-file-list="false" accept="image/*">
        <img :src="kanpost" class="pre-img kanpost">
        <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为16:9</p>
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


<el-tab-pane label="拼团海报" name="pin" style="padding-left: 100px;">
  <el-form label-width="" width="900px" center style="width: 1000px" v-show="havepin">
    <el-form-item label="" v-show="havepin">
      <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="pinsuccess" :show-file-list="false" accept="image/*">
        <img :src="pinpost" class="pre-img pinpost">
        <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为16:9</p>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="savepin()" size="small">提交</el-button>
      <el-button @click="cancelpin" size="small">取 消</el-button>
    </el-form-item>
  </el-form>
  <div v-show="!havepin" class="pinbox">
    <img :src="pinshow" class="pinpost" @click="editpin()">
  </div>
  <el-button type="primary" @click="editpin()" size="small" v-show="!havepin">设置</el-button>
</el-tab-pane>


<el-tab-pane label="免单海报" name="mpin" style="padding-left: 100px;">
  <el-form label-width="" width="900px" center style="width: 1000px" v-show="havempin">
    <el-form-item label="" v-show="havempin">
      <el-upload class="upload-demo" :action="upurl" :data="uptoken" :on-success="mpinsuccess" :show-file-list="false" accept="image/*">
        <img :src="mpinpost" class="pre-img pinpost">
        <p slot="tip" class="upload__tip">可上传JPG/PNG文件，建议图片长宽比为16:9</p>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="savempin()" size="small">提交</el-button>
      <el-button @click="cancelpin" size="small">取 消</el-button>
    </el-form-item>
  </el-form>
  <div v-show="!havempin" class="pinbox">
    <img :src="mpinshow" class="pinpost" @click="editmpin()">
  </div>
  <el-button type="primary" @click="editmpin()" size="small" v-show="!havempin">设置</el-button>
</el-tab-pane>


</el-tabs>

</el-row>
</el-col>




<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
    <el-form ref="newadv" :model="newadv" label-width="120px">

      <el-form-item label="上传图片：">
        <el-upload class="upload-demo" list-type="picture-card" :action="upurl" :data="uptoken" :on-success="handleSuccess" :on-exceed="handleExceed" :file-list="postarr" :limit="1" :show-file-list="true" accept="image/*">
          <i class="el-icon-plus"></i>
          <!-- <img :src="imgSrc" class="pre-img" style="max-width:60%;max-height:30%;border:2px dashed #ccc;border-radius:10px;display: block" > -->
          <!-- <el-button size="small" type="primary" style="display: block;margin-top: 20px;">选取文件</el-button> -->
          <div slot="tip" class="el-upload__tip">可上传JPG/PNG文件，建议图片比例为16:9</div>
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
  <el-dialog title="编辑海报" :visible.sync="dialogNewpostVisible" width="500" center style="min-width: 500px">
    <el-form ref="newadv" :model="newadv" label-width="120px">

      <el-form-item label="上传图片：">
        <el-upload class="upload-demo" list-type="picture-card" :action="upurl" :data="uptoken" :on-success="phandleSuccess" :on-exceed="phandleExceed" :file-list="indexpost" :limit="1" :show-file-list="true" accept="image/*">
          <i class="el-icon-plus"></i>
          <!-- <img :src="imgSrc" class="pre-img" style="max-width:60%;max-height:30%;border:2px dashed #ccc;border-radius:10px;display: block" > -->
          <!-- <el-button size="small" type="primary" style="display: block;margin-top: 20px;">选取文件</el-button> -->
          <div slot="tip" class="el-upload__tip">可上传JPG/PNG文件，建议图片比例为5:2</div>
        </el-upload>
      </el-form-item>

      <el-form-item style="margin-left: calc(50% - 200px);">
        <el-button type="primary" @click="savepost()">保 存</el-button>
        <el-button @click="dialogNewpostVisible = false">取 消</el-button>
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
        // activeName:'poster',
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
        dialogNewpostVisible:false,
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

        postimgSrc:"",

        indexpostarr:[{
          id:1,
          pic:'../../../static/images/default.png'
        },{
          id:2,
          pic:'../../../static/images/default.png'
        },{
          id:3,
          pic:'../../../static/images/default.png'
        },{
          id:4,
          pic:'../../../static/images/default.png'
        }],

        indexpost:[],

        editId:'',
        delId:'',

        checkper1:false,
        checkper2:false,


        havecard:false,
        cardshow:'../../../static/images/default.png',
        cardpost:'../../../static/images/default.png',

        havekan:false,
        kanshow:'../../../static/images/default.png',
        kanpost:'../../../static/images/default.png',

        haveagent:false,
        agentshow:'../../../static/images/default2.png',
        agentpost:'../../../static/images/default2.png',

        havepin:false,
        pinshow:'../../../static/images/default.png',
        pinpost:'../../../static/images/default.png',

        havempin:false,
        mpinshow:'../../../static/images/default.png',
        mpinpost:'../../../static/images/default.png',

      };
    },

    methods:{
      getposter(){
        var allParams = ''
        posterGet(allParams).then((res) => {
          // console.log(res.data.card_poster)
          if(res.data.card_poster){
            this.cardshow=res.data.card_poster
          }else{
            this.cardshow='../../../static/images/default.png'
          }

          if(res.data.bargain_poster){
            this.kanshow=res.data.bargain_poster
          }else{
            this.kanshow='../../../static/images/default.png'
          }

          if(res.data.proxy_poster){
            this.agentshow=res.data.proxy_poster
          }else{
            this.agentshow='../../../static/images/default2.png'
          }

          if(res.data.group_poster){
            this.pinshow=res.data.group_poster
          }else{
            this.pinshow='../../../static/images/default.png'
          }

          if(res.data.group_free){
            this.mpinshow=res.data.group_free
          }else{
            this.mpinshow='../../../static/images/default.png'
          }




          if(res.data.index_bargain){
            this.indexpostarr[0].pic=res.data.index_bargain
          }else{
            this.indexpostarr[0].pic='../../../static/images/default.png'
          }

          if(res.data.index_card){
            this.indexpostarr[1].pic=res.data.index_card
          }else{
            this.indexpostarr[1].pic='../../../static/images/default.png'
          }

          if(res.data.index_group){
            this.indexpostarr[2].pic=res.data.index_group
          }else{
            this.indexpostarr[2].pic='../../../static/images/default.png'
          }

          if(res.data.index_origin){
            this.indexpostarr[3].pic=res.data.index_origin
          }else{
            this.indexpostarr[3].pic='../../../static/images/default.png'
          }



        });
      },

      editcard(){
        this.havecard=true
        this.cardpost='../../../static/images/default.png'
      },

      cardsuccess(res, file,fileList){
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
             this.getposter();
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
             this.getposter();
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
        this.agentpost='../../../static/images/default2.png'
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
             this.getposter();
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





      editpin(){
        this.havepin=true
        this.pinpost='../../../static/images/default.png'
      },

      pinsuccess(res, file,fileList){
        // console.log(fileList)
        this.pinpost=qiniu.showurl+ fileList[0].response.key
      },

      savepin(){

        if(this.pinpost=='../../../static/images/default.png'){
          this.$message({
            message: '请选择图片',
            type: 'error'
          });
        }else{
          var allParams={
            group_poster:this.pinpost
          }
          posterPost(allParams).then((res) => {
            console.log(res)
            if (res.msg === "ok") {
             this.$message({
              message: '提交成功',
              type: 'success'
            });
             this.getposter();
             this.havepin=false
           } else {
             this.$message({
              message: res.msg,
              type: 'error'
            });
           }
         });
        }
      },

      cancelpin(){
        this.havepin=false
      },






      editmpin(){
        this.havempin=true
        this.mpinpost='../../../static/images/default.png'
      },

      mpinsuccess(res, file,fileList){
        // console.log(fileList)
        this.mpinpost=qiniu.showurl+ fileList[0].response.key
      },

      savempin(){

        if(this.mpinpost=='../../../static/images/default.png'){
          this.$message({
            message: '请选择图片',
            type: 'error'
          });
        }else{
          var allParams={
            group_free:this.mpinpost
          }
          posterPost(allParams).then((res) => {
            console.log(res)
            if (res.msg === "ok") {
             this.$message({
              message: '提交成功',
              type: 'success'
            });
             this.getposter();
             this.havempin=false
           } else {
             this.$message({
              message: res.msg,
              type: 'error'
            });
           }
         });
        }
      },

      cancelmpin(){
        this.havempin=false
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

     handleSuccess(res, file) {
      // this.upimgurl =qiniu.showurl+ res.key
      this.imgSrc =qiniu.showurl+ res.key
      // this.imgSrc = URL.createObjectURL(file.raw);
      // this.upimgurl = res.data.url;
    },

    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$message.warning(`一次只能上传1张图片`);
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
           this.imgSrc=''
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


    handlepostEdit(index, row){
      this.dialogNewpostVisible = true;
      // console.log(row.pic)
      this.postId = index;
      this.indexpost=[];
      // this.indexpost.push(Object.assign({},{"url":row.pic}));
    },


    phandleSuccess(res, file){
      // this.indexpost.push(qiniu.showurl+ fileList[0].response.key)  
      this.postimgSrc = qiniu.showurl+ res.key
      // this.indexpost=[]
      // for(var i=0;i<fileList.length;i++){
      //   if(fileList[i].response.key !== 1){
      //     this.indexpost.push(qiniu.showurl+ fileList[i].response.key)  
      //   }else {
      //     this.indexpost.push(fileList[i].url)
      //   }
      // }
    },

    phandleExceed(files, fileList) {
      this.$message.warning(`一次只能上传1张图片`);
    },


    savepost(){

      if(this.postimgSrc==''){
        this.$message({
          message: '请选择图片',
          type: 'error'
        });
      }else {

       if( this.postId==0){
        var allParams={
          index_bargain:this.postimgSrc
        }
      }else if( this.postId==1){
        var allParams={
          index_card:this.postimgSrc
        }
      }else if( this.postId==2){
        var allParams={
          index_group:this.postimgSrc
        }
      }else if( this.postId==3){
        var allParams={
          index_origin:this.postimgSrc
        }
      }
    }


    posterPost(allParams).then((res) => {
      console.log(res)
      if (res.msg === "ok") {
       this.$message({
        message: '提交成功',
        type: 'success'
      });
       this.postimgSrc=''
       this.getposter();
       this.dialogNewpostVisible=false
     } else {
       this.$message({
        message: res.msg,
        type: 'error'
      });
     }
   });

  }

},

mounted: function () {
  // this.getpost();
  this.getlist();
  this.getposter();
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
  width:320px;
  height:180px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block;
}

.kanbox{
  width: 600px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
}

.kanpost{
  width:320px;
  height:180px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block;
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
  display: block;
}

.pinbox{
  width: 600px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
}

.pinpost{
  width:320px;
  height:180px;
  border:1px dashed #ccc;
  border-radius:6px;
  display: block;
}



/*.el-form-item {
  margin-bottom: 0px!important;
  }*/
</style>
