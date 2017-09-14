<template> 
	<div id="publish_box">
		<div class="container">  
			<!-- 标题 -->
			<div class="row title clearfix">
				<div class="col-xs-12 col-md-12">
					<h2 :class="[movieType+'-title']" v-text="publishTitle"></h2> 
					<router-link :to="'/MovieList/'+movieType">查看更多</router-link>
				</div>
			</div>
			<!-- 内容 -->
			<div class="row">
				<div class="col-xs-12 col-md-12"> 
					<transition name="fade" mode="out-in"> 
					<div class="loading-box loading-height" v-if="loadingShow">
						<span class="loading-icon"></span>
					</div> 
					<swiper :options="swiperOption" v-else> 
						<div class="swiper-slide publish-list" v-for="(item,index) in newMovieJson"> 
							<router-link :to="{path:'/MovieDetail/'+item.id}">
							<div class="publish-pic">
								<img :src="item.images.large"> 
							</div>
							<div class="publish-text excessive">
								<p class="emit" v-text="item.title"></p> 
								<i class="" v-if="ifTop" v-text="'豆瓣评分:'+item.rating.average"></i>
							</div>
							</router-link>
						</div>  
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
					</transition> 
				</div>
			</div>
		</div>
	</div> 
</template>

<script> 
export default {
	props:['type'],
	data:function(){
		return {
			movieType:this.type,
			newMovieJson: "",
			loadingShow:true, 
			ifTop:false,
			swiperOption: {
				pagination: '.swiper-pagination', 
				paginationType : 'progress',
				speed:500,
				slidesPerView : 5,
				slidesPerGroup : 3, 
				spaceBetween : 15, 
				observer:true,
				observeParents:true,  
				breakpoints: {  

					640: {
						slidesPerView: 3,
						spaceBetween : 5
					}
				}
			}
		}
	}, 
	created: function(){
		this.getTopMovie();  
	},
	methods:{ 
		getTopMovie:function(){ 
			if(this.movieType == "hot"){
				var url = "https://api.douban.com/v2/movie/in_theaters?start=0&count=10";
			}else if(this.movieType == "new"){
				var url = "https://api.douban.com/v2/movie/coming_soon?start=0&count=10";
			}else if(this.movieType == "top"){
				var url = "https://api.douban.com/v2/movie/top250?start=0&count=10";
				this.ifTop = true;
			};
			this.$http.jsonp(url, {}, { 
				emulateJSON: true
			}).then(function(response) {
		      // 这里是处理正确的回调  
		      this.newMovieJson = response.data.subjects;
		      this.loadingShow = false; 
		  }, function(response) {
		        // 这里是处理错误的回调
		        console.log(response)
		    });
		}, 
		addClass:function(item){  
			if(typeof(item.ifChose) == "undefined"){ 
				this.$set(item,"ifChose",true);
			}else{
				item.ifChose = true; 
			} 
		},
		removeClass:function(item){
			item.ifChose = false;
		}
	},
	computed:{
		publishTitle:function(){
			if(this.movieType == "hot"){
				return "影院热门"
			}else if(this.movieType == "new"){
				return "即将上线"
			}else if(this.movieType == "top"){
				return "豆瓣高分"
			}; 
		}
	}
}

</script>


<style>  
#publish_box {
	padding: 60px 0 0 0;
}

#publish_box .title {
	padding: 10px 0;
}

#publish_box .title h2 {
	margin: 0;
	height: 40px;
	padding-left: 30px;
	line-height: 40px;
	float: left;
	font-size: 20px;
}

#publish_box .title h2.new-title {
	background: url(../../assets/svg/new.svg) no-repeat left center;
	background-size: 20px;
	color: #1296db;
}

#publish_box .title h2.hot-title {
	background: url(../../assets/svg/hot.svg) no-repeat left center;
	background-size: 20px;
	color: #d81e06;
}

#publish_box .title h2.top-title {
	background: url(../../assets/svg/top.svg) no-repeat left center;
	background-size: 20px;
	color: #abcd03;
}

#publish_box .title a {
	margin: 0;
	display: block;
	padding: 0 20px;
	height: 40px;
	border: 1px solid #abcd03;
	line-height: 40px;
	float: right;
	border-radius: 20px;
	font-size: 14px;
	color: #abcd03;
}

#publish_box .title a:hover {
	text-decoration: none;
}

#publish_box .title a:active {
	background: #abcd03;
	color: #fff;
}

.publish-list {
	margin-bottom: 3px;
	background: #fff;
	position: relative;
}

.publish-list a {
	display: block;
	box-shadow: 0 0 5px #ccc;
}

.publish-list a:hover {
	text-decoration: none;
}

.publish-list .publish-pic {
	width: 100%;
	padding-bottom: 130%;
	height: 0;
	overflow: hidden;
	position: relative;
}

.publish-list .publish-pic img {
	width: 100%;
}
 

.publish-list .publish-text {
	width: 100%;
	background: #fff;
}

.publish-list .publish-text p {
	padding: 10px;
	margin: 0;
	font-size: 16px;
	color: #111;
}

.publish-list .publish-text i {
	display: block;
	font-style: normal;
	padding: 0 0 10px 10px;
	margin: 0;
	font-size: 12px;
	color: #1296db;
}

.loading-height {
	padding-bottom: 50%;
}

.publish-list.chose .publish-pic .float-board {
	opacity: 1;
}

@media (max-width: 720px) {
 
	#publish_box {
		padding: 20px 0 0 0;
	}

	#publish_box .title h2 {
		font-size: 14px;
		height: 24px;
		line-height: 24px;
	}

	#publish_box .title a {
		font-size: 12px;
		height: 24px;
		padding: 0 10px;
		line-height: 24px;
	}

	.publish-list .publish-text p {
		font-size: 12px;
		padding: 5px;
	}

	.publish-list .publish-text i {
		padding: 0 0 5px 5px;
	}
} 
</style>