<template>
  <div id="app">  
  

    <!-- 头部 -->
    <transition name="slide-fade" mode="out-in"> 
      <web-header v-if = "topShow"></web-header>
    </transition>
    <!-- end_头部 --> 

    <div class="main-content">
     <transition name="slide-fade" mode="out-in"> 
      <!-- 内容 --> 
      <keep-alive include="MoviePublic,MovieMain">
        <router-view></router-view> 
      </keep-alive> 
      <!-- end_内容 --> 
    </transition>
  </div>

  <!-- 底部 -->
  <transition name="slide-fade" mode="out-in"> 
    <web-footer v-if = "footerShow"></web-footer>
  </transition>
  <!-- end_底部 -->

</div>
</template>

<script>
  import webHeader from '@/components/common/Header.vue'
  import webFooter from '@/components/common/Footer.vue' 

  export default {
    name: 'app',
    data :function(){
      return {
        topShow: true,
        footerShow: true
      }
    }, 
    components:{
      webHeader,webFooter
    },  
    mounted: function(){
      if(this.$route.path == '/Login'){
        this.topShow = false;
        this.footerShow = false;
      }else{
        this.topShow = true;
        this.footerShow = true;
      } 
      document.body.addEventListener('touchstart', function () {});   
    },
    methods:{  
      fetchDate:function(newVal,oldVal){   
        if(newVal.name == 'Login'){
          this.topShow = false;
          this.footerShow = false;
        }else{
          this.topShow = true;
          this.footerShow = true;
        }
      }
    },
    watch:{
      '$route':'fetchDate'
    }
  }


</script>

<style> 
 


  body{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    overflow: hidden;
  }

  #app{ 
    position: relative;
    z-index: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    padding: 50px 0 60px 0
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block; 
  }
  .list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active for <2.1.8 */ {
    opacity: 0; 
  }
  .list-complete-leave-active {
    position: absolute;
  }


  .slide-fade-enter-active,.slide-fade-leave-active {
    transition: all .5s ease-in-out
  }

  .slide-fade-enter,.slide-fade-leave-active {
    transform: translateX(100px);
    opacity: 0
  }

  .fade-enter-active,.fade-leave-active {
    transition: all .5s ease-in-out
  }

  .fade-enter,.fade-leave-active { 
    opacity: 0
  }

  ::-webkit-scrollbar {
    display: none
  }

  .excessive {
    transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -webkit-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out
  }

  .emit {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .emits {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden
  }

  .opacity {
    filter: alpha(opacity=50);
    -moz-opacity: .5;
    -khtml-opacity: .5;
    opacity: .5
  }

  .only-box {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box
  }

  .full-loading-box {
    width: 100%;
    height: 100vh;
    border-radius: 50px;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 23
  }

  .ico{font-family: "\5b8b\4f53"}

  .loading-box {
    width: 100%;
    height: 0;
    position: relative;
    border: 1px solid #e7e7e7
  }

  .loading-icon {
    display: block;
    width: 32px;
    height: 32px;
    background: url(assets/svg/loading1.svg);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -16px;
    margin-top: -16px;
    -webkit-animation: change 1s linear infinite;
    animation: change 1s linear infinite
  }

  @-webkit-keyframes change {
    0% {
      -webkit-transform: rotate(0)
    }

    25% {
      -webkit-transform: rotate(90deg)
    }

    50% {
      -webkit-transform: rotate(180deg)
    }

    75% {
      -webkit-transform: rotate(270deg)
    }

    100% {
      -webkit-transform: rotate(360deg)
    }
  }

</style>
