<template> 
	<div id="login_register">
		<div class="login-head"> 
			<router-link to = "/Movie" class="back-btn"></router-link>
		</div>
		<div class="login-pic"></div>
		<div class="container">
			<div class="row"> 
				<transition name="custom-classes-transition" enter-active-class="animated zoomInLeft" leave-active-class="animated rollOut">
					<div class="col-xs-12 col-md-12 form-box" id="login" v-if="showLogin">
						<div class="login-box">
							<div class="form-list">
								<span class="acount"></span>
								<label class="">
									<input type="text" name="" placeholder = "账户" v-model="loginAcount">
								</label>
							</div>
							<div class="form-list">
								<span class="password"></span>
								<label class="">
									<input type="password" name="" placeholder = "密码" v-model="loginPassword">
								</label>
							</div>
							<div class="btn-box">
								<button @click="loginNow">SIGN IN</button>
							</div>
							<div class="text-box">
								<p>没有账号？</p>
								<a @click="loginTab(false)">去注册</a>
							</div>
						</div>
					</div> 
				</transition>

				<transition name="custom-classes-transition" enter-active-class="animated zoomInLeft" leave-active-class="animated rollOut">
					<div class="col-xs-12 col-md-12 form-box" id="register" v-if="!showLogin">
						<div class="login-box">
							<div class="form-list">
								<span class="acount"></span>
								<label class="">
									<input type="text" name="" placeholder = "账户" v-model = "registerAcount">
								</label>
							</div>
							<div class="form-list">
								<span class="password"></span>
								<label class="">
									<input type="password" name="" placeholder = "密码" v-model = "registerPassword">
								</label>
							</div>
							<div class="form-list">
								<span class="password"></span>
								<label class="">
									<input type="password" name="" placeholder = "确认密码" v-model = "registerPasswordAgain">
								</label>
							</div>
							<div class="btn-box">
								<button @click="registerNow">REGISTER</button>
							</div>
							<div class="text-box">
								<p>已有账号？</p>
								<a @click="loginTab(true)">去登录</a>
							</div>
						</div>
					</div> 
				</transition>

			</div>
		</div>
	</div> 
</template>

<script>
	import Store from '../../assets/js/store.js'
	export default {
		data: function (){
			return {
				showLogin: true,
				loginAcount: "",
				loginPassword: "",
				registerAcount: "",
				registerPassword: "",
				registerPasswordAgain: ""
			}
		}, 
		beforeRouteEnter: function (to, from, next){   
			next (vm=>{   
				vm.showLogin = true;
			});
		},  
		methods:{
			prevPage: function (){
				this.$router.go(-1) 
			}, 
			loginNow: function(){ 
				var _this = this;
				var user = Store.localFetch(_this.loginAcount);   
				if(user != ""){
					if(_this.loginPassword == user.password){
						var loginUser = {
							'key': 'loginUser',
							'value': {
								'acount': _this.loginAcount,
								'password': _this.loginPassword
							}
						}
						Store.sessionSave(loginUser); 
						_this.$router.push({ path: '/' });
					}else{
						alert("密码不正确");
					}
				}else{
					alert("账户不存在");
				} 
			},
			registerNow: function(){
				var _this = this;
				if(_this.registerAcount == "" || _this.registerPassword == "" || _this.registerPasswordAgain == ""){
					alert("信息不能有空");
					return false;
				}else if(_this.registerPassword != _this.registerPasswordAgain){
					alert("前后密码不一致");
					return false;
				}else{
					// 首先获取当前用户名的local信息
					var user = Store.localFetch(_this.registerAcount);  
					if(user == ""){//没有当前用户可以注册
						var registerUser = {
							'key': _this.registerAcount,
							'value': {
								'acount': _this.registerAcount,
								'password': _this.registerPassword
							}
						};   
						Store.localSave(registerUser); 
						_this.showLogin = true;
					}else{
						alert("已经注册了")
					}
					
				} 
			},
			loginTab: function(r){
				this.showLogin = r;
			}
		}
	}
</script>

<style scoped>
	/*.login-tab-btn p{color: #fff;}*/
	#login_register{width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: #3a3a3a;}
	#login_register .login-head{width: 100%; height: 50px; position: fixed; left: 0; top: 0;}
	#login_register .login-head .back-btn{display: block; width: 50px; height: 50px; background: url(../../assets/svg/back.svg) no-repeat center center;
		background-size: 20px;}

		#login_register .login-pic{width: 100px; height: 100px; position: fixed; left: 50%; margin-left: -50px; top: 50px; background: url(../../assets/svg/logo.svg) no-repeat center center; background-size: 100%;}

	/*#login{margin-top: -110px;}
	#register{margin-top: -130px;}*/

	.form-box{position: absolute; left: 15%; top: 200px;}
	.login-box{width: 70%;}
	.login-box .form-list{width: 100%; height: 40px; margin-bottom: 15px;}
	.login-box .form-list span{display: block; width: 40px; height: 40px; background: #262a2d; float: left;}
	.login-box .form-list span.acount{background: url(../../assets/svg/acount.svg) no-repeat center center #262a2d; background-size: 65%;}
	.login-box .form-list span.password{background: url(../../assets/svg/password.svg) no-repeat center center #262a2d; background-size: 65%;}
	.login-box .form-list label{display: block; margin: 0; width: calc(100% - 40px); height: 40px; background: #3a4149; float: left;}
	.login-box .form-list label input{text-indent: 1em; border: none; outline: none; width: 100%; height: 100%; background: transparent; color: #cfd2d9; font-size: 14px; letter-spacing: 1px;} 
	.login-box .form-list label input::-webkit-input-placeholder { /* WebKit browsers */
		color: #cfd2d9;
	}
	.login-box .form-list label input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
		color: #cfd2d9;
	}
	.login-box .form-list label input::-moz-placeholder { /* Mozilla Firefox 19+ */
		color: #cfd2d9;
	}
	.login-box .form-list label input:-ms-input-placeholder { /* Internet Explorer 10+ */
		color: #cfd2d9;
	}
	.login-box .btn-box button{width: 100%; height: 40px; background: #4ba1ea; border: 1px solid #1f3a57; color: #fff; outline: none; font-size: 16px; letter-spacing: 1px; text-shadow:1px 1px 2px #666; position: relative;}
	.login-box .btn-box button:active{box-shadow: 0 0 3px #111; top: 1px;}
	.login-box .text-box p{float: left; margin: 0; line-height: 40px; font-size: 14px; color: #979596;}
	.login-box .text-box a{float: right; margin: 0; line-height: 40px; font-size: 14px; color: #f4f4f4;}
	.login-box .text-box a:active,.login-box .text-box a:hover{text-decoration: none;}

</style>


