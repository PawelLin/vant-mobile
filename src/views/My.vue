<template>
    <section>
        <div class="contain">
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
        </div>
        <Tabbar active="my" />
    </section>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'

export default {
    name: 'my',
    components: {
        Tabbar
    },
    data () {
        return {
        }
    },
    methods: {
        handleReplaceHome () {
            this.replaceRoute({
                name: 'home'
            })
        }
    }
}
</script>
