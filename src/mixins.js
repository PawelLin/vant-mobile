export default {
    methods: {
        getBackNumber (name) {
            const list = this.$store.state.list
            const backIndex = list.indexOf(name)
            return list.length - backIndex - 1
        },
        goBack (name, num = 0) {
            this.$router.go(-this.getBackNumber(name) - num)
        }
    }
}
