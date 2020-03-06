<template>
    <view class="discuss">
        <tabControl :current="current" :values="items" lineWidth="52rpx" bgc="#fff" activeColor="#7779CD" :fixed="true" :scrollFlag='true' :isEqually='true' @clickItem="onClickItem" ></tabControl>
        <!-- 使用 swiper 配合 滑动切换 -->
        <swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
            <swiper-item v-for="(item,index1) in newsList" :key='index1'>
                <!-- 使用 scroll-view 来滚动内容区域 -->
                <scroll-view class="content" scroll-y="true" style="height: 100%;">
					<view class="content-list" v-for="(data,index2) in item" :key="index2" @click="newsDetail(index1,index2)">
						<image :src="data.src"></image>
						<view class="swiper-title">{{data.title}}</view>
					</view>
				</scroll-view>
            </swiper-item>
        </swiper>
		<!-- 悬浮按钮 -->
		<view>
			<flixedadd backgroundColor="#7779CD" selectbackgroundColor="#FFF" color="#FFF" selectcolor="#000" :addlistdata="addlistdata" @addlisttap="addlisttap"></flixedadd>
		</view>
    </view>
</template>
<script>
	let _self
	import tabControl from '../components/tabControl-tag.vue';
	import {flixedadd} from '../components/dragButton/xiaosikaifa-flixedadd.vue'
	export default {
	    data() {
	        return {
	            items: ['热点', '专业','考研', '就业'],
				newsList:[],
	            current: 0,
				addlistdata:[
					{
						title:"发起话题",
						src:"/static/img/01.JPG"
					},
					{
						title:"第二个",
						src:"/static/img/02.JPG"
					}
				],
	        };
	    },
	    onLoad() {
			_self = this
			_self.getNewsData()
            _self.getUserData()
		},
	    components: {
			tabControl,
			flixedadd
		},
	    methods: {
            getUserData(){//获取管理员信息
                //添加登陆函数监听
                console.log('主页检查登录')
                let loginRes = _self.checkLogin('../main/mian','2')
                console.log(loginRes)
                if(!loginRes){return;}
                _self.userInfo = loginRes
             },
			getNewsData:function(){//获取用户的审核列表
				uni.showToast({
					title:'正在加载',
					icon:'loading'
				})
				uni.request({
					url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/newsList',
					success:function(res){
						console.log(res.data.newsList)
						_self.newsList = res.data.newsList
					},
					fail:function(){
						
					}
				})
			},
	        onClickItem(val) {
	            this.current = val.currentIndex
	        },
	        scollSwiper(e){
	            this.current = e.target.current
	        },
			newsDetail:function(type,listIndex){//查看话题详情
				let data = JSON.stringify(_self.newsList[type][listIndex])
				console.log(data)
				uni.navigateTo({
					url:'../content/newsDetail?data=' + data
				})
			
			},
			addlisttap:function(index){/*第一个序列为0,第二个为1,以此类推;当值为-1代表点击的是遮慕层*/
				if(index === 0){
					uni.navigateTo({
						url:'../content/newTopic'
					})
				}
			}
		}
	}
</script>
<style lang="less">
	@mainColor: #7779CD;
	@bgcColor:#F0F0F0;
	page{
	    height: 100%;
		.discuss{
		    padding-top: 100rpx;
		    height: 100%;
			.swiper{
				background-color: @bgcColor;
				.content{
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 150upx;
					width: 100%;
					margin-bottom: 10upx;
					.content-list{
						margin-top: 10upx;
						display: flex;
						align-items: center;
						width: 100%;
						height: 180upx;
						font-size: 34upx;
						background-color: #FFF;
						image{
							position: absolute;
							width: 150upx;
							height: 150upx;
							margin-left: 30upx;
							line-height: 150upx;
							border-radius: 10upx;
						}
						.swiper-title{
							margin-left: 200upx;
							margin-right: 30upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp:3;
							overflow: hidden;
						}
						
					}
				}
			}
		}
	}
	
</style>
