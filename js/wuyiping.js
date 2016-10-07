/**
 * Created by wuyiping on mac pro on 16/8/20.
 * 整个 动画 以示 任务运动带动的 任务运动 外加定位
 * 作品里面 添加一些面向对象的函数 比如 各种背景层的运动  还有各种物体的动画  都可以抽象出来 携程 面向对象的方式
 /**
 *变量 太多了  定义一个命名规则吧   F_ 开头 就是 函数 O_ 就是 元素 或者单一变量 A_ 开头 就是数组 维数组  C_开头 就是 构造函数
 * 千万别改 人物定位 不然 就毁了
 */

var Allcontainer = document.getElementById('adventure');//整个 外部框架
var HeadDiv = document.getElementById('Head');// 标题
var OKarl2 = document.getElementById('Karl');//男主角
var O_karl = document.getElementById('Karlvicent');//男主角
var fallAnimation = document.getElementById('fallAnimation');//
var fallAnimationIMG = document.getElementById('fallAnimationIMG');//人物掉落动画
var Keynotice = document.getElementById('keybord');//按键提示
var CaodiAndDadi = document.getElementById('layer-hen-3');//草地层

var O_CaodiAndDadi = document.getElementById('layer-ludi-caodi-1');
var O_shanAndbird = document.getElementById('layer-hen-2');//树林
var O_farMountain1 = document.getElementById('layer-hen-4');//远山  飞鸟
var O_farerMountain1 = document.getElementById('layer-hen-5');//远山
var OC_seawoodboard = new C_actor('woodbord2');//海 木牌
var O_Sea = document.getElementById('layer-sea');
var O_sky = document.getElementById('skyAnimation');
var O_DaF=  document.getElementById('dock-and-floor');
var O_DaW=  document.getElementById('dock-wood');
O_Sea.Onoff = false;
var O_steel = document.getElementById('layer-dock');
var O_rocketAudio = document.getElementById('rocketAudio');
O_steel.Onoff=true;
var O_Baiduyun = document.getElementById('Baiduyun');
var walksteps = 0;
var onoff = false;
var OT_karlswimAnimation = null;
var O_rocket = document.getElementById('rocket');
var O_skyAddon = document.getElementById('sky-addon');
var O_csky5 = document.getElementById('sky5');
var O_about = document.getElementById('About');
var O_chengdu = document.getElementById('chengdu');
var O_school = document.getElementById('school-Ob');
var O_car1 = document.getElementById('Car1');
O_about.Onoff = true;
O_csky5.Onoff = false;
var n = 1;
var O_Car1Imgsrc = new Image();
//O_Car1Imgsrc.src = '../img/dataDEMO/construction/Car.png';
//记录当前 创口里面HEAD层真实的位置   用于适配 所有屏幕用的
window.onresize = positionReset;  //添加 窗口改变时 改变人物位置


//     var KarlWalk  = new AnimationObjects({who:OKarl2,where:'',how:Walking}); //没卵用啊 ??
// console.log(KarlWalk);

positionReset();
F_meettheAbout();

function Walking() {//这个函数要 加工一下 因为就是这函数带动全部函数运动
    OKarl2.style.display = "block";
    O_karl.className= "walkAnimation walk_" +0;
    F_addKeyListener(walkstyle1, walkstyle2, walkstyle2);
}


//开一个定时器 时刻 关注 步伐变化  步伐变了   背景 就跟这改变 而且这个背景 改变之后 不会因为

var moveBackgroundTimer = setInterval(function () {
    changeCaodiLayer();
    positionHeadDiv();
    F_changeMountain();
    F_meet();
}, 10);

function changeCaodiLayer() {
    CaodiAndDadi.style.left = -walksteps * 50 + 'px';
}


function positionHeadDiv() { //在浏览器窗口改变的时候 重新定位 树木标题  不过我觉得这个要改改了
    //console.log(HeadDiv);
    HeadDiv.style.left = 0.5 * ( Allcontainer.offsetWidth - HeadDiv.offsetWidth) + CaodiAndDadi.offsetLeft + 'px';
}

