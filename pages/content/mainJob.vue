<template>
	<view class="mainJob">
		<view class="jobContent">
			{{ jobContent }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobContent:''
			}
		},
		onLoad(e) {
			let name = JSON.parse(e.name);
			uni.setNavigationBarTitle({
				title:name
			})
			let url = 'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/jobDetail'
			uni.request({
				url:url,
				method:'POST',
				data:{
					jobName:name
				},
				success: (res) => {
					console.log(res)
					this.jobContent = res.data.jobContent
					console.log('here')
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
	.mainJob{
		.jobContent{
			padding: 10upx;
			text-indent: 40upx;
		}
	}
</style>
