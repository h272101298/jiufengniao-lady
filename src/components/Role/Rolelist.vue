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
      <el-form-item label="角色名称:">
        <el-input v-model="newrole.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>

      <el-form-item label="分配权限:">
        <el-select v-model="newrole.right_id" placeholder="请分配权限" multiple filterable style="min-width: 500px">
          <!-- <el-option v-for="item in rolesArr" :label="item.name" :value="item.id" :key="item.id"></el-option> -->
          <el-option-group v-for="group in options" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-option-group>
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
      <el-button @click="dialogDelVisible  = false">取 消</el-button>
      <el-button type="primary" @click="submitdel()">确 定</el-button>
    </div>
  </el-dialog>
</el-col>
</el-row>
</template>



<script>

  // import baseUrl from '../../api/api';

  export default {
    data() {
      return {
        currentPage: 1,
        list:[],
        loading: false,
        count:100,
        limit:10,
        diatitle:'新增角色',
        dialogNewVisible:false,
        dialogDelVisible:false,
        newrole:{
          name:'',
          right_id:[]
        },
        rules: {
          name: [{required: true, trigger: 'blur',message: '请输入角色名'}]
        },
        // rolesArr:[
        // {
        //   name:'1',
        //   id:1
        // },{
        //   name:'2',
        //   id:2
        // },{
        //   name:'3',
        //   id:3
        // }],

        
        options: [{
          label: '管理员模块',
          options: [{
            value: 1,
            label: '新增管理员'
          }, {
            value: 2,
            label: '删除管理员'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 3,
            label: '成都'
          }, {
            value: 4,
            label: '深圳'
          }]
        }],



      };
    },

    methods:{
      getlist(){

      },

      newone(){
        this.diatitle='新增角色',
        this.dialogNewVisible=true
      },

      save(){
        this.dialogNewVisible=false
        console.log(this.newrole.right_id)
      },



      handleEdit(index, row){
        // console.log(index, row);
        this.diatitle='编辑角色',
        this.dialogNewVisible = true;
      },

      handleDelete(index, row) {
        // console.log(index, row);
        this.dialogDelVisible = true;
        // this.delId = row.id;
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
