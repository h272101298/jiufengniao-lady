<template>
  <div>

    <div class="chart" id="goodnum"></div>

  </div>
</template>

<style>
.chart {
  width: 500px;
 height: 400px;
}
</style>

<script>

  import echarts from 'echarts';

  export default {
    data() {
      return {


      }
    },
    methods: {

    },

    mounted: function () {
      var mychart = echarts.init(document.getElementById("goodnum"));

      mychart.setOption({
        title:{text:'111'},
        xAxis:{
          data:["衬衫","毛衣"]
        },
        yAxis:{},
        series:[{
          name:"销量",
          type: 'line',
          data:[5,20]
        }]
      })
    }
  }
</script>
