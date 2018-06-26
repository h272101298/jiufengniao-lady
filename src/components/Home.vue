<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">

      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">模板商城后台</span>
      </div>


      <div class="topbar-account topbar-btn newmsg">

        <el-button class="clear" size="mini" type=primary>清除缓存</el-button>

        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user" style="margin-right: 10px;"></i> {{username}} <i class="iconfont icon-down" style="margin-left: 10px;"></i></span>
          <el-dropdown-menu slot="dropdown">

            <el-dropdown-item  @click.native="logout"><span style="color: #555;font-size: 14px;">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单--> 
        <!-- unique-opened -->
        <el-menu default-active="0" router :collapse="collapsed">
        <!-- <el-menu default-active="0" router :collapse="collapsed" unique-opened> -->
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i>
                <span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>

  export default {
    name: 'home',
    created(){

    },
    data () {
      return {
        sysUserAvatar: '',
        collapsed: false,
        checknew:false,
        username:'轻狂书生'
      }
    },
    methods: {

      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {

        }).then(() => {
          sessionStorage.removeItem('token');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted() {

      // var username=sessionStorage.getItem('username');
      // this.username=username;
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.clear{
  /*float: right;*/
  position: relative;
  right: 0;
}
</style>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;

    .topbar-btn {
      color: #fff;
    }
    .topbar-btn:hover {
      background-color: #373d41;
    }
    .topbar-logo {
      float: left;
      width: 59px;
      line-height: 26px;
    }
    .topbar-logos {
      float: left;
      width: 120px;
      line-height: 26px;
    }
    .newmsg :hover{
      background-color: #373d41;
    }
    .topbar-logo img, .topbar-logos img {
      height: 40px;
      margin-top: 5px;
      margin-left: 2px;
    }
    .topbar-title {
      float: left;
      text-align: left;
      width: 200px;
      padding-left: 10px;
      border-left: 1px solid #000;
    }
    .topbar-account {
      float: right;
      padding-right: 12px;
    }
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      padding-left: 10px;
    }
  }
  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }

  aside {
    min-width: 50px;
    background: #333744;
    &::-webkit-scrollbar {
      display: none;
    }

    &.showSidebar {
      overflow-x: hidden;
      overflow-y: auto;
    }

    .el-menu {
      height: 100%; /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #333744;
    }

    .el-submenu .el-menu-item {
      min-width: 60px;
    }
    .el-menu {
      width: 180px;
    }
    .el-menu--collapse {
      width: 60px;
    }

    .el-menu .el-menu-item, .el-submenu .el-submenu__title {
      height: 46px;
      line-height: 46px;
    }

    .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
      background-color: #7ed2df;
    }
  }

  .menu-toggle {
    background: #4A5064;
    text-align: center;
    color: white;
    height: 26px;
    line-height: 30px;
  }

  .content-container {
    background: #fff;
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 1px;

    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>
