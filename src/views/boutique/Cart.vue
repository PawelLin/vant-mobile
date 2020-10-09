<template>
    <section class="cart">
        <van-nav-bar title="购物车">
            <template #right>
                <van-icon name="search" size="22" />
            </template>
        </van-nav-bar>
        <div class="contain">
        </div>
        <Tabbar active="cart" />
    </section>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
export default {
    name: 'cart',
    components: {
        Tabbar
    }
}
</script>
