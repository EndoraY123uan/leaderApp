<template>
	<view class="set">
		<uni-swipe-action class="item-list">
		    <uni-swipe-action-item v-for="(item,index) in dataList" :key="index" :options="options"  @click="onClick" @change="change" class="item">
		       <view class="item-detail" @click="detail(index)">
				   <image :src="item.src"></image>
				   <view class="title">{{ item.title }}</view>
			   </view>
		    </uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
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
				dataList:[
					{
						"src":'../../static/img/05.JPG',
						"title":'这是标题'
					},
					{
						"src":'../../static/img/05.JPG',
						"title":'这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题'
					},
					{
						"src":'../../static/img/05.JPG',
						"title":'这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题'
					},
					{
						"src":'../../static/img/03.JPG',
						"title":'这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题'
					},
					{
						"src":'../../static/img/02.JPG',
						"title":'这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题'
					},
					{
						"src":'../../static/img/01.JPG',
						"title":'这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题'
					},
					{
						"src":'../../static/img/05.JPG',
						"title":'这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题'
					}
				]
			};
		},
		components:{
			uniSwipeAction,
			uniSwipeActionItem
		},
		methods:{
		   onClick(e){
			  console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text)
			  
			},
			change(open){
			  console.log('当前开启状态：'+ open)
			},
			detail(index){
				console.log(index)
			}
		}
	}
</script>

<style lang="less" scoped>
	.set{
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
