import Vue from 'vue'
import App from './App.vue'
import zysCompnonent from 'zys-npm-rollup-plop-program'
Vue.config.productionTip = false

// 拉取插件并且注册
Vue.use(zysCompnonent)

new Vue({
  render: h => h(App),
}).$mount('#app')