function F_changeMountain() {
    O_shanAndbird.style.left = -walksteps * 20 + "px";
    O_farMountain1.style.left = -walksteps * 10 + "px";
    O_farerMountain1.style.left = -walksteps * 7 + "px";
}
function positionKarl() {
    OKarl2.style.left = "50%";
    OKarl2.style.bottom = "20%";
    OKarl2.style.marginBottom = "-10px";
    //     console.log(document.documentElement.clientHeight*0.2-10+'px');
    //     OKarl2.style.bottom = document.documentElement.clientHeight*0.2-10+'px'; //保证人物一直在草地上
}

function positionReset() {
    positionHeadDiv();
    positionKarl();
}


//如何设置一个函数 在触发位置  改变  图片  并且覆盖 walk
function F_meet() {  //判断 是否运动到触发点
    var n = F_Sbleft(O_karl);
    if (!OC_seawoodboard.Onoff) {
        if (n >= OC_seawoodboard.itsleft() + 20) {
            F_removeKeyListener(walkstyle1, walkstyle2, walkstyle2);//停止 运动监听  开始 动画模式
            F_JumpInTheSea();//跳入海
            F_flyhelmet();
            OC_seawoodboard.Onoff = true;
        }
    }
}

// function F_rmeet(){
//     var n =O_karl.offsetLeft;
//     console.log(O_CaodiAndDadi.offsetLeft);
//     if (n<=$(O_CaodiAndDadi).offset().left+O_CaodiAndDadi.offsetWidth){
//         F_removeKeyListener(walkstyle3,walkstyle4,walkstyle4);
//     }
//
// }






function F_Sbleft(obj) {
    return $(obj).offset().left + $(obj).width();
}

/*面向对象来改进*/





function walkstyle1(ev) {
    if (ev.keyCode == "32") {
        walksteps++;
        O_karl.className = "walkAnimation walk_" + (walksteps % 4);
        clearInterval(timer2);hideKeynotice();
        //console.log($(O_CaodiAndDadi).offset().left);
    }
    ev.preventDefault();
}


function walkstyle2(ev) {
    if (ev.wheelDelta) {//Chrome下,e.wheelDelta<0向下滚动
        onoff = ev.wheelDelta < 0 ? true : false;
    }
    if (ev.detail) {//火狐下
        onoff = ev.detail > 0 ? true : false;
    }

    if (onoff) {
        walksteps++;
        O_karl.className = "walkAnimation walk_" + (walksteps % 4);
        clearInterval(timer2);hideKeynotice();
    } else {
        walksteps = walksteps <= 0 ? walksteps = 0 : walksteps - 1;
        O_karl.className = "walkAnimation walk_" + (walksteps % 4);
        clearInterval(timer2);hideKeynotice();
    }
}



function walkstyle4(ev){

        if (ev.wheelDelta) {//Chrome下,e.wheelDelta<0向下滚动
            onoff = ev.wheelDelta < 0 ? true : false;
        }
        if (ev.detail) {//火狐下
            onoff = ev.detail > 0 ? true : false;
        }

        if (onoff) {
            walksteps++;
            F_meettheWall(O_steel,false,0);
            if(!O_steel.Onoff){
                clearInterval( OT_karlswimAnimation);
                $(O_karl).stop();
                document.removeEventListener('keyup',F_floatdown);
                F_removeKeyListener(walkstyle3,walkstyle4,walkstyle4,function () {
                    F_shuChangeback2();
                });
            }
            if(!O_Sea.Onoff) {
                $(O_karl).stop().animate({'bottom': '100'}, 2000, "easeInCubic"); //附上上来
                $('#bubles').stop().animate({'-24': '76'}, 2000, "easeInCubic");
                O_Sea.Onoff=true;
            }

        } else {
        F_meettheWall(O_CaodiAndDadi,true,280);

            //ar OT_shifouzhuangdaoleludi=
            if (!O_CaodiAndDadi.Onoff){
                walksteps +=0;
            }else{
                walksteps = walksteps - 1;
                if(O_Sea.Onoff) {
                    console.log('down');
                    $(O_karl).stop().animate({'bottom': '0'}, 3000, "easeInCubic");
                    $('#bubles').stop().animate({'top': '76'}, 3000, "easeInCubic");
                    O_Sea.Onoff=false;
                }
            }
        }
    }

