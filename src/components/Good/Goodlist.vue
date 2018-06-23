<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="medium" @click="newone">新增商品</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filter.name" placeholder="请输入商品名称/分类/状态/商家名称" style="min-width: 260px;" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="newone">搜索</el-button>
        <el-button size="medium" @click="newone">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="loading" border stripe size="small">
      <el-table-column prop="name" label="编号" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="url" label="图片" min-width="200" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.url" style="max-width:100px;max-height:100px;" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="分类" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="价格" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="name" label="所属商家" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="库存" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="name" label="上/下架" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="name" label="审核状态" min-width="150" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
       <template slot-scope="scope">
        <el-tooltip class="icon" effect="dark" content="编辑" placement="top">
          <img src="../../../static/images/icon/edit.png" @click="handleEdit(scope.$index, scope.row)">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="预览" placement="bottom">
          <img src="../../../static/images/icon/look.png" @click="handleEdit(scope.$index, scope.row)">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="生成二维码" placement="top">
          <img src="../../../static/images/icon/ewcode.png" @click="handleEdit(scope.$index, scope.row)">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="审核" placement="bottom">
          <img src="../../../static/images/icon/check.png" @click="handleEdit(scope.$index, scope.row)">
        </el-tooltip>
        <el-tooltip class="icon" effect="dark" content="删除" placement="top">
          <img src="../../../static/images/icon/delete.png" @click="handleDelete(scope.$index, scope.row)">
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>
</el-col>

<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="700px" center style="min-width: 500px">
    <el-form label-width="120px" size="small" >

<!--       <el-form-item label="商品名称：">
        <el-input v-model="newadv.link" placeholder="请输入商品名称"></el-input>
      </el-form-item> 

      <el-form-item label="商品简介：">
        <el-input v-model="newadv.link" placeholder="请输入商品简介"></el-input>
      </el-form-item>

      <el-form-item label="商品分类：" prop="role_id">
        <el-select v-model="newadv.role_id" placeholder="请选择商品分类">
          <el-option v-for="item in rolesArr" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品规格：" prop="role_id">
        <el-select v-model="newadv.role_id" placeholder="请选择商品规格">
          <el-option v-for="item in rolesArr" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="商品缩略图：">
        <el-upload class="upload-demo" :action="upurl" :data="uptoken" :before-upload="beforeUpload" :on-success="handleSuccess" :show-file-list="false" accept="image/*">
          <i class="el-icon-plus"></i>
          <img :src="imgSrc" class="pre-img" style="width:60%;height:30%;border:2px dashed #ccc;border-radius:10px;display: block" >
          <el-button size="small" type="primary" style="display: block;margin-top: 20px;">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">可上传JPG/PNG文件，且大小不超过1M</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品相册：">
        <el-upload :action="upurl" :data="uptoken" list-type="picture-card" :on-remove="handleRemove" :on-success="handlelistSuccess" :on-exceed="handleExceed" :file-list="album" :limit="3">
          <i class="el-icon-plus"></i>
        </el-upload>
<!--         <el-dialog :visible.sync="dialogVisible1">
          <img width="100%" :src="dialogImageUrl1">
        </el-dialog> -->
      </el-form-item>

      <el-form-item label="分享标题：">
        <el-input v-model="newadv.link" placeholder="请输入分享标题"></el-input>
      </el-form-item>

      <el-form-item label="分享描述：">
        <el-input v-model="newadv.link" placeholder="请输入分享描述"></el-input>
      </el-form-item>

      <el-form-item label="市场价格：">
        <el-input v-model="newadv.link" placeholder="请输入市场价格"></el-input>
      </el-form-item>

      <el-form-item label="本店价格：">
        <el-input v-model="newadv.link" placeholder="请输入本店价格"></el-input>
      </el-form-item>

      <el-form-item label="分销佣金：">
        <el-input v-model="newadv.link" placeholder="请输入分销佣金"></el-input>
      </el-form-item>

      <el-form-item label="库存：">
        <el-input v-model="newadv.link" placeholder="请输入库存"></el-input>
      </el-form-item>

      <el-form-item label="快递：" prop="role_id">
        <el-select v-model="newadv.role_id" placeholder="请选择快递">
          <el-option v-for="item in rolesArr" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="邮费：">
        <el-input v-model="newadv.link" placeholder="请输入邮费"></el-input>
      </el-form-item>

      <el-form-item style="margin-left: calc(50% - 185px);">
        <el-button type="primary" @click="save()">保 存</el-button>
        <el-button @click="dialogNewVisible = false">取 消</el-button>
      </el-form-item>

    </el-form>
  </el-dialog>
</el-col>


<el-col>
  <el-dialog title="删除不可恢复，是否确定删除？" :visible.sync="dialogDelVisible" width="30%">
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="submitdel()">确 定</el-button>
      <el-button type="primary" @click="dialogDelVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</el-col>

</el-row>
</template>



<script>


  import qiniu from '../../api/qiniu';

  export default {
    data() {
      return {
        uptoken:{
          token:qiniu.token,
        },
        upurl:qiniu.upurl,
        currentPage: 1,
        list:[{
          name:'11',
          url:'../static/images/gold.jpg'
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
        imgSrc:"../static/images/default.png",
        newadv:{
          link:'',
          intro:'',
          positionid:'',
          album:'',
          role_id:''
        },
        rolesArr:[],
        diatitle:'新增商品',
        postarr:[],
        // rules: {
        //   link: [{required: true, trigger: 'blur',message: '请输入广告链接'}]
        // },
        editId:'',
        delId:'',
        album:[]
      };
    },

    methods:{
      getlist(){

      },

      newone(){
       this.putorup='up';
       this.imgSrc="../static/images/default.png";
       this.diatitle='新增商品',
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
      this.upimgurl =qiniu.showurl+ res.key
      this.imgSrc =qiniu.showurl+ res.key
    },

    save(){

      var piclist=[]
      for(var i = 0 ; i < this.album.length; i++){
        var aaa = qiniu.showurl+this.album[i].response.key;
        piclist.push(aaa)
      }
      console.log(piclist)

      this.dialogNewVisible=false
    },

    handleEdit(index, row){
      this.diatitle='编辑商品';
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

    handleRemove(file, fileList) {
      this.album=fileList
    },
    
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$message.warning(`只能上传3张图片`);
    },

    handlelistSuccess(res, file,fileList){
      this.album=fileList
    },
  },

  mounted: function () {
    this.getlist();
  }
}
</script>


<style>
.icon{
  width: 20px;
  height: 20px;
  margin: 2px;
}
</style>