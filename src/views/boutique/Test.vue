<template>
    <section class="home">
        <div class="contain">
            <div class="animate">
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @enter-cancelled="enterCancelled"
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelled="leaveCancelled"
                    :css="false"
                >
                    <div v-show="show === 1" class="animate1">1</div>
                </transition>
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @enter-cancelled="enterCancelled"
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelled="leaveCancelled"
                    :css="false"
                >
                    <div v-show="show === 2" class="animate2">2</div>
                </transition>
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @enter-cancelled="enterCancelled"
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelled="leaveCancelled"
                    :css="false"
                >
                    <div v-show="show === 3" class="animate3">3</div>
                </transition>
            </div>
            <button @click="forward">&gt;</button>
            <button @click="back()">&lt;</button>
            <button @click="back(3)">3</button>
        </div>
    </section>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
    name: 'test',
    data () {
        return {
            show: 1,
            duration: 300,
            isForward: true
        }
    },
    methods: {
        forward () {
            this.isForward = true
            this.show = 2
        },
        back (num) {
            this.isForward = false
            console.log(num)
            this.show = num || 1
        },
        beforeEnter (el) {
            el.style.position = 'absolute'
        },
        enter (el, done) {
            const translateX = this.isForward ? '100%' : '-100%'
            Velocity(el, { translateX: ['0%', translateX] }, { duration: this.duration, complete: done })
        },
        afterEnter (el) {
            el.style.position = ''
        },
        enterCancelled (el) {
            console.log('home enterCancelled')
        },
        beforeLeave (el) {
            el.style.position = 'absolute'
        },
        leave (el, done) {
            const translateX = this.isForward ? '-100%' : '100%'
            Velocity(el, { translateX: [translateX, '0%'] }, { duration: this.duration, complete: done })
        },
        afterLeave (el) {
            el.style.position = ''
        },
        leaveCancelled (el) {
            console.log('home leaveCancelled')
        }
    }
}
</script>

<style lang="less" scoped>
.animate {
    position: relative;
    margin: auto;
    width: 100px;
    height: 200px;
    border: 1px solid #000;
    overflow: hidden;
    > div {
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .animate1 {
        background-color: thistle;
    }
    .animate2 {
        background-color: turquoise;
    }
    .animate3 {
        background-color: aqua;
    }
}
</style>
