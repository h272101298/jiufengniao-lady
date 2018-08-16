<template>
 <el-row class="warp" style="padding:20px 0 0 20px;">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>微信设置</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>


  <el-col :span="24" class="warp-main">
    <el-row>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="签到设置" name="list">

          <el-form ref="signset" :model="signset" label-width="160px" class="form" status-icon size="small" style="width:600px;" :rules="signrule">

            <el-form-item label="连续签到1天奖励：" prop="onnum">
              <el-input class="numinput" placeholder="请输入奖励数量" v-model="signset.onnum" v-show="show" ><template slot="append">积分</template></el-input>
              <!-- <el-radio-group v-model="signset.ontype" size="small" class="mt5" v-show="show" >
                <el-radio-button label="积分"></el-radio-button>
                <el-radio-button label="零钱"></el-radio-button>
              </el-radio-group> -->
              <div v-show="set" class="showlabel">
                <label v-show="set">{{signdata[0].reward}}积分</label>
                <!--<label v-show="set">{{signdata[0].type==1?'积分':'零钱'}}</label> -->
              </div>
            </el-form-item>

            <el-form-item label="连续签到2天奖励：" prop="twnum">
              <el-input class="numinput" placeholder="请输入奖励数量" v-model="signset.twnum" v-show="show" ><template slot="append">积分</template></el-input>
<!--               <el-radio-group v-model="signset.twtype" size="small" class="mt5" v-show="show">
                <el-radio-button label="积分"></el-radio-button>
                <el-radio-button label="零钱"></el-radio-button>
              </el-radio-group> -->
              <div v-show="set" class="showlabel">
                <label v-show="set">{{signdata[1].reward}}积分</label>
                <!-- <label v-show="set">{{signdata[1].type==1?'积分':'零钱'}}</label> -->
              </div>
            </el-form-item>

            <el-form-item label="连续签到3天奖励：" prop="trnum">
              <el-input class="numinput" placeholder="请输入奖励数量" v-model="signset.trnum" v-show="show" ><template slot="append">积分</template></el-input>
<!--               <el-radio-group v-model="signset.trtype" size="small" class="mt5" v-show="show">
                <el-radio-button label="积分"></el-radio-button>
                <el-radio-button label="零钱"></el-radio-button>
              </el-radio-group> -->
              <div v-show="set" class="showlabel">
                <label v-show="set">{{signdata[2].reward}}积分</label>
                <!-- <label v-show="set">{{signdata[2].type==1?'积分':'零钱'}}</label> -->
              </div>
            </el-form-item>

            <el-form-item label="连续签到4天奖励：" prop="fonum">
              <el-input class="numinput" placeholder="请输入奖励数量" v-model="signset.fonum" v-show="show" ><template slot="append">积分</template></el-input>
<!--               <el-radio-group v-model="signset.fotype" size="small" class="mt5" v-show="show">
                <el-radio-button label="积分"></el-radio-button>
                <el-radio-button label="零钱"></el-radio-button>
              </el-radio-group> -->
              <div v-show="set" class="showlabel">
                <label v-show="set">{{signdata[3].reward}}积分</label>
                <!-- <label v-show="set">{{signdata[3].type==1?'积分':'零钱'}}</label> -->
              </div>
            </el-form-item>

            <el-form-item label="连续签到5天奖励：" prop="finum">
              <el-input class="numinput" placeholder="请输入奖励数量" v-model="signset.finum" v-show="show" ><template slot="append">积分</template></el-input>
<!--               <el-radio-group v-model="signset.fitype" size="small" class="mt5" v-show="show">
                <el-radio-button label="积分"></el-radio-button>
                <el-radio-button label="零钱"></el-radio-button>
              </el-radio-group> -->
              <div v-show="set" class="showlabel">
                <label v-show="set">{{signdata[4].reward}}积分</label>
                <!-- <label v-show="set">{{signdata[4].type==1?'积分':'零钱'}}</label> -->
              </div>
            </el-form-item>

            <el-form-item label="连续签到6天奖励：" prop="sinum">
              <el-input class="numinput" placeholder="请输入奖励数量" v-model="signset.sinum" v-show="show" ><template slot="append">积分</template></el-input>
<!--               <el-radio-group v-model="signset.sitype" size="small" class="mt5" v-show="show">
                <el-radio-button label="积分"></el-radio-button>
                <el-radio-button label="零钱"></el-radio-button>
              </el-radio-group> -->
              <div v-show="set" class="showlabel">
                <label v-show="set">{{signdata[5].reward}}积分</label>
                <!-- <label v-show="set">{{signdata[5].type==1?'积分':'零钱'}}</label> -->
              </div>
            </el-form-item>

            <el-form-item label="连续签到7天奖励：" prop="senum">
              <el-input class="numinput" placeholder="请输入奖励数量" v-model="signset.senum" v-show="show"><template slot="append">积分</template></el-input>
