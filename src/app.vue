<template>
    <div class="app-main">
        <transition name="fade-page">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        }
    };
</script>
<style lang="less">
    html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    pre {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    }
    ul {
        list-style: none;
    }
    pre {
        margin: 0;
        white-space: pre-wrap;
    }

    .gallery-background[lazy=loading] {
        background-color: #eee;
    }

    .fade-page-enter-active, .fade-page-leave-active {
        transition: opacity .5s;
    }

    .fade-page-enter, .fade-page-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .ivu-scroll-container {
        overflow-y: auto;
    }

    .ivu-select-dropdown {
        max-height: 300px;
    }

    .ivu-btn-text:focus {
        box-shadow: none;
    }

    .fs-square-img {
        position: relative;
        padding-top: 100%;
        width: 100%;
    }

    .fs-square-img img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .flex-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .app-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .no-result-block {
        margin-top: 88px;
        padding-bottom: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img {
            width: 300px;
        }
        .info {
            font-size: 18px;
            font-weight: 700;
        }
    }
</style>
