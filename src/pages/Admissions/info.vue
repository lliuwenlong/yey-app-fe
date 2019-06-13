<template>
    <div>
        <Head title="添加学生" right="保存" @click-right="onClickRight"/>
        <div class="app-container">
            <div>
                <van-cell-group title>
                    <van-field
                        label="信息来源"
                        v-model="params.source"
                        :readonly="true"
                        @click="messageF=true"
                        placeholder="信息来源"
                    />
                    <van-picker
                        :columns="message"
                        value-key="name"
                        show-toolbar
                        class="Fb"
                        v-show="messageF"
                        @cancel="messageF=false"
                        @confirm="res=>{
                            params.source=res.name;
                            params.source_id=res.id;
                            messageF=false;
                            params={...params};
                        }"
                    />
                </van-cell-group>
                <van-cell-group v-for="(v,i) in params.cost" :key="i" :title="v.name">
                    <van-field :label="v.name" v-model="v.money" :placeholder="`请填写${v.name}`"/>
                    <van-field
                        :label="'缴费周期'+(v.id==2?'(天)':'(月)')"
                        :readonly="true"
                        :placeholder="1"
                    />
                </van-cell-group>
                <van-cell-group title="家长信息">
                    <van-field label="姓名" placeholder="请填写姓名" v-model="params.family_name"/>
                    <van-field label="学生关系" placeholder="请填写学生关系" v-model="params.relation"/>
                    <van-field label="单位" placeholder="请填写单位" v-model="params.unit"/>
                    <van-field label="学历" placeholder="请填写学历" v-model="params.xueli"/>
                    <van-field label="电话" placeholder="请填写电话" v-model="params.tel"/>
                    <van-field label="微信" placeholder="请填写微信" v-model="params.wechat"/>
                </van-cell-group>
                <van-cell-group title="学生信息">
                    <van-field label="姓名" placeholder="请填写姓名" v-model="params.name"/>
                    <van-field
                        label="性别"
                        placeholder="请选择性别"
                        v-model="params.sexName"
                        :readonly="true"
                        @click="sexF=true"
                    />
                    <van-picker
                        :columns="[{id:1,name:'男'},{id:0,name:'女'}]"
                        value-key="name"
                        show-toolbar
                        class="Fb"
                        v-show="sexF"
                        @cancel="sexF=false"
                        @confirm="res=>{
                            params.sexName=res.name;
                            params.sex=res.id;
                            sexF=false;
                            params={...params};
                        }"
                    />
                    <van-field label="出生日期" placeholder="请填写出生日期" v-model="params.birthday"/>
                    <van-field label="籍贯" placeholder="请填写籍贯" v-model="params.place"/>
                    <van-field label="家庭住址" placeholder="请填写家庭住址" v-model="params.home"/>
                    <van-field label="曾在园所" placeholder="请填写家庭住址" v-model="params.once_garden"/>
                </van-cell-group>
                <van-cell-group style="margin-top: 10px;">
                    <van-field
                        label="学生状态"
                        v-model="params.stateName"
                        :readonly="true"
                        @click="stateF=true"
                        placeholder="学生状态"
                    />
                    <van-picker
                        :columns="[{id:1,name:'借读'},{id:0,name:'试园'}]"
                        value-key="name"
                        show-toolbar
                        class="Fb"
                        v-show="stateF"
                        @cancel="stateF=false"
                        @confirm="res=>{
                            params.stateName=res.name;
                            params.state=res.id;
                            stateF=false;
                            params={...params};
                        }"
                    />
                </van-cell-group>
                <van-cell-group title="学生所属">
                    <van-field
                        label="园所"
                        v-model="params.gardenName"
                        :readonly="true"
                        @click="parkF=true"
                        placeholder="园所"
                    />
                    <van-picker
                        :columns="parkList"
                        value-key="name"
                        show-toolbar
                        class="Fb"
                        v-show="parkF"
                        @cancel="parkF=false"
                        @confirm="res=>{
                            params.gardenName=res.name;
                            params.garden_id=res.id;
                            parkF=false;
                            params={...params};
                            gardenChage();
                        }"
                    />
                    <van-field
                        label="分配班级"
                        v-model="params.className"
                        :readonly="true"
                        @click="classF=true"
                        placeholder="分配班级"
                    />
                    <van-picker
                        :columns="classList"
                        value-key="name"
                        show-toolbar
                        class="Fb"
                        v-show="classF"
                        @cancel="classF=false"
                        @confirm="res=>{
                            params.className=res.name;
                            params.class_id=res.id;
                            classF=false;
                            params={...params};
                            classChage(res.id);
                        }"
                    />
                    <van-field
                        label="招生老师"
                        v-model="params.teachName"
                        placeholder="招生老师"
                        :readonly="true"
                        @click="teachF=true"
                    />
                    <van-picker
                        :columns="techangListII"
                        value-key="staff_name"
                        show-toolbar
                        class="Fb"
                        v-show="teachF"
                        @cancel="teachF=false"
                        @confirm="res=>{
                            params.teachName=res.staff_name;
                            params.teach_id=res.staff_id;
                            teachF=false;
                            params={...params};
                        }"
                    />
                </van-cell-group>
                <van-cell-group style="margin-top: 10px">
                    <van-field label="生活描述" placeholder="生活描述" v-model="params.life_desc"/>
                    <van-field label="兴趣爱好" placeholder="兴趣爱好" v-model="params.hobby"/>
                    <van-field
                        label="特长学习"
                        placeholder="特长学习"
                        v-model="params.teName"
                        :readonly="true"
                        @click="teF=true"
                    />
                    <van-popup
                        v-model="teF"
                        position="bottom"
                        :overlay="true"
                        style="height: 300px;"
                    >
                        <div>
                            <van-checkbox-group v-model="params.te_id">
                                <van-cell v-for="(item, key) in techangList" :key="key">
                                    <van-checkbox
                                        :key="item.id"
                                        :name="item.id"
                                    >{{ item.name }}</van-checkbox>
                                </van-cell>
                            </van-checkbox-group>
                        </div>
                    </van-popup>
                    <van-field label="健康状况" placeholder="健康状况" v-model="params.health_desc"/>
                    <van-field
                        label="接送方式"
                        v-model="params.jie_stateName"
                        :readonly="true"
                        @click="jie_stateF=true"
                        placeholder="接送方式"
                    />
                    <van-picker
                        :columns="[{id: 0, name: '校车'}, {id: 1, name: '自行接送'}]"
                        value-key="name"
                        show-toolbar
                        class="Fb"
                        v-show="jie_stateF"
                        @cancel="jie_stateF=false"
                        @confirm="res=>{
                            params.jie_stateName=res.name;
                            params.jie_state=res.id;
                            jie_stateF=false;
                            params={...params};
                        }"
                    />
                    <van-field label="其他备注" placeholder="其他备注" v-model="params.other_desc"/>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>
