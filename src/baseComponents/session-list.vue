<template>
    <div class="session-list-wrap">
        <ul class="session-list">
            <li class="item"
                v-for="(item, index) in listData"
                :key="'session-' + item.id"
                :class="{active: toUserId === +item.id}"
                v-if="item.last_msg"
                @click="_itemClickHandler(item, index)">
                <figure class="session-pic">
                    <img :src="item.avatar"/>
                </figure>
                <h3 class="desc nick">{{item.name}}</h3>
                <span class="badge" v-if="item.unread_num > 0"><i class="count">{{item.unread_num}}</i></span>
                <pre class="desc" v-html="item.last_msg &&  item.last_msg.content ? item.last_msg.content.msg : '暂无消息'"></pre>
                <time class="time">{{item.last_msg.addtime | timeHander}}</time>
                <div class="close-session" title="退出接待" @click.stop="_quitSessionHandler" v-if="quitEnable">
                    <Icon type="ios-close" size="18"></Icon>
                </div>
            </li>
        </ul>
        <div class="load-more" v-if="isShow">
            <Button @click="_loadMore">加载更多</Button>
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
    import dayjs from 'dayjs'
    import { mapActions } from 'vuex'
    const nowDate = dayjs().format('YYYY-MM-DD')
    export default {
        props: {
            toUserId: Number,
            isShow: Boolean,
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
        filters: {
            timeHander(val) {
                if (!val) return ''
                if (dayjs(val).format('YYYY-MM-DD') === nowDate) return dayjs(val).format('HH:mm')
                else return dayjs(val).format('MM月DD号')
            }
        },
        data() {
            return {
                currentIndex: null
            }
        },
        methods: {
            ...mapActions([
                'loadSessionList'
            ]),
            _loadMore() {
                this.loadSessionList()
            },
            _quitSessionHandler() {
            },
            _itemClickHandler(item) {
                if (+this.toUserId === +item.id) return
                this.$emit('item-click', item)
            }
        }
    }
</script>
