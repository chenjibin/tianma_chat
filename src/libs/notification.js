/**
 * Created by 陈继斌 on 2018/10/17.
 */
class ShowNotification {
    constructor() {
        this.storeArr = []
        this.maxNotification = 2
        this.init()
    }
    init() {
        if (Notification) {
            Notification.requestPermission((result) => {
                if (result !== 'granted') {
                    this.showMessage('测试', '测试')
                }
            });
        } else {
            // 提示不支持系统通知
            alert('您的浏览器不支持系统通知,建议使用Chrome浏览');
        }
    }
    showMessage(title, msg, imgUrl) {
        const Notification = window.Notification || window.mozNotification || window.webkitNotification;
        // 判断浏览器是否支持桌面通知
        if (Notification) {
            Notification.requestPermission((result) => {
                const nm = this
                if (result !== 'granted') {
                    alert('请授权浏览器能够进行通知!');
                    return false;
                } else {
                    let tag = 'sds' + ((new Date()).valueOf());
                    let notify = new Notification(title, {
                            dir: 'auto',
                            lang: 'zh-CN',
                            tag: tag, // 实例化的notification的id
                            icon: imgUrl, // 通知的缩略图,icon 支持ico、png、jpg、jpeg格式
                            body: msg // 通知的具体内容
                        }
                    );
                    this.storeArr.push(notify)

                    // 定义通知窗口点击函数
                    notify.onclick = function() {
                        // 如果通知消息被点击,通知窗口将被激活
                        window.focus();
                    };
                    // 定义通知错误事件
                    notify.onerror = function () {
                        // console.log("");
                    };
                    // 定义通知显示事件 可以设置多少秒之后关闭 也可以不设置关闭
                    notify.onshow = function () {
                        if (nm.storeArr.length > nm.maxNotification) {
                            nm.storeArr[0].close()
                            nm.storeArr.shift()
                        }
                        // 窗口显示 播放音频
                        // var audio = new Audio('./10418.wav');
                        // audio.play();
                        // // 窗口显示3S后关闭
                        // setTimeout(function() {
                        //     notify.close();
                        // }, 3000);
                    };
                    // 定义通知关闭事件
                    notify.onclose = function () {

                    };
                }
            });
        } else {
            // 提示不支持系统通知
            alert('您的浏览器不支持系统通知,建议使用Chrome浏览');
        }
    }
}

export default ShowNotification
