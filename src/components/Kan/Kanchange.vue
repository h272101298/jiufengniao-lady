<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>限时砍价</el-breadcrumb-item>
        <el-breadcrumb-item>发布活动</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

      <el-form label-width="120px" width="900px" center style="width: 1000px" :rules="rules" ref="newgood" :model="newgood">


        <el-form-item label="活动标题：" prop="description">
          <el-input v-model="newgood.description" placeholder="请输入活动标题（16字以内）" style="width:500px;"></el-input>
        </el-form-item>

        <el-form-item label="奖品数量：" prop="number">
          <el-input v-model="newgood.number" type="number" min="0" placeholder="" style="width:500px;"></el-input>
        </el-form-item>

        <el-form-item label="活动时间：" prop="date">
          <el-date-picker v-model="date" type="datetimerange" :picker-options="pickerOptions" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss" @change="getSTime" style="width:500px;" :editable=false start-placeholder="开始时间" end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="期望点击数：" prop="clickNum">
          <el-input v-model="newgood.clickNum" type="number" min="0" placeholder="建议值30" style="width:500px;"></el-input>
        </el-form-item>

        <el-form-item label="获得优惠折扣：" prop="offer">
          <el-input v-model="newgood.offer" type="number" min="0" max="10" placeholder="请输入0到10之间的数字" style="width:500px;"></el-input>
        </el-form-item>


        <el-form-item label="卡牌图片：" prop="sameornot">
          <el-radio-group v-model="sameornot" @change="changeguige">
            <el-radio label="1">商户上传</el-radio>
            <el-radio label="2">修改</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="showmore" prop="images">
          <el-upload :action="upurl" :data="uptoken" list-type="picture-card" :on-remove="handleRemove" :on-success="handlelistSuccess" :file-list="newgood.list" :multiple="true" accept="image/*" :on-exceed="handleExceed" :limit="5">
            <img src="../../../static/images/default1.png" class="pre-img" style="width:145px;height:144px;display: block" >
          </el-upload>
        </el-form-item>

        <el-form-item v-show="!showmore" prop="images">
          <img v-for="item in defcard" :src="item.cover" class="card">
        </el-form-item>



        <el-form-item style=";margin-top: 20px;">
          <el-button type="primary" @click="save()" size="medium">提交</el-button>
          <el-button @click="golist()" size="medium">取 消</el-button>
        </el-form-item>
      </el-form>


    </el-col>




  </el-row>
</template>



<script>

  import qiniu from '../../api/qiniu';


  import { CardoneGet } from '../../api/api';

  import { CardshopPost } from '../../api/api';

  import { DefaultCardGet } from '../../api/api';
  import { Message } from 'element-ui';


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
        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,


        newgood:{
          description:'',
          number:'',
          offer:'',
          clickNum:'',
          list:[],
          start:'',
          end:'',
          default:1
        },

        type_id:'',

        goodguige:'',
        date:'',
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },

        // norm:false,


        selectgood:true,

        sameornot:'1',
        showmore:'',

        defcard:[
        // {cover:'../static/images/default1.png'},
        // {cover:'../static/images/default1.png'},
        // {cover:'../static/images/default1.png'},
        // {cover:'../static/images/default1.png'},
        // {cover:'../static/images/default1.png'}
        ],


        rules:{
          description: [
          {required: true, message: '请输入商品详情', trigger: 'blur'},
          ],
          number: [
          {required: true, validator: checkvalue, trigger: 'blur'},
          ],
          clickNum: [
          {required: true, validator: checkvalue, trigger: 'blur'},
          ],
          offer: [
          {required: true, validator: checkvalue, trigger: 'blur'},
          ],
        },
      };
    },


    methods:{

      // getdefcard(){
      //   var allParams = '';
      //   DefaultCardGet(allParams).then((res) => {

      //     if(res.data==''){
      //       this.havecard=false
      //     }else{
      //       this.defcard=res.data;
      //       this.havecard=false
      //     }
      //   });
      // },

      getonecard(){
       var id = sessionStorage.getItem('cardcheckid');
       this.actid= id
       // sessionStorage.removeItem('cardcheckid');
       var allParams = '?id='+id;
       CardoneGet(allParams).then((res) => {
        this.date=[res.data.start,res.data.end]
        this.newgood=res.data;


        this.newgood.list=[];
        console.log(res)

        // this.defcard=res.data.list


      });
     },



     getSTime(val){
      console.log(val[0])
        // var arr = val.split(",")
        this.newgood.start=val[0];
        this.newgood.end=val[1];
      },


      changeguige(val){
        if(val=="1"){
          this.showmore=false
        }else if(val=="2"){
          this.showmore=true
        }
      },


    //相册
    beforeUpload(file) {
      // const isLt1M = file.size / 1024 / 1024 < 1;
      // if (!isLt1M) {
      //   this.$message.error('图片大小不能超过 1MB!');
      // }
      // return isLt1M;
    },

    handleSuccess(res, file) {
      this.newgood.cover =qiniu.showurl+ res.key
    },

    handlelistSuccess(res, file,fileList){
      this.newgood.list=[]
      for(var i=0;i<fileList.length;i++){
        this.newgood.list.push(qiniu.showurl+ fileList[i].response.key)
      }
      // this.newgood.images=fileList
    },

    handleRemove(file, fileList) {
      this.newgood.list=[]
      for(var i=0;i<fileList.length;i++){
        this.newgood.list.push(qiniu.showurl+ fileList[i].response.key)
      }
      // this.newgood.images=fileList
    },

    handleExceed(files, fileList) {
      this.$message.warning(`只能上传5张图片`);
    },


    save(){

      if(this.newgood.end=='' || this.newgood.end==''){
        this.$message.error(`请选择活动时间`);
        return
      }
      if(this.newgood.default==2 && this.newgood.list!==5){
        this.$message.error(`请选择5张图片`);
        return
      }

      this.$refs.newgood.validate((valid) => {
        if (valid) {
          if(this.showmore==false){
            var allParams = {
              id:this.actid,
              description:this.newgood.description,
              number:this.newgood.number,
              offer:this.newgood.offer,
              clickNum:this.newgood.clickNum,
              start:this.newgood.start,
              end:this.newgood.end,
            };

          }else{
            var allParams = {
             id:this.actid,
             description:this.newgood.description,
             number:this.newgood.number,
             offer:this.newgood.offer,
             clickNum:this.newgood.clickNum,
             start:this.newgood.start,
             end:this.newgood.end,
             list:this.newgood.list
           };
         }
         CardshopPost(allParams).then((res) => {
          console.log(res)
          if (res.msg === "ok") {
           this.$message({
            message: '提交成功',
            type: 'success'
          });

           this.$router.push({ path: '/Card/Cardcheck' });

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

    golist(){

     this.$router.push({ path: '/Card/Cardcheck' });
   },


   handleCurrentChange(val) {
    this.currentPage = val;
    this.getgood();
  },


  handleSizeChange(val){
    this.limit = val;
    this.getgood();
  },
},


mounted: function () {
  // this.getdefcard()
  this.getonecard()
}
}
</script>



<style scope>


.default{
  width: 100px;
  height: 144px;
  /*display: block;*/
}
</style>