function walkstyle3(ev) {
    if (ev.keyCode == "32") {
        walksteps++;
        F_meettheWall(O_steel,false,0);
        if(!O_steel.Onoff){
            clearInterval( OT_karlswimAnimation);
            $(O_karl).stop();
            O_meetCar1.meet();//判断 百度云
            document.removeEventListener('keyup',F_floatdown);
            F_removeKeyListener(walkstyle3,walkstyle4,walkstyle4,function () {
                F_shuChangeback2();

            });

            console.log('撞墙了');
        }
        if(!O_Sea.Onoff) {
            $(O_karl).stop().animate({'bottom': '100'}, 2000, "easeInCubic"); //附上上来
            $('#bubles').stop().animate({'top': '-24'}, 2000, "easeInCubic");
            O_Sea.Onoff=true;
        }
    }
    ev.preventDefault();
}



function F_floatwheswim(){  //有用的时候稍微浮起来 一点 f放手 又飘下去
    document.addEventListener('keyup',F_floatdown)
}

function F_floatdown(){
    //console.log('down');
    if(O_Sea.Onoff) {
        console.log('down');
        $(O_karl).stop().animate({'bottom': '0'}, 3000, "easeInCubic");
        $('#bubles').stop().animate({'top': '76'}, 3000, "easeInCubic");
        O_Sea.Onoff=false;
    }
}

function F_JumpInTheSea(Callback) {
    F_shuChangeback();
    F_stationeryHide();
    var i = 0;
    var T_SwimSeaTimer = setInterval(function () {
        if (i <= 5) {
            walksteps++;
        }
        if (i >= 19) {
            clearInterval(T_SwimSeaTimer);
        }

        O_karl.className = "jumpToSeaAnimation swim_" + i;
        i++;
    }, 30);

    Callback&&Callback();

}


/**
 * 背景上升。。。。。是不是就应该关掉 position Karl 或者改变 不用?
 * 直接 把下面的东西拉起来?
 * @constructor
 */

function F_shuChangeback() {  //海平面向上
    positionKarl();
    O_karl.style.maxWidth = '160px';
    O_karl.style.marginBottom = "-10px";
    O_Sea.style.top= "90%";

    $(CaodiAndDadi).animate({'top': "-75%"}, 'slow', "easeOutExpo", function () {
        $('#bubles').addClass('ALLdisplayshow');
        $(O_shanAndbird).addClass('displaynone');
        //$('#woodbord2').addClass('displaynone');
        $(O_karl).animate({'marginBottom':20}, 'slow', "linear", function () {
            F_swimAnimation();
            F_meet1.meet();
            F_addKeyListener(walkstyle3,walkstyle4,walkstyle4,function () {
                F_floatwheswim();

            })
        });
    });

}



function F_swimAnimation() { //游泳动画
    var i = 0;
    O_karl.style.marginBottom = '40px';
    O_karl.style.marginLeft = '-67px';
    O_karl.className = "swim2 swim2_" + i;
     OT_karlswimAnimation = setInterval(function () {
        i++;
        if (i >= 39) {
            i = 0;
        }
        O_karl.className = "swim2 swim2_" + i;
    }, 50);

}
var Fish1 = new C_fish('Fish1');
var Fish2 = new C_fish('Fish2');
var Fish3 = new C_fish('Fish3');
/*定义鱼游泳动画*/

var F_meet1 =new F_crashActor('Web-Software',function () {
    Fish1.Animate();
    F_meet2.meet();
});


var F_meet2 =new F_crashActor('Coding',function () {
    Fish2.Animate();
    F_meet3.meet();
});


var F_meet3 =new F_crashActor('OtherCoding',function () {
    Fish3.Animate();
});














function F_addKeyListener(a, b, c,Callback) {
    document.addEventListener('keydown', a);  //直接解除这些个绑定 不就行了吗!!!
    document.addEventListener('mousewheel', b);
    document.addEventListener('DOMMouseScroll', c);
    Callback&&Callback();
}

function F_removeKeyListener(a, b, c,Callback) {
    document.removeEventListener('keydown', a);  //直接解除这些个绑定 不就行了吗!!!
    document.removeEventListener('mousewheel', b);
    document.removeEventListener('DOMMouseScroll', c);
    Callback&&Callback();
}


