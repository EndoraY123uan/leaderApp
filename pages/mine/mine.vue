<template>
	<view class="mine">
			<!-- 个人信息  姓名 专业 院校 更多-->
			<view class="userInfo">
				<!-- <image src="../../static/img/06.JPG"></image> -->
				<view class="user" @click="userDetail">
					<view class="userDetail">
						<view class="userName">{{ userInfo.userName }}</view>
						<view class="userSex">{{ userInfo.userSex }}</view>
						<view class="userAge">{{ userInfo.userAge }}岁</view>
						<view class="userWorkPlace">{{ userInfo.userWorkPlace }}</view>
						<!-- <text>数计学院 网络工程...</text> -->
					</view>
					<view class="iconfont icon-more"></view>
				</view>
			</view>
			<view class="myContent">
				<!-- 我的草稿 -->
				<view class="more" @click="toDraft">
					<view class="item">
						<view class="iconfont icon-draft"></view>
						<text>我的草稿</text>
					</view>
					<view class="iconfont icon-more item-icon"></view>
				</view>
				<!-- 等待审核 -->
				<view class="more" @click="toCheck">
					<view class="item">
						<view class="iconfont icon-check"></view>
						<text>等待审核</text>
					</view>
					<view class="iconfont icon-more item-icon"></view>
				</view>
				<!-- 我发表的-->
				<view class="more" @click="toSuccess">
					<view class="item">
						<view class="iconfont icon-success"></view>
						<text>我发表的</text>
					</view>
					<view class="iconfont icon-more item-icon"></view>
				</view>
				<view class="more outLogin" @click="toSet">
					<view class="item">
						<view class="iconfont icon-outLogin"></view>
						<text>退出登录</text>
					</view>
					<view class="iconfont icon-more item-icon"></view>
				</view>
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
		/* 	_self.getUserInfo() */
            _self.getUserData()
		},
		methods: {
            getUserData(){//获取管理员信息
                //添加登陆函数监听
                console.log('主页检查登录')
                let loginRes = _self.checkLogin('../mine/mine','2')
                console.log(loginRes)
                if(!loginRes){return;}
                _self.userInfo = loginRes
                console.log(_self.userInfo)
             },
			userDetail:function(){// 跳转到个人信息详情页面
				uni.navigateTo({
					url:'../content/userDetail'
				})
			},
			toDraft:function(){//去我的草稿页面
				uni.navigateTo({
					url:'../content/draft'
				})
			},
			toCheck:function(){
				uni.navigateTo({
					url:'../content/check'
				})
			},
			toSuccess:function(){
				uni.navigateTo({
					url:'../content/success'
				})
			},
			toSet:function(){
				uni.navigateTo({
					url:'../content/set'
				})
			},
			
			
		}
	}
</script>

<style lang="less">
	@mainColor:#7779CD;
	@bgcColor:#F0F0F0;
	page{
		background-color: @bgcColor;
		.mine{
			width: 750upx;
			.userInfo{
				display: flex;
				/* padding-left: 50upx; */
				padding-top: 40upx;
				height: 250upx;
				background-color: @mainColor;
				border-bottom-right-radius: 100upx;
				border-bottom-left-radius: 100upx;
				/* image{
					width: 150upx;
					height: 150upx;
				} */
				.user{
					display: flex;
					justify-content:space-between;
					/* margin-left: 30upx; */
					padding-left: 30upx;
					padding-right: 30upx;
					width: 100%;
					height: 150upx;
					color: #FFF;
					/* background-color: #0077AA; */
					.userDetail{
						display: flex;
						justify-content: space-around;
						padding-left: 40upx;
						width: 450upx;
						line-height: 150upx;
						/* background-color: #0086B3; */
						.userName{
							font-size: 50upx;
							font-weight: 600;
							margin-bottom: 20upx;
						}
							
					}
					.icon-more{
						line-height: 150upx;
						margin-left: 80upx;
						color: #FFF;
					}
				}
			}
			.myContent{
				padding: 10upx;
				.more{
					margin-top: 5upx;
					display: flex;
					justify-content: space-between;
					padding: 20upx;
					height: 70upx;
					font-size: 36upx;
					background-color: #FFF;
					/* border-bottom: 1px solid @mainColor; */
					.item{
						display: flex;
						justify-content: space-between;
						width: 200upx;
						line-height: 70upx;
						/* background-color: #0EA391; */
					}
					.item-icon{
						line-height: 70upx;
					}
				}
                .outLogin{
                    margin-top: 10upx;
                }
			}
		}
	}
	

</style>
