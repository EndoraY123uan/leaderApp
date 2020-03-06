<script>
	export default {
		onLaunch:function() {
			uni.setStorage({
				key:'userInfo',
				data:{
					"userName":'袁锦滋',
					"userSex":'女',
					'userAge':23,
					"userNum":1618064053,
					"userUnv":'陕西理工大学',
					"userDep":'数学与计算机科学学院',
					"userMajor":'网络工程',
					"userClass":'1602',
					"userImg":'../../static/img/06.JPG',
					"userWorkPlace":'上海',
				},
				success:function(){
					console.log('有用户信息了')
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
/* 	@import url("./colorui/main.css");
	@import url("./colorui/icon.css"); */
	@import url("static/iconfont/iconfont.css");
</style>
