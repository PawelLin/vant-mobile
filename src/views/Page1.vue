<template>
    <section class="page1">
        <van-nav-bar title="Page1" left-arrow fixed @click-left="handleClick"></van-nav-bar>
        <div class="fixed"></div>
        <van-field v-for="i in 50" v-model="text" label="文本" :key="i" />
        <van-button @click="handleToPage2">跳转Page2</van-button>
    </section>
</template>

<script>
export default {
    name: 'page1',
    data () {
        return {
            text: ''
        }
    },
    created () {
        console.log('created page1')
    },
    methods: {
        handleClick () {
            this.goBack('demo')
        },
        handleToPage2 () {
            this.$router.push({
                name: 'page2'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.page1 {
    padding-top: 46px;
}
.fixed {
    position: fixed;
    right: 0;
    width: 50px;
    height: 50px;
    background-color: hotpink;
    z-index: 1;
}
</style>
