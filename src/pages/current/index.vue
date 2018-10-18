<template>
    <section class="fs-current-page">
        <aside class="page-aside">
            <div class="channelswitch-wrap">
                <div class="panel inservice">
                    <session-list
                        :list-data="sessionListData"
                        :to-user-id="currentSessionId"
                        :is-show="nowPage <= totalPage"
                        @item-click="_itemClickHandler"></session-list>
                </div>
                <div class="panel waitting"></div>
            </div>
        </aside>
        <section class="content">
            <template v-if="currentSessionId">
                <div class="left">
                    <conversation-admin></conversation-admin>
                    <div class="messagebox-section">
                        <message-box :chart-data="chartData" :to-user-id="currentSessionId"></message-box>
                    </div>
                    <edit-box :to-user-id="currentSessionId"></edit-box>
                </div>
                <div class="right">
                    <Tabs :animated="false">
                        <TabPane label="足迹" icon="ios-paw">
                            <ul class="foot-print-list">
                                <li v-for="(item,index) in footPointList" :key="currentSessionId + '' + index" class="item">
                                    <div @click.stop="showDetail(item.url)" class="inner">
                                        <div class="img-wrap">
                                            <img :src="item.pic" />
                                        </div>
                                        <div class="right-area">
                                            <p class="title">{{item.title}}</p>
                                            <div class="">
                                                <p class="price">￥{{item.sale_price}}</p>
                                                <p class="price"><span>浏览时间:</span>{{item.review_date}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </TabPane>
                        <TabPane label="订单" icon="ios-paper">
                            <ul>
                                <li>
                                    订单1
                                </li>
                                <li>
                                    订单2
                                </li>
                                <li>
                                    订单3
                                </li>
                            </ul>
                        </TabPane>
                    </Tabs>
                </div>
            </template>
            <div class="content-empty" v-else>
                <div class="icon-bg">
                    <Icon type="ios-chatboxes-outline" size="56"></Icon>
                </div>
                <span class="text">没有选中会话哦</span>
            </div>
        </section>
        <transition name="slide">
            <section class="phone-block" v-show="checkShow" v-clickoutside="checkClose">
                <div class="inner">
                    <iframe :src="checkUrl" frameborder="0" width="100%" height="100%"></iframe>
                </div>
            </section>
        </transition>
    </section>
</template>
<style lang="less" scoped>
    .slide-enter-active, .slide-leave-active {
        transition: opacity .5s;
    }
    .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .phone-block {
        position: fixed;
        width: 330px;
        height: 645px;
        top: 0;
        right: 320px;
        background: url(/static/iphone.png) no-repeat center 0;
        background-size: 100%;
        .inner {
            position: absolute;
            top: 64px;
            left: 21px;
            right: 23px;
            bottom: 22px;
            overflow: hidden;
            border-radius: 0 0 35px 35px;
            border: 1px solid #edf0f4;
            border-top: none;
            background-color: #edf0f4;
            iframe {
                width: 0;
                max-width: 100%;
                min-width: 100%;
            }
        }
    }
    .foot-print-list {
        height: calc(~"100vh - 52px");
        overflow-x: hidden;
        overflow-y: auto;
        .item {
            cursor: pointer;
            border-bottom: 1px solid #ddd;
            .inner {
                display: flex;
                .img-wrap {
                    flex: 0 0 100px;
                    width: 100px;
                    font-size: 0;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
                .right-area {
                    padding: 4px 8px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
        }
    }
    .fs-current-page {
        flex: 1;
        display: flex;
        .page-aside {
            width: 280px;
            flex-shrink: 0;
            position: relative;
            border-right: 1px solid rgb(229, 229, 229);
            .channelswitch-wrap {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                .panel {
                    height: 100%;
                    background: rgb(252, 252, 253);
                    &.waitting {
                        position: absolute;
                        left: 280px;
                        width: 280px;
                        top: 0;
                        opacity: 0;
                        right: 0;
                        z-index: -1;
                        transition: left 0.2s, opacity 0.5s;
                    }
                }
            }
        }
        .content {
            display: flex;
            position: relative;
            flex: 1 1 0;
            .left {
                flex: 1;
                background-color: #fff;
                position: relative;
                .messagebox-section {
                    position: absolute;
                    top: 51px;
                    bottom: 150px;
                    left: 0;
                    right: 0;
                    border-bottom: 1px solid #e5e5e5;
                    overflow: hidden;
                }
            }
            .right {
                width: 320px;
                height: 100%;
                overflow: hidden;
                flex-shrink: 0;
                border-left: 1px solid #e5e5e5;
                background-color: #fff;
                position: relative;
            }
            .content-empty {
                color: rgb(153, 153, 153);
                text-align: center;
                height: 154px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 14px;
                .text {
                    line-height: 40px;
                }
                .icon-bg {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 120px;
                    height: 120px;
                    background-color: rgb(248, 248, 248);
                    margin: auto;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }
        }
    }
</style>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import sessionList from '@/baseComponents/session-list'
    import conversationAdmin from '@/baseComponents/conversation-admin'
    import messageBox from '@/baseComponents/message-box'
    import editBox from '@/baseComponents/edit-box'
    import clickoutside from '@/directives/click-outside'
    export default {
        name: 'current',
        data() {
            return {
                checkUrl: '',
                checkShow: false
            }
        },
        directives: {clickoutside},
        computed: {
            ...mapGetters([
                'sessionListData',
                'currentSessionId',
                'chartData',
                'totalPage',
                'nowPage',
                'footPointList'
            ])
        },
        methods: {
            ...mapActions([
                'changeSession'
            ]),
            checkClose() {
                this.checkShow = false;
                this.checkUrl = '';
            },
            showDetail(url) {
                this.checkUrl = url
                this.checkShow = true
            },
            _itemClickHandler(item) {
                this.changeSession(item)
            }
        },
        components: {
            sessionList,
            conversationAdmin,
            messageBox,
            editBox
        }
    }
</script>
