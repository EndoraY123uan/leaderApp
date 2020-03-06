<template>
	<view class="login">
		<view class="content">
			<text class="title">领航之旅即将开启</text>
            <view class="loginForm">
                <view class="login-group">
                    <input class="uni-input login-input" v-model="userName" focus placeholder="请输入用户名" placeholder-style="color:rgba(255,255,255,0.5)" required/>
                </view>
                <view class="login-group">
                    <input class="uni-input login-input" password="" v-model="userPwd" placeholder="请输入密码" placeholder-style="color:rgba(255,255,255,0.5)" />
                </view>
                <view class="login-group">
                  <checkbox-group @change="remumberPwd">
                      <checkbox 
                      @tap="remumberPwdFlag = !remumberPwdFlag" 
                      :checked="remumberPwdFlag"/>记住密码
                  </checkbox-group>  
                </view>
              
                <view class="login-group">
                    <button class="loginBtn"  @click="login">立即开启</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    let _self
	export default {
		data() {
			return {
	            userName:'',
	            userPwd:'',
	            remumberPwdFlag: true
			}
		},
		onLoad() {
	        _self = this
		},
	    mounted() {
	        //提取缓存
	        console.log('here')
	        let cacheUserName = uni.getStorageSync('cacheUserName')
	        let cacheUserPwd = uni.getStorageSync('cacheUserPwd')
	        console.log(cacheUserName + '+' + cacheUserPwd)
	        if( cacheUserName && cacheUserPwd ){
	            _self.userName = cacheUserName
	            _self.userPwd = cacheUserPwd
	            console.log(cacheUserName + '+' + cacheUserPwd)
	        }else{
	            _self.userName = ''
	            _self.userPwd = ''
	            console.log('here')
	        }
	    },
		methods: {
	        login(){//登录
	            if(_self.userName.length <=0 || _self.userPwd.length <=0){
	                uni.showToast({
	                    title:'账号或密码不能为空',
	                    icon:'none'
	                })
	            }else{
	                uni.request({
	                    url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/login',
	                    method:'POST',
	                    data:{
	                        userName: _self.userName,
	                        userPwd:_self.userPwd
	                    },
	                    success: (res) => {
	                        console.log(res.data)
	                        let flag = res.data.flag 
	                        let userInfo = res.data.userInfo
	                       /* let identify = res.data.identify */
	                        /* console.log(flag +  '+' + identify) */
	                        if(flag === 1){//账号密码正确
	                            if(_self.remumberPwd){ //记住密码
	                                uni.setStorageSync('cacheUserName',_self.userName)
	                                uni.setStorageSync('cacheUserPwd',_self.userPwd)
	                                console.log(userInfo)
	                                console.log('保存用户信息')
	                            }else{
	                                uni.removeStorageSync('cacheUserName')
	                                uni.removeStorageSync('cacheUserPwd')
	                            }
	                            uni.setStorageSync('userInfo',res.data.userInfo)
                                
	                            uni.reLaunch({
	                                url:'../major/major'
	                            })
                                console.log('ok')
	                        }else{
	                            uni.showToast({
	                                title:'账号或密码错误！',
	                                icon:'none'
	                            })
	                        }
	                    }
	                })
	            }
	            
	        }
	        
		}
	}
</script>

<style lang="less">
	@mainColor:#7779CD;
    page{
        width: 100%;
        height: 100%;
        .login{
            width: 100%;
            height: 100%;
        	display: flex;
            justify-content: center;
        	align-items: center;
          /*  background: linear-gradient(to bottom right,#0C7BB3,#f2bae8); */
          /*    background: linear-gradient(to right,#feac5e,#c779d0,#4bc0c8); */
             /*    background: linear-gradient(to bottom,#8D75DB,#727CF5); */
            background-color: #727CF5;
        	.content{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                width: 80%;
                height: 70%;
              /*  background-color: #0077AA; */
                .title{
                    font-size: 60upx;
                    font-weight: 400;
                    color: #FFF;
                }
                .loginForm{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 100%;
                    height: 60%;
                   /* background-color: #007AFF; */
                    .login-group{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 20%;
                     /*   background-color: #0EA391; */
                        input{
                            width: 90%;
                            color: #FFF;
                            text-align: center;
                            border-bottom: 0.5px solid #FFF;
                        }
                        checkbox-group{
                            color: white;
                            font-size: 40upx;
                        }
                       .loginBtn{
                           width: 100%;
                       }
                    }
                }
            }
        	
        }
    }
	
</style>

