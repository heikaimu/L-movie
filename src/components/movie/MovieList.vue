<template> 
	<div id="movie_list_box">

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-12">
					<div class="movie-type-nav text-center">
						<router-link v-for="item in navArr" :to="{path:item.datapath}" v-text="item.name" :class="{chose:item.ifChose}" class="excessive"></router-link>
					</div>
				</div>
			</div>
		</div>

		<div class="container">  
			<!-- 内容 -->
			<div class="row"> 
				<transition-group name="list-complete" tag="div">
				<div class="publish-list col-xs-4 col-md-3 list-complete-item" v-for="(item,index) in movieJson" v-bind:key="item"> 
					<router-link :to="{path:'/MovieDetail/'+item.id}">
					<div class="publish-pic">
						<img :src="item.images.large"> 
					</div>
					<div class="publish-text excessive">
						<p class="emit" v-text="item.title"></p> 
					</div>
					</router-link>
				</div>   
				</transition-group>
		</div>
		<div class="row">
			<div class="col-xs-12 col-md-12 text-center">
				<p class="animated swing" v-if="loadingShow">加载中...</p>
				<button v-else class="btn excessive" @click="addMore">加载更多</button>
			</div>
		</div>
	</div> 
</div> 
</template>

<script> 
export default { 
	data:function(){
		return {
			movieType:'',
			startNum:0,
			pageSize:12,
			movieJson: "",
			loadingShow:false, 
			navArr:[
			{
				name:'热门',
				sign:'hot',
				datapath:'/MovieList/hot',
				ifChose:false
			},
			{
				name:'最新',
				sign:'new',
				datapath:'/MovieList/new',
				ifChose:false
			},
			{
				name:'高分',
				sign:'top',
				datapath:'/MovieList/top',
				ifChose:false
			}
			]
		}
	}, 
	// beforeRouteEnter:function(to, from, next){
	// 	alert("b");
	// 	next (vm=>{   
	// 		if(from.name == "MovieMain"){  
	// 			vm.changeAndFirstTimeLoad(); 
	// 		}  
	// 	});
	// }, 
	created: function() {
		this.changeAndFirstTimeLoad(); 
	}, 
	methods:{ 
		scrollWinodowTop: function(){ 
			document.body.scrollTop = document.documentElement.scrollTop = 0; 
		},
		getTopMovie: function(){ 
			this.loadingShow = true; 
			this.movieType = this.$route.params.id;  
			var typeStr = "";
			if(this.movieType == "hot"){ 
				typeStr = "in_theaters";
			}else if(this.movieType == "new"){ 
				typeStr = "coming_soon";
			}else if(this.movieType == "top"){ 
				typeStr = "top250";
			};
			const url = 'https://api.douban.com/v2/movie/'+typeStr+'?start='+this.startNum+'&count='+this.pageSize+'';
			this.$http.jsonp(url, {}, {
				headers: {

				},
				emulateJSON: true
			}).then(function(response) {
		      // 这里是处理正确的回调  
		      if(this.movieJson==""){
		      	this.movieJson = response.data.subjects; 
		      }else{ 
		      	this.movieJson = this.movieJson.concat(response.data.subjects);  
		      } 
		      this.loadingShow = false; 
		  }, function(response) {
		        // 这里是处理错误的回调
		        console.log(response)
		    });
		}, 
		addMore: function(){//加载更多
			this.startNum += this.pageSize;
			this.getTopMovie(); 
		},   
		lightNav: function(){//点亮分类切换导航
			var t = this;
			this.navArr.forEach(function(e,i){   
				if(e.sign == t.$route.params.id){ 
					e.ifChose = true;
				}else{
					e.ifChose = false;
				};
			}); 
		},
		changeAndFirstTimeLoad: function(){//第一次以及切换类型
			this.movieJson = [];
			this.startNum = 0;
			this.lightNav();
			this.getTopMovie(); 
		}

	},
	watch:{
		'$route' (to, from){     
			if(to.name == "MovieList" && from.name == "MovieList"){ //切换类型的时候才刷新接口
				this.changeAndFirstTimeLoad(); 
			} 
		}
	}
}

</script>


<style scoped>
#movie_list_box {
	padding: 40px 0;
}

.movie-type-nav {
	padding-bottom: 20px;
}

.movie-type-nav a {
	display: inline-block;
	width: 60px;
	height: 30px;
	margin: 0 5px;
	border: 1px solid #d81e06;
	line-height: 30px;
	color: #d81e06;
	font-size: 14px;
}

.movie-type-nav a.chose,.movie-type-nav a:active {
	background: #d81e06;
	color: #fff;
}

.movie-type-nav a:hover {
	text-decoration: none;
}

.publish-list {
	margin-bottom: 30px;
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

.publish-list .publish-pic .float-board {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	opacity: 0;
}

.publish-list .publish-pic .float-board span {
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 3;
	background: #111;
}

.publish-list .publish-pic .float-board i {
	display: block;
	width: 64px;
	height: 64px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -32px;
	margin-top: -32px;
	z-index: 4;
	background: url(../../assets/images/fdj.png);
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

.publish-list.chose .publish-pic .float-board {
	opacity: 1;
}

.swiper-pagination-progress {
	background: #666;
}

.swiper-pagination-progress .swiper-pagination-progressbar {
	background: #111;
}

@media (max-width: 720px) {
 
	#movie_list_box {
		padding: 20px 0;
	}

	.publish-list .publish-text p {
		font-size: 12px;
		padding: 5px;
	}
} 
</style>