<template>
    <div class="messagebox-wrap">
        <div class="message-list-wrap" ref="listWrapper" @scroll="scrollHandler">
            <Spin size="large" fix v-if="isLoading"></Spin>
            <div class="message-list" ref="messageList" id="messageList">
                <div class="no-more-record" v-if="chatDataPage === chatDataTotalPage">没有更多的记录了</div>
                <div class="each-line" v-for="item in chartData" :key="item.key">
                    <div class="time-type-block" v-if="item.contentType === 'system-msg-group'">{{item.time}}</div>
                    <template v-else>
                        <div :class="[+item.to_user_id === +currentSessionId ? 'in-type-block': 'out-type-block']"
                             class="out-type-block"
                             v-if="+item.to_user_id !== +currentSessionId">
                            <div class="content-block">
                                <div class="content">
                                    <a class="inner-good" v-if="item.contentType === 'item'" :href="item.url" target="_blank">
                                        <div class="left">
                                            <img :src="item.pic"/>
                                        </div>
                                        <div class="right">
                                            <p class="title">{{item.title}}</p>
                                            <div class="bottom">
                                                <span class="price">¥{{item.sale_price}}</span>
                                            </div>
                                        </div>
                                    </a>
                                    <pre v-html="item.content" v-if="item.contentType === 'text'"></pre>
                                    <div class="image-content" v-if="item.contentType === 'image'">
                                        <img :src="item.thumb" @click.stop="prewImg(item.url)"/>
                                    </div>
                                </div>
                            </div>
                            <div class="avatar">
                                <img :src="item.avatar"/>
                            </div>
                        </div>
                        <div class="in-type-block flex-box" v-if="+item.to_user_id === +currentSessionId">
                            <div class="avatar">
                                <img :src="item.avatar"/>
                            </div>
                            <!--<div class="content-block flex-one">-->
                                <!--<div class="content">-->
                                    <!--<a class="inner-good flex-box" v-if="item.contentType === 'item'" :href="item.url" target="_blank">-->
                                        <!--<div class="left">-->
                                            <!--<img :src="item.pic"/>-->
                                        <!--</div>-->
                                        <!--<div class="right">-->
                                            <!--<p class="title">{{item.title}}</p>-->
                                            <!--<div class="bottom">-->
                                                <!--<span class="price">¥{{item.sale_price}}</span>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</a>-->
                                    <!--<pre v-html="item.content" v-if="item.contentType === 'text'"></pre>-->
                                    <!--<div class="image-content" v-if="item.contentType === 'image'">-->
                                        <!--<img :src="item.thumb" @click.stop="prewImg(item.url)"/>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    </template>
                </div>
            </div>
        </div>
        <fs-preview-img :prew-open.sync="prewOpen" :img-url="imgUrl"></fs-preview-img>
    </div>
