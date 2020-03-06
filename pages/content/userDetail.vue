<template>
	<view class="userDetail">
		<!-- 个人信息  姓名 专业 院校 更多-->
		<view class="userContent">
			<text>头像</text>
			<image src="../../static/img/06.JPG" style="width: 100upx; height: 100upx;"></image>
		</view>
		<view class="userContent">
			<text>学校</text>
			<text class="item">{{ userInfo.userUnv }}</text>
		</view>
		<view class="userContent">
			<text>学号</text>
			<text class="item">{{ userInfo.userNum }}</text>
		</view>
		<view class="userContent">
			<text>姓名</text>
			<text class="item">{{ userInfo.userName }}</text>
		</view>
		<view class="userContent">
			<text>性别</text>
			<text class="item">{{ userInfo.userSex }}</text>
		</view>
		<view class="userContent">
			<text>年龄</text>
			<text class="item">{{ userInfo.userAge }}岁</text>
		</view>
		
		<view class="userContent">
			<text>院系</text>
			<text class="item">{{ userInfo.userDep }}</text>
		</view>
		<view class="userContent">
			<text>专业</text>
			<text class="item">{{ userInfo.userMajor }}</text>
		</view>
		<view class="userContent">
			<text>班级</text>
			<text class="item">{{ userInfo.userClass }}</text>
		</view>
		<view class="userContent">
			<text>工作地</text>
			<text class="item">{{ userInfo.userWorkPlace }}</text>
		</view>
	</view>
</template>

<script>
	let _self
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onLoad:function(){
			_self = this
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					_self.userInfo = res.data
					console.log(_self.userInfo)
				}
			})
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
	@mainColor:#7779CD;
	@bgcColor:#F0F0F0;
	.userDetail{
		display: flex;
		flex-direction: column;
		width: 750upx;
		.userContent{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20upx;
			border-bottom: 0.5px solid rgba(0,0,0,0.3);
			.item{
				opacity: 0.5;
			}
		}
	}
</style>
