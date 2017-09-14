<template>
 <!-- 底部 -->
 <footer class="footer" id="footer">
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-3 col-sm-3" v-for="item in footerNav">
          <router-link :to="{path:item.path}" class="excessive text-center" :class="[item.footerNavClass,item.ifChose]" @click.native="light(item)" v-text="item.name"></router-link> 
      </div>  
    </div> 
  </div>
</footer>
<!-- end_底部 -->
</template>

<script>
export default {
  data: function(){
    return { 
      footerNav: [
        {
          path:'/Movie',
          name:'电影',
          footerNavClass:'movie',
          ifChose:""
        },
        {
          path:'/Book',
          name:'图书',
          footerNavClass:'book',
          ifChose:""
        },
        {
          path:'/Music',
          name:'音乐',
          footerNavClass:'music',
          ifChose:""
        },
        {
          path:'/Photo',
          name:'图片',
          footerNavClass:'photo',
          ifChose:""
        }
      ]
    }
  },
  methods:{
    light: function(item){
      this.footerNav.forEach(function(e,i){
        e.ifChose = "";
      });
      item.ifChose = "chose";
    }, 
    footerLight: function(){ 
      if(this.$route.path == "/" || this.$route.path == "/Movie"){
        this.footerNav[0].ifChose = "chose";
      }else if(this.$route.path == "/Book"){
        this.footerNav[1].ifChose = "chose";
      }else if(this.$route.path == "/Music"){
        this.footerNav[2].ifChose = "chose";
      }else if(this.$route.path == "/Photo"){
        this.footerNav[3].ifChose = "chose";
      }
    }
  },
  mounted: function(){ 
    this.footerLight(); 
  }
}
</script>
<style scoped>
/*底部*/ 
#footer {
  width: 100%;
  background: #2b2c2d;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 233;
}

#footer a {
  display: block;
  width: 100%;
  height: 53px;
  padding: 30px 0 3px 0;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-decoration: none;
}

#footer a:hover {
  text-decoration: none;
}

#footer a.movie {
  background: url(../../assets/svg/movie.svg) no-repeat center 8px;
  background-size: 22px;
}

#footer a.book {
  background: url(../../assets/svg/book.svg) no-repeat center 8px;
  background-size: 22px;
}

#footer a.music {
  background: url(../../assets/svg/music.svg) no-repeat center 8px;
  background-size: 22px;
}

#footer a.photo {
  background: url(../../assets/svg/photo.svg) no-repeat center 8px;
  background-size: 22px;
}

#footer a.movie.chose,#footer a.movie:active {
  background-color: #d81e06;
}

#footer a.book.chose,#footer a.book:active {
  background-color: #d81e06;
}

#footer a.music.chose,#footer a.music:active {
  background-color: #d81e06;
}

#footer a.photo.chose,#footer a.photo:active {
  background-color: #d81e06;
}
</style>