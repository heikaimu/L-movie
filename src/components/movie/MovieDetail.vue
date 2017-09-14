<template>
	<div id="movie_detail">  

		<transition name="fade" mode="out-in"> 
		<div class="loading-box loading-height" v-if="loadingShow" key="loading">
			<span class="loading-icon"></span>
		</div>  
		<div class="container" v-else key="content">  
			<div class="row movie-basic-ifo">
				<div class="col-xs-12 col-md-12 movie-plot">  

					<h3 v-text="detailData.title"></h3>
					<button type="button" class="btn btn-primary" @click="addCollection" v-if="ifCollect">加入收藏</button>
					<button type="button" class="btn btn-success" v-if="!ifCollect">已收藏</button>
					<div class="plot">
						<p v-text="detailData.summary"></p>
					</div>
					<div class="basic-ifo clearfix">
						<div class="basic-ifo-list clearfix">
							<h5>中文名</h5>
							<p v-text="detailData.title"></p>
						</div>
						<div class="basic-ifo-list clearfix">
							<h5>主演</h5> 
							<p class="emit" v-text="casts" :title="casts"></p>
						</div> 
						<div class="basic-ifo-list clearfix">
							<h5>外文名</h5>
							<p class="emit" v-text="detailData.original_title" :title="detailData.original_title"></p>
						</div>  
						<div class="basic-ifo-list clearfix">
							<h5>上映时间</h5>
							<p v-text="detailData.year"></p>
						</div>
						<div class="basic-ifo-list clearfix">
							<h5>其他译名</h5>
							<p class="emit" v-text="aka" :title="aka"></p>
						</div>
						<div class="basic-ifo-list clearfix">
							<h5>豆瓣评分</h5>
							<p v-text="rating.average"></p>
						</div>  
						<div class="basic-ifo-list clearfix">
							<h5>制片国家</h5>
							<p class="emit" v-text="countries" :title="countries"></p>
						</div> 
						<div class="basic-ifo-list clearfix">
							<h5>导演</h5>
							<p><router-link :to="{path:'/people/'+directors.id}" v-text="directors.name"></router-link></p>
						</div>  
						<div class="basic-ifo-list clearfix">
							<h5>类型</h5>
							<p class="emit" v-text="genres" :title="genres"></p>
						</div>
						<div class="basic-ifo-list clearfix">
							<h5>分类</h5>
							<p class="emit" v-text="detailData.subtype"></p>
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-md-4 movie-cover"> 
					<img class="" :src="movieCover.large">
				</div>
			</div>

			<div class="row casts-ifo-box">
				<div class="col-xs-12 col-md-12">
					<h3>主演</h3>
				</div>
				<div class="col-xs-6 col-md-3" v-for="item in castsArr">
					<div class="casts-list"> 
						<router-link :to="{path:'/CastsDetail/'+item.id}">
							<img :src="item.avatars.large">
						</router-link> 
						<p class="emit" v-text="item.name"></p>
					</div>
				</div>
			</div>  
		</div>
		</transition> 


	</div>
</template>

