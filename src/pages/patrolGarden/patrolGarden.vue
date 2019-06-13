<template>
    <div class="patrolGarden">
        <Head title="督导日志"/>
        <!-- <Fil :types="['park','class']"/> -->
        <div v-if="userInfo.roleStatus == 4 ">
            <van-cell :title="v.name" is-link v-for="(v,i) in list" :key="i" @click="go(v.id)" v-show="v.id == userInfo.garden_id "/>
        </div>
        <div v-else>
            <van-cell :title="v.name" is-link v-for="(v,i) in list" :key="i" @click="go(v.id)"/>
        </div>
    </div>
</template>

<script>
import Fil from "@/components/Filter.vue";
import Head from "@/components/Header.vue";
import { mapState } from "vuex";
export default {
    components: {
        Head,
        Fil
    },
    data() {
        return {
            list: []
        };
    },
    computed: {
        ...mapState("user", ["userInfo"])
    },
    methods: {
        go(id) {
            this.$router.push({
                path: "patrolGardenList",
                query: {
                    id
                }
            });
        }
    },
    created() {
        this.axios
            .post("/Staff/organization_status", {
                status: 1,
                p_id: this.$store.state.user.userInfo.jiId
            })
            .then(res => {
                this.list = res.data.data;
            });
    }
};
</script>

<style>
</style>
