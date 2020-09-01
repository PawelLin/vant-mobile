<template>
    <div id="app">
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
            <keep-alive :include="include">
                <router-view />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Velocity from 'velocity-animate'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            on: false,
            isTabbar: true
        }
    },
    beforeCreate () {
        this.duration = 300
    },
    computed: mapState({
        include: state => state.routes.filter(item => !item.refresh).map(item => item.name).concat(state.tabbar),
        forward: state => state.forward,
        routes: state => {
            const routes = {}
            state.routes.forEach(item => {
                routes[item.name] = item
            })
            return routes
        },
        tabbarRoutes: state => state.tabbarRoutes,
        tabbar: state => state.tabbar,
        fromRoute: state => state.fromRoute
    }),
    methods: {
        beforeEnter (el) {
            // console.log('beforeEnter')
            this.isTabbar = this.tabbar.includes(this.$route.name) && this.tabbar.includes(this.fromRoute)
            if (!this.isTabbar) {
                if (this.forward !== null) {
                    const translateX = this.forward ? '100%' : '-100%'
                    el.style.position = 'absolute'
                    el.style.width = '100%'
                    Velocity(el, { translateX }, { duration: 0 })
                }
            }
        },
        enter (el, done) {
            // console.log('enter')
            const { refresh, scrollTop = 0 } = this.tabbarRoutes[this.$route.name] || this.routes[this.$route.name] || {}
            if (!this.isTabbar) {
                if (this.forward !== null) {
                    Velocity(el, { translateX: 0 }, { duration: this.duration, complete: done })
                    if (this.forward) {
                    } else {
                        if (refresh) { // 需要刷新页面就不设置scrollTop了
                            this.$store.commit('setRoute', { name: this.$route.name, refresh: false })
                        } else {
                            el.querySelector('.contain').scrollTop = scrollTop
                        }
                    }
                }
            } else {
                el.querySelector('.contain').scrollTop = scrollTop
                done()
            }
        },
        afterEnter (el) {
            // console.log('afterEnter')
            if (!this.isTabbar) {
                el.style.position = ''
                el.style.width = ''
                el.style.transform = ''
            }
        },
        enterCancelled (el) {
            // console.log('enterCancelled')
        },
        beforeLeave (el) {
            // console.log('beforeLeave')
            if (!this.isTabbar) {
                el.style.position = 'absolute'
                el.style.width = '100%'
            }
        },
        leave (el, done) {
            // console.log('leave')
            if (!this.isTabbar) {
                setTimeout(() => {
                    const translateX = this.forward ? '-100%' : '100%'
                    Velocity(el, { translateX }, { duration: this.duration, complete: done })
                }, 10)
            } else {
                done()
            }
        },
        afterLeave (el) {
            // console.log('afterLeave')
            if (!this.isTabbar) {
                el.style.position = ''
                el.style.width = ''
                el.style.transform = ''
            }
        },
        leaveCancelled (el) {
            // console.log('leaveCancelled')
        }
    }
}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body, #app {
    height: 100%;
}
#app > section {
    display: flex;
    flex-direction: column;
    height: 100%;
    > .contain {
        flex: 1;
        overflow-y: auto;
    }
    // background-color: #999;
}
.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
    position: absolute;
    top: 0;
    width: 100%;
    transition: all 2s ease;
}
.slide-left-enter, .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
}
.slide-right-enter, .slide-left-leave-active {
    transform: translate3d(-100%, 0, 0);
}
// .slide-left-enter, .slide-left-leave-active {
//     // opacity: 0;
// }
// .slide-right-enter, .slide-right-leave-active {
//     // opacity: 0;
// }
.test {
    height: 200px;
    background-color: #f9c;
}
</style>
