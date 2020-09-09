<template>
    <section class="hero-detail">
        <van-nav-bar :title="title" left-arrow fixed @click-left="handleClick"></van-nav-bar>
    </section>
</template>

<script>
export default {
    name: 'hero_detail',
    data () {
        return {
        }
    },
    computed: {
        title () {
            return this.$route.query.title
        }
    },
    methods: {
        handleClick () {
            this.goBack({ name: 'hero' })
        }
    }
}
</script>

<style lang="less" scoped>
.hero-detail {
    padding-top: 46px;
}
</style>
