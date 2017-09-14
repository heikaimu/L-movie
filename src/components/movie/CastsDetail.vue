<template>
	<div id="casts_detail"> 
		<div class="container">  
			<div class="row movie-basic-ifo">
				<div class="col-xs-12 col-md-10 movie-plot">
					<h3 v-text="detailData.name"></h3> 
					<div class="basic-ifo clearfix">
						<div class="basic-ifo-list clearfix">
							<h5>中文名</h5>
							<p v-text="detailData.name"></p>
						</div> 
						<div class="basic-ifo-list clearfix">
							<h5>性别</h5>
							<p v-text="detailData.gender"></p>
						</div> 
						<div class="basic-ifo-list clearfix">
							<h5>外文名</h5>
							<p v-text="detailData.name_en"></p>
						</div> 
						<div class="basic-ifo-list clearfix">
							<h5>国籍</h5>
							<p v-text="detailData.born_place"></p>
						</div> 
					</div>
				</div>
				<div class="col-xs-12 col-md-2 movie-cover"> 
					<img class="" :src="castPic">
				</div>
			</div>

			<div class="row casts-ifo-box">
				<div class="col-xs-12 col-md-12">
					<h3>代表作</h3>
				</div>
				<div class="col-xs-6 col-md-3" v-for="item in masterWork">
					<div class="master-work-list">
						<router-link :to="{path:'/MovieDetail/'+item.subject.id}">
							<img :src="item.subject.images.large" >
						</router-link> 
						<p class="emit" v-text="item.subject.title"></p>
						<span>担当：<i v-for="a in item.roles" v-text="a+'、'"></i></span>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default { 
	data:function(){
		return { 
			detailData:"",
			castPic:"",
			masterWork:""
		}
	},
	beforeRouteEnter:function(to, from, next){
		next (vm=>{ 
			vm.getDetailData();  
		});
	},   
	mounted: function(){
		this.getDetailData();  
	},
	methods:{  
		fetchDate:function(newVal,oldVal){   
		}, 
		getDetailData:function(){
			this.$http.jsonp('https://api.douban.com/v2/movie/celebrity/'+this.$route.params.id+'', {}, { 
				emulateJSON: true
			}).then(function(response) { 
				this.detailData = JSON.parse(response.bodyText);
				this.castPic = this.detailData.avatars.large;
				this.masterWork = this.detailData.works;
				console.log(this.masterWork)

			}, function(response) { 
				console.log(response)
			});
		},
		createString:function(arr){
			var str = "";
			console.log(arr)
			arr.forEach(function(e,i){
				str += "、"+e;
			});
			return str.substring(1);
		},
		createCastsString:function(arr){
			var str = "";
			console.log(arr)
			arr.forEach(function(e,i){
				str += "、"+e.name;
			});
			return str.substring(1);
		},
	},  
	watch:{
		'$route' (){
			this.getDetailData();
		}
	}
}
</script>

<style scoped>  
#casts_detail{margin-bottom: 20px;}
.close-btn a:hover{text-decoration: none;}
.movie-basic-ifo{margin-top: 20px; background: #fff; box-shadow: 0 0 5px #ccc;}
.plot p{font-size: 16px; line-height: 2;}
.basic-ifo .basic-ifo-list{width: 50%; float: left; padding: 10px 0; border-bottom: 1px dashed #e7e7e7;}
.basic-ifo .basic-ifo-list a{text-decoration: underline;}
.basic-ifo .basic-ifo-list h5{margin: 0; float: left; width: 25%; height: 20px; font-size: 16px; color: #666; font-weight: 900;}
.basic-ifo .basic-ifo-list p{margin: 0; float: left; width: 70%; height: 20px; font-size: 16px; color: #1296db;}
.movie-cover{padding-right: 0;}
.movie-cover img{display: block; width: 100%;}

.casts-ifo-box{margin-top: 50px; padding:0 0 20px 0; background: #fff; box-shadow: 0 0 5px #ccc;}
.master-work-list{padding: 5px; margin-bottom: 30px; border: 1px solid #e7e7e7;}
.master-work-list a{display: block; width: 100%; padding-bottom: 130%; height: 0; overflow: hidden; background: #111;}
.master-work-list a img{display: block; max-width: 100%; margin: 0 auto;}
.master-work-list p{margin: 5px 0; font-size: 16px; color: #111; line-height: 2;}
@media (max-width: 720px) { 
	.back-nav{position: relative;}
	.basic-ifo .basic-ifo-list{width: 100%;}
	.movie-cover{padding-right: 15px;}
} 
</style>