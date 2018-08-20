<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>积分商城</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">

    </el-col>


  </el-row>
</template>

<script>
  export default {
    data() {
      return {

      }

    },

    methods:{

    },

    mounted: function () {
      console.log(this)
    }
  }
</script>


<style scoped>

</style>