function F_meettheWall(obj,LR,long){
    if(LR) {

        var n = parseFloat($(O_karl).offset().left) + long;
        obj.timer = setInterval(function () {
            if (n <= parseFloat($(obj).offset().left) + parseFloat(obj.offsetWidth)) {
                obj.Onoff = false;//如果从右到左 的时候
                clearInterval(obj.timer);
            } else {
                obj.Onoff = true;
            }
        }, 20);
    }else{
        var n = parseFloat($(O_karl).offset().left) +parseFloat(O_karl.offsetWidth) ;
        console.log(n+'-----------'+parseFloat($(obj).offset().left));
        console.log('钢板or火箭'+parseFloat($(obj).offset().left));
        obj.timer = setInterval(function () {
            if (n >= parseFloat($(obj).offset().left)+long ) {
                clearInterval(obj.timer);
                obj.Onoff = false;//如果从左到右 的时候
            } else {
                obj.Onoff = true;
            }
        }, 20);
    }
}

function swimTOwalk(){
    var i=0;
    var OT_swimTOwalktimer = setInterval(function(){
        if(i<=10){walksteps++}
        O_karl.src ='img/swimTOwalk/swimTOwalk_'+i+'.png';
        if(i>=59){clearInterval(OT_swimTOwalktimer);console.log('开启运动模式');Walking();  //此处 开启在船坞上面的判断
            F_meettheWall(O_rocket,false,180)

            var OT_rocketTimer1 = setInterval(function(){
                console.log(parseFloat(O_karl.offsetLeft) +parseFloat(O_karl.offsetWidth)+'karl');
                console.log('火箭'+parseFloat($(O_rocket).offset().left));
                if(!O_rocket.Onoff){
                 //  F_rocketFly();  先是人物 跳上 火箭  这个后面调节
                 //背景声音响起
                 //火箭起飞
                    clearInterval(OT_rocketTimer1);
                    O_karl.style.display ='none';
                    F_removeKeyListener(walkstyle1, walkstyle2, walkstyle2);
                    O_rocketAudio.play();
                    setTimeout(function () {
                        F_rocketFly();
                    },7000);

                    O_rocket.Onoff=true;
                }

            },20)

        }
        i++;
    },15);

    $(O_karl).animate({'bottom': 0+'px'}, 'slow', "easeInCirc");

        }




function F_shuChangeback2(){
    positionKarl();
    O_karl.style.maxWidth = '160px';
    O_karl.style.marginBottom = '0px';
    $('#bubles').removeClass('ALLdisplayshow').addClass('displaynone');


    $(O_shanAndbird).addClass('ALLdisplayshow');

    //O_Sea.style.top= "80%";
    //$(O_Sea).animate({'top': "80%"}, 'slow', "easeOutExpo");

    $(CaodiAndDadi).animate({'top': 0+'px'}, 500, "linear",function () {
        swimTOwalk();
    });

}

/*自制检测碰撞对象*/
function F_crashActor(id,cal){
    this.object = document.getElementById(id);
    this.Onoff = false;
    this.callback = cal

}

F_crashActor.prototype.meet = function () {
    var that = this;
    F_meettheWall(that.object,false,0);
    that.timer = setInterval(function () {
        if(!that.object.Onoff){
            clearInterval(that.timer);
            that.callback&&that.callback();
        }
    },20);
}

/*鱼移动动画*/
function C_fish(clas) {
    this.object = document.getElementsByClassName(clas);
}

C_fish.prototype.Animate = function () {
    var that = this;
    var i=0;
    that.timer = setInterval(function(){

        that.object[i].style.left = '0';
        i++;
        if(i>=that.object.length){
            clearInterval(that.timer );
            i=0;
        }
    },300)
}



/**
 * 自制了一个帧动画js调用对象
 *
 * @param id     获取对象
 * @param urlF   url前缀
 * @param urlE   url后缀
 * @param num    图片的张数
 * @param settime   动画运行快慢
 * @param Callback  当动画完成后 是否有回调? 回调的话就 停止当前动画  继续下一个  如果没有 就进行循环动画
 * @param backnumber    动画第一遍 可能有一个初始化动画  在后面循环的时候可能就没用了
 *          比如火箭发射 初始有一个或图案由小变大的过程
 * @constructor
 */
function C_actor(id,classF,num,settime,Callback,backnumber,startnumber) {
    this.Object=document.getElementById(id);
    this.Onoff = false;
    this.classF = classF;
    this.num = num;
    this.setTime = settime;
    this.callback = Callback;
    this.backnumber = backnumber;
    this.start = startnumber;
    //this.prototype.startAnimation(urlF,urlE,num,settime)
}


C_actor.prototype.itsleft = function () {
    return $(this.Object).offset().left;
};

