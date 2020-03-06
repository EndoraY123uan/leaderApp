import Vue from 'vue'
import App from './App'

/* import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom) */

Vue.config.productionTip = false
Vue.prototype.checkLogin = function(backPage,backType){
    let userInfo = uni.getStorageSync('userInfo')
    console.log('check login')
    console.log(userInfo)
    if(userInfo == ''){
        console.log('为空')
        uni.redirectTo({
            url:'/pages/login/login?backPage='+backPage +'&bacType='+ backType
        });
        return false
    }
    return userInfo
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
