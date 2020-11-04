import vant from './vant'
import boutique from './boutique'
import { Lazyload } from 'vant'
const importComponent = Vue => {
    vant.forEach(component => {
        Vue.use(component)
    })
    boutique.forEach(component => {
        Vue.component(component.name, component)
    })
    Vue.use(Lazyload, {
        lazyComponent: true
    })
}

export default importComponent
