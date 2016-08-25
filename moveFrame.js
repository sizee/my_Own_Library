/**
 * Created by Fly-mydream on 16.8.25.
 * 此框架是从妙味上学的简单的缓冲移动框架。匹配的是obj.style里面的属性，比如长宽，透明度等。
 * 比较简单，适合初学者。
 */


/*
* getStyle是为了兼容iE以及火狐等浏览器。
*  他们获取外部样式的方法不同。
*  currentStyle是兼容IE 获取元素外联样式。
*  getComputedStyle是兼容火狐，谷歌，欧朋等浏览器。
* */
function getStyle(obj,attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj,false)[attr];
    }
}
/*
* 移动框架的主函数外部调用的也是这个函数。
* */
function stateMove(obj,attr,iTarget)
{
    this.timer=null;                //定义本元素的一个属性 timer是为了每个元素只能开一个定时器，防止一个元素开多个定时器。
    var iCur=0;                     //获取元素想要改变的属性的值
    clearInterval(obj.timer);       //首先先清除本身的定时器。
    obj.timer=setInterval(function(){       //开始定时器

        if(attr=="opacity")                 //如果用户改变元素的属性为opacity
        {
            /*
            *    这句话是做了一个简单的程序优化，先把getStyle获得的是一个字符串将其转换为小数（元素属性opacity的值为一个小于1大于0的小数，
            *    如过直接转换成整数，无论怎么变化都为0 所以先把他转换成相应的小数，然后*100在转换为整数。以后使用可以把它/100在转换为小数）
            * */
            iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
        }
        else                   /*如果用户改变的不是元素的透明度*/
        {
            iCur=parseInt(getStyle(obj,attr));
        }

        var iSpeed=(iTarget-iCur)/4;                //获取用户设定值与当前元素属性值的差别，后面的除数可以是任意值，可以改变速度
        /*判断语句ceil是四舍五入，floor是。。。*/
        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);


        if(iCur==iTarget)               //获取用户设定值与当前元素属性值相等。
        {
            clearInterval(obj.timer);   //停止定时器
        }
        else
        {
            if(attr=="opacity")         //判断语句
            {
                obj.style.filter="alpha(opacity:'+(iCur+iSpeed)+')";
                obj.style.opacity=(iCur+iSpeed)/100;
            }
            else
            {
                obj.style[attr]=iCur+iSpeed+'px';   //属性值+设定缓冲速度
            }
        }
    },30);
}