<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col>
      <el-form label-width="120px" width="700px" center style="width: 800px" :rule="rules">
        <el-form-item label="商品名称：">
          <el-input v-model="newgood.link" placeholder="请输入商品名称"></el-input>
        </el-form-item> 

        <el-form-item label="商品简介：">
          <el-input type="textarea" :rows="5" v-model="newgood.link" placeholder="请输入商品简介" style="min-width:280px;"></el-input>
        </el-form-item>

        <el-form-item label="商品分类：" prop="type">
          <el-select v-model="type1" placeholder="请选择一级分类" filterable @change="gettype2">
            <el-option v-for="item in typeArr1" :label="item.title" :value="item.id" :key="item.id"></el-option>
          </el-select>

          <el-select v-model="type2" placeholder="请选择二级分类" filterable v-show="type1" @change="gettype3">
            <el-option v-for="item in typeArr2" :label="item.title" :value="item.id" :key="item.id"></el-option>
          </el-select>

          <el-select v-model="newgood.type" placeholder="请选择三级分类" filterable v-show="type2" @change="confirmtype">
            <el-option v-for="item in typeArr3" :label="item.title" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="商品规格："> -->
<!--           <el-radio-group v-model="newgood.sameornot" @change="changeguige">
            <el-radio label="统一规格"></el-radio>
            <el-radio label="多规格"></el-radio>
          </el-radio-group>
        </el-form-item> -->

        <!-- v-show="showmore" -->
        <el-form-item label="">
          <div v-for="(guige, index) in newgood.guige" style="margin-top: 10px;display: flex;justify-content: flex-start;align-items: center;flex-wrap: wrap;">
            <el-input v-model="guige.value" style="width: 200px;margin:5px 5px 5px 0;" placeholder="请输入规格名"></el-input>

            <div v-for="(item,index) in newgood.guige[index].detail">
              <el-input v-model="item.value" style="width: 200px;margin:5px 5px 5px 0;" placeholder="请输入详细内容"></el-input>
            </div>
            <el-button @click.prevent="adddetail(index)" type="primary" size="medium" style="margin: 5px">新增详细</el-button>
            <el-button @click.prevent="removeguige(guige)" type="danger" size="medium" style="margin: 5px">删除</el-button>
          </div>

          <el-button @click.prevent="addguige()" type="primary" size="medium" style="margin-top: 10px;">新增规格</el-button>

        </el-form-item>



<!--         <el-form-item label="市场价格：">
  <el-input v-model="newgood.link" placeholder="请输入市场价格"></el-input>
</el-form-item>

<el-form-item label="本店价格：">
  <el-input v-model="newgood.link" placeholder="请输入本店价格"></el-input>
</el-form-item>

<el-form-item label="商品缩略图：">
  <el-upload class="upload-demo" :action="upurl" :data="uptoken" :before-upload="beforeUpload" :on-success="handleSuccess" :show-file-list="false" accept="image/*">
    <i class="el-icon-plus"></i>
    <img :src="imgSrc" class="pre-img" style="width:150px;height:150px;border:1px dashed #ccc;border-radius:10px;display: block" >
    <el-button size="small" type="primary" style="display: block;margin-top: 20px;">选取文件</el-button>
    <div slot="tip" class="el-upload__tip">可上传JPG/PNG文件，且大小不超过1M</div>
  </el-upload>
</el-form-item>

<el-form-item label="商品相册：">
  <el-upload :action="upurl" :data="uptoken" list-type="picture-card" :on-remove="handleRemove" :on-success="handlelistSuccess" :on-exceed="handleExceed" :file-list="album" :limit="10">
    <i class="el-icon-plus"></i>
  </el-upload>
</el-form-item>

<el-form-item label="分销佣金：">
  <el-input v-model="newgood.link" placeholder="请输入分销佣金"></el-input>
</el-form-item>

<el-form-item label="库存：">
  <el-input v-model="newgood.link" placeholder="请输入库存"></el-input>
</el-form-item>

<el-form-item label="快递：" prop="role_id">
  <el-select v-model="newgood.role_id" placeholder="请选择快递">
    <el-option v-for="item in rolesArr" :label="item.name" :value="item.id" :key="item.id"></el-option>
  </el-select>
</el-form-item>

<el-form-item label="邮费：">
  <el-input v-model="newgood.link" placeholder="请输入邮费"></el-input>
</el-form-item>

<el-form-item label="分享标题：">
  <el-input v-model="newgood.link" placeholder="请输入分享标题"></el-input>
</el-form-item>

<el-form-item label="分享描述：">
  <el-input v-model="newgood.link" placeholder="请输入分享描述"></el-input>
</el-form-item> -->

<el-form-item style="margin-left: calc(50% - 185px);">
  <el-button type="primary" @click="save()">保 存</el-button>
  <el-button @click="dialogNewVisible = false">取 消</el-button>
</el-form-item>
</el-form>
</el-col>


</el-row>
</template>

<style>

</style>

<script>

  import qiniu from '../../api/qiniu';
  import { typeGet } from '../../api/api';

  export default {
    data() {
      return {
        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,

        imgSrc:"../static/images/default1.png",
        newgood:{
          link:'',
          intro:'',
          positionid:'',
          album:'',
          type:'',

          sameornot:'',
          guige:[]
        },

        showmore:'',
        album:[],

        typeArr1:[],
        type1:'',
        typeArr2:[],
        type2:'',
        typeArr3:[],

        rules:{
          name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          ],
          condition: [
          {required: true, message: '请输入商品简介', trigger: 'blur'},
          ],
        }
      };
    },

    methods:{

      gettype1(){
        var allParams = '?level=1';
        typeGet(allParams).then((res) => {
          this.typeArr1=res.data.data;
        });
      },

      gettype2(e){
        var allParams = '?parent='+ e;
        typeGet(allParams).then((res) => {
          this.typeArr2=[];
          this.typeArr2=res.data.data;
        });
      },

      gettype3(e){
        var allParams = '?parent='+ e;
        typeGet(allParams).then((res) => {
          this.typeArr3=res.data.data;
        });
      },

      confirmtype(e){
        this.newgood.type=e;
        console.log(this.newgood.type)
      },




      changeguige(val){
        if(val=="统一规格"){
          this.showmore=false
        }else if(val=="多规格"){
          this.showmore=true
        }
      },






      removeguige(item) {
        var index = this.newgood.guige.indexOf(item)
        if (index !== -1) {
          this.newgood.guige.splice(index, 1)
        }
      },

      adddetail(e) {
        this.newgood.guige[e].detail.push({
          value: '',
          // key: Date.now()
        });
      },

      addguige() {
        this.newgood.guige.push({
          value: '',
          // key: Date.now(),
          detail:[]
        });
      },









      beforeUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.$message.error('图片大小不能超过 1MB!');
        }
        return isLt1M;
      },

      handleSuccess(res, file) {
        this.upimgurl =qiniu.showurl+ res.key
        this.imgSrc =qiniu.showurl+ res.key
      },

      handleRemove(file, fileList) {
        this.album=fileList
      },

      handleExceed(files, fileList) {
        this.$message.warning(`只能上传10张图片`);
      },

      handlelistSuccess(res, file,fileList){
        this.album=fileList
      },

      save(){
        // var piclist=[]
        // for(var i = 0 ; i < this.album.length; i++){
        //   var aaa = qiniu.showurl+this.album[i].response.key;
        //   piclist.push(aaa)
        // }
        // console.log(piclist)
        console.log(this.newgood)



      },
    },

    mounted: function () {
      this.gettype1()
    }
  }
</script>
