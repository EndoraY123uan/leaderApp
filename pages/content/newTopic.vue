<template>
	<view class="newTopic">
		<view class="title">
			<label>标&nbsp;&nbsp;题：</label>
			<textarea auto-height="true" v-model="title"></textarea>
		</view>
		<view class="type">
			<view class="uni-list ">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						分&nbsp;&nbsp;类：
					</view>
					<view class="uni-list-cell-db" style="width: 550upx;">
						<picker @change="typeSelect" :value="index" :range="array" >
							<view class="uni-input" v-model="array[index]">{{array[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<label>内&nbsp;&nbsp;容：</label>
			<view class="topicContent">
				<textarea v-model="content" placeholder="请输入话题内容" placeholder-style="opacity:0.7;" auto-height="true"></textarea>
			</view>
		</view>
<!-- 		<view class="img">
			<label>图&nbsp;&nbsp;片：</label>
			<view class="uni-uploader__files">
				<block v-for="(image,index) in imageList" :key="index">
					<view class="uni-uploader__file" style="position: relative;" @click.stop="previewImage(index)">
						<image mode="aspectFill" class="uni-uploader__img" :src="image"></image>
						<view class="close-view" @click.stop="close(index)"><text>x</text></view>
					</view>
				</block>
				<view class="imgContent" v-show="!addFlag" @tap="chooseImg">
					<image src="../../static/img/uploadImg.png"></image>
				</view>
			</view>
		</view> -->
		<view class="result">
			<button @click="save">存为草稿</button>
			<button @click="publish">发表话题</button>
		</view>
	</view>
</template>

<script>
	let _self
	import compressImage from '../components/addImg/util.js';
	const device = uni.getSystemInfoSync();
	export default {
		data() {
			return {
				title:'',
				content:'',
				index:0,
				array:['专业','考研','就业','生活'],
			    percent:0,
			    loading:false,
			    disabled:false,
				imageList: [],
				maxImgCount:1,
				addFlag:false,
                userInfo:{}
			}
		},
		components:{
			
		},
		onLoad(e) {
			_self = this;
			//设置草稿数量初始化
		/* 	uni.clearStorage()
			console.log('清空了') */
			uni.getStorage({
				key:'draftList',
				success:function(res){
					console.log(res.data)
				},
				fail:function(){
					uni.setStorage({
						key:'draftList',
						data:[],
						success:function(){
							console.log('新建了草稿列表')
						}
					})
				}
			})
		},
		methods: {
			typeSelect: function(e) {//类型选择
			   this.index = e.target.value
			},
			chooseImg() { //选择图片
				uni.chooseImage({
					sourceType: ["camera", "album"],
					sizeType:['compressed'],
					count: 1,
					success: async (res) => {
						_self.imageList = res.tempFilePaths
						console.log(_self.imageList[0])
						_self.addFlag = true
					}
				})
			},
			close(e) {
				this.imageList.splice(e, 1);
				this.addFlag = false
			},
			previewImage(index) { //预览图片
				uni.previewImage({
					urls: this.imageList,
					current: this.imageList[index]
				});
			},
			async compressImageHandler(src){
				console.log('platform==='+device.platform)
				const tempPath = await compressImage(src,device.platform);
				console.log('tempPath-----'+tempPath);
				return tempPath
			},
			save:function(){//存为草稿
				/* console.log(this.array[this.index]) */
				//将发表的草稿内容存到本地
				uni.showToast({//loading
					title:'正在保存',
					icon:'loading',
					duration:2000,
				})
                let draftData = {
                    title:_self.title,
                    type:_self.array[_self.index],
                    content:_self.content,
                    authorImg: url,
                    creatTime:new Date()
                }
                uni.getStorage({
                    key:'draftList',
                    success:function(res){
                        let data = res.data
                        console.log(draftData)
                        let newDataLength = data.push(JSON.stringify(draftData))
                        console.log(data)
                        console.log('现在有' + newDataLength+ '个草稿')
                        uni.setStorage({
                            key:'draftList',
                            data:data,
                            success:function(){
                                uni.showToast({
                                    title:'保存成功'
                                })
                            }
                        })
                    },	
                })
                
                /* 	uni.getStorage({
                // 			key:'draftList',
                // 			success:function(res){
                // 				let data = res.data
                // 				console.log(draftData)
                // 				let newDataLength = data.push(JSON.stringify(draftData))
                // 				console.log(data)
                // 				console.log('现在有' + newDataLength+ '个草稿')
                // 				uni.setStorage({
                // 					key:'draftList',
                // 					data:data,
                // 					success:function(){
                // 						uni.showToast({
                // 							title:'保存成功'
                // 						})
                // 					}
                // 				})
                // 			},	
                // 		}) */
				// let up =  uni.uploadFile({
				// 	url:'http://www.shenzepengzuishuai.cn/sso-file-service-0.0.1-SNAPSHOT/uploadImg',
				// 	filePath: _self.imageList[0],
				// 	name:'draft',
				// 	fileType:'image',
				// 	header: {
				// 	'content-type': 'multipart/form-data'
				// 	},
				// 	success:(uploadFileRes)=>{//上传图片拿到路径
				// 		console.log(uploadFileRes)
				// 		let status = uploadFileRes.statusCode
				// 		if(status == 200){
				// 			let url = uploadFileRes.data
				// 			let draftData = {
				// 				title:_self.title,
				// 				type:_self.array[_self.index],
				// 				content:_self.content,
				// 				imgPath: url,
				// 				creatTime:new Date()
				// 			}
				// 			console.log(draftData)
				// 		}
						
				// 	/* 	uni.getStorage({
				// 			key:'draftList',
				// 			success:function(res){
				// 				let data = res.data
				// 				console.log(draftData)
				// 				let newDataLength = data.push(JSON.stringify(draftData))
				// 				console.log(data)
				// 				console.log('现在有' + newDataLength+ '个草稿')
				// 				uni.setStorage({
				// 					key:'draftList',
				// 					data:data,
				// 					success:function(){
				// 						uni.showToast({
				// 							title:'保存成功'
				// 						})
				// 					}
				// 				})
				// 			},	
				// 		}) */
				// 	},
				// fail:function(){
				// 	console.log('出错了')
				// 	uni.showToast({
				// 		title:'保存失败',
				// 		image:'../../static/img/false.png'
				// 	})
				// 	}
				// })
			},
			publish:function(){//发表话题
				uni.request({
					url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/publishFlag',
					method:'POST',
					data:{
						"title":_self.title,
						"type":_self.array[_self.index],
						"content":_self.content,
						"imgPath":_self.imageList[0]
					},
					success:function(res){
						if(res.data.flag == 1){
							uni.showToast({
								title:"等待审核"
							})
						}else{
							
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@mainColor:#7779CD;
	@bgcColor:#F0F0F0;
	@handle:#CACBCD;
	@buttomColor:#FFF;
	page{
		width: 750upx;
	.newTopic{
		/* width: 750upx; */
		padding:10upx;
		background-color:@bgcColor;
		.title{
			display: flex;
            min-height: 150upx;
            align-items: center;
			padding-left: 15upx;
			padding-right: 15upx;
			/* height: 100upx; */
			background-color: @buttomColor;
           /* background-color: #0077AA; */
			label{
				font-size: 40upx;
				line-height: 150upx;
			}
			textarea{
				width: 550upx;
				height: 70upx;
		}
        }
		.type{
			margin-top: 10upx;
            min-height: 150upx;
         /*   background-color: #007AFF; */
			.uni-list{
                line-height: 150upx;
				.uni-list-cell{
					display: flex;
					padding-left: 15upx;
					padding-right: 15upx;
					background-color: @buttomColor;
                  /*  background-color: #0EA391; */
				}
			}
		}
		.content{
			margin-top: 10upx;
			padding-left: 15upx;
			padding-right: 15upx;
            min-height: 600upx;
			background-color: @buttomColor;
            /* background-color: #2C405A; */
			.topicContent{
				margin-top: 20upx;
				width: 100%;
				/* border: 1px solid @mainColor; */
				textarea{
					width: 100%;
					height: 300upx;
					/* background-color: #0077AA; */
				}
			}
		}
		// .img{
		// 	margin-top: 10upx;
		// 	margin-bottom: 10upx;
		// 	padding-left: 15upx;
		// 	padding-right: 15upx;
		// 	background-color: @buttomColor;
		// 	.uni-uploader__files {
		// 		/* background-color: #0077AA; */
		// 			.uni-uploader__file {
		// 				display: flex;
		// 				margin: 8upx;
		// 				width: 250upx;
		// 				height: 220upx;
		// 		/* 		background-color: #0EA391; */
		// 				.uni-uploader__img {
		// 					display: block;
		// 					line-height: 220upx;
		// 					width: 200upx;
		// 					height: 200upx;
		// 				}
		// 				.close-view{
		// 					display: flex;
		// 					justify-content: center;
		// 					align-items: center;
		// 					width: 35upx;
		// 					height: 35upx;
		// 					font-size: 30upx;
		// 					background-color: @mainColor;
		// 					color: #FFF;
		// 					/* border-radius: 50%; */
		// 				}
		// 			}	
		// 	}
		// 	.imgContent{
				
		// 		width: 200upx;
		// 		height: 200upx;
		// 		border: 1px solid @mainColor;
		// 		border-radius: 20upx;
		// 		image{
		// 			margin: 50upx 50upx;
		// 			width: 100upx;
		// 			height: 100upx;	
		// 		}
		// 	}
		// }
		.result{
			display: flex;
			margin-top: 50upx;
			padding-left: 15upx;
			padding-right: 15upx;
			background-color: @buttomColor;
			button{
				width: 300upx;
				background-color: @mainColor;
				color: @buttomColor;
			}
		}
        
	}
	}
</style>