<template>
    <div class="face-panel"
         ref="facePanel"
         @mousemove.capture="moveHandler"
         @mouseleave="mouseLeaveHandler"
         @mouseenter="mouseEnterHandler">
        <div class="highlighter"
             :style="{'width': width + 'px', 'height': height + 'px', 'top': top + 'px', 'left': left + 'px' }"></div>
    </div>
</template>
<style lang="less">
    .face-panel {
        position: relative;
        width: 434px;
        height: 202px;
        background: url(./face_map@1x.png) 50% no-repeat;
        background-image: -webkit-image-set(url(./face_map@1x.png) 1x, url(./face_map@2x.png) 2x);
        cursor: pointer;
        .highlighter {
            position: absolute;
            background-color: rgba(0, 0, 0, .1);
            border-radius: 3px;
        }
    }
</style>
<script>
    export default {
        name: 'fsQqFace',
        data() {
            return {
                width: 0,
                height: 0,
                top: -1,
                left: -1,
                cacheWidth: 434 / 15,
                cacheHeight: 202 / 7
            }
        },
        methods: {
            mouseEnterHandler() {
                this.width = this.cacheWidth
                this.height = this.cacheHeight
            },
            mouseLeaveHandler() {
                this.width = 0
                this.height = 0
                this.top = -1
                this.left = -1
            },
            moveHandler(e) {
                let boundingClient = this.$refs.facePanel.getBoundingClientRect()
                let offsetX = e.x - boundingClient.left
                let offsetY = e.y - boundingClient.top
                let leftIndex = Math.ceil(offsetX / this.cacheWidth) - 1
                let topIndex = Math.ceil(offsetY / this.cacheHeight) - 1
                console.log(leftIndex, topIndex)
                this.left = leftIndex * this.cacheWidth
                this.top = topIndex * this.cacheHeight
            }
        }
    }
</script>
