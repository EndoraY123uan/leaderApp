<template>
	<view class="major">
		<!-- 分段 -->
		<view class="majorControl">
			<view class="control">
				<uni-segmented-control
				 :current="current" 
				 :values="items" 
				 @clickItem="onClickItem" 
				 style-type="text" 
				 active-color="#7779CD"
				 color="#FFF"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="majorDetails">
						{{ userMajor.majorIntroduce }}
					</view>
				</view>
				<view v-show="current === 1">
					<uni-collapse class="majorClass">
					    <uni-collapse-item title="基础课程" name="基础课程" thumb="../../static/thumb/class.png" showAnimation="true">
					        <uni-list>
								<uni-list-item v-for="items in userMajor.basicClass"  thumb="../../static/thumb/classList.png" show-arrow @click="classDetail(items)">{{ items }}</uni-list-item>
							</uni-list>
					    </uni-collapse-item>
						<uni-collapse-item title="专业课程" name="专业课程" thumb="../../static/thumb/class.png" showAnimation="true">
						    <uni-list>
								<uni-list-item v-for="items in userMajor.majorClass" thumb="../../static/thumb/classList.png" show-arrow @click="classDetail(items)">{{ items }}</uni-list-item>
							</uni-list>
						</uni-collapse-item>
					</uni-collapse>
				</view>
				<view v-show="current === 2" class="work">
					<uni-list>
						<uni-list-item v-for="items in userMajor.workList" show-arrow  @click="jobDetail(items)" thumb="../../static/thumb/work.png">{{ items }}</uni-list-item>
					</uni-list>
				</view>
			</view>
		</view>
		 
	</view>
</template>

<script>
	let _self
	import {uniNavBar} from '@dcloudio/uni-ui'
	//import {uniSeachBar} from '@dcloudio/uni-ui'
	/* import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue' */
	import {uniIcons} from '@dcloudio/uni-ui'
	import {uniSearchBar} from '@dcloudio/uni-ui'
	import {uniSegmentedControl} from '@dcloudio/uni-ui'
	import {uniCollapse} from '@dcloudio/uni-ui'
	import {uniCollapseItem} from '@dcloudio/uni-ui'
	import {uniList} from '@dcloudio/uni-ui'
	import {uniListItem} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				userInfo:{},
				userMajor:{},
				items:['专业介绍','主干课程','就业方向'],
				current:0,
				value:''
			};
		},
		onLoad:function(){
			_self = this
			_self.getData()
            _self.getUserData()
		},
		components:{
			uniNavBar,
			uniIcons,
			uniSearchBar,
			uniSegmentedControl,
			uniCollapse,
			uniCollapseItem,
			uniList,
			uniListItem,
		},
		methods:{
            getUserData(){//获取管理员信息
                //添加登陆函数监听
                console.log('主页检查登录')
                let loginRes = _self.checkLogin('../major/major','2')
                console.log(loginRes)
                if(!loginRes){return;}
                _self.userInfo = loginRes
             },
			getData(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						_self.userInfo = Object.assign({},res.data)
						console.log(res.data)
						console.log(_self.userInfo)
						uni.request({
							url:'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/major',
							method:'POST',
							data:{
								major:_self.userInfo.userMajor
							},
							success: (res) => {
								_self.userMajor = res.data.major
								console.log(_self.userMajor)
							}
						})
					}
				})
			},
			onClickItem(e){
				if(this.current !== e.currentIndex){
					this.current = e.currentIndex;
				}
			},
			toMine(){
				uni.redirectTo({
					url:'../mine/mine'
				})
			},
			classDetail(name){
				let classname = JSON.stringify(name);
				uni.navigateTo({
					url:'../content/mainClass?name=' + classname
				})
			},
			jobDetail(name){
				let jobname = JSON.stringify(name);
				uni.navigateTo({
					url:'../content/mainJob?name=' + jobname
				})
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../mine/mine'
			})
		},
		/**
		 * @param {Object} input
		 * 拿到搜索框中的数据发送给服务器
		 * 将服务器返回的查询信息加载到页面上
		 */
		onNavigationBarSearchInputConfirmed(input) {
			this.current = 0;
			let search = input.text;
			let url = 'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/search'
			uni.request({
				url:url,
				data:{
					search:search
				},
				method:'POST',
				success: (res) => {
					console.log(res.data.searchMajor)
					_self.userMajor = res.data.searchMajor
				}
			})
		}
	}
</script>
<style lang="less">
	@mainColor:#7779CD;
	.major{
		.nav{
			border-bottom: 1px solid @mainColor;
			.search{
				width: 300px;
				border-radius: 50%;
			}
		}
		.personaInfo{
			display: flex;
			justify-content: center;
			/* background-color: pink; */
			font-size: 16px;
		}
		.majorControl{
			.control{
				position: -webkit-sticky; /* Safari */
				position: sticky;
				top: 0upx;
				/* color: #FFF; */
				/* background-color: @mainColor; */
				background-color: #FFF;
			}
			.content{
				.majorDetails{
					padding: 10px;
					text-indent: 40px;
				}
				.majorClass{
					uni-list-item{
						/* text-indent: 20px; */
						
					}
				}
			}
		}
	}
</style>
