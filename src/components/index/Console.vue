<template>
  <div>

    <!-- <div class="chart" id="goodnum"></div> -->

    <el-row class="warp" style="padding:20px 0 0 20px;width:90%;">
      <el-col>

        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1" @click="gogood">
                <i class="el-icon-view grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{countdata.productCount}}</div>
                  <div>商品数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-5" @click="gogood">
                <i class="el-icon-message grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{countdata.reviewProductCount}}</div>
                  <div>待审核商品</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2" @click="goorder">
                <i class="el-icon-message grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{countdata.todayOrderCount}}</div>
                  <div>今日订单</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3" @click="goorder">
                <i class="el-icon-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{countdata.todaySalesCount}}</div>
                  <div>今日销量</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-4" @click="gouser">
                <i class="el-icon-view grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{countdata.todayUserCount}}</div>
                  <div>今日新增用户</div>
                </div>
              </div>
            </el-card>
          </el-col>
<!--           <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-5">
                <i class="el-icon-message grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{countdata.reviewProductCount}}</div>
                  <div>待审核商品</div>
                </div>
              </div>
            </el-card>
          </el-col> -->
<!--           <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-6">
                <i class="el-icon-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col> -->

        </el-row>



      </el-col>
    </el-row>

  </div>
</template>



<script>

  import echarts from 'echarts';

  import { countdataGet } from '../../api/api';

  export default {
    data() {
      return {
        countdata:{
          productCount:0,
          reviewProductCount:0,
          todayOrderCount:0,
          todaySalesCount:0,
          todayUserCount:0,
        }
      }
    },
    methods: {
      getdata(){
        var allParams = '';
        countdataGet(allParams).then((res) => {
            // console.log(res.data)
          this.countdata=res.data
        });
      },

      gogood(){
        this.$router.push('/Good/Goodlist');
      },

      goorder(){
        this.$router.push('/Order/Orderlist');
      },

      gouser(){
        this.$router.push('/User/Userlist');
      }
    },



    mounted: function () {
      this.getdata()
      // var mychart = echarts.init(document.getElementById("goodnum"));

      // mychart.setOption({
      //   title:{text:'111'},
      //   xAxis:{
      //     data:["衬衫","毛衣"]
      //   },
      //   yAxis:{},
      //   series:[{
      //     name:"销量",
      //     type: 'line',
      //     data:[5,20]
      //   }]
      // })
    }
  }
</script>

<style scoped>
/*.chart {
  width: 500px;
  height: 400px;
  }*/

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    margin-bottom: 20px;
  }
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }
  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }
  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }
  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }
  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }
  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }
  .grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
  }
  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }
  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .grid-con-4 .grid-con-icon {
    background: rgb(45, 140, 140);
  }
  .grid-con-4 .grid-num {
    color: rgb(45, 140, 140);
  }
  .grid-con-5 .grid-con-icon {
    background: rgb(100, 213, 214);
  }
  .grid-con-5 .grid-num {
    color: rgb(100, 213, 214);
  }
  .grid-con-6 .grid-con-icon {
    background: rgb(100, 94, 167);
  }
  .grid-con-6 .grid-num {
    color: rgb(100, 94, 167);
  }

</style>