<script>
	import Store from '../../assets/js/store.js'
	import publicFun from '../../assets/js/public.js'
	export default { 
		data:function(){
			return {  
				loadingShow:true,
				detailData:"",
				aka:"",
				casts:"",
				castsArr:"",
				movieCover:"",
				movieCasts:"", 
				directors:"",
				rating:"",
				countries:"", 
				genres:"", 
				loginUser:"",//登录用户
				loginUserIfo:"",//登录用户的所有信息
				ifLogin:true,//是否登录
				thisCollection:"",//本次的电影信息
				collectionState:"",//0是无任何收藏，1是有收藏没得电影收藏，2是有电影收藏
				collection:{},//该用户的当前分类收藏
				ifCollect: true,//是否收藏 
			}
		}, 
		beforeRouteEnter: function (to, from, next){
			next (vm=>{ 
				vm.getDetailData();    
			});
		}, 
		mounted: function(){
			this.getDetailData();  
		},
		methods: {  
			fetchDate: function (newVal,oldVal){   
			},  
			getDetailData: function (){    
				this.loadingShow = true; 
				this.ifCollect = true;
				this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+this.$route.params.id+'', {}, {
					headers: {

					},
					emulateJSON: true
				}).then(function(response) { 

					this.detailData = JSON.parse(response.bodyText); 
					this.castsArr = this.detailData.casts;
					this.movieCover = this.detailData.images; 
					this.rating = this.detailData.rating;  
					this.genres = this.createString(this.detailData.genres);
					this.aka = this.createString(this.detailData.aka);
					this.countries = this.createString(this.detailData.countries);
					this.directors = this.detailData.directors[0];
					this.casts = this.createCastsString(this.castsArr);   
					this.thisCollection = {
						'name': this.detailData.title,
						'img': this.movieCover.small,
						'id': this.detailData.id,
						'year': this.detailData.year,
						'casts': this.casts,
						'genres': this.genres,
					};
					publicFun.scrollToTop();
					this.chargeLogin();
					this.loadingShow = false;
				}, function(response) { 
					console.log(response)
				});
			},
			chargeLogin: function (){
				var _this = this;
				_this.loginUser = Store.sessionFetch("loginUser");  
				if(_this.loginUser == ""){//如果没有登录
					_this.ifLogin = false;
				}else{//已经登录
					_this.ifLogin = true;  
					_this.loginUserIfo = Store.localFetch(_this.loginUser.acount); 
					if(typeof(_this.loginUserIfo.collection) == "undefined"){//没有收藏
						_this.collectionState = 0;
						_this.collection = {};
					}else{//有收藏
						if(typeof(_this.loginUserIfo.collection.movie) == "undefined"){//没得电影收藏
							_this.collectionState = 1; 
						}else{//有电影收藏
							_this.collectionState = 2;
							_this.loginUserIfo.collection.movie.forEach(function(e, i){//搜索是否已经收藏了当前节目
								if(e.id == _this.thisCollection.id){
									_this.ifCollect = false;
								}
							}); 
						}
						_this.collection = _this.loginUserIfo.collection;
					}
				}; 
				console.log(_this.loginUserIfo)
			},
			createString: function (arr){
				var str = ""; 
				arr.forEach(function(e,i){
					str += "、"+e;
				});
				return str.substring(1);
			},
			createCastsString: function (arr){
				var str = ""; 
				arr.forEach(function(e,i){
					str += "、"+e.name;
				});
				return str.substring(1);
			},
			addCollection: function (){
				var _this = this; 
				if(_this.loginUserIfo == ""){
					alert("请先登录")
				}else{  
					if(_this.collectionState == 0){//无任何收藏 
						var thisCollectionArr = [];
						thisCollectionArr.push(_this.thisCollection);
						_this.collection = {
							movie: thisCollectionArr
						};
						_this.loginUserIfo.collection = _this.collection; 
					}else if(_this.collectionState == 1){//没有当前收藏分类  
						var thisCollectionArr = [];
						thisCollectionArr.push(_this.thisCollection); 
						_this.collection.movie = thisCollectionArr; 
					}else if(_this.collectionState == 2){//由当前收藏分类
						var thisCollectionArr = _this.collection.movie;
						thisCollectionArr.push(_this.thisCollection);
						_this.collection.movie = thisCollectionArr;  
					};  
					var newData = {
						'key': _this.loginUser.acount,
						'value': _this.loginUserIfo
					}
					Store.localSave(newData); 
					_this.ifCollect = false;
				}   
			}
		},   
	}
</script>

<style scoped>   

	#movie_detail {
		margin-bottom: 20px;
	}

	.close-btn a:hover {
		text-decoration: none;
	}

	.movie-basic-ifo {
		background: #fff;
		box-shadow: 0 0 5px #ccc;
	}

	.plot p {
		font-size: 16px;
		line-height: 2;
	}

	.basic-ifo .basic-ifo-list {
		width: 50%;
		float: left;
		padding: 10px 0;
		border-bottom: 1px dashed #e7e7e7;
	}

	.basic-ifo .basic-ifo-list:last-child {
		border: none;
	}

	.basic-ifo .basic-ifo-list a {
		text-decoration: underline;
	}

	.basic-ifo .basic-ifo-list h5 {
		margin: 0;
		float: left;
		width: 25%;
		height: 20px;
		line-height: 20px;
		font-size: 16px;
		color: #666;
		font-weight: 900;
	}

	.basic-ifo .basic-ifo-list p {
		margin: 0;
		float: left;
		width: 70%;
		line-height: 20px;
		font-size: 16px;
		color: #1296db;
	}

	.movie-cover {
		padding-right: 0;
	}

	.movie-cover img {
		display: block;
		width: 100%;
	}

	.casts-ifo-box {
		margin-top: 50px;
		padding: 0 0 20px 0;
		background: #fff;
		box-shadow: 0 0 5px #ccc;
	}

	.casts-list {
		padding: 5px;
		margin-bottom: 30px;
		border: 1px solid #e7e7e7;
	}

	.casts-list a {
		display: block;
		width: 100%;
		padding-bottom: 100%;
		height: 0;
		overflow: hidden;
		background: #111;
	}

	.casts-list a img {
		display: block;
		max-width: 100%;
		margin: 0 auto;
	}

	.casts-list p {
		margin: 5px 0;
		font-size: 16px;
		color: #111;
		line-height: 2;
	}

	.loading-height {
		padding-bottom: 140%;
		border-bottom: none;
	}

	@media (max-width: 720px) {

		.back-nav {
			position: relative;
		}

		.basic-ifo .basic-ifo-list {
			width: 100%;
		}

		.movie-cover {
			padding-right: 15px;
		}
	} 
</style>