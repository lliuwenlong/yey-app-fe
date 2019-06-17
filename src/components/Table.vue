<template>
    <div class="table">
        <el-table
            ref="multipleTable"
            :data="dataList"
            border
            :show-summary="showSummary"
            @selection-change="handleSelectionChange"
        >
            <el-table-column v-if="isShowSelect" type="selection" width="55"></el-table-column>
            <el-table-column
                :label="v.label"
                :prop="v.data"
                :width="v.width"
                v-for="(v,i) in title"
                :key="i"
                :fixed="i<fixed"
            >
                <template slot-scope="scope">
                    <el-input
                        size="mini"
                        v-if="canEdit&&v.data.indexOf('_edit')!=-1"
                        @change="change(scope.row,scope.row[v.data],v.data)"
                        v-model="scope.row[v.data]"
                        style="width:50px"
                        maxlength="2"
                    />
                    <div v-else>
                        <span v-if="v.content" v-html="v.content(scope.row)"></span>
                        <span v-else v-html="scope.row[v.data]"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="button.filter(v=> v).length*72" v-if="button">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="emit(i,v,scope.row)"
                        v-for="(v,i) in button"
                        :key="i"
                        v-show="(typeof v === 'function' && v(scope.row))
            || (typeof v === 'string' && v)"
                    >{{typeof v === 'function' ? v(scope.row) : v}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="height: 50px;" v-if="list.length > pageSize">
            <el-pagination
                style="margin-top: 10px;float: right"
                background
                layout="prev, pager, next"
                :page-count="Math.ceil(list.length / pageSize)"
                @current-change="sizeChange"
                :current-page="curPage"
                :page-size="pageSize"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rowData: "",
            curPage: 1
        };
    },
    props: {
        fixed: {
            default: 0
        },
        canEdit: {
            default: false
        },
        pageSize: {
            type: Number,
            default: 10
        },
        list: {
            default: []
        },
        title: {
            default: []
        },
        button: {
            default() {
                return null;
            }
        },
        btnClick: {
            default() {
                return null;
            }
        },
        "show-summary": {
            default: false
        },
        isShowSelect: {
            default: false
        }
    },
    computed: {
        dataList() {
            // console.log(this.list.slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize))
            return this.list.slice(
                (this.curPage - 1) * this.pageSize,
                this.curPage * this.pageSize
            );
        }
    },
    methods: {
        emit(i, v, data) {
            if (this.btnClick[i]) this.btnClick[i](data);
            else alert(v);
        },
        change(data, num, label) {
            this.$emit("change", data, num, label);
        },
        handleSelectionChange(val) {
            this.$emit("handleSelectionChange", val, this.$refs.multipleTable);
        },
        sizeChange(val) {
            this.curPage = val;
        }
    },
    watch: {
        list() {
            this.curPage = 1;
        }
    }
};
</script>

<style lang="less">
.table {
    .cell {
        text-align: center !important;
    }
}
</style>