C_actor.prototype.startAnimation =function () {
    var i= this.start;
    var  that =this;
    that.timer=setInterval(function(){
        i++;
        that.Object.className = that.classF +i;
        // console.log()
        //如果有回调函数那在动画完了之后 关闭动画  开始回调函数
        if(i>=that.num){

            if(that.callback) {
                clearInterval(that.timer);
                that.callback();
            }else {
                if(that.backnumber){
                    i=that.backnumber;
                }else{
                    clearInterval(that.timer);
                }
            }
        }

    },that.setTime)
};

var O_meetCar1 = new F_crashActor('Car1',function(){
        Baiduyun_Ani();
});

var O_Car1Img = new C_actor('Car1Img','Car1Img Kache_',24,100,'','',0);
// O_Car1Img.Object.style.backgroundImage = O_Car1Imgsrc;








function Baiduyun_Ani() {
    $('#Car1Img').animate({'left':'100'},1000,'linear',function(){
        $('#Fandou').css({'transform':'rotate(-30deg)'});

        $('#FandouTanhuang').css({'transform':'rotate(60deg)'});


        $('#Baiduyun').css({'transform':'rotate(-90deg)'}).animate({'bottom':0,'left':'-60'},{'duration':500,'queue':false},'linear');;
        $('#Baiduyun')
    });
    $('#Baiduyun').animate({'left':'48px'},1000,'linear');

    $('.Luntai').css({'transform':'rotate(-360deg)'});
}






function F_rocketFly(){
    clearInterval( O_sky.timer );
    $('#fire1').animate({'opacity':1,'top':834},1000,'linear',function () {

    });
    $('.fireFlame').animate({'opacity':1,'top':820},1000,'linear',function () {
        clearInterval(fire2.timer);
        clearInterval(fire3.timer);
        fire3.startAnimation();
        fire2.startAnimation();
        fire1.startAnimation();
    });



    setTimeout(
        function(){$('.fireFlame').animate({'opacity':0},1000,'linear',function(){
                clearInterval(fire2.timer);
                clearInterval(fire3.timer);
                $('#rocket2').animate({'top':1200/*,'left':-190,'height':'-=910px','width':'-=370px'*/},10000,'easeInQuart');
            }
        );

        },22000);


    setTimeout(
        function(){$('#fire1').animate({'opacity':0,top:700},1000,'linear',function(){
                clearInterval(fire1.timer);
                $('#rocket1').animate({'top':1200/*,'left':-190,'height':'-=910px','width':'-=254px'*/},10000,'easeInQuart');
                $('#air-plane').css({'transform':'rotate(75 deg)'});
            }
        )
        },62000);


setTimeout(function () {
    O_sky.timer = setInterval(function(){
        n+=20;
        O_sky.style.top = O_sky.offsetTop+20+'px';
        O_skyAddon.style.top = O_skyAddon.offsetTop+20+'px';
        // CaodiAndDadi.style.top = CaodiAndDadi.offsetTop+20+'px';
        O_Sea.style.top = O_Sea.offsetTop+20+'px';
        O_DaF.style.top = O_DaF.offsetTop+20+'px';
        O_DaW.style.top = O_DaW.offsetTop+20+'px';
        if($(O_rocket).offset().top-104 <=$('#sky5').offset().top){
            if(!O_csky5.Onoff) {
                $('#sky5').vidbg({
                    'mp4': './img/earth.mp4',
                    'webm': './img/earth.webm',
                }, {
                    // Options
                    muted: true,
                    loop: true,
                    overlay: true,
                });
                O_csky5.Onoff = true;
            }
        }
        if($(O_rocket).offset().top-74 <=$('#sky5').offset().top){
            clearInterval(O_sky.timer)
        }
    },20);
},3000);


}


/* fireFlame fire2-*/




var fire1 = new C_actor('fire1','fire1  fire1-',27,20,'','',0);

var fire2 = new C_actor('fire2','fireFlame fire2-',15,120,function () {
    clearInterval(fire2.timer);
    fire2_2.startAnimation();
},'',0);
var fire2_2 = new C_actor('fire2','fireFlame fire2-',27,100,'',15,15);
var fire3 = new C_actor('fire3','fireFlame fire2-',15,120,function () {
    clearInterval(fire3.timer);
    fire3_2.startAnimation();
},'',0);
var fire3_2 = new C_actor('fire3','fireFlame fire2-',27,100,'',15,15);