<script>
import Head from "@/components/Header.vue";
import { Dialog } from 'vant';

export default {
    components: {
        Head
    },
    data() {
        return {
            params: this.$route.query.data ? JSON.parse(this.$route.query.data) : {},
            message: [],
            messageF: false,
            sexF: false,
            stateF: false,
            parkList: [],
            parkF: false,
            classF: false,
            classList: [],
            techangList: [],
            RetreatGarden: [],
            teachF: false,
            techangListII: [],
            teF: false,
            jie_stateF: false
        };
    },
    created() {
        this.axios
            .post("/student/garden", {
                gardenid: this.$store.state.user.staffId
            })
            .then(res => {
                this.message = res.data.data.message;
                this.parkList = res.data.data.park;
            });
        this.axios.post("/Money/getCost").then(res => {
            this.params.cost = res.data.data.filter(v => {
                return v.status == 1;
            });
            this.params = { ...this.params };
        });
    },
    methods: {
        gardenChage() {
            this.params = {
                ...this.params,
                teach_id: "",
                class_id: ""
            };
            this.techangListII = [];
            this.axios
                .post("/student/garden", {
                    gardenid: this.$store.state.user.staffId,
                    classid: this.params.garden_id
                })
                .then(res => {
                    this.techangList = res.data.data.techang;
                    this.classList = res.data.data.class;
                });
            this.axios
                .post("/Student/showRetreatGardenReason", {
                    gardenId: this.params.garden_id
                })
                .then(res => {
                    this.RetreatGarden = res.data.data;
                });
        },
        classChage(value) {
            this.params = {
                ...this.params,
                teach_id: ""
            };
            this.axios
                .post("/Student/teachershow", { class_id: value })
                .then(res => {
                    this.techangListII = [...res.data.data];
                });
        },
        onClickRight() {
            const {
                family_name,
                relation,
                tel,
                name,
                sex,
                birthday,
                home,
                class_id,
                garden_id,
                jie_state,
                cost,
                source_id,
                teach_id
            } = this.params;
            console.log(family_name,
                relation,
                tel,
                name,
                sex,
                birthday,
                home,
                class_id,
                garden_id,
                jie_state,
                cost,
                source_id,
                teach_id);
            if (
                (family_name &&
                    relation &&
                    tel &&
                    name &&
                    sex &&
                    birthday &&
                    home &&
                    class_id &&
                    garden_id &&
                    jie_state &&
                    cost[0].money &&
                    cost[1].money &&
                    teach_id &&
                source_id)
            ) {
            } else {
                Dialog(
                    {
                       message: "请检查必填项(信息来源、托儿费、伙食费、家长姓名、学生关系、家长电话、学生姓名、学生性别、学生出生日期、学生家庭住址，所属园所、分配班级、招生老师，接送方式)"
                    }
                );
                return;
            }
            delete this.params.id;
            this.axios.post("/student/student_add", {
                ...this.params,
                ji_id: this.$store.state.user.userInfo.jiId
            }).then(res => {
                if (res.data.state == 1) {
                    this.$message({
                        type: "success",
                        message: "添加成功"
                    });
                    this.$router.go("-1");
                    this.axios
                        .post("/student/source_del", {
                            studentid: this.$route.query.data.id
                        })
                        .then(res => {});
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.app-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 46px;
    padding: 0;
    margin: 0;
    overflow: auto;
}
</style>
