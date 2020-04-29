<template>
    <section class="page2">
        <van-nav-bar title="Page2" left-arrow fixed @click-left="handleClick('page1')"></van-nav-bar>
        <van-button @click="handleClick('demo')">返回Demo</van-button>
        <p style="font-size: 14px;">点击手机物理键也返回Demo页面</p>
    </section>
</template>

<script>
import XBack from '@/lib/back'
export default {
    name: 'page2',
    data () {
        return {
            back: true
        }
    },
    created () {
        console.log('created page2')
        XBack.listen(() => {
            this.back && this.goBack('demo', 1)
        })
    },
    methods: {
        handleClick (name) {
            this.back = false
            this.goBack(name, 2)
        }
    }
}
</script>

<style lang="less" scoped>
.page2 {
    padding-top: 46px;
}
</style>
