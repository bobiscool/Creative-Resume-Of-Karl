/**
 * Created by mac on 16/8/21. 由于 整个动画需要很多图片,所以设置了一个预加载函数
 */
var preloaderDiv = document.getElementById('preloader');
var timer2 =null; // 设置一个全局的时钟
var newimages=[];
//console.log(preloaderDiv);
var progressIb = document.getElementById('progressIb');
var O_Laocar =  document.getElementById('Laocar');
var O_Laotext =  document.getElementById('Laosiji');

function showPreloadDIVorIfitisIEjustdontletRun() {//不在IE运行
    "internet explorer" == browserName?$(preloaderDiv).addClass('IEFUCKER'):$(preloaderDiv).addClass('displayshow');
}
showPreloadDIVorIfitisIEjustdontletRun();


function hidePreloader(){   //预加载完成之后 隐藏预加载页面
    preloaderDiv.setAttribute('class','displaynone')
}
function hidefallAnimation(){
    fallAnimation.setAttribute('class','displaynone');
}
function hideKeynotice() {
    Keynotice.setAttribute('class','displaynone');
}
function showKeynotice() {
    Keynotice.setAttribute('class','ALLdisplayshow');
}

function FallAnimation(){
    var i=0;
    var j=0;
    var timer = setInterval(function(){i++;fallAnimationIMG.className="fall_"+i+' fallAnimationIMG'; },30);
    timer2 = setInterval(function(){j++;if(j%2){showKeynotice();}else{hideKeynotice();}},400);
    $(fallAnimation).animate({bottom:"20%"},2000,'linear',function(){
        clearInterval(timer);
        hidePreloader();
        hidefallAnimation();
        OKarl2.style.display = "block";
        //document.addEventListener('keydown',F_forstopWalking);
        Walking(function(){});

        // $(OKarl2).on('keydown',F_forstopWalking);
    })
}
function UPpreloaderDiv() {//加载完成后向上滑动 预加载页面 //这个地方可以调出 人物下降动画
    if(preloaderDiv.className =="displaynone displayshow" ){
    $('#preloader').animate({bottom:'100%'},1000,'easeInOutQuart',function(){
        FallAnimation();
    });}
}

// setTimeout(UPpreloaderDiv,1500);

function F_forstopWalking() {
    Walking(function(){clearInterval(timer2);hideKeynotice();});
}



var arr = ['../img/fall.png','../img/jumpinthesea.png','../img/swim2.png','../img/walk.png',"img/far-forest.png",'../img/ground.png','../img/grass.png','../img/tree-1.png','../img/tree-2.png','../img/tree-3.png','../img/title.png','img/mountain.png','img/mountain2.png',"./img/Tinyplane.png","img/ballon.png","img/mountain3.png","img/wood%20board.png","./img/dataDEMO/windomill.png"];

preloadimages(arr);

function preloadimages(arr){
    var n=0;
    var arr=(typeof arr!="object")? [arr] : arr;  //确保参数总是数组
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image();
        newimages[i].index = i;
        newimages[i].src=arr[i];
        newimages[i].onload = function () {
           n++;
            console.log(n);
            progressIb.style.width = n*50+'px';
            O_Laocar.style.right = 500-n*50+'px';
            O_Laotext.innerHTML = '老司机已经加载了%'+n*10;

            if(n>=arr.length){
                UPpreloaderDiv();
            }
        }
    }
}