<template>
    <section class="fs-imapp">
        <aside class="aside-left">
            <div class="app-sidebar">
                <div class="top-side">
                    <div class="service-info">
                        <Avatar size="large" :src="meInfo.avatar" />
                        <p class="status">{{meInfo.name}}</p>
                        <p class="status"><span  class="online"></span>在线</p>
                    </div>
                </div>
                <div class="center-side">
                    <Tooltip content="会话" placement="right">
                        <div class="item-nav" :class="{active: currentPage === 'current'}" @click.stop="$router.push({name: 'current'})">
                            <Icon type="chatbox-working" size="24" color="#fff"></Icon>
                        </div>
                    </Tooltip>
                    <Tooltip content="历史客户" placement="right">
                        <div class="item-nav" :class="{active: currentPage === 'history'}" @click.stop="$router.push({name: 'history'})">
                            <Icon type="person" size="24" color="#fff"></Icon>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </aside>
        <section class="imapp-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </section>
    </section>
</template>
<style lang="less">
    .fs-imapp {
        display: flex;
        width: 100%;
        height: 100%;
        .aside-left {
            width: 70px;
            flex-shrink: 0;
            position: relative;
            .app-sidebar {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #343f4b;
                .top-side {
                    flex-shrink: 0;
                    .service-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 23px 10px;
                        text-align: center;
                        .status {
                            margin-top: 8px;
                            color: #fff;
                            .online {
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                display: inline-block;
                                background-color: #19be6b;
                                margin-right: 6px;
                            }
                        }
                    }
                }
                .center-side {
                    padding: 20px 0;
                    flex: 1;
                    .item-nav {
                        width: 70px;
                        padding: 12px 0;
                        text-align: center;
                        cursor: pointer;
                        &.active {
                            background-color: #2a3641;
                        }
                    }
                }
            }
        }
        .imapp-content {
            flex: 1;
            display: flex;
            background-color: #fff;
            position: relative;
            overflow-x: auto;
        }
    }
</style>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'fsMain',
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'currentPage',
                'meInfo'
            ])
        },
        components: {}
    }
</script>
