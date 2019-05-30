<!-- 添加学生 -->
<template>
    <div class='content'>
      <Head title="添加学生" />
      <el-form label-width="90px" size="mini" style='margin-top:10px;'>
        <el-form-item label="信息来源：">
          <el-radio-group v-model="params.source_id">
            <el-radio v-for="(v,i) in message" :key="i" :label="v.id+''">{{v.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收费标准：">
          <el-form inline size="mini">
            <el-form-item label="托费标准">
              <el-input v-model="params.tuo"></el-input>
            </el-form-item>
            <el-form-item label="缴费周期">
              <el-input v-model="params.tuo_zhou"></el-input>
            </el-form-item>
          </el-form>
          <el-form inline size="mini">
            <el-form-item label="餐费标准">
              <el-input v-model="params.can"></el-input>
            </el-form-item>
            <el-form-item label="缴费周期">
              <el-input v-model="params.can_zhou"></el-input>
            </el-form-item>
          </el-form>
          <el-form inline size="mini">
            <el-form-item label="校车标准">
              <el-input v-model="params.xiao"></el-input>
            </el-form-item>
            <el-form-item label="缴费周期">
              <el-input v-model="params.xiao_zhou"></el-input>
            </el-form-item>
          </el-form>
          <el-form inline size="mini">
            <el-form-item label="其他标准">
              <el-input v-model="params.qi"></el-input>
            </el-form-item>
            <el-form-item label="缴费周期">
              <el-input v-model="params.qi_zhou"></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="家长信息：">
            <el-form inline size="mini">
                <el-form-item label="姓名">
                    <el-input v-model="params.family_name"/>
                </el-form-item>
                <el-form-item label="关系">
                    <el-input v-model="params.relation"/>
                </el-form-item>
                <el-form-item label="单位" >
                    <el-input v-model="params.unit"/>
                </el-form-item>
                <el-form-item label="学历">
                    <el-input v-model="params.xueli"/>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="params.tel"/>
                </el-form-item>
                <el-form-item label="微信">
                    <el-input v-model="params.wechat"/>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="学生信息：">
            <el-form inline size="mini">
                <el-form-item label="姓名">
                    <el-input v-model="params.name"/>
                </el-form-item>
                <el-form-item label="性别" width='80px'>
                    <el-select v-model="params.sex">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-input v-model="params.birthday"/>
                </el-form-item>
                <el-form-item label="籍贯">
                    <el-input v-model="params.place"/>
                </el-form-item>
                <el-form-item label="家庭住址">
                    <el-input v-model="params.home"/>
                </el-form-item>
                <el-form-item label="曾在园所">
                    <el-input v-model="params.once_garden"/>
                </el-form-item>
            </el-form>
        </el-form-item>

        <el-form-item label="学生状态：">
          <el-radio-group v-model="params.state">
            <el-radio label="0">试园</el-radio>
            <el-radio label="1">借读</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属：">
          <el-form size="mini" inline>
            <el-form-item label="招生老师">
              <el-input v-model="params.zhaoteacher"/>
            </el-form-item>
            <el-form-item label="园所">
              <el-select v-model="params.garden_id" @change="ParkSel">
                <el-option v-for="(v,i) in parkList" :key="i" :label="v.name" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分配班级">
              <el-select v-model="params.class_id">
                <el-option v-for="(v,i) in classList" :key="i" :label="v.name" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="生活描述：">
          <el-input type="textarea" v-model="params.life_desc"/>
        </el-form-item>
        <el-form-item label="兴趣爱好：">
          <el-input type="textarea" v-model="params.hobby"/>
        </el-form-item>
        <el-form-item label="特长学习：">
          <el-select v-model="params.te_id">
            <el-option v-for="(v,i) in techangList" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康状况：">
          <el-input type="textarea" v-model="params.health_desc"/>
        </el-form-item>
        <el-form-item label="接送方式：">
          <el-radio-group v-model="params.jie_state">
            <el-radio label="0">校车</el-radio>
            <el-radio label="1">自行接送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退园原因：">
          <el-input type="textarea" v-model="params.backgarden"/>
        </el-form-item>
        <el-form-item label="其他备注：">
          <el-input type="textarea" v-model="params.other_desc"/>
        </el-form-item>
      </el-form>
      <el-button class="upBtn" style='margin: 0 auto ;display:block;' type="primary" @click="addFn">提 交</el-button>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from '@/components/Header.vue'
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
        Head
    },
    data() {
        //这里存放数据
        return {
            message: [],
            params: {
                source_id: ""
            },
            classList: [],
            parkList: [],
            techangList: []
        };
    },
    //方法集合
    methods: {
        ParkSel(a) {
            console.log(this.$store.state.user)
            this.axios
                .post("/student/garden", {
                  gardenid: this.$store.state.user.userInfo.jiId,
                  classid: this.params.garden_id
                })
                .then(res => {
                    console.log(res.data)
                    this.techangList = res.data.data.techang;
                    this.classList = res.data.data.class;
                });
            },
            addFn() {
              this.axios.post("/student/student_up", this.params).then(res => {
                  this.$message({
                  type: "success",
                  message: res.data.msg
                  });
              });
            }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.axios.post("/student/garden", {
            gardenid: this.$store.state.user.userInfo.jiId
        })
        .then(res => {
            this.parkList = res.data.data.park;
        });
        this.axios.post("/student/garden").then(res => {
            this.message = res.data.data.message;
        });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.content{
    background-color:white;
}
</style>