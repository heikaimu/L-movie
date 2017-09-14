<template>
  <div id="book_detail"> 
    <!-- <div class="loading-box loading-height" v-if="loadingShow">
      <span class="loading-icon"></span>
    </div> -->
    <transition name="slide-fade">  
    <div class="container" v-if = "ifShowDetail">  

      <div class="row book-title">
        <div class="col-xs-12 col-md-12">
          <h3 v-text="detailData.title"></h3> 
          <button type="button" class="btn btn-primary" @click="addCollection" v-if="ifCollect">加入收藏</button>
          <button type="button" class="btn btn-success" v-if="!ifCollect">已收藏</button>
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="row movie-basic-ifo">

        <div class="col-xs-8 col-md-8 movie-plot">    
          <div class="basic-ifo clearfix"> 
            <div class="basic-ifo-list clearfix">
              <h5>中文名</h5>
              <p v-text="detailData.title"></p>
            </div> 
            <div class="basic-ifo-list clearfix">
              <h5>英文名</h5>
              <p v-text="detailData.origin_title"></p>
            </div> 
            <div class="basic-ifo-list clearfix">
              <h5>作者</h5>
              <p v-text="detailData.author"></p>
            </div> 
            <div class="basic-ifo-list clearfix">
              <h5>出版社</h5>
              <p v-text="detailData.publisher"></p>
            </div> 
            <div class="basic-ifo-list clearfix">
              <h5>出版日期</h5>
              <p v-text="detailData.pubdate"></p>
            </div> 
          </div>  
        </div>

        <div class="col-xs-4 col-md-4 movie-cover"> 
          <img class="" :src = "bookCover">
        </div>

      </div>
      <!-- end_基本信息 -->


      <!-- 作者和详情 -->
      <div class="row">
        <div class="col-xs-4 col-md-4 tab-title" v-for = "(item,index) in tabNav"><p class="text-center" :class="{'chose':item.ifActivate}" v-text = "item.title" @click = "swiperTo(index)"></p></div> 
      </div>

      <div class="row">
       <swiper :options="swiperOption"> 
        <div class="swiper-slide">
          <div class="intro"><p v-text = "detailData.summary"></p></div>
        </div>
        <div class="swiper-slide">
          <div class="intro"><p v-text = "detailData.author_intro"></p></div>
        </div>
        <div class="swiper-slide">
          <div class="comments"><p class="text-center">暂无</p></div>
        </div> 
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end_作者和想去 -->
 

  </div>
  </transition> 
</div>
</template>

