<template> 
  <div id="article_detail">
   <div class="container">

    <div class="row">
      <div class="col-xs-12 col-md-12">
        <h1 class="text-center title">新世纪福音战士</h1>  
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-12">
      <div class="article-content">
        <p>《新世纪福音战士》（简称EVA）是由龙之子工作室（タツノコプロ）、GAINAX两家日本动画公司共同制作的动画作品，于1995年10月4日在日本首播，全26集。由庵野秀明担任主要编剧及总导演，贞本义行担任角色设计，绪方惠美、林原惠、宫村优子、三石琴乃等人担任主要配音。</p>
        <img src="../../assets/images/banner.jpg">
        <p>故事剧情描述的是一个有关“第二次冲击”的记事，公元2000年有颗巨大的陨石坠落在南极冰山附近，高温造成部分冰块溶化，连带使得全球水位上涨，接下来的天灾人祸更是连绵不断，公元2015年又出现了新的入侵者，一种似人的巨大机械战斗群，人们将之称为”使徒”，大概是影射他们是上帝派来的使者，要来消灭作恶多端的人类吧。人类此刻的各种军事武器对使徒可说是毫无用处，为此，当时地球的政治中心决定重用NERV这个组织，他们以最精密的技术，花费巨资研究出一种以驾驶员的神经直接控制的”泛用人形决战兵器”，这种高科技产物将驾驶员与机器做了精细的契合，籍由意志及身体的反映来控制EVA。不过由于当时这些技术还在研发阶段，所以有许多障碍还无法立即克服。而且因为并不是每个人都能自由的驾驶EVA。驾驶人选一直是NERV最头疼的地方，除了符合条件的人难觅，而且还必须经过几个月训练才能和EVA达到同步活动的基本能力。而后，在世界上发现了3名可以驾驶EVA的少男少女，人们把希望都寄托在了他们身上。[2] </p>
      </div>
    </div>
    </div>

    <div class="row">
      <div class="col-xs-6 col-md-6 text-left"><input class="btn btn-default" type="submit" value="上一页"></div>
      <div class="col-xs-6 col-md-6 text-right"><input class="btn btn-default" type="submit" value="下一页"></div>  
    </div>

  </div>
</div> 
</template> 
<script>
export default {
  name: 'NewsContent',
  data () {
    return {
      msg: '我是联系我们'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#article_detail{padding: 20px 0;}
.title{margin-bottom: 20px;}
.article-content p{font-size: 16px; line-height: 2; margin-bottom: 10px;}
.article-content img{display: block; max-width: 100%; height: auto; margin-bottom: 10px;}
</style>
