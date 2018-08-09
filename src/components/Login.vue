<template>
  <div>
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin()"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleLogin()" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>

    <canvas id="canvas"></canvas>

  </div>
</template>

<script>

  import { requestLogin } from '../api/api';

  export default {
    data() {
      return {
        logining: false,
        account: {
          // username: 'admin',
          // pwd: '123456'
          username: '',
          pwd: ''
        },
        rules: {
          username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
      };
    },
    props: {
      dotsNum: {
        type: Number,
        default: 0
      },
      isColor: {
        type: Boolean,
        default: true
      },
      roundColor: {
        type: String,
        default: "#999"
      },
      lineColor: {
        type: String,
        default: "#ccc"
      }
    },

    methods: {

      handleLogin() {
        var that =this;
        that.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            var aaaa = { username: that.account.username, password: that.account.pwd };
            requestLogin(aaaa).then(res => {
              // let { msg, data } = res;
              if (res.msg == "ok") {

                sessionStorage.setItem('permissions', JSON.stringify(res.data.role.permissions));
                sessionStorage.setItem('username', JSON.stringify(res.data.name));

                that.$router.push('/index/Console');
              } else {
               that.$message({
                message: res.msg,
                type: 'error'
              });
             }
           });
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted(){
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const rndCl = () => Math.floor(Math.random() * 225);
      const width = window.innerWidth;
      const height = window.innerHeight;
      var base_list = [];
      canvas.width = width;
      canvas.height = height;
        // 绘制
        const drawRounds = (obj, index) => {
          let { x, y, r, color } = obj;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          if (this.isColor) {
            ctx.fillStyle = color;
          } else {
            ctx.fillStyle = this.roundColor
          }
          ctx.fill();
          ctx.closePath();
        }
        //判断移动方向
        const controlDirection = (obj) => {
          if (obj.x >= (width - obj.r)) {
            obj.controlX = "left";
          } else if (obj.x <= parseInt(obj.r / 2)) {
            obj.controlX = "right";
          }
          if (obj.y >= (height - obj.r)) {
            obj.controlY = "bottom";
          } else if (obj.y <= parseInt(obj.r / 2)) {
            obj.controlY = "top"
          }
          return obj
        }
        //划线
        const drawLine = (list) => {
          list.map((item, index) => {
                // console.log("item:", item);
                ctx.beginPath();
                ctx.moveTo(item.x1, item.y1);
                ctx.lineTo(item.x2, item.y2);
                ctx.LineWeight = 1;
                if (this.isColor) {
                  ctx.strokeStyle = item.color;
                } else {
                  ctx.strokeStyle = this.lineColor
                }
                ctx.stroke();
                ctx.closePath();
              })
        }
        //绘制
        const draw = (list) => {
          let dots_arr = [];
          let line_arr = [];
          list.map((item, index) => {
            let xy = controlDirection(item);
            let obj = roundMove(xy);
            dots_arr.push(obj);
          });
          dots_arr.map((item1, index1) => {
            dots_arr.map((item2, index2) => {
              if (item1 !== item2) {
                let x = item1.x - item2.x;
                let y = item1.y - item2.y;
                if (Math.abs(x) < 150 && Math.abs(y) < 150) {
                  let obj = {
                    x1: item1.x,
                    y1: item1.y,
                    x2: item2.x,
                    y2: item2.y,
                    color: item1.color
                  }
                  line_arr.push(obj)
                }
              }
            })
          })
          drawLine(line_arr);
          dots_arr.map((item, index) => {
            drawRounds(item, index)
          })
          base_list = dots_arr;
          setTimeout(() => {
                // if(this.paused){
                  reDraw()
                // }
              }, 50)
        }
        const reDraw = () => {
          ctx.clearRect(0, 0, width, height);
          draw(base_list)
        }
        //移动
        const roundMove = (obj) => {
          switch (obj.controlX) {
            case "right":
            obj.x++;
            break;
            case "left":
            obj.x--;
            break;
            default:
          }
          switch (obj.controlY) {
            case "top":
            obj.y++;
            break;
            case "bottom":
            obj.y--;
            break;
            default:
          }
          return obj
        }
        //创造圆点
        const creatDots = () => {
          let arr = [];
          for (let i = 0; i < this.dotsNum; i++) {
            let obj = {};
            obj.x = parseInt(Math.random() * width);
            obj.y = parseInt(Math.random() * height);
            obj.r = parseInt(Math.random() * 10);
            obj.controlX = parseInt(Math.random() * 10) > 5 ? "left" : "right"
            obj.controlY = parseInt(Math.random() * 10) > 5 ? "bottom" : "top"
            obj.color = `rgba(${rndCl()},${rndCl()},${rndCl()},.3)`
            arr.push(obj)
          }
          return arr
        }
        draw(creatDots())
        //鼠标移动
        const moveXY = (event) => {
          let obj = {};
          obj.x = event.clientX;
          obj.y = event.clientY;
          obj.r = 0;
          base_list[0] = obj;
          base_list[0]["r"] = 1;
        }
        //鼠标点击
        const addXY = (event) => {
          let obj = {};
          obj.x = event.clientX;
          obj.y = event.clientY;
          obj.r = parseInt(Math.random() * 10);
          obj.color = `rgba(${rndCl()},${rndCl()},${rndCl()},.3)`;
          obj.controlX = parseInt(Math.random() * 10) > 5 ? 'left' : 'right'
          obj.controlY = parseInt(Math.random() * 10) > 5 ? 'bottom' : 'top'
          base_list.push(obj);
        }
        window.addEventListener("mousemove", moveXY);
        window.addEventListener("click", addXY)
      }
    }

  </script>


  <style>
  body{
/*    background: url(../../static/images/gold.jpg);
    background-size:cover;
    background-repeat:no-repeat;*/
    background-color: #373d41;
  }
</style>

<style scoped>
#canvas{
  position: fixed;
  z-index: -999999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}


.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  /*box-shadow: 0 0 15px #aaa;*/
  background: -ms-linear-gradient(top, #fff, #6495ed);
  background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);
  background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));
  background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);
  background: -o-linear-gradient(top, #fff, #6495ed);
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

html,body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.container{
  width: 100％;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #000000;
}
</style>
