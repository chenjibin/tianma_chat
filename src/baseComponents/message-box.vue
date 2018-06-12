<template>
    <div class="messagebox-wrap">
        <div class="message-list-wrap" ref="listWrapper" @scroll="scrollHandler">
            <div class="message-list" ref="messageList">
                <div class="each-line" v-for="(item, index) in chartData" :key="'line-' + index">
                    <!--<div class="time-type-block" v-if="item.type === 'time'">{{item.content}}</div>-->
                    <div class="out-type-block" v-if="+item.to_user_id !== +meInfo.id">
                        <div class="content-block">
                            <div class="content">{{item.content}}</div>
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
                            <div class="content">{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    import ResizeObserver from 'resize-observer-polyfill'
    import { mapGetters } from 'vuex'
    export default {
        name: 'messageBox',
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
                resizeObserverer: null
            }
        },
        computed: {
            ...mapGetters([
                'focusType',
                'meInfo'
            ])
        },
        methods: {
            scrollHandler(e) {
                console.log(e)
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
        },
        components: {}
    }
</script>