</template>
<style lang="less">
    .messagebox-wrap {
        height: 100%;
        overflow: hidden;
        position: relative;
        .message-list-wrap {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            .message-list {
                padding: 0 12px 20px;
                .no-more-record {
                    padding: 16px;
                    text-align: center;
                    font-weight: 700;
                }
                .each-line {
                    padding: 8px 0;
                    font-size: 14px;
                    .inner-good {
                        display: flex;
                        padding: 12px 6px;
                        width: 300px;
                        background-color: #fff;
                        text-decoration: none;
                        color: #666;
                        .left {
                            margin-right: 8px;
                            flex: 0 0 80px;
                            width: 80px;
                            img {
                                max-width: 100%;
                            }
                        }
                        .right {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            flex: 1;
                            .title {
                                height: 42px;
                                overflow: hidden;
                                font-size: 14px;
                            }
                        }
                        .bottom {
                            margin-bottom: 6px;
                            span {
                                color: #dc0707;
                                font-size: 14px;
                            }
                        }
                    }
                    .content-block {
                        min-width: 50px;
                        max-width: 400px;
                    }
                    .time-type-block {
                        padding: 16px 0;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }
                    .out-type-block {
                        display: flex;
                        justify-content: flex-end;
                        .content-block {
                            margin-right: 12px;
                            margin-top: 4px;
                            text-align: right;
                        }
                        .content {
                            position: relative;
                            padding: 10px;
                            display: inline-block;
                            background-color: #9de551;
                            border-radius: 6px;
                            text-align: left;
                            word-break: break-all;
                            font-size: 0;
                            .image-content {
                                max-width: 260px;
                                img {
                                    max-width: 100%;
                                    height: auto;
                                    cursor: zoom-in;
                                }
                            }
                            pre {
                                font-size: 16px;
                            }
                            &::after {
                                content: '';
                                position: absolute;
                                display: block;
                                right: -4px;
                                top: 14px;
                                z-index: 10;
                                width: 0;
                                height: 0;
                                transform: rotate(135deg);
                                border-width: 4px;
                                border-color: #9de551 transparent transparent #9de551;
                                border-style: solid;
                                border-top-left-radius: 2px;
                            }
                        }
                    }
                    .in-type-block {
                        display: flex;
                        .content-block {
                            margin-left: 12px;
                            margin-top: 4px;
                        }
                        .content {
                            position: relative;
                            padding: 10px;
                            display: inline-block;
                            background-color: #eee;
                            border-radius: 6px;
                            word-break: break-all;
                            font-size: 0;
                            .image-content {
                                max-width: 260px;
                                img {
                                    max-width: 100%;
                                    height: auto;
                                    cursor: zoom-in;
                                }
                            }
                            pre {
                                font-size: 16px;
                            }
                            &::before {
                                content: '';
                                position: absolute;
                                display: block;
                                left: -4px;
                                top: 14px;
                                z-index: 10;
                                width: 0;
                                height: 0;
                                transform: rotate(-45deg);
                                border-width: 4px;
                                border-color: #eee transparent transparent #eee;
                                border-style: solid;
                                border-top-left-radius: 2px;
                            }
                        }
                    }
                    .avatar {
                        font-size: 0;
                        img {
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                        }
                    }
                }
                .message-item {
                    padding: 10px;
                    display: inline-block;
                    width: 100%;
                    box-sizing: border-box;
                    font-size: 14px;
                    line-height: 18px;
                    position: relative;
                }
            }
        }
    }
</style>
<script>
    import fsPreviewImg from './fs-preview-img'
    import ResizeObserver from 'resize-observer-polyfill'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'messageBox',
        components: {
            fsPreviewImg
        },
        props: {
            chartData: {
                type: Array,
                default() {
                    return []
                }
            },
            toUserId: Number
        },
        data() {
            return {
                resizeObserverer: null,
                Emoji: null,
                prewOpen: false,
                imgUrl: ''
            }
        },
        computed: {
            ...mapGetters([
                'meInfo',
                'isLoading',
                'chatDataPage',
                'chatDataTotalPage',
                'canScroll',
                'currentSessionId'
            ])
        },
        methods: {
            ...mapActions([
                'loadMoreChartData',
                'disableScroll',
                'enableScroll'
            ]),
            prewImg(url) {
                this.imgUrl = url
                this.prewOpen = true
            },
            scrollHandler(e) {
                if (e.target.scrollTop <= 0) {
                    this.loadMoreChartData()
                    e.target.scrollTop = 10
                }
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        let listDom = this.$refs.listWrapper
                        listDom.scrollTop = listDom.scrollHeight
                    }, 60)
                })
            }
        },
        created() {
            let vm = this;
            vm.resizeObserverer = new ResizeObserver((entries, observer) => {
                if (vm.canScroll) {
                    vm.scrollToBottom()
                    vm.disableScroll()
                }
            })
        },
        mounted() {
            let vm = this
            vm.$nextTick(() => {
                setTimeout(() => {
                    vm.resizeObserverer.observe(vm.$refs.messageList);
                    vm.scrollToBottom()
                }, 20)
            })
        }
    }
</script>
