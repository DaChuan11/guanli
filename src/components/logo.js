const serverSrc = 'http://192.168.1.110:8081/';
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
    BRid: '', //病人id
}
// 个人档案的状态管理
var GRDA = {
    //需要病人名字 病例id 病人id
    name: '', //病人名字
    BLid: '', //病例id
    BRid: '', //病人id
}

// var Adminid = ''
// 查看这个全局变量
// console.log(this.GLOBAL);
// const token = '12345678';
// var hasEnter = false;
// const userSite = "中国钓鱼岛";
// var register=false;
export default {
    // userSite,//用户地址
    // token,//用户token身份
    serverSrc, //服务器地址
    // hasEnter,//用户登录状态
    // register,
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
    GRDA
}