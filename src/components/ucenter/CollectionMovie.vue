<template>
	<div id="my_collection">
		<div class="container">
			<div class="row demo" id="flip-list-demo"> 
				<transition-group name="list-complete" tag="div">
					<div class="col-xs-12 col-md-12 row-list list-complete-item" v-for="(item, index) in movieCollection" v-bind:key="item">
						<left-delete :index="index" @deleteItem="deleteItem">
							<router-link :to="{path:'/MovieDetail/'+item.id}">
								<div class="row-style">
									<div class="pic-box clearfix">
										<img :src="item.img">
									</div>
									<div class="ifo-box">
										<h3 v-text="item.name"></h3>
										<div class="year-type clearfix"> 
											<p class="emit genres">类型：<i v-text="item.genres"></i></p>
										</div>
										<div class="year-type">
											<p class="emit genres">主演：<i v-text="item.casts"></i></p>
										</div>
										<p class="emit year text-center" v-text="item.year"></p>
									</div>
								</div>
							</router-link>
						</left-delete>
					</div>
				</transition-group>
			</div> 
		</div>
	</div>
</template>


<script> 
	import Store from '../../assets/js/store.js'
	import leftDelete from '@/components/common/leftDelete.vue'

	export default {
		data: function() {
			return {
				loginUser:"",
				userIfo:"", 
				movieCollection:[], 
				type:"movie",
			}
		},
		components:{
			leftDelete
		},
		beforeRouteEnter: function (to, from, next){
			next (vm=>{ 
				vm.getUserCollection(); 
			});
		},   
		mounted: function() {
			this.getUserCollection(); 
		},
		methods: {
			getUserCollection: function(){
				var _this = this;  
				_this.loginUser = Store.sessionFetch("loginUser");  
				_this.userIfo = Store.localFetch(_this.loginUser.acount);
				if(typeof(_this.userIfo.collection) != "undefined"){
					if(typeof(_this.userIfo.collection[_this.type]) != "undefined"){
						_this.movieCollection = _this.userIfo.collection[_this.type];
					}
				}
				console.log(_this.movieCollection)
			},
			deleteItem: function(index) { 
				var _this = this;
				_this.movieCollection.splice(index, 1);
				var newData = {
					'key': _this.loginUser.acount,
					'value': _this.userIfo
				}
				Store.localSave(newData); 
			}, 

		}
	}


</script>

<style>
	

	.row-list{padding: 0; margin-top: 5px;} 
	.row-list a{text-decoration: none; color: #666;}
	.row-style{width: 100%; height: 0; padding-bottom: 30%; background: #fff;  border-bottom: 1px solid #e7e7e7; box-shadow: 0 0 5px #ccc; position: relative;} 
	.row-style .pic-box{width: 28%; height: 0; padding-bottom: 28%; margin: 1%; overflow: hidden; float: left;}
	.row-style .pic-box img{display: block; width: 100%;}
	.row-style .ifo-box{width: 70%; height: 0; padding-bottom: 30%; float: right;}
	.row-style .ifo-box h3{font-size: 20px; margin: 10px;}
	.row-style .ifo-box .year-type{position: relative; margin-left: 10px;} 
	.row-style .ifo-box .year{padding: 0 5px; height: 20px; margin: 0; font-size: 12px; background: #42b983; color: #fff; position: absolute; left: 1%; bottom: 8%; line-height: 20px;}
	.row-style .ifo-box .year-type p.genres{font-size: 14px; line-height: 1.4;}
	.row-style .ifo-box .year-type p.genres i{color: #666; font-style: normal;}
	.row-style .ifo-box .casts{margin-left: 10px;}
</style>