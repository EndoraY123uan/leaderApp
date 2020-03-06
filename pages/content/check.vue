<template>
	<view class="check">
		<uni-swipe-action class="item-list">
		    <uni-swipe-action-item v-for="(item,index) in dataList" :key="index" :options="options"  @click="onClick" @change="change" class="item">
		       <view class="item-detail" @click="detail(index)">
				   <image :src="item.commitImg"></image>
				   <view class="title">{{ item.title }}</view>
			   </view>
		    </uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	let _self
	import {uniSwipeAction} from '@dcloudio/uni-ui'
	import {uniSwipeActionItem} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				 options:[
					 {
				            text: '删除',
				            style: {
				                backgroundColor: '#dd524d',
								fontSize:'32rpx'
				            }
				        }
				      ],
				dataList:[]
			};
		},
		onLoad() {
			//获取该用户的待审核列表
			console.log('here')
			_self = this
			_self.getNewsData()
		},
		components:{
			uniSwipeAction,
			uniSwipeActionItem
		},
		methods:{
			getNewsData:function(){//获取用户的审核列表
				uni.showToast({
					title:'正在加载',
					icon:'loading'
				})
				uni.getStorage({
					key:'userInfo',
					success:function(res){
						let studyNum = res.data.userNum
						console.log(studyNum)
						uni.request({
							url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/checkDetail',
							method:'POST',
							data:{
								studyNum: studyNum
							},
							success:function(res){
								console.log(res.data)
								_self.dataList = res.data.content
							},
							fail:function(){
								
							}
						})
					}
				})	
			},
		   onClick(e){
			  console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text)
			  
			},
			change(open){
			  console.log('当前开启状态：'+ open)
			},
			detail(index){//查看列表详情
				let data = JSON.stringify(_self.dataList[index])
				console.log(data)
				uni.navigateTo({	
					url:'./checkDetail?data='+ data						   
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.check{
		padding-left: 20upx;
		padding-right: 20upx;
		background-color: #F0F0F0;
		.item-list{
			.item{
				display: flex;
				align-items: center;
				margin-bottom: 10upx;
				padding: 10upx;
				height: 180upx;
				background-color: #FFF;
				.item-detail{
					image{
						position: absolute;
						width: 150upx;
						height: 150upx;
					}
					.title{
						padding: 25upx;
						width: 500upx;
						height: 100upx;
						margin-left: 170upx;
						/* overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap; */
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp:3;
						overflow: hidden;
					}
				}	
			}
		}
	}
</style>
