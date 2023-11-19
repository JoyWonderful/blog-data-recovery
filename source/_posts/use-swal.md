---
title: 使用 SweetAlert2
date: 2023-10-22 11:20:45
tags:
- HTML
- JavaScript
categories: 编程随记
---

<style>
    button.exmSwal
    {
        background-color: #333;
        color: #fff;
        margin: .3125em;
        padding: .625em 1.1em;
        border: 0;
        border-radius: .25em;
        font-size: 1em;
        transition: box-shadow .4s, background-color .3s;
        line-height: 1.15;
        cursor: pointer;
    }
    button.exmSwal[disabled]
    {
        background-color: #dfdfdf;
        cursor: default;
    }
    button.exmSwal:focus
    {
        box-shadow: 0 0 0 3px rgba(51, 51, 51, .5);
    }
    button.exmSwal:hover[enabled]
    {
        background-color: #282828;
    }
    button.exmSwal:active[enabled]
    {
        background-color: #242424;
    }
</style>

~~两个月没写文章了啊~~

最近新加了一个 SweetAlertJS，尝试使用一些简单的~~啸~~小实例来测试一下，同时是~~教程，不是~~备忘录。  
首先，需要引用 js 源文件，我已经在 head 部分引入了，所以，可以直接来 <button class="exmSwal" name="1">尝试</button> 了。  
代码就是这个样子：

```javascript
Swal.fire("SweetAlert2", "这是一条由 SweetAlert2 呈现的提示框");
```

很简单，也很好看。比 alert 好多了（官方也这样说）。

<!--more-->

## 按钮
有好多按钮我还没试过呢，今天就来学习和试一下。  
你可以：
- **更改按钮文字** <button class="exmSwal" id="2">更改了默认的 OK 和 Cancel</button>
- **更多按钮** <button class="exmSwal" id="2">四个按钮</button>
- **决定按钮返回值** <button class="exmSwal" id="2">演示</button>

最后再加一个：<button class="exmSwal" id="showTest">Toast 消息</button>

代码 F12 看吧。

<script>
    const exmbtn = document.querySelectorAll("button.exmSwal");
    function throttle(fn, interval, options = { leading: true, trailing: false }) {
        const { leading, trailing, resultCallback } = options;
        let lastTime = 0;
        let timer = null;
        const _throttle = function(...args) {
            return new Promise((resolve, reject) => {
                const nowTime = new Date().getTime();
                if (!lastTime && !leading) lastTime = nowTime;
                const remainTime = interval - (nowTime - lastTime);
                if (remainTime <= 0) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    const result = fn.apply(this, args);
                    resolve(result);
                    lastTime = nowTime;
                    return;
                }
                else {
                    Toast.fire({icon:"error", text:"请不要频繁点击按钮，会出 Bug 的", timer:interval - (nowTime - lastTime)});
                    console.log(interval - (nowTime - lastTime));
                    for(let i = 0; i < exmbtn.length; i++) {
                        exmbtn[i].disabled = true;
                        setTimeout(() => {exmbtn[i].disabled = false;}, interval - (nowTime - lastTime));
                    }
                }
                if (trailing && !timer) {
                    timer = setTimeout(() => {
                        timer = null;
                        lastTime = !leading ? 0: new Date().getTime();
                        const result = fn.apply(this, args);
                        resolve(result);
                    }, remainTime);
                }
            });
        }
        return _throttle;
    }
    for(let i = 0; i < exmbtn.length; i++) {
        exmbtn[i].addEventListener("click", throttle(showExample(i), 5000));
    }
    function showExample(num) {
        return function() {
            if(num == 0) {
                Swal.fire("SweetAlert2", "这是一条由 SweetAlert2 呈现的提示框");
            }
            else if(num == 1) {
                Swal.fire({
                    title: "按钮文字",
                    text: "下面有两个按钮，一个显示“哦，我知道了”，一个显示“不用你啰嗦”",
                    confirmButtonText: "我知道了",
                    showCancelButton: true,
                    cancelButtonText: "不用你啰嗦"
                });
            }
            else if(num == 2) {
                Swal.fire({
                    text: "下面有三个按钮，右上面有一个关闭",
                    showCancelButton: true,
                    showDenyButton: true,
                    showCloseButton: true,
                    cancelButtonText: "取消按钮",
                    confirmButtonText: "确定按钮",
                    denyButtonText: "拒绝按钮"
                });
            }
            else if(num == 3) {
                Swal.fire({
                    showCancelButton: true,
                    showDenyButton: true,
                    showCloseButton: true,
                    cancelButtonText: "取消按钮",
                    confirmButtonText: "确定按钮",
                    denyButtonText: "拒绝按钮",
                    preConfirm: (text) => {
                        Swal.fire("", "你点击了确定按钮", "success");
                    },
                    preDeny: () => {
                        Swal.fire("", "你点击了拒绝按钮");
                    }
                }).then(((val) => {
                    console.log(val);
                    if(val.isDismissed)
                    {
                        var showstr = "";
                        if(val.dismiss == "backdrop") showstr = "点击对话框外";
                        else if(val.dismiss == "cancel") showstr = "取消按钮";
                        else if(val.dismiss == "close") showstr = "右上角关闭小叉按钮";
                        else if(val.dismiss == "esc") showstr = "按 ESC 键";
                        Swal.fire({html:`你通过 <strong>${showstr}</strong> 关闭了消息框`});
                    }
                }));
            }
        }
    }
</script>
<script type="module">
    const icon_list = ["success", "error", "warning", "info", "question"];
    async function testSwal2Toast() {
        for(let i = 0; i < exmbtn.length; i++) {
            exmbtn[i].disabled = true;
        }
        for(let i = 0; i < 5; i++) {
            await Toast.fire({icon:icon_list[i], text:icon_list[i]});
        }
        for(let i = 0; i < exmbtn.length; i++) {
            exmbtn[i].disabled = false;
        }
    }
    document.querySelector("button#showTest").addEventListener("click", testSwal2Toast);
</script>