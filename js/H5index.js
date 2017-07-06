//rem
function freshRem(){
    var desW=750;
    var winW=document.documentElement.clientWidth,
        ratio=winW/desW;
    document.documentElement.style.fontSize=ratio*100+'px'
}
freshRem();
window.addEventListener('resize',freshRem);




//第二步:通过ajax获取data
$.ajax({
    url:'http://api.iclient.ifeng.com/ClientNews?id=SYLB10,SYDT10&gv=5.4.0&os=ios&uid=8jWzrXDWQeep2Nw4AZYzmHxkbneHy4Fj',
    type:'get',
    dataType:'jsonp',
    jsonp:'callback',
    success:bindHTML
});
function bindHTML(data){
    //console.log(data)
    for(var i=0;i<data.length;i++){
        if(data[i].type=='focus'){
            focusData=data[i].item;
        }else{
            listData=data[i].item;
        }
    }
    console.log(listData);
    //第四步 foucus
    var focusTepHtml=$('#focusTemplate').html();
    var focusTepResult=ejs.render(focusTepHtml,{focusTepData:focusData});
    $('.swiper-wrapper').html(focusTepResult);

    //第四步 list
    var listTepHtml=$('#listTemplate').html();
    var listTepResult=ejs.render(listTepHtml,{listTepData:listData});
    $('.con').html(listTepResult);

    //focus
    var mySwiper=new Swiper('.swiper-container',{
        //参数配置 分页器 分页器的type类型
        loop:true, //无缝滚动
        autoplay:2000,
        pagination:'.swiper-pagination',
        paginationType:'fraction',
        autoplayDisableOnInteraction:false  //解决用户操作焦点图autoplay失效的问题
    });

    //iscroll 高度
    var _h=document.documentElement.clientHeight,
       height=$('header').height()+$('nav').height();
    $('.main').height(_h-height);
    //iscroll
    var myscroll=new iScroll('wrapper',{
        vScrollbar:false
    });

}