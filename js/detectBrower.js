/**
 * Created by mac on 16/8/21.  检测浏览器 的 IE全部滚蛋
 */
function detectBrowser() {
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        browserName = "firefox";
        var e = new Number(RegExp.$1);
        browserVersion = Math.floor(e)
    }
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        browserName = "internet explorer";
        var r = new Number(RegExp.$1);
        browserVersion = Math.floor(r)
    }
    if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        browserName = "opera";
        var a = new Number(RegExp.$1);
        browserVersion = Math.floor(a)
    }
    navigator.userAgent.toLowerCase().indexOf("chrome") > -1 && -1 != navigator.userAgent.toLowerCase().indexOf("safari") && (browserName = "chrome", browserVersion = ""), -1 == navigator.userAgent.toLowerCase().indexOf("chrome") && -1 != navigator.userAgent.toLowerCase().indexOf("safari") && (browserName = "safari", browserVersion = "")
}
function detectDevice() {
    deviceName = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) ? "iosdevice" : navigator.userAgent.match(/Android/i) ? "android" : navigator.userAgent.match(/BlackBerry/i) ? "blackberry" : navigator.userAgent.match(/IEMobile/i) ? "iemobile" : navigator.userAgent.match(/Silk/i) ? "kindle" : "computer"
}
var browserName, browserVersion;
detectBrowser();
var deviceName;
detectDevice();