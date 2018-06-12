<template>
    <div class="face-panel">
        <div class="highlighter"></div>
    </div>
</template>
<style lang="less">
    .face-panel {
        position: relative;
        width: 434px;
        height: 202px;
        background: url(/im_zero/image/face_map@1x.png) 50% no-repeat;
        background-image: -webkit-image-set(url(/im_zero/image/face_map@1x.png) 1x,url(/im_zero/image/face_map@2x.png) 2x);
        cursor: pointer;
    }
</style>
<script>
    export default {
        name: 'fsQqFace',
        data() {
            return {}
        },
        components: {}
    }
</script>
