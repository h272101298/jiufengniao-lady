<template>
  <el-row class="warp" style="padding:20px 0 0 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>积分商城</el-breadcrumb-item>
        <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

    </el-col>


  </el-row>
</template>

<script>

  import qiniu from '../../api/qiniu';

  import { typeGet } from '../../api/api';
  import { guigeGet } from '../../api/api';

  import { goodPost } from '../../api/api';
  import { goodoneGet } from '../../api/api';

  import { Message } from 'element-ui';


  export default {
    data() {
      return {

      }
    },

    methods:{

    },

    computed: {

    },

    mounted: function () {

    }
  }
</script>

<style scope>

</style>
