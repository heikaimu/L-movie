import Vue from 'vue'
import Router from 'vue-router'
// 测试用
import test from '@/components/common/test'

// 登录注册
import LoginAndRegister from '@/components/common/LoginAndRegister'
// 电影
import MovieMain from '@/components/movie/MovieMain'
import MovieDetail from '@/components/movie/MovieDetail' 
import MovieList from '@/components/movie/MovieList'  
import CastsDetail from '@/components/movie/CastsDetail'
// 书籍
import BookMain from '@/components/book/BookMain'
import BookList from '@/components/book/BookList'
import BookDetail from '@/components/book/BookDetail'
// 音乐
import MusicMain from '@/components/music/MusicMain'
// 图集
import PhotoMain from '@/components/photo/PhotoMain' 

// 用户中心
import CollectionMovie from '@/components/ucenter/CollectionMovie' 
import CollectionBook from '@/components/ucenter/CollectionBook' 

Vue.use(Router)

export default new Router({ 
  routes: [
  // 测试用
  {path: '/test', name:'test', component: test},
  // 登录注册
  {path: '/Login', name:'Login', component: LoginAndRegister},
  // 首次进入空白页
  {path: '/', name:'MovieMain', component: MovieMain},
  // 电影
  {path: '/Movie', name:'MovieMain', component: MovieMain},
  {path: '/MovieDetail/:id', name:'MovieDetail', component: MovieDetail},
  {path: '/MovieList/:id', name:'MovieList', component: MovieList},
  {path: '/CastsDetail/:id', name:'CastsDetail', component: CastsDetail},
  // 书籍
  {path: '/Book', name:'BookMain', component: BookMain},
  {path: '/BookList/:name', name:'BookList', component: BookList},
  {path: '/BookDetail/:id', name:'BookDetail', component: BookDetail},
  // 音乐
  {path: '/Music', name:'MusicMain', component: MusicMain},
  // 图集
  {path: '/Photo', name:'PhotoMain', component: PhotoMain}, 
   // 用户中心
   // 电影收藏
  {path: '/CollectionMovie', name:'CollectionMovie', component: CollectionMovie}, 
   // 图书收藏
  {path: '/CollectionBook', name:'CollectionBook', component: CollectionBook}, 
  ]
});
