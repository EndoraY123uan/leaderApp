<template>
	<view class="mainClass">
		<view class="classContent">
			{{ classContent }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classContent:''
			}
		},
		onLoad(e) {
			let name = JSON.parse(e.name);
			uni.setNavigationBarTitle({
				title:name
			})
			let url = 'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/mainClass'
			uni.request({//从服务器获取课程信息
				url:url,
				method:'POST',
				data:{
					className:name
				},
				success: (res) => {
					console.log(res)
					this.classContent = res.data.detail
				},
				fail: () => {
					console.log('fail')
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	@mainColor:#7779CD;
	.mainClass{
		.classContent{
			padding-left: 10upx;
			padding-right: 10upx;
		}
	}
</style>
