<template>
	<view class="kaoyanDetail">
		<view class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
				<view class="qiun-title-dot-light">{{ title }}</view>
			</view>
			<view class="qiun-charts" >
				<canvas canvas-id="canvas" id="canvas" class="charts" @touchstart="touch"></canvas>
			</view>
		</view>
		<view class="kaoyanAnal">
			{{ workAnal }}
		</view>
	</view>
</template>

<script>
	import uCharts from '../components/u-charts/u-charts.min.js';
	var _self;
	var canva=null;
	let chartType;

	export default {
		data() {
			return {
				index:'',
				title:'',
				workAnal:'',
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
			}
		},
		onLoad(e) {
			_self = this;
			_self.title = e.name
			_self.index = e.index
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData(){
				uni.request({
					url: 'http://47.97.213.36:7300/mock/5e145ffaf2ecc141ee032ab8/leader/workData',
					method:'POST',
					data:{
					},
					success: function(res) {
						/* console.log(res.data.data) */
						_self.serverData=res.data.data;
						console.log(_self.serverData)
						let dataList ={categories:[],series:[]};
						if(_self.index == 1){
							 chartType = 'column'
							 dataList.categories = _self.serverData.workData.categories
							 dataList.series = _self.serverData.workData.series
							 console.log(_self.serverData.workData.dataAnal)
							 _self.workAnal = _self.serverData.workData.dataAnal.data
						}else if(_self.index == 2){
							 chartType = 'pie'
							 dataList.series = _self.serverData.workPost.series
							  _self.workAnal = _self.serverData.workPost.dataAnal.data
						}else if(_self.index == 3){
							 chartType = 'pie'
							 dataList.series = _self.serverData.workSalary.series
							  _self.workAnal = _self.serverData.workSalary.dataAnal.data
						}else if(_self.index == 4){
							chartType == 'pie'
							console.log(_self.serverData.workRegion)
							dataList.series = _self.serverData.workRegion.series
							 _self.workAnal = _self.serverData.workRegion.dataAnal.data
						}
						_self.show("canvas",dataList,chartType);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			show(canvasId,chartData,chartType){
				if(chartType == 'pie'){
					canva = new uCharts({
						$this:_self,
						canvasId: canvasId,
						type:'pie',
						fontSize:11,
						legend:{show:true},
						background:'#FFFFFF',
						pixelRatio:_self.pixelRatio,
						series: chartData.series,
						animation: true,
						width: _self.cWidth*_self.pixelRatio,
						height: _self.cHeight*_self.pixelRatio,
						dataLabel: true,
						extra: {
							pie: {
							  lableWidth:15
							}
						},
					})
				}else if(chartType == 'column'){
					canva = new uCharts({
						$this:_self,
						canvasId: canvasId,
						type: chartType,
						legend:{show:true},
						fontSize:11,
						background:'#FFFFFF',
						pixelRatio:_self.pixelRatio,
						animation: true, 
						categories: chartData.categories,
						series: chartData.series,
						xAxis: {
							disableGrid:true,
						},
						yAxis: {
							//disabled:true
						},
						dataLabel: true,
						width: _self.cWidth*_self.pixelRatio,
						height: _self.cHeight*_self.pixelRatio,
						extra: {
							column: {
								type:'group',
								width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
							}
						  }
					});
				}

				
			},
			touch(e){
				canva.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
			},
		}
	}
</script>

<style scoped>
page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important }
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.kaoyanDetail{
	display: flex;
	flex-direction: column;	
}
.kaoyanAnal{
	padding: 15upx;
	text-indent: 60upx;
}
</style>