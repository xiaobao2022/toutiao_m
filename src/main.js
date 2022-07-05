import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import '@/styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import Toutiaoicon from '@/components/Toutiaoicon'

// 测试一下接口是否可用
// import request from '@/utils/request'
// request.get('/v1_0/channels').then((res) => {
//   console.log(res.data.data.channels)
// })

Vue.use(Vant)
Vue.component('Toutiaoicon', Toutiaoicon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