//数据动画部分


// clearInterval(obj.timer);

function F_meettheAbout(){
    F_meettheWall(O_about,false,-400);
    var OT_meetAboutTimer = setInterval(
        function(){
            if (!O_about.Onoff){
                clearInterval(OT_meetAboutTimer);
                clearInterval(O_about.timer);
                F_animateAbout();
                F_meettheChengdu();
            }
        },20);
}


function F_animateAbout(){
    $('#Code-mill').animate({'top': '-64vh'}, 500, 'easeOutElastic',function () {
        $('#Design-mill').animate({'top': '-50vh'}, 500, 'easeOutElastic',function () {
            $('#Animation-mill').animate({'top': '-64vh'}, 500, 'easeOutElastic',function () {
                $('#Exercise-mill').animate({'top': '-78vh'}, 500, 'easeOutElastic').addClass('rotateMill4');
                $('#mill-pole4').animate({'height': '77vh'}, 500, 'easeOutElastic');
            }).addClass('rotateMill3');
            $('#mill-pole3').animate({'height': '63vh'}, 500, 'easeOutElastic');
        }).addClass('rotateMill2');
        $('#mill-pole2').animate({'height': '49vh'}, 500, 'easeOutElastic');

    }).addClass('rotateMill1');

    $('#mill-pole1').animate({'height': '63vh'}, 500, 'easeOutElastic');




}

function  F_meettheChengdu(){
    F_meettheWall(O_chengdu,false,400);
    var OT_meetChengduTimer = setInterval(
        function(){
            if (!O_chengdu.Onoff){
                clearInterval(OT_meetChengduTimer);
                clearInterval(O_about.timer);
                F_animateChengdu();
                F_meettheSchool();

                F_removeKeyListener(walkstyle1, walkstyle2, walkstyle2);
                setTimeout(function () {
                    F_addKeyListener(walkstyle1, walkstyle2, walkstyle2);
                },2000)

            }
        },20);
}






function F_animateChengdu() {
    $('#frame').animate({'bottom': '0'}, 1500, 'easeOutBounce', function
        () {
        $('#panda').animate({'bottom': '65px'}, 1000, 'easeOutBounce', function () {
            $('#hat').animate({'bottom': '356px'}, 700, 'easeOutBounce');
        });
    });
    $('#bamboo').animate({'opacity': 1}, 7000, 'linear');
    $('#text').animate({'opacity': 1}, 7000, 'linear');
}

function  F_meettheSchool(){
    F_meettheWall(O_school,false,1080);
    var OT_meetschoolTimer = setInterval(
        function(){
            if (!O_school.Onoff){
                clearInterval(OT_meetschoolTimer);
                F_buildschool();
                F_stationery();
                F_animateBachelor();
                F_removeKeyListener(walkstyle1, walkstyle2, walkstyle2);
                setTimeout(function () {
                    F_addKeyListener(walkstyle1, walkstyle2, walkstyle2);
                },2000)
            }
        },20);
}


