import vant from './vant'

const importComponent = Vue => {
    vant.forEach(component => {
        Vue.use(component)
    })
}

export default importComponent
