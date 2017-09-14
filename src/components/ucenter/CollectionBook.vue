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
											<p class="emit genres">作者：<i v-text="item.author"></i></p>
										</div>
										<div class="year-type ">
											<p class="emit genres">出版社：<i v-text="item.publisher"></i></p>
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
				type:"book"
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

 