<script>
import Store from '../../assets/js/store.js'
  export default { 
    data:function(){
      var t = this;
      return {  
        ifShowDetail:false, 
        detailData:"", 
        bookCover:"",
        author:"", 
      loginUser:"",//登录用户
      loginUserIfo:"",//登录用户的所有信息
      ifLogin:true,//是否登录
      thisCollection:"",//本次的电影信息
      collectionState:"",//0是无任何收藏，1是有收藏没得电影收藏，2是有电影收藏
      collection:{},//该用户的当前分类收藏
      ifCollect: true,//是否收藏 
      tabNav:[
      {
        title:"小说简介",
        ifActivate: true
      },
      {
        title:"作者介绍",
        ifActivate: false
      },
      {
        title:"小说评论",
        ifActivate: false
      }
      ],
      swiperOption: { 
        name: 'currentSwiper',   
        autoHeight: true,
        onSlideChangeEnd : function (swiper) { 
          t.tabNav.forEach(function(e,i){
            if(i == swiper.activeIndex){
              e.ifActivate = true;
            }else{
              e.ifActivate = false;
            }
          });
        }
      }, 
    }
  }, 
  beforeRouteEnter:function(to, from, next){
    next (vm=>{ 
      vm.getDetailData();  
      vm.scrollWinodowTop();
    });
  }, 
  computed: {
    swiper() {
      return (this.$children.find(children => children.options.name == 'currentSwiper').swiper)
    }
  },
  mounted:function(){    
    this.getDetailData();  
    this.scrollWinodowTop();
  },
  methods:{  
    scrollWinodowTop: function(){
      document.body.scrollTop = document.documentElement.scrollTop = 0; 
    },
    getDetailData:function(){
      this.ifShowDetail = false; 
      this.ifCollect = true;
      this.$http.jsonp('https://api.douban.com/v2/book/'+this.$route.params.id+'', {}, {
        headers: {

        },
        emulateJSON: true
      }).then(function(response) {
          // 这里是处理正确的回调 

          this.detailData = response.body; 
          this.bookCover = this.detailData.images.medium;
          this.author = this.createCastsString(this.detailData.author);

          this.ifShowDetail = true; 

          this.thisCollection = { 
            'name': this.detailData.title,
            'img': this.bookCover,
            'id': this.detailData.id,
            'year': this.detailData.pubdate,
            'author': this.detailData.author,
            'publisher': this.detailData.publisher,
          };


          this.chargeLogin();

        }, function(response) {
            // 这里是处理错误的回调
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
            if(typeof(_this.loginUserIfo.collection.book) == "undefined"){//没得电影收藏
              _this.collectionState = 1; 
            }else{//有电影收藏
              _this.collectionState = 2;
              _this.loginUserIfo.collection.book.forEach(function(e, i){//搜索是否已经收藏了当前节目
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
      addCollection: function (){
        var _this = this; 
        if(_this.loginUserIfo == ""){
          alert("请先登录")
        }else{  
          if(_this.collectionState == 0){//无任何收藏 
            var thisCollectionArr = [];
            thisCollectionArr.push(_this.thisCollection);
            _this.collection = {
              book: thisCollectionArr
            };
            _this.loginUserIfo.collection = _this.collection; 
          }else if(_this.collectionState == 1){//没有当前收藏分类  
            var thisCollectionArr = [];
            thisCollectionArr.push(_this.thisCollection); 
            _this.collection.book = thisCollectionArr; 
          }else if(_this.collectionState == 2){//由当前收藏分类
            var thisCollectionArr = _this.collection.book;
            thisCollectionArr.push(_this.thisCollection);
            _this.collection.book = thisCollectionArr;  
          };  
          var newData = {
            'key': _this.loginUser.acount,
            'value': _this.loginUserIfo
          }
          Store.localSave(newData); 
          _this.ifCollect = false; 
        }   
      },
      createString:function(arr){
        var str = ""; 
        arr.forEach(function(e,i){
          str += "、"+e;
        });
        return str.substring(1);
      },
      createCastsString:function(arr){
        var str = ""; 
        arr.forEach(function(e,i){
          str += "、"+e.name;
        });
        return str.substring(1);
      }, 
      swiperTo(index) {
        this.swiper.slideTo(index);
        this.tabNav.forEach(function(e,i){
          if(i == index){
            e.ifActivate = true;
          }else{
            e.ifActivate = false;
          }
        });
      }
    },   
  }
</script>

<style scoped>   
  #book_detail {
    margin-bottom: 20px;
  }

  .book-title{padding-bottom: 10px;}

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
    width: 35%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #666;
    font-weight: 900;
  }

  .basic-ifo .basic-ifo-list p {
    margin: 0;
    float: left;
    width: 60%;
    font-size: 16px;
    line-height: 20px;
    color: #1296db;
  }

  .movie-cover {
    padding-right: 0;
    padding-top: 10px;
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

  .tab-title {
    padding: 0;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    margin-top: 10px;
  }

  .tab-title p {
    margin: 0;
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #e7e7e7;
    font-size: 16px;
    font-weight: 900;
  }

  .tab-title p.chose {
    background: #d81e06;
    color: #fff;
  }

  .intro {
    padding: 10px;
  }

  .intro p {
    font-size: 14px;
    line-height: 2;
    font-size: 16px;
    text-indent: 2em;
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