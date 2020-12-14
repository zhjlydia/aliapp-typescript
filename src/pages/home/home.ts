// 获取全局 app 实例
const app = getApp();

Page({
  // 声明页面数据
  data: {},
  // 监听生命周期回调 onLoad
  onLoad() {
  },
  // 监听生命周期回调 onShow
  onShow() {
    
  },
  authSuccess(){
    console.log("挑")
     my.navigateTo({ url: '../web-view/web-view' });
  }
});

