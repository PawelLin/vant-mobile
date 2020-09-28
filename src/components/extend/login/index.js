import Vue from 'vue'
import Component from './component.vue'

function showLogin (propsData) {
    const VM = Vue.extend(Component)
    const comp = new VM({ propsData }).$mount()
    document.body.appendChild(comp.$el)
}

export default showLogin