function F_buildschool() {
    $('#building-A').animate({'opacity': '1'}, 1000, 'linear', function () {
        $('#building-B').animate({'bottom': '0px'}, 150, 'linear', function () {
            $('#building-C').animate({'left': '97px'}, 150, 'linear', function () {
                $('#building-D').animate({'bottom': '5px'}, 150, 'linear', function () {
                    $('#building-E').animate({'left': '385px'}, 150, 'linear', function () {
                        $('#building-F').animate({'bottom': '0px'}, 150, 'linear', function () {
                            $('#building-Q').animate({'bottom': '347px'}, 600, 'easeOutBounce');


                            $('#building-R').animate({'left': '564px'}, 150, 'linear', function () {
                                $('#building-H').animate({'bottom': '48px'}, 150, 'linear', function () {
                                    $('#building-I').animate({'bottom': '316px'}, 150, 'linear', function () {
                                        $('#building-J').animate({'left': '625px'}, 150, 'linear', function () {
                                            $('#building-K').animate({'bottom': '160px'}, 150, 'linear', function () {
                                                $('#building-L').animate({'bottom': '16px'}, 150, 'linear', function () {
                                                    $('#building-M').animate({'left': '42px'}, 150, 'linear');
                                                });
                                            });
                                        });
                                    });

                                });
                            });

                        });
                    });
                });
            });
        });
    });


    $('#building-A2').animate({'opacity': '1'}, 1000, 'linear', function () {
        $('#building-B2').animate({'bottom': '0px'}, 150, 'linear', function () {
            $('#building-C2').animate({'left': '97px'}, 150, 'linear', function () {
                $('#building-D2').animate({'bottom': '5px'}, 150, 'linear', function () {
                    $('#building-E2').animate({'left': '385px'}, 150, 'linear', function () {
                        $('#building-F2').animate({'bottom': '0px'}, 150, 'linear', function () {
                            $('#building-Q2').animate({'bottom': '347px'}, 600, 'easeOutBounce');


                            $('#building-R2').animate({'left': '564px'}, 150, 'linear', function () {
                                $('#building-H2').animate({'bottom': '48px'}, 150, 'linear', function () {
                                    $('#building-I2').animate({'bottom': '316px'}, 150, 'linear', function () {
                                        $('#building-J2').animate({'left': '625px'}, 150, 'linear', function () {
                                            $('#building-K2').animate({'bottom': '160px'}, 150, 'linear', function () {
                                                $('#building-L2').animate({'bottom': '16px'}, 150, 'linear', function () {
                                                    $('#building-M2').animate({'left': '42px'}, 150, 'linear');
                                                });
                                            });
                                        });
                                    });

                                });
                            });

                        });
                    });
                });
            });
        });
    });

}


function F_stationery() {
    $('#book1').css({'bottom':'-10%','transform':'rotate(45deg)'});
    $('#book2').css({'bottom':'-10%','transform':'rotate(-45deg)'});
    $('#jiazi').css({'left':'90%','transform':'rotate(45deg)'});
    $('#knife').css({'bottom':'0%','transform':'rotate(-45deg)'});
    $('#magnify').css({'bottom':'0%','transform':'rotate(-45deg)'});
    $('#notebook').css({'left':'0','transform':'rotate(45deg)'});
    $('#ruler1').css({'right':'0','transform':'rotate(45deg)'});
    $('#ruler2').css({'left':'-10%','transform':'rotate(80deg)'});
    $('#timer').css({'bottom':'0%','transform':'rotate(45deg)'});
    $('#yuangui').css({'right':'0','transform':'rotate(45deg)'});
    $('#pencil').css({'right':'0','transform':'rotate(-45deg)'});
    $('#upan').css({'left':'0','transform':'rotate(-45deg)'});
}


function F_stationeryHide() {
    $('#book1').css({'bottom':'-80%','transform':'rotate(0)'});
    $('#book2').css({'bottom':'-80%','transform':'rotate(0)'});
    $('#jiazi').css({'left':'120%','transform':'rotate(0)'});
    $('#knife').css({'bottom':'-30%','transform':'rotate(0)'});
    $('#magnify').css({'bottom':'-30%','transform':'rotate(0)'});
    $('#notebook').css({'left':'-10%','transform':'rotate(0)'});
    $('#ruler1').css({'right':'-20%','transform':'rotate(0)'});
    $('#ruler2').css({'left':'-40%','transform':'rotate(0)'});
    $('#timer').css({'bottom':'-20%','transform':'rotate(0)'});
    $('#yuangui').css({'right':'-10%','transform':'rotate(0)'});
    $('#pencil').css({'right':'-10%','transform':'rotate(0)'});
    $('#upan').css({'left':'-10%','transform':'rotate(0)'});
    setTimeout(function(){
        $('#stationery').hide();
        },100
    );
}


function F_animateBachelor() {
    $('#bachelor').animate({'left': 75,
    'top': 116,'opacity':1},1000,'easeOutBounce');
    $('#schoolhatimg').addClass('bachelorIMG');
    setTimeout(function(){

        $('#bachelor').animate({
            'top': 90},100,'easeOutBounce');
        $('#SchoolHatImg').addClass('boomIMG').removeClass('bachelorIMG');},2400);
    setTimeout(function(){
        $('#bachelor').animate({
            'top': 116},1000,'easeOutBounce');
        $('#SchoolHatImg').addClass('helmetIMG').removeClass('boomIMG');},2500);
}


function F_flyhelmet() {
    $('#bachelor').animate({'left':0,
        'top': '-1300%' ,'opacity':0},2000,'linear');
}

