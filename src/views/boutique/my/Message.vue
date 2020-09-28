<template>
    <section>
        <van-nav-bar title="消息中心" left-arrow @click-left="handleClick"></van-nav-bar>
        <div class="contain">
            <van-tabs v-model="active">
                <van-tab title="活动消息">内容 1</van-tab>
                <van-tab title="系统提醒">内容 2</van-tab>
            </van-tabs>
        </div>
    </section>
</template>

<script>
export default {
    name: 'myMessage',
    data () {
        return {
            active: 0
        }
    },
    methods: {
        handleClick () {
            this.goBack({ name: 'my' })
        }
    }
}
</script>
