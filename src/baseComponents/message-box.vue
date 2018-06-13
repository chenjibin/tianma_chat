<template>
    <div class="messagebox-wrap">
        <div class="message-list-wrap" ref="listWrapper" @scroll="scrollHandler">
            <Spin size="large" fix v-if="isLoading"></Spin>
            <div class="message-list" ref="messageList" id="messageList">
                <div class="each-line" v-for="(item, index) in chartData">
                    <!--<div class="time-type-block" v-if="item.type === 'time'">{{item.content}}</div>-->
                    <div class="out-type-block" v-if="+item.to_user_id !== +meInfo.id">
                        <div class="content-block">
                            <div class="content">
                                <pre v-html="item.content" v-if="item.contentType === 'text'"></pre>
                                <div class="image-content" v-if="item.contentType === 'image'">
                                    <img :src="item.url.replace('http://192.168.199.197', '')" @click.stop="prewImg(item.url)"/>
                                </div>
                            </div>
                        </div>
                        <div class="avatar">
                            <img :src="meInfo.avatar"/>
                        </div>
                    </div>
                    <div class="in-type-block flex-box" v-if="+item.to_user_id === +meInfo.id">
                        <div class="avatar">
                            <img :src="item.avatar"/>
                        </div>
                        <div class="content-block flex-one">
                            <div class="content">
                                <pre v-html="item.content" v-if="item.contentType === 'text'"></pre>
                                <div class="image-content" v-if="item.contentType === 'image'">
                                    <img :src="item.url.replace('http://192.168.199.197', '')"/>
                                </div>
                            </div>
                        </div>
                    </div>
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
                .each-line {
                    padding: 8px 0;
                    font-size: 14px;
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
                'focusType',
                'meInfo',
                'isLoading'
            ])
        },
        methods: {
            ...mapActions([
                'loadMoreChartData'
            ]),
            prewImg(url) {
                this.imgUrl = url
                this.prewOpen = true
            },
            scrollHandler(e) {
                if (e.target.scrollTop <= 0) {
                    this.loadMoreChartData()
                }
            },
            scrollToBottom() {
                let listDom = this.$refs.listWrapper
                listDom.scrollTop = listDom.scrollHeight
            }
        },
        created() {
            let vm = this;
            vm.resizeObserverer = new ResizeObserver((entries, observer) => {
                if (vm.focusType) {
                    vm.scrollToBottom()
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
