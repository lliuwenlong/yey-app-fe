<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="less">
    html {
        background: #efefef;
        height: 100%;

    }
    body {
        height: 100%;
    }
    #app {
        height: 100%;
    }
    * {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
            "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    li {
        list-style: none;
    }

    .Tl {
        text-align: left;
    }

    .Tr {
        text-align: right;
    }

    .Tc {
        text-align: center;
    }
    .Fb {
        position: fixed !important;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 100;
    }
</style>
