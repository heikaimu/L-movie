<template> 
	<div id="movie_list_box"> 

		<div class="container">  
			<!-- 内容 -->
			<div class="row"> 
				<transition-group name="list-complete" tag="div">
				<div class="publish-list col-xs-4 col-md-3 list-complete-item" v-for="(item,index) in bookJson" v-bind:key="item"> 
					<router-link :to="{path:'/BookDetail/'+item.id}">
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
					<button v-if="butShow" class="btn excessive" @click="addMore">加载更多</button>
				</div>
			</div>
		</div> 

	</div> 
</template>

<script> 
	export default { 
		data:function(){
			return { 
				startNum:0,
				pageSize:12,
				bookJson:"",
				bookType:"",
				loadingShow:false,
				butShow:false
			}
		},   
		beforeRouteEnter:function(to, from, next){
			next (vm=>{ 
				vm.bookJson = [];
				vm.getBook(); 
				vm.scrollWinodowTop(); 
			});
		},  
		created: function(){
			this.bookJson = [];
			this.getBook(); 
			this.scrollWinodowTop(); 
		},
		methods:{ 
			scrollWinodowTop: function(){
				document.body.scrollTop = document.documentElement.scrollTop = 0; 
			},
			getBook: function(){ 
				this.loadingShow = true;
				this.butShow = false;
				this.bookType = this.$route.params.name;  
				console.log(this.bookType)
				const url = 'https://api.douban.com/v2/book/search?tag='+this.bookType+'&start='+this.startNum+'&count='+this.pageSize+'&fields=id,title,images';
				this.$http.jsonp(url, {}, {
					headers: {

					},
					emulateJSON: true
				}).then(function(response) {
		      // 这里是处理正确的回调  
		      console.log(response)
		      if(this.bookJson==""){
		      	this.bookJson = response.body.books; 
		      }else{ 
		      	this.bookJson = this.bookJson.concat(response.body.books);  
		      } 
		      this.loadingShow = false;
		      this.butShow = true;
		  }, function(response) {
		        // 这里是处理错误的回调
		        console.log(response)
		    });
			}, 
		addMore: function(){//加载更多
			this.startNum+=this.pageSize;
			this.getBook(); 
		}
	}
}

</script>


<style scoped>
	#movie_list_box {
		padding: 40px 0;
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