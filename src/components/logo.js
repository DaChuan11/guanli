const serverSrc = 'http://192.168.1.110:8081/';
const websocketSrc = 'ws://192.168.1.110:8081/';
// const serverSrc = 'http://192.168.31.48:8081/';
var mag = ''
var havelogin = false;
var dengdai = function (temp) {
    let temp2 = document.querySelector('#motai')
    temp2.style.display = temp
}
var ylyXX = {
    id: 0,
    name: "",
    admin_account: "",
    processing_times: 0,
    charge_people: "",
    charge_phone: "",
    beadhouse_location: null
}
var yanglaoyuanid = 0
var glnub = ''

// 病例的状态管理
var BL = {
    //需要病人名字 病例id 病人id
    name: '', //病人名字
    sendid: '', //病例id
    id: '', //病人id
    nub: '', //病例是哪一页
}
// 个人档案的状态管理
var GRDA = {
    //需要病人名字 病例id 病人id
    name: '', //病人名字
    BLid: '', //病例id
    BRid: '', //病人id
}
//全局变量  危险人数
var bianhua = 0
//全局变量 首页页面详情的轮训time
var timer = ''
//全局变量 首页今日情况的轮训time
var todaytimer = ''
//备忘录阅读量
var BWLtime = 0;

// var Adminid = ''
// 查看这个全局变量
// console.log(this.GLOBAL);

export default {

    serverSrc, //服务器地址

    mag,
    //是否登录
    havelogin,
    //网络请求等待模态框
    dengdai,
    //养老院ID
    yanglaoyuanid,
    //养老院信息
    ylyXX,
    //当前管理员ID
    glnub,
    BL,
    GRDA,
    //websocket地址
    websocketSrc,
    bianhua,
    timer,
    todaytimer,
    BWLtime
}