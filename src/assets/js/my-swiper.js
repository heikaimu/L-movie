 
export default{

   bannerSwiperOpt:{
    pagination : '#banner_nav',//分页
    paginationType : 'bullets',//分页样式（bullets，fraction，progress，custom）
    paginationClickable :true,//分页是否可以点击

    prevButton:'#banner_prev',//后退
    nextButton:'#banner_next',//前进

    autoplay: 5000,//可选选项，自动滑动
    speed:500,//渐变时间
    loop : true,//循环

    slidesPerView : 1,//一排显示的个数
    slidesPerGroup : 1,//一次滚动的个数

    centeredSlides : false,//初始的时候是左边开始还是中间开始
    // freeMode : true,//抵制反弹（该效果开起slidesPerGroup无效）
    effect : '',//渐变动画=>fade，cube，coverflow（slidesPerView！=1），flip（slidesPerView=1时候生效）
    observer:true,
    observeParents:true,
}, 

  //电影（最新）
  newMovie:{ 
    pagination : '#new_movie_page',//分页
    paginationType : 'progress',//分页样式（bullets，fraction，progress，custom） 

    prevButton:'#new_movie_prev',//后退
    nextButton:'#new_movie_next',//前进 

    speed:500,//渐变时间  
    slidesPerView : 5,//一排显示的个数
    slidesPerGroup : 1,//一次滚动的个数   
    spaceBetween : 15, 
    observer:true,
    observeParents:true, 

    breakpoints: {  
    //当宽度小于等于640
    640: {
      slidesPerView: 3,
      spaceBetween : 5
    }
  }

    
}, 

  //电影（热门）
  hotMovie:{ 
    pagination : '#hot_movie_page',//分页
    paginationType : 'progress',//分页样式（bullets，fraction，progress，custom）  
    // autoplay: 5000,//可选选项，自动滑动
    prevButton:'#hot_movie_prev',//后退
    nextButton:'#hot_movie_next',//前进

    speed:500,//渐变时间  
    slidesPerView : 5,//一排显示的个数
    slidesPerGroup : 1,//一次滚动的个数   
    spaceBetween : 15, 
    observer:true,
    observeParents:true, 

    breakpoints: {  
    //当宽度小于等于640
    640: {
      slidesPerView: 3,
      spaceBetween : 5
    }
  }
}, 

  //电影（口碑）
  topMovie:{ 
    pagination : '#top_movie_page',//分页
    paginationType : 'progress',//分页样式（bullets，fraction，progress，custom）  
    // autoplay: 5000,//可选选项，自动滑动
    prevButton:'#top_movie_prev',//后退
    nextButton:'#top_movie_next',//前进

    speed:500,//渐变时间  
    slidesPerView : 5,//一排显示的个数
    slidesPerGroup : 1,//一次滚动的个数   
    spaceBetween : 15, 
    observer:true,
    observeParents:true, 

    breakpoints: {  
    //当宽度小于等于640
    640: {
      slidesPerView: 3,
      spaceBetween : 5
    }
  }
}, 







}