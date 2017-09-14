<template>
    <div class="left-delete"> 
        <div class="move"
        @touchstart="_touchStart"
        @touchmove="_touchMove"
        @touchend="_touchEnd"
        :style="txtStyle">
        <slot></slot>
    </div>
    <div class="deleteIcon" :style="zIndex"  @click.prevent="deleteItem(index)"></div>
</div>
</template>

<script>
export default {
    props: {
        index: Number
    },
    data() {
        return {
                startX: 0,//触摸位置
                moveX: 0,//滑动时的位置
                disX: 0,//移动距离
                txtStyle: '',
                delWidth: 30,
                top: '',
                zIndex: 'z-index:-1',
            }
        },
        methods: { 
            _touchStart: function(ev) {  
                ev = ev || event;
                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    // console.log(this.startX)
                }
            },
            _touchMove: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // console.log('disX==>',this.disX)
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if(this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "transform:translateX(0)";
                    }else if (this.disX > 0) {// 如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        this.txtStyle = "transform:translateX(-" + this.disX + "%)";
                        if (this.disX >= this.delWidth) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth + "%)"; 
                        }
                    }
                }
            },
            _touchEnd: function(ev) {
                if (event.changedTouches.length == 1) {  
                    // console.log(event.changedTouches[0].clientX)
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                    if(this.disX < this.delWidth/2){
                        this.txtStyle = "transform:translateX(0)";
                    }else{
                        this.txtStyle = "transform:translateX(-" + this.delWidth + "%)"; 
                    }
                    
                }
            },
            deleteItem: function(index) { 
                this.$emit('deleteItem', index); 
            }
        }
    }
    </script>

    <style>
    .left-delete{
        width:100%; 
        height:0;
        padding-bottom: 30%;
        background: #ccc;
        position:relative;
        z-index:2;
    }
    .move{
        position: relative;
        width: 100%;
        height:0;
        padding-bottom: 30%; 
        transition: all .5s ease-in-out;
    }
    .deleteIcon{
        width: 30%;
        height:0;
        padding-bottom: 30%;
        background: url(../../assets/svg/junk-box.svg) no-repeat center center #d9534f;
        text-align: center; 
        position: absolute;
        right:0;
        top:0;  
    }
    </style>