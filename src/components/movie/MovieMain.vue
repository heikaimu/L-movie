<template> 
  <div class="index-content">
    <!-- 轮播图 -->
    <movie-banner></movie-banner>
    <!-- end_轮播图 -->

    <!-- 电影（最热门） -->
    <movie-public type="hot"></movie-public>
    <!-- end_电影（最热门） -->

    <!-- 电影（最新） -->
    <movie-public type="new"></movie-public>
    <!-- end_电影（最新） -->
 
    <!-- 电影（最高分） -->
    <movie-public type="top"></movie-public>
    <!-- end_电影（最高分） --> 
  </div> 
</template>

<script>
import MovieBanner from '@/components/movie/MovieBanner.vue' 
import MoviePublic from '@/components/movie/MoviePublic.vue'   

export default {
  name: 'app', 
  components:{
    MovieBanner, 
    MoviePublic
  }
}



</script>


 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*过度动画*/
.slide-fade-enter-active {
  transition: all .5s ease-in-out;
}
.slide-fade-leave-active {
  transition: all .5s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(100px);
  opacity: 0;
}

#publish_box .swiper-container-horizontal > .swiper-pagination-progress{
  height: 2px;
 }

.swiper-pagination-bullet{ 
  width: 12px;
  height: 12px; 
  background: #fff;
  margin: 0 5px;
  opacity: 1;
  border: 1px solid #fff; 
}
.swiper-pagination-bullet-active{background: #abcd03;}
  
@media (max-width: 720px) {  
  .swiper-pagination-bullet{ 
  width: 6px;
  height: 6px; 
  background: #fff;
  margin: 0 5px;
  opacity: 1;
  border: 1px solid #fff; 
} 
 
} 

</style>
