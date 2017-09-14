<template>
  <!-- 轮播图 --> 
  <div> 

    <swiper :options="swiperOption"> 
      <div class="swiper-slide banner-list" v-for="item in bannerJson">
          <img :src="item.img"> 
        </div> 
      <!-- 小点 -->
       <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

  </div>
  <!-- end_轮播图 -->
</template>

<script>  
  import SwiperOpt from '../../assets/js/my-swiper.js'
  export default {
    data: function(){
      return { 
        bannerJson:[
        {
          img:'http://image11.m1905.cn/uploadfile/2017/0519/thumb_1_1660_470_20170519104039334047.jpg', 
          id:'1'
        },
        {
         img:'http://image11.m1905.cn/uploadfile/2017/0518/thumb_1_1660_470_20170518092451789188.jpg', 
         id:'2'
       },
       {
         img:'http://image11.m1905.cn/uploadfile/2017/0401/thumb_1_1660_470_20170401020658278762.jpg', 
         id:'3'
       },
       {
         img:'http://image11.m1905.cn/uploadfile/2017/0510/thumb_1_1660_470_20170510010300283033.jpg', 
         id:'4'
       },
       {
         img:'http://image11.m1905.cn/uploadfile/2017/0419/thumb_1_1660_470_20170419104642230119.jpg', 
         id:'5'
       },
       {
         img:'http://image11.m1905.cn/uploadfile/2017/0415/thumb_1_1660_470_20170415124108119179.jpg', 
         id:'6'
       },
       {
         img:'http://image11.m1905.cn/uploadfile/2017/0419/thumb_1_1660_470_20170419105812724426.jpg', 
         id:'7'
       }
       ],
       swiperOption: {  
        pagination: '.swiper-pagination', 
        }
     }
   }
}


</script>
<style>
  /*轮播图*/ 
  .banner-list img{width: 100%;}  
  
  @media (max-width: 720px) { 
  } 
</style>