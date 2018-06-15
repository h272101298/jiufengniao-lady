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
     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="medium" @click="newone">新增广告</el-button>
      </el-form-item>
<!--       <el-form-item>
        <el-input v-model="filter.name" placeholder="请输入用户名/编号" style="min-width: 200px;" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="newone">搜索</el-button>
        <el-button size="medium" @click="newone">清空</el-button>
      </el-form-item> -->
    </el-form>

    <el-table :data="list" v-loading="loading" border stripe size="small">
      <el-table-column prop="name" label="广告编号" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="广告图片" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="广告分类" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="广告链接" min-width="200" align="center">
      </el-table-column>

      <el-table-column label="操作" min-width="200" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="medium" @click="handleEdit">编辑</el-button>
        <el-button type="danger" size="medium" @click="handleDelete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>
</el-col>

<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
    <el-form ref="newadv" :model="newadv" label-width="120px" :rules="rules">

      <el-form-item label="上传图片：">
        <el-upload class="upload-demo" :action="upUrl" :before-upload="beforeUpload" :on-success="handleSuccess" :show-file-list="false" accept="image/*">
          <img :src="imgSrc" class="pre-img" style="width:60%;height:30%;border:2px dashed #ccc;border-radius:10px;display: block" >
          <el-button size="small" type="primary" style="display: block;margin-top: 20px;">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">可上传JPG/PNG文件，且大小不超过1M</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="广告位置:">
        <el-select v-model="newadv.positionid" placeholder="请选择广告位置">
          <el-option v-for="item in postarr" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告链接:">
        <el-input v-model="newadv.link" placeholder="请输入广告链接"></el-input>
      </el-form-item>
      <el-form-item label="广告描述:">
        <el-input v-model="newadv.intro" placeholder="请输入广告描述"></el-input>
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


  import baseUrl from '../../api/api';

  export default {
    data() {
      return {
        currentPage: 1,
        list:[{
          name:'11'
        }],
        loading: false,
        count:100,
        limit:10,
        dialogNewVisible:false,
        dialogDelVisible:false,
        filter:{
          name:''
        },
        putorup:'up',
        showUrl:baseUrl,
        upUrl:baseUrl+'upload',
        imgSrc:"../static/images/default.png",
        newadv:{
          link:'',
          intro:'',
          positionid:''
        },
        diatitle:'新增广告',
        postarr:[],
        rules: {
          link: [{required: true, trigger: 'blur',message: '请输入广告链接'}],
          intro: [{required: true, trigger: 'blur',message: '请输入广告描述'}]
        },
        editId:'',
        delId:''
      };
    },

    methods:{
      getlist(){

      },

      newone(){
       this.putorup='up';
       this.imgSrc="../static/images/default.png";
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
      this.imgSrc = URL.createObjectURL(file.raw);
      this.upimgurl = res.data.url;
    },

    save(){
      this.dialogNewVisible=false
    },

    handleEdit(index, row){
      this.diatitle='编辑广告';
      this.dialogNewVisible = true;
      this.putorup='put';
      this.editId = row.id;
      this.imgSrc=this.showUrl+row.url;
    },

    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.delId = row.id;
    },

    submitdel(){
      this.dialogDelVisible = false;
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
