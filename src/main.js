import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios = axios


function getServerConfig () {
  return new Promise ((resolve, reject) => {
    axios.get('./serverConfig.json').then((result) => {
      console.log(result)  // 看打印出来的结果
      let config = result.data;
      for (let key in config) {
        Vue.prototype[key] = config[key];
      }
      console.log(Vue.prototype.baseURL)  // 验证是否已经把属性挂在了Vue上
      resolve();
    }).catch((error) => {
      console.log(error);
      reject()
    })
  })
}

async function init() {
  await getServerConfig();
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

init()