<!--               <el-radio-group v-model="signset.setype" size="small" class="mt5" v-show="show">
                <el-radio-button label="积分"></el-radio-button>
                <el-radio-button label="零钱"></el-radio-button>
              </el-radio-group> -->
              <div v-show="set" class="showlabel">
                <label v-show="set">{{signdata[6].reward}}积分</label>
                <!-- <label v-show="set">{{signdata[6].type==1?'积分':'零钱'}}</label> -->
              </div>
            </el-form-item>

            <el-form-item>
              <el-button v-if="set" size="small" type="primary" style="margin-left:0px;margin-top:20px;" @click="changebase" >编辑</el-button>
              <el-button v-if="show" size="small" type="primary" style="margin-left:0px;margin-top:20px;" @click="confirm">提交</el-button>
              <el-button v-if="show" size="small" @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>



        <!-- <el-tab-pane label="积分设置" name="config">
          <el-form ref="modeldata" :model="modeldata" label-width="160px" class="form" status-icon size="small" style="width:600px;">
            <el-form-item label="兑换比例：" prop="collage_notify">
              <el-input placeholder="请输入兑换比例" v-show="modelshow">
                <div id="bgw1" slot="prepend">积分：零钱</div>
                <div id="bgw2" slot="append">：1</div>
              </el-input>
              <div class="showlabel" v-show="modelset">
                <label>20：1</label>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button v-if="modelset" size="small" type="primary" style="margin-top:20px;" @click="changemodel">编辑</el-button>
              <el-button v-if="modelshow" size="small" type="primary" style="margin-top:20px;" @click="postmodel">提交</el-button>
              <el-button v-if="modelshow" size="small" @click="cancelmodel">取消</el-button>     
            </el-form-item>
          </el-form>
        </el-tab-pane> -->
      </el-tabs>

    </el-row>
  </el-col>


</el-row>
</template>



<script>


  import { signPost } from '../../api/api';
  import { signGet } from '../../api/api';
  // import { wxmodelPost } from '../../api/api';
  // import { wxmodelGet } from '../../api/api';

  import { Message } from 'element-ui';

  export default {
    data() {

      var checkvalue = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('此项不能为空'));
        }
        setTimeout(() => {
          if (Math.sign(value) == 1) {
              //  if(value%1 === 0){
              //   callback();
              // }else{
                callback();
             // }
           } else if(Math.sign(value) == 0) {
             callback(new Error('不能为0'));
           } else if(Math.sign(value) == -1) {
            callback(new Error('请输入正数'));
          }else{
            callback(new Error('请输入数字'));
          }
        }, 100);
      };

      return {
        activeName:'list',

        show:false,
        set:true,

        signset:{
          onnum:'',
          ontype:'积分',
          twnum:'',
          twtype:'积分',
          trnum:'',
          trtype:'积分',
          fonum:'',
          fotype:'积分',
          finum:'',
          fitype:'积分',
          sinum:'',
          sitype:'积分',
          senum:'',
          setype:'积分',
        },

        signdata:[{
          reward:0,type:1
        },{
          reward:0,type:1
        },{
          reward:0,type:1
        },{
          reward:0,type:1
        },{
          reward:0,type:1
        },{
          reward:0,type:1
        },{
          reward:0,type:1
        },],

        signrule:{
          onnum:[{required: true, trigger: 'blur',validator: checkvalue}],
          twnum:[{required: true, trigger: 'blur',validator: checkvalue}],
          trnum:[{required: true, trigger: 'blur',validator: checkvalue}],
          fonum:[{required: true, trigger: 'blur',validator: checkvalue}],
          finum:[{required: true, trigger: 'blur',validator: checkvalue}],
          sinum:[{required: true, trigger: 'blur',validator: checkvalue}],
          senum:[{required: true, trigger: 'blur',validator: checkvalue}]
        },

        modelshow:false,
        modelset:true,
        modeldata:{

        },

      };
    },

    methods:{

      getsign(){
        var allParams = '';
        signGet(allParams).then((res) => {
          if(res.data==''){
            this.show=true
            this.set=false
          }else{
            this.signdata=res.data
          }
        });
      },

      changebase(){
        this.show=true
        this.set=false
      },


      confirm(){
        // console.log(this.signset)

        this.$refs.signset.validate((valid) => {
          if (valid) {

           if(this.signset.ontype=='积分'){var ontype=1}else{var ontype=2}
            if(this.signset.twtype=='积分'){var twtype=1}else{var twtype=2}
              if(this.signset.trtype=='积分'){var trtype=1}else{var trtype=2}
                if(this.signset.fotype=='积分'){var fotype=1}else{var fotype=2}
                  if(this.signset.fitype=='积分'){var fitype=1}else{var fitype=2}
                    if(this.signset.sitype=='积分'){var sitype=1}else{var sitype=2}
                      if(this.signset.setype=='积分'){var setype=1}else{var setype=2}

                        var allParams={
                          configs:[{days:1,type: ontype,reward:this.signset.onnum},
                          {days:2,type: twtype,reward:this.signset.twnum},
                          {days:3,type: trtype,reward:this.signset.trnum},
                          {days:4,type: fotype,reward:this.signset.fonum},
                          {days:5,type: fitype,reward:this.signset.finum},
                          {days:6,type: sitype,reward:this.signset.sinum},
                          {days:7,type: setype,reward:this.signset.senum}
                          ]
                        }
                        // console.log(allParams)
                        signPost(allParams).then((res) => {
                          // console.log(res)
                          if (res.msg === "ok") {
                           this.$message({
                            message: '提交成功',
                            type: 'success'
                          });
                           this.getsign()
                           this.show=false
                           this.set=true
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

      cancel(){
        this.show=false
        this.set=true
      },



      changemodel(){
        this.modelshow=true
        this.modelset=false
      },

      postmodel(){

      },

      cancelmodel(){
        this.modelshow=false
        this.modelset=true
      },
    },

    mounted: function(){
      this.getsign();

    }
  }
</script>

<style scoped>
.grey{
  color: #aaa;
  float: left;
}
.numinput{
  width: 320px;
}
.mt5{
  float: right;
}

.showlabel{
  width:320px;
  border-radius: 4px;
  border: 1px solid #409eff;
  padding-left: 8px;
}

#bgw1,#bgw2 {
  color: #000!important;
}

</style>