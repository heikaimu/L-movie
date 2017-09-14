<template> 
	<div class="navbar navbar-fixed-top web-header">
		<!-- 头部主体 -->
		<div class="container-fluid">
			<div class="navbar-header clearfix"> 
				<a @click="prevPage" class="back-btn" v-if="backShow"></a>
				<p class="title text-center" v-text="title"></p>
				<a @click="openUserCenter" class="user-center"></a>
			</div> 
		</div>
		<!-- 右侧隐藏导航 -->
		<transition name="slide-fade">  
			<div class="hide-top-nav" v-if = "showHideNav">
				<div class="ifo-box">
					<div class="head-pic"><img src="https://avatars0.githubusercontent.com/u/20633425?v=3&s=460"></div>
					<p class="name text-center" v-text="userIfo.name"></p>
				</div>
				<div class="user-nav"> 
					<!-- <a href="">我的资料</a>  -->
					<router-link to="/CollectionMovie" @click.native="closeUserCenter">电影收藏</router-link>
					<router-link to="/CollectionBook" @click.native="closeUserCenter">图书收藏</router-link> 
				</div>
			</div> 
		</transition>
		<!-- 蒙版层 -->
		<transition name="fade">   
			<div class="black-board" @click = "closeUserCenter" v-if = "showHideNav"><span></span></div>
		</transition> 
	</div> 
</template>

<script>
	import Store from '../../assets/js/store.js'
	export default {
		data: function (){
			return {
				backShow: true,
				backPath: "",
				title:"LYW",
				showHideNav: false, 
				userIfo: {
					'name': "",
					'img': ""
				}
			}
		},  
		mounted: function(){
			this.backBtnShow();
			this.headerText();
		},
		methods:{
			prevPage: function (){
				this.$router.go(-1) 
			}, 
			headerText: function(){  
				if(this.$route.path == "/" || this.$route.path == "/Movie" || this.$route.name == "MovieList" || this.$route.name == "MovieDetail" || this.$route.name == "CastsDetail"){
					this.title = "电影";
				}else if(this.$route.path == "/Book" || this.$route.name == "BookList" || this.$route.name == "BookDetail"){
					this.title = "图书";
				}else if(this.$route.path == "/CollectionMovie"){
					this.title = "我的电影收藏";
				}else if(this.$route.path == "/CollectionBook"){
					this.title = "我的图书收藏";
				}

			},
			backBtnShow: function(){
				if(this.$route.path == '/' || this.$route.path == '/Movie' || this.$route.path == '/Book' || this.$route.path == '/Music' || this.$route.path == '/Photo'){
					this.backShow = false;
				}else{
					this.backShow = true;
				}  
			},
			openUserCenter: function (){
				var loginUser = Store.sessionFetch("loginUser");  
				if(loginUser == ""){
					this.$router.push({ path: '/Login' });
				}else{ 
					this.showHideNav = true; 
					document.getElementById('app').style.overflow = "hidden"; 
					this.userIfo.name = loginUser.acount;
					this.userIfo.img = loginUser.img; 
				}  
			},
			closeUserCenter: function (){
				this.showHideNav = false; 
				document.getElementById('app').style.overflow = "auto"; 
			}
		},
		watch: {
			'$route' (){  
				this.backBtnShow(); 
				this.headerText();
			}
		}
	}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
		transition: all .5s ease-in-out;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0
	}

	.web-header {
		background: #d81e06;
		box-shadow: 0 0 3px #ccc;
	}

	.navbar-header {
		position: relative;
		width: 100%;
		margin: 0;
	}

	.navbar-header .back-btn {
		height: 50px;
		width: 50px;
		float: left;
		background: url(../../assets/svg/back.svg) no-repeat center center;
		background-size: 20px;
	}

	.navbar-header .title {
		height: 50px;
		width: 50%;
		position: absolute;
		left: 25%;
		top: 0;
		line-height: 50px;
		color: #fff;
		font-size: 18px;
		font-weight: 900;
		letter-spacing: 2px;
	}

	.navbar-header .user-center {
		height: 50px;
		width: 50px;
		float: right;
		background: url(../../assets/svg/nav.svg) no-repeat center center;
		background-size: 25px;
	}

	.black-board {
		width: 100%;
		height: 100%; 
		position: fixed;
		left: 0;
		top: 0;
		z-index: 233;
	}

	.black-board span {
		display: block;
		width: 100%;
		height: 100%;
		background: #111;
		opacity: 0.3; 
	}

	.hide-top-nav {
		width: 60%;
		height: 100%;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 2333;
		background: #333;
	}

	.hide-top-nav .ifo-box {
		width: 100%;
		height: 200px;
		padding-top: 50px;  
		position: relative;
	}

	.hide-top-nav .ifo-box:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #222;
	}

	.hide-top-nav .ifo-box .head-pic {
		width: 80px;
		height: 80px; 
		margin: 0 auto; 
		overflow: hidden;
		background: url(../../assets/svg/head-pic.svg) no-repeat center center;
		background-size: 100%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		-ms-border-radius: 50%;
		-o-border-radius: 50%;
	}

	.hide-top-nav .ifo-box .head-pic img {
		display: block;
		width: 100%;  
	}

	.hide-top-nav .ifo-box .name {
		color: #fff;
		padding-top: 10px;
	}

	.hide-top-nav .user-nav {
		width: 100%;
		height: calc(100% - 160px);
		background: rgb(51, 51, 51);
		overflow: auto;
	}

	.hide-top-nav .user-nav a {
		display: block; 
		width: calc(100% - 20px);
		margin: 0 10px;
		line-height: 50px;
		font-size: 16px;
		color: #f5f5f5;
		position: relative;
	}

	.hide-top-nav .user-nav a:active, .hide-top-nav .user-nav a:hover {
		text-decoration: none;
	}

	.hide-top-nav .user-nav a:before {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #222;
	}

	.hide-top-nav .user-nav a:after {
		position: absolute; 
		right: 0;
		top: 14px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		content: ''; 
		background: url(../../assets/svg/yjt2.svg) no-repeat center center;
		background-size: 130%; 
		font-weight: 900;
	}

</style>