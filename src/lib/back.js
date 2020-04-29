// 参考至https://www.jianshu.com/p/f1d1eaac6e8c
class Back {
    constructor () {
        this.STATE = 'x-back'
        this.event = document.createEvent('Events')
        this.event.initEvent(this.STATE, false, false)
        window.addEventListener('popstate', this.onPopState)
    }
    onPopState = event => {
        event.state === this.STATE && this.element.dispatchEvent(this.event)
    }
    record (state) {
        history.pushState(state, null, location.href)
        history.pushState(state, null, location.href)
        // 参考https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
    }
    perRecord () {
        history.pushState(this.STATE, null, location.href)
    }
    listen (listener, notBack) {
        this.record(this.STATE)
        this.element = document.createElement('span')
        this.element.addEventListener(this.STATE, listener, false)
    }
}

const XBack = new Back()

export default XBack
