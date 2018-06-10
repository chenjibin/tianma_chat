<template>
    <div class="session-list-wrap">
        <ul class="session-list">
            <li class="item"
                v-for="(item, index) in listData"
                :key="'session-' + index"
                :class="{active: currentIndex === index}"
                @click.stop="_itemClickHandler(item, index)">
                <figure class="session-pic">
                    <img src="http://thirdwx.qlogo.cn/mmopen/wbKdib81ny68qicYuouHbWJn2UhiazycBuMqOibYHfmENL6C2dwicwU0Mf56iarnsXOQCljxZNFJ5bOVUeYMP2zyqvc2UD9SwXma2G/132"/>
                </figure>
                <span class="badge"><i class="count">1</i></span>
                <h3 class="desc nick">卍 安 稳 卍  第一大道8b-18 </h3>
                <pre class="desc">客户查看了: 自定义菜单</pre>
                <time class="time">09:11</time>
                <div class="close-session" title="退出接待" @click.stop="_quitSessionHandler" v-if="quitEnable">
                    <Icon type="ios-close" size="18"></Icon>
                </div>
            </li>
        </ul>
        <div class="load-more">
            <Button>加载更多</Button>
        </div>
    </div>
</template>
<style lang="less">
    .session-list-wrap {
        position: absolute;
        width: 100%;
        padding-bottom: 16px;
        top: 0;
        left: 0;
        bottom: 0;
        overflow-x: visible;
        overflow-y: auto;
        .load-more {
            padding-top: 20px;
            text-align: center;
        }
        .session-list {
            .item {
                min-height: 36px;
                padding: 17px 12px 17px 60px;
                position: relative;
                transition: background-color .2s linear;
                cursor: pointer;
                font-size: 12px;
                &.active {
                    background-color: #e5e5e5;
                }
                &:hover {
                    background-color: #e5e5e5;
                }
                &:hover .close-session {
                    display: inline-block;
                }
                .badge {
                    box-sizing: content-box;
                    display: inline-block;
                    position: absolute;
                    left: 8px;
                    z-index: 2;
                    padding: 2px;
                    min-width: 12px;
                    min-height: 12px;
                    line-height: 12px;
                    border-radius: 8px;
                    top: 12px;
                    color: #fff;
                    background-color: #f60;
                    text-align: center;
                    .count {
                        color: #fff;
                        display: inline-block;
                        font-style: normal;
                    }
                }
                .session-pic {
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    top: 16px;
                    left: 12px;
                    border-radius: 50%;
                    overflow: hidden;
                    display: inline-block;
                    img {
                        width: 40px;
                        height: 40px;
                    }
                }
                .desc {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 150px;
                    color: #999;
                    line-height: 18px;
                    &.nick {
                        font-size: 14px;
                        line-height: 20px;
                        color: #333;
                    }
                }
                .time {
                    position: absolute;
                    top: 16px;
                    right: 12px;
                    font-weight: 400;
                    color: #b1b1b1;
                }
                .close-session {
                    display: none;
                    position: absolute;
                    right: 6px;
                    top: 2px;
                    color: #999;
                    &:hover {
                        color: #343f4b;
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        props: {
            listData: {
                type: Array,
                default() {
                    return []
                }
            },
            quitEnable: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                currentIndex: null
            }
        },
        methods: {
            _itemClickHandler(item, index) {
                this.currentIndex = index;
                this.$emit('item-click', item)
            }
        }
    }
</script>
