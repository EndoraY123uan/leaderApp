<template>
	<view class="work">
		<!-- 就业数据模块 -->
		<view class="itemList"  >
			<view class="item" v-for="(item,index) in showList" :key="index" @click="detail(index)">
				<text>
					{{ item }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {uniGrid} from '@dcloudio/uni-ui'
	import {uniGridItem} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				showList:['考研就业数据','就业职位统计','就业薪资统计','就业地区统计']
			}
		},
		components:{
			uniGrid,
			uniGridItem
		},
        onLoad() {
           _self.getUserData() 
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
			detail(e){
				/* console.log(e.detail) */
				let index = e + 1
				uni.navigateTo({
					url:'../content/workDetail?index='+index+'&name='+this.showList[e]
				})
			}
		}
	}
</script>

<style lang="less">
	@mainColor:#7779CD;
	.work{
		.itemList{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding: 20upx;
			.item{
				margin-top: 20upx;
				width: 300upx;
				height: 300upx;
				color: #FFF;	
				text-align: center;
				line-height: 300upx;
				background-color: @mainColor;
				border-radius: 30upx;
				
			}
		}
	}
</style>
