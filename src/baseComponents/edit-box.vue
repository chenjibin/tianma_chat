<template>
    <div class="editbox">
        <div class="inputer-actions">
            <!--<Poptip placement="top" class="icon-wrap" >-->
                <!--<Icon type="happy-outline" size="24" color="#999"></Icon>-->
                <!--<div class="api" slot="content">-->
                    <!--<fs-qq-face></fs-qq-face>-->
                <!--</div>-->
            <!--</Poptip>-->
            <!--<div class="icon-wrap" title="表情">-->
                <!--<Icon type="happy-outline" size="24" color="#999"></Icon>-->
            <!--</div>-->
            <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                accept="image/png, image/jpeg, image/jpg"
                multiple
                :action="uploadUrl"
                title="图片"
                class="icon-wrap">
                <Icon type="image" size="24" color="#999"></Icon>
            </Upload>
        </div>
        <div class="inputer-area">
            <textarea class="message-textarea"
                      maxlength="500"
                      @keyup.enter="replayMessageHandler"
                      v-model.trim="messageContent"></textarea>
            <div class="word-counter">
                <span>{{messageContent.length}}</span>/500
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .editbox {
        position: absolute;
        font-size: 13px;
        bottom: 0;
        height: 150px;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        .inputer-actions {
            display: flex;
            height: 42px;
            padding: 5px 10px 5px 5px;
            .icon-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 42px;
                cursor: pointer;
            }
        }
        .inputer-area {
            display: flex;
            flex: 1;
            -webkit-box-direction: normal;
            flex-direction: column;
            margin: 2px;
            overflow: hidden;
            .message-textarea {
                display: flex;
                flex: 1;
                width: auto;
                height: 100%;
                resize: none;
                margin: 0;
                padding: 9px 4px;
                font-size: 14px;
                line-height: 1.5em;
                border: none;
                overflow-x: hidden;
                overflow-y: auto;
                border-radius: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
                font-family: inherit;
                -webkit-tap-highlight-color: transparent;
                -webkit-appearance: none;
                -moz-appearance: none;
                outline: none;
                color: inherit;
            }
            .word-counter {
                padding-right: 20px;
                text-align: right;
                color: #cdcdcd;
                line-height: 20px;
            }
        }
    }
</style>
<script>
    import fsQqFace from './fsQqFace/fsQqFace'
    export default {
        props: {
            toUserId: Number
        },
        data() {
            return {
                messageContent: '',
                uploadUrl: fsGlobalData.uploadUrl
            }
        },
        methods: {
            handleSuccess(file) {
                if (file.success) {
                    let sendParams = {}
                    sendParams.to_user_id = this.toUserId
                    sendParams.type = 'image'
                    sendParams.content = {
                        thumb: file.file.thumb,
                        url: file.file.url
                    }
                    this.$ws.send('index', 'send_message', sendParams)
                } else {
                    this.$Message.error(file.msg)
                }
            },
            replayMessageHandler() {
                let vm = this;
                if (!vm.messageContent) return;
                let sendParams = {}
                sendParams.to_user_id = this.toUserId
                sendParams.type = 'text'
                sendParams.content = {
                    msg: vm.messageContent
                }
                vm.$ws.send('index', 'send_message', sendParams)
                this.messageContent = ''
            }
        },
        components: {
            fsQqFace
        }
    }
</script>
