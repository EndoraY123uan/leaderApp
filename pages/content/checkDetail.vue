<template>
	<view class="checkDetail">
		<view class="news">
			<view class="title">
				{{ content.title }}
			</view>
			<view class="authorInfo">
				<image src="../../static/img/02.JPG"></image>
				<view class="author">
					<view class="authorName">{{ content.author }}</view>
					<view class="time">{{ content.creatTime }}</view>
				</view>
			</view>
			<view class="newsContent">
				{{ content.detail }}
			</view>
		</view>
	</view>
</template>

<script>
	let _self
	import {uniPopup} from '@dcloudio/uni-ui'
	/* import {popup} from '../components/popup.vue' */
	export default {
		data() {
			return {
				content:{
					title:'',
					detail:'',
					authorName:'',
					time:''
				}
			}
		},
		components:{
			/* popup */
		},
		onLoad(e) {
			_self = this;
			console.log(JSON.parse(e.data))	
			_self.content = JSON.parse(e.data)
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	@mainColor:#7779CD;
	@bgcColor:#F1F1FA;
	@handle:#CACBCD;
	page{
		width: 750px;
		.checkDetail{
			display: flex;
			flex-direction: column;
			width: 750upx;
			background-color:#FFF;
			/* 新闻详情区 */
			.news{
				background-color:@bgcColor;
				/* 新闻标题 */
				.title{
					font-size: 40upx;
					font-weight: 600px;
					text-align: center;
					padding: 20upx;
				}
				/* 作者信息 */
				.authorInfo{
					display: flex;
					flex-direction: row;
					image{
						width: 80upx;
						height: 80upx;
						margin-left: 30upx;	
					}
					.author{
						margin-left: 20upx;
						font-size: 30upx;
						.time{
							opacity: 0.7;
						}
					}
					
				}
				.newsContent{
					margin: 20upx;
					text-indent: 80upx;
				}
			}
			.comment{
				display: flex;
				flex-direction: column;
				margin-top: 10upx;
				margin-bottom: 80upx;
				background-color: @bgcColor;
				.comment-title{
					margin-left: 30upx;
					font-size: 35upx;
				}
				
				.comment-list{
					border-top: 1px solid @handle;
/* 					background-color: #0EA391; */
					.commentAuthor{
						display: flex;
						padding: 20upx;
						image{
							position: absolute;
							width: 80upx;
							height: 80upx;
							margin-top: 10upx;
							padding: 20upx;
						}
						.author{
							margin-left: 120upx;
							margin-top: 10upx;
							font-size: 30upx;
							.commentName{
								color:@mainColor
							}
							.commentTime{
								opacity: 0.5;
							}
						}
					}
		
				}
			}
			.commentInput{
				display: flex;
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 20upx;
				background-color: @mainColor;
				border-top-left-radius: 10upx;
				border-top-right-radius: 10upx;
				textarea{
					width: 80%;
					color: #FFF;
					/* height: 80upx; */
				}
				button{
					width: 120upx;
					height: 60upx;
					font-size: 28upx;
				}
			}
		}
	}
</style>