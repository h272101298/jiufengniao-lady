<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
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


        <!-- v-show="showmore" -->
<!--         <el-form-item label="">
          <div v-for="(guige, index) in newgood.guige" style="margin-top: 10px;display: flex;justify-content: flex-start;align-items: center;flex-wrap: wrap;">
            <el-input v-model="guige.value" style="width: 200px;margin:5px 5px 5px 0;" placeholder="请输入规格名"></el-input>
            <div v-for="(item,index) in newgood.guige[index].detail">
              <el-input v-model="item.value" style="width: 200px;margin:5px 5px 5px 0;" placeholder="请输入详细内容"></el-input>
            </div>
            <el-button @click.prevent="adddetail(index)" type="primary" size="medium" style="margin: 5px">新增详细</el-button>
            <el-button @click.prevent="removeguige(guige)" type="danger" size="medium" style="margin: 5px">删除</el-button>
          </div>
          <el-button @click.prevent="addguige()" type="primary" size="medium" style="margin-top: 10px;">新增规格</el-button>
        </el-form-item> -->

        <el-form-item label="商品规格：">

          <el-radio-group v-model="sameornot" @change="changeguige">
            <el-radio label="1">统一规格</el-radio>
            <el-radio label="2">多规格</el-radio>
          </el-radio-group>

          <div style="border: 1px solid #eee;padding: 0 0 10px 10px;" v-show="showmore">
            <div v-for="item in checkOptions">
              <span>{{item.title}}</span>
              <el-checkbox-group v-model="checkList" @change="xuanzegg">
                <el-checkbox-button v-for="(items,index) in item.detailArray" :label="items.id" :key="items.id" >{{items.title}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="市场价格：" v-show="!showmore">
          <el-input v-model="newgood.link" type="number" placeholder="请输入市场价格"></el-input>
        </el-form-item>

        <el-form-item label="本店价格：" v-show="!showmore">
          <el-input v-model="newgood.link" type="number" placeholder="请输入本店价格"></el-input>
        </el-form-item>

        <el-form-item label="库存：" v-show="!showmore">
          <el-input v-model="newgood.link" type="number" placeholder="请输入库存"></el-input>
        </el-form-item>




        <el-form-item label="价格&库存：" v-show="showmore">
          <el-table :data="pricearr" empty-text="请先选择规格" style="width:661px">
           <el-table-column prop="" label="名称" width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="添加图片" width="170" align="center">
            <template slot-scope="scope">
             <el-upload class="upload-demo" :action="upurl" :data="uptoken" :before-upload="ggbeforeUpload" :on-success="gghandleSuccess" :show-file-list="false" accept="image/*">
              <img :src="scope.row.imgSrc" class="pre-img" style="max-width:80px;max-height:40px;border:1px dashed #ccc;border-radius:5px;display: block" @click="ggupimg(scope.row.id)">
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="原价" width="130" align="center">
         <template slot-scope="scope">
          <el-input placeholder="请输入原价" v-model="scope.row.oldprice"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="" label="现价" width="130" align="center">
      <template slot-scope="scope">
        <el-input placeholder="请输入现价" v-model="scope.row.newprice"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="" label="库存" width="130" align="center">
      <template slot-scope="scope">
        <el-input placeholder="请输入库存" v-model="scope.row.kucun"></el-input>
      </template>
    </el-table-column>
  </el-table>
</el-form-item>



<el-form-item label="商品缩略图：">
  <el-upload class="upload-demo" :action="upurl" :data="uptoken" :before-upload="beforeUpload" :on-success="handleSuccess" :show-file-list="false" accept="image/*">
    <img :src="imgSrc" class="pre-img" style="width:150px;height:150px;border:1px dashed #ccc;border-radius:10px;display: block" >

  </el-upload>
</el-form-item>

<el-form-item label="商品相册：" v-show="!showmore">
  <el-upload :action="upurl" :data="uptoken" list-type="picture-card" :on-remove="handleRemove" :on-success="handlelistSuccess" :file-list="album" :multiple="true"><!--:on-exceed="handleExceed" :limit="10"  -->
    <i class="el-icon-plus"></i>
  </el-upload>
</el-form-item>

<el-form-item label="分销佣金：">
  <el-input v-model="newgood.link" type="number" placeholder="请输入分销佣金"></el-input>
</el-form-item>



<el-form-item label="快递：" prop="express">
  <el-select v-model="newgood.express" placeholder="请选择快递">
    <el-option v-for="item in expressArr" :label="item.title" :value="item.id" :key="item.id"></el-option>
  </el-select>
</el-form-item>

<el-form-item label="邮费：">
  <el-input v-model="newgood.link" type="number" placeholder="请输入邮费"></el-input>
</el-form-item>

<el-form-item label="分享标题：">
  <el-input v-model="newgood.link" placeholder="请输入分享标题"></el-input>
</el-form-item>

<el-form-item label="分享描述：">
  <el-input v-model="newgood.link" placeholder="请输入分享描述"></el-input>
</el-form-item>

<el-form-item style="margin-left: calc(50% - 185px);">
  <el-button type="primary" @click="save()">保 存</el-button>
  <el-button @click="golist()">取 消</el-button>
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
  import { guigeGet } from '../../api/api';
  import { deliveryGet } from '../../api/api';

  import { Message } from 'element-ui';
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


          guige:[]
        },

        sameornot:'1',
        showmore:'',
        checkOptions:[],
        checkList:[],

        pricearr:[],


        ggimgindex:null,
        ggtitleindex:null,


        album:[],

        typeArr1:[],
        type1:'',
        typeArr2:[],
        type2:'',
        typeArr3:[],


        delArr:[],
        expressArr:[],

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
        this.getcategory()
      },




      changeguige(val){
        if(val=="1"){
          this.showmore=false
        }else if(val=="2"){
          this.getcategory()
          if(this.newgood.type){
            this.showmore=true
          }

        }
      },

      getcategory(){
        if(this.newgood.type){
          var allParams = '?page=1'+ '&limit=10000'+ '&typeid='+this.newgood.type;
          guigeGet(allParams).then((res) => {
            this.checkOptions=res.data.data;
            if(this.sameornot==2){
              this.showmore=true
            }
          });
        }else{
          Message({
            message: "请先选择分类",
            type: 'error'
          });
        }
      },

      findtitle(val){
        // console.log(e)
        // this.gglenghtindex=e.length
        for(var i = 0; i<this.checkOptions.length;i++){
          for(var j = 0; j<this.checkOptions[i].detailArray.length;j++){


            if(val==this.checkOptions[i].detailArray[j].id){
              return this.ggtitleindex=this.checkOptions[i].detailArray[j].title
            }


          }
        }
      },

      xuanzegg(e){
        this.pricearr=[];
        for (var i=0 ;i<e.length; i++) {
          this.pricearr.push({
            id:i,
            // title:e[i],
            title:this.findtitle(e[i]),
            imgSrc:'../static/images/default.png',
            oldprice:null,
            newprice:null,
            kucun:null
          })
        }
      },

      xuanzegg1(){
        console.log(1)
      },



      handlelistSuccess(res, file,fileList){
        this.album=fileList
      },



      ggupimg(e){
       this.ggimgindex=e
     },

     ggbeforeUpload(file){
       // console.log(file)
     },


     gghandleSuccess(res, file) {
      this.pricearr[this.ggimgindex].imgSrc=qiniu.showurl+ res.key
        // this.upimgurl =qiniu.showurl+ res.key
        // this.imgSrc =qiniu.showurl+ res.key
      },


      getdel(){
        var allParams = '?page=1'+ '&limit=10000';
        deliveryGet(allParams).then((res) => {
          this.delArr=res.data.data;
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

      // handleExceed(files, fileList) {
      //   this.$message.warning(`只能上传10张图片`);
      // },

      handleRemove(file, fileList) {
        this.album=fileList
      },


      getexpress(){
        var allParams = '?page=1'+ '&limit=10000';
        deliveryGet(allParams).then((res) => {
          this.expressArr=res.data.data;
        });
      },

      save(){
        // var piclist=[]
        // for(var i = 0 ; i < this.album.length; i++){
        //   var aaa = qiniu.showurl+this.album[i].response.key;
        //   piclist.push(aaa)
        // }
        // console.log(piclist)
        console.log(this.newgood)
        // console.log(this.pricearr)



      },


      golist(){
        this.$router.push({ path: '/Good/Goodlist' });
      }
    },

    mounted: function () {
      this.gettype1()
      this.getexpress()

    }
  }
</script>
