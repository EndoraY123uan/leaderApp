<template>
	<view class="draft">
		<uni-swipe-action class="item-list">
		    <uni-swipe-action-item v-for="(item,index) in dataList" :key="index" :options="options"   @click="onClick" @change="change" class="item">
		       <view class="item-detail" @touchstart="getIndex(index)" >
				   <image :src="item.imgPath" @click="toDetail(index)"></image>
				   <view class="title" @click="toDetail(index)">{{ item.title }}</view>
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
				dataList:[],//从本地存储获取草稿
				selectIndex:''
			};
		},
		onLoad:function(e){
			_self = this
			uni.getStorage({
				key:'draftList',
				success: (res) => {
					let arr = res.data
					console.log(JSON.parse(arr[0]))
					let tempArr = []
					let len = res.data.length
					for(let i = 0;i<len;i++){
						_self.dataList.push(JSON.parse(arr[i]))
						console.log(_self.dataList)
					}
					
				}
			})
			
		},
		components:{
			uniSwipeAction,
			uniSwipeActionItem
		},
		methods:{
		   onClick(e){
			 /* console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text) */
			  this.dataList.splice(this.selectIndex,1)
			  console.log('删除的是'+ this.selectIndex)
			},
			change(open){
			  console.log('当前开启状态：'+ open)
			},
			getIndex(index){
				console.log(index)
				this.selectIndex = index
			},
			toDetail(index){
				let data = JSON.stringify(_self.dataList[index])
				console.log(data)
				uni.navigateTo({	
					/* url:'./draftDetail?title=' + _self.dataList[index].title + '&type=' + _self.dataList[index].type + '&content'  +  _self.dataList[index].content  + '&imgPath'  +  _self.dataList[index].imgPath */   
					url:'./draftDetail?data=' + data						   
				})
				console.log(_self.dataList[index].content)
			}
		}
	}                                   
</script>

<style lang="less" scoped>
	.draft{
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
