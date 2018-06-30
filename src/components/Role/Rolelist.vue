<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
     <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" size="medium" @click="newone">新增角色</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="loading" border stripe size="small">
      <el-table-column prop="id" label="编号" width="130" align="center">
      </el-table-column>
      <el-table-column prop="name" label="角色名称" min-width="200" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="float:left;margin-top:20px;" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="limit" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total,sizes, prev, pager, next, jumper" :total="count" prev-text="上一页" next-text="下一页">
  </el-pagination>
</el-col>

<el-col>
  <el-dialog :title="diatitle" :visible.sync="dialogNewVisible" width="500" center style="min-width: 500px">
    <el-form ref="newrole" :model="newrole" label-width="120px" :rules="rules">
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="newrole.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="分配权限:" prop="permissions">
        <el-select v-model="newrole.permissions" placeholder="请分配权限" multiple filterable style="min-width: 790px">
          <el-option v-for="item in options" :key="item.id" :label="item.display_name" :value="item.id">
          </el-option>
        </el-select>
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
      <el-button type="danger" @click="submitdel()">确 定</el-button>
      <el-button @click="dialogDelVisible  = false" type="primary">取 消</el-button>

    </div>
  </el-dialog>
</el-col>
</el-row>
</template>

<script>

  import { permissionGet } from '../../api/api';
  import { roleGet } from '../../api/api';
  import { rolePost } from '../../api/api';
  import { roleDel } from '../../api/api';

  export default {
    data() {
      return {
        currentPage: 1,
        list:[],
        loading: false,
        count:0,
        limit:10,
        diatitle:'新增角色',
        dialogNewVisible:false,
        dialogDelVisible:false,
        newrole:{
          name:'',
          permissions:[]
        },
        rules: {
          name: [{required: true, trigger: 'blur',message: '请输入角色名'}]
        },
        options: [],
        putorup:'up',
        editId:'',
        delId:''
      };
    },

    methods:{
      getpermission(){
        var allParams = '';
        permissionGet(allParams).then((res) => {
          this.options=res.data;
          // this.count=res.data.count
        });
      },

      getlist(){
        var allParams = '?page='+ this.currentPage + '&limit=' + this.limit;
        roleGet(allParams).then((res) => {
          this.list=res.data.data;
          this.count=res.data.count
        });
      },

      newone(){
       this.putorup='up';
        // this.$refs.newrole.clearValidate()
        this.diatitle='新增角色',
        this.newrole={
          name:'',
          permissions:[]
        },
        this.dialogNewVisible=true
      },

      save(){
        this.$refs.newrole.validate((valid) => {
          if (valid) {
            console.log(this.newrole)

            if( this.putorup=='put'){
              var allParams = {
                id:this.editId,
                name:this.newrole.name,
                display_name:this.newrole.name,
                permissions:this.newrole.permissions
              }
            }else{
              var allParams = {
                name:this.newrole.name,
                display_name:this.newrole.name,
                permissions:this.newrole.permissions
              }
            }

            rolePost(allParams).then((res) => {
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
          }else{
            return false;
          }
        })
      },


      handleEdit(index, row){
        // console.log(row.permissions);
        this.newrole.permissions=[]
        for(var i=0;i < row.permissions.length;i++){
          this.newrole.permissions.push(row.permissions[i].id)
        }
        this.putorup='put';
        this.newrole.name=row.name
        this.editId = row.id;
        this.diatitle='编辑角色';
        this.dialogNewVisible = true;
      },

      handleDelete(index, row) {
        // console.log(index, row);
        this.dialogDelVisible = true;
        this.delId = row.id;
      },

      submitdel(){
        this.dialogDelVisible = false;
        var allParams='?id='+this.delId
        roleDel(allParams).then((res) => {

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
      this.getpermission();
    }
  }
</script>


<style>

</style>
