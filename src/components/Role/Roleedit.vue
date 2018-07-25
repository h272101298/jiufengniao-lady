<template>
  <el-row class="warp" style="padding:20px 0 50px 20px;">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form :inline="true" :model="newrole" :rules="rules" ref="newrole">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="newrole.name" placeholder="请输入角色名称" style="min-width: 300px;" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:20px;" @click='save()' size="small">提交</el-button>
        </el-form-item>
      </el-form>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>商铺模块</th>
          </tr>
          <tr>
            <td class="ltd">经营类目</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='storeCategoryList' false-label='storeCategoryList1a'>类目列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='storeCategoryAdd' false-label='storeCategoryAdd1a'>编辑类目</el-checkbox>
              <el-checkbox @change="xzchange" true-label='storeCategoryDel' false-label='storeCategoryDel1a'>删除类目</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">入驻申请</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='settleList' false-label='settleList1a'>申请列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='settleCheck' false-label='settleCheck1a'>申请审核</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">商铺</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='storeList' false-label='storeList1a'>商铺列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='myStore' false-label='myStore1a'>我的店铺</el-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>商品模块</th>
          </tr>
          <tr>
            <td class="ltd">商品分类</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='productTypeList' false-label='productTypeList1a'>分类列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productTypeAdd' false-label='productTypeAdd1a'>编辑分类</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productTypeDel' false-label='productTypeDel1a'>删除分类</el-checkbox>
            </td>
          </tr>

          <tr>
            <td class="ltd">商品规格</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='productCategoryList' false-label='productCategoryList1a'>规格列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productCategoryAdd' false-label='productCategoryAdd1a'>编辑规格</el-checkbox>        
              <el-checkbox @change="xzchange" true-label='productCategoryDel' false-label='productCategoryDel1a'>删除规格</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">商品</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='productListAll' false-label='productListAll1a'>商品列表(所有)</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productListStore' false-label='productListStore1a'>商品列表(商铺)</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productReview' false-label='productReview1a'>审核商品</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productShelf' false-label='productShelf1a'>上下架商品</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productAdd' false-label='productAdd1a'>编辑商品</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productSoftDel' false-label='productSoftDel1a'>放入回收站</el-checkbox>
              <el-checkbox @change="xzchange" true-label='productDel' false-label='productDel1a'>永久删除</el-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>订单模块</th>
          </tr>
          <tr>
            <td class="ltd">订单管理</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='orderListAll' false-label='orderListAll1a'>订单列表(所有)</el-checkbox>
              <el-checkbox @change="xzchange" true-label='orderListStore' false-label='orderListStore1a'>订单列表(商铺)</el-checkbox>
              <el-checkbox @change="xzchange" true-label='orderListDo' false-label='orderListDo1a'>订单发货</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">退款管理</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='refuseListAll' false-label='refuseListAll1a'>退款列表(所有)</el-checkbox>
              <el-checkbox @change="xzchange" true-label='refuseListStore' false-label='refuseListStore1a'>退款列表(商铺)</el-checkbox>
              <el-checkbox @change="xzchange" true-label='refuseDo' false-label='refuseDo1a'>退款审核</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">快递管理</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='expressConfig' false-label='expressConfig1a'>配置快递</el-checkbox>
              <el-checkbox @change="xzchange" true-label='expressList' false-label='expressList1a'>快递列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='expressAdd' false-label='expressAdd1a'>编辑快递</el-checkbox>
              <el-checkbox @change="xzchange" true-label='expressDel' false-label='expressDel1a'>删除快递</el-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>分销模块</th>
          </tr>
          <tr>
            <td class="ltd">分销申请</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='proxyApplyList' false-label='proxyApplyList1a' checked>申请列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='proxyApplyCheck' false-label='proxyApplyCheck1a'>申请审核</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">代理管理</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='proxyList' false-label='proxyList1a'>代理列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='brokerageList' false-label='brokerageList1a'>佣金列表</el-checkbox>
            </td></td>
          </tr>
          <tr>
            <td class="ltd">提现管理</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='withdrawList' false-label='withdrawList1a'>提现列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='withdrawCheck' false-label='withdrawCheck1a'>提现审核</el-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>集卡牌</th>
          </tr>
          <tr>
            <td class="ltd">活动管理(商家)</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='storeCardPromotions' false-label='storeCardPromotions1a'>活动列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='addCardPromotion' false-label='addCardPromotion1a'>新增活动</el-checkbox>
              <el-checkbox @change="xzchange" true-label='delCardPromotion' false-label='delCardPromotion1a'>删除活动</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">活动审核</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='checkCardPromotions' false-label='checkCardPromotions1a'>审核列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='modifyCardPromotion' false-label='modifyCardPromotion1a'>编辑活动</el-checkbox>
              <el-checkbox @change="xzchange" true-label='checkCardPromotion' false-label='checkCardPromotion1a'>审核活动</el-checkbox>
              <el-checkbox @change="xzchange" true-label='delCardPromotion' false-label='delCardPromotion1a'>删除活动</el-checkbox>
            </td></td>
          </tr>
          <tr>
            <td class="ltd">活动管理(平台)</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='allCardPromotions' false-label='allCardPromotions1a'>活动列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='enableCardPromotion' false-label='enableCardPromotion1a'>活动上下线</el-checkbox>
              <el-checkbox @change="xzchange" true-label='delCardPromotion' false-label='delCardPromotion1a'>删除活动</el-checkbox>
              <el-checkbox @change="xzchange" true-label='hotCardPromotion' false-label='hotCardPromotion1a'>设置首页推荐</el-checkbox>
              <el-checkbox @change="xzchange" true-label='addDefaultCards' false-label='addDefaultCards1a'>设置默认卡牌</el-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>限时砍价</th>
          </tr>
          <tr>
            <td class="ltd">活动管理(商家)</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='storeBargainPromotions' false-label='storeBargainPromotions1a'>活动列表</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='addBargainPromotion' false-label='addBargainPromotion1a'>新增活动</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='delBargainPromotion' false-label='delBargainPromotion1a'>删除活动</el-checkbox><!--  -->
            </td>
          </tr>
          <tr>
            <td class="ltd">活动审核</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='checkBargainPromotions' false-label='checkBargainPromotions1a'>审核列表</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='modifyBargainPromotion' false-label='modifyBargainPromotion1a'>编辑活动</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='checkBargainPromotion' false-label='checkBargainPromotion1a'>审核活动</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='delBargainPromotion' false-label='delBargainPromotion1a'>删除活动</el-checkbox><!--  -->
            </td></td>
          </tr>
          <tr>
            <td class="ltd">活动管理(平台)</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='allBargainPromotions' false-label='allBargainPromotions1a'>活动列表</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='enableBargainPromotion' false-label='enableBargainPromotion1a'>活动上下线</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='delBargainPromotion' false-label='delBargainPromotion1a'>删除活动</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='hotBargainPromotion' false-label='hotBargainPromotion1a'>设置首页推荐</el-checkbox><!--  -->
            </td>
          </tr>
        </table>
      </div>






      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>用户&管理员</th>
          </tr>
          <tr>
            <td class="ltd">用户列表</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='userList' false-label='userList1a'>用户列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='setMember' false-label='setMember1a'>成为会员</el-checkbox><!--  -->
            </td>
          </tr>
          <tr>
            <td class="ltd">管理员列表</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='adminList' false-label='adminList1a'>管理员列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='adminAdd' false-label='adminAdd1a'>编辑管理员</el-checkbox>
              <el-checkbox @change="xzchange" true-label='advertDel' false-label='advertDel1a'>删除管理员</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">角色列表</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='roleList' false-label='roleList1a'>角色列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='roleAdd' false-label='roleAdd1a'>编辑角色</el-checkbox>
              <el-checkbox @change="xzchange" true-label='roleDel' false-label='roleDel1a'>删除角色</el-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>会员管理</th>
          </tr>
          <tr>
            <td class="ltd">会员列表</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='memberList' false-label='memberList'>会员列表</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='setMember' false-label='setMember'>会员续费</el-checkbox><!--  -->
            </td>
          </tr>
          <tr>
            <td class="ltd">等级设置</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='memberLevelList' false-label='memberLevelList'>等级列表</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='addMemberLevel' false-label='addMemberLevel'>编辑等级</el-checkbox><!--  -->
              <el-checkbox @change="xzchange" true-label='delMemberLevel' false-label='delMemberLevel'>删除等级</el-checkbox><!--  -->
            </td>
          </tr>
          <tr>
            <td class="ltd">充值列表</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='memberRecords' false-label='memberRecords'>充值列表</el-checkbox>
            </td>
          </tr>
        </table>
      </div>

      <div class="tablebox">
        <table border="1" cellspacing="0" style="border-collapse:collapse;border:#ddd;">
          <tr>
            <th>系统设置</th>
          </tr>
          <tr>
            <td class="ltd">微信设置</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='txConfig' false-label='txConfig1a'>编辑设置</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">广告设置</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='advertList' false-label='advertList1a'>广告列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='advertAdd' false-label='advertAdd1a'>编辑广告</el-checkbox>
              <el-checkbox @change="xzchange" true-label='advertDel' false-label='advertDel1a'>删除广告</el-checkbox>
            </td>
          </tr>
          <tr>
            <td class="ltd">关于我们</td>
            <td class="rtd">
              <el-checkbox @change="xzchange" true-label='documentList' false-label='documentList1a'>文档列表</el-checkbox>
              <el-checkbox @change="xzchange" true-label='documentAdd' false-label='documentAdd1a'>编辑文档</el-checkbox>
              <el-checkbox @change="xzchange" true-label='documentDel' false-label='documentDel1a'>删除文档</el-checkbox>
            </td>
          </tr>
        </table>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  import { permissionGet } from '../../api/api';
  import { rolePost } from '../../api/api';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {

        list:[],

        newrole:{
          name:'',
        },
        rules: {
          name: [{required: true, trigger: 'blur',message: '请输入角色名'}]
        },
        options: [],
        checkedlist:[],

        // checkedlist:[
        // 'storeCategoryList',
        // 'storeCategoryAdd',
        // 'storeCategoryDel',
        // 'settleList',
        // 'settleCheck',
        // 'storeList',
        // 'myStore',
        // 'productTypeList',
        // 'productTypeAdd',
        // 'productTypeDel',
        // 'productCategoryList',
        // 'productCategoryAdd',
        // 'productCategoryDel',
        // 'productListAll',
        // 'productListStore',
        // 'productReview',
        // 'productShelf',
        // 'productAdd',
        // 'productSoftDel',
        // 'productDel',
        // 'orderListAll',
        // 'orderListStore',
        // 'orderListDo',
        // 'refuseListAll',
        // 'refuseListStore',
        // 'refuseDo',
        // 'expressConfig',
        // 'expressList',
        // 'expressAdd',
        // 'expressDel',
        // 'proxyApplyList',
        // 'proxyApplyCheck',
        // 'proxyList',
        // 'brokerageList',
        // 'withdrawList',
        // 'withdrawCheck',
        // 'storeCardPromotions',
        // 'addCardPromotion',
        // 'delCardPromotion',
        // 'checkCardPromotions',
        // 'modifyCardPromotion',
        // 'checkCardPromotion',
        // 'delCardPromotion',
        // 'allCardPromotions',
        // 'enableCardPromotion',
        // 'delCardPromotion',
        // 'hotCardPromotion',
        // 'addDefaultCards',
        // 'storeBargainPromotions',
        // 'addBargainPromotion',
        // 'delBargainPromotion',
        // 'checkBargainPromotions',
        // 'modifyBargainPromotion',
        // 'checkBargainPromotion',
        // 'delBargainPromotion',
        // 'allBargainPromotions',
        // 'enableBargainPromotion',
        // 'delBargainPromotion',
        // 'hotBargainPromotion',
        // 'userList',
        // 'setMember',
        // 'adminList',
        // 'adminAdd',
        // 'advertDel',
        // 'roleList',
        // 'roleAdd',
        // 'roleDel',
        // 'memberList',
        // 'setMember',
        // 'memberLevelList',
        // 'addMemberLevel',
        // 'delMemberLevel',
        // 'memberRecords',
        // 'txConfig',
        // 'advertList',
        // 'advertAdd',
        // 'advertDel',
        // 'documentList',
        // 'documentAdd',
        // 'documentDel',
        // ],
        editId:'',

      };
    },

    methods:{
      getname(){
        var rolename=sessionStorage.getItem('roleeditname')
        if(rolename){
          this.newrole.name=rolename
          sessionStorage.removeItem('roleeditname')
        }else{

        }
      },

      getpermission(){
        var allParams = '';
        permissionGet(allParams).then((res) => {
          this.options=res.data;
        });
      },

      xzchange(val){
        var arr =this.checkedlist;

        var item =val.split('1')

        if(item[1]=='a'){
          arr.splice(arr.indexOf(item[0]),1)
        }else{
          arr.push(item[0])
        }
        console.log(this.checkedlist)
      },

      save(){
        console.log(this.checkedlist)
        this.$refs.newrole.validate((valid) => {
          if (valid) {

            if(this.checkedlist.indexOf('productListAll')!== -1 && this.checkedlist.indexOf('productListStore')!== -1){
              Message({
                message: "商品列表(所有)和商品列表(商铺)只能选一个",
                type: 'error'
              });
              return
            }else if(this.checkedlist.indexOf('orderListAll')!== -1 && this.checkedlist.indexOf('orderListStore')!== -1){
              Message({
                message: "订单列表(所有)和订单列表(商铺)只能选一个",
                type: 'error'
              });
              return
            }else if(this.checkedlist.indexOf('refuseListAll')!== -1 && this.checkedlist.indexOf('refuseListStore')!== -1){
              Message({
                message: "退款列表(所有)和退款列表(商铺)只能选一个",
                type: 'error'
              });
              return
            }

            var id = sessionStorage.getItem('roleeditId')
            sessionStorage.removeItem('roleeditId')

            if(id){
              var allParams = {
                id:id,
                name:this.newrole.name,
                display_name:this.newrole.name,
                permissions:this.checkedlist
              }
            }else{
              var allParams = {
                name:this.newrole.name,
                display_name:this.newrole.name,
                permissions:this.checkedlist
              }
            }

            console.log(allParams)

            rolePost(allParams).then((res) => {
              if (res.msg === "ok") {
               this.$message({
                message: '提交成功',
                type: 'success'
              });
               this.$router.push('/Role/Rolelist');
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

    },

    mounted: function () {
      this.getpermission();
      this.getname()
    }
  }
</script>


<style scoped>
.el-checkbox{
  margin: 0 30px 0 0!important;
}
.tablebox{
  /*width: 1000px;*/
  margin:20px 0 0 80px;
}
.tablebox table{

}
.tablebox table th{
  background-color: #eef1f6;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  font-size: 14px;
  text-align:center; 
}
.tablebox table td{
  height: 30px;
  padding-left: 10px;
  line-height: 30px;
}
.ltd{
  text-align:center; 
  width: 150px;
  font-size: 14px;
}
.rtd{
  width: 700px;
}
</style>
