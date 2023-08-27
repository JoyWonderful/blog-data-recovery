---
title: 记录：JavaScript 随机显示图片/随机数
date: 2023-08-26 11:45:14
tags:
- JavaScript
- HTML
categories: 编程随记
---

又是一个闲着没事干的随记。。。直接进入正题吧。

考虑使用数组存储图片的链接，然后随机显示。  
随机显示数组图片自然需要随机数，而随机显示图片还需要查找元素，所以就写这些。

<!--more-->

## 生成从 0 到 n 的随机数

JavaScript 有一个很强大的对象，`Math`，里面有很多属性以及方法，可以去看看 <a target="_blank" rel="noopener" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math">MDN Web Docs <i class="fa fa-arrow-up-right-from-square" style="font-size:15px;"></i></a>。  
这么多函数中，`Math.random()` 正是我们想要的函数，它可以生成小于 1 的随机（小）数。例如：

```javascript
>  Math.random();
<· 0.8823149516270028
```

但是，它生成的随机数没有界限，而且还是小数。那么，我们可以先进行取整，再对它设置界限。`Math` 对象有一个函数 `round()` 可以对小数进行四舍五入，例如：

```javascript
>  Math.round(1.4)
<· 1

>  Math.round(1.5)
<· 2
```

自然，`Math.round(Math.random())` 就可以确保随机数是整数了。至于限制，可以将 `Math.random()` 的结果乘上 n，就可以获取 0\~n 的整数。例如，`Math.round(Math.random() * 7)` 可以获取 0\~7 的随机数。

## 查找元素

查找元素可以使用 `document.querySelectorAll("")` 来选择元素（选择器）。例如 `document.querySelectorAll("img");` 返回所有标签为 img 的元素。  
例如：下面这段话的标签为 span，id 为 testsel，点击“更改文字”即可更改下面这段话。

<script>
    function testsele() {
        var selp = document.querySelectorAll("span#testsel");
        selp[0].innerHTML = "这段文字被更改过了。";
    }
</script>
<p style="border-radius:2px; border:1px solid #999;">
    <span id="testsel" style="margin:2px;">我是一段文字。</span>
    <br>
    <a href="javascript:testsele()" class="btn" style="margin:5px;">更改文字</a>
</p>

代码如下：

```javascript
var selp = document.querySelectorAll("span#testsel");
selp[0].innerHTML = "这段文字被更改过了。";
```

## 实例

结合上面的内容，就可以做随机显示图片了。

代码是这样的：

```javascript
var picLink = ["/pic/naozhong.jpg", "/pic/dog-heihei.jpg", "/pic/pencil-box.jpg", "/pic/class-balloon.jpg", "/pic/dgbbs-bridge.jpg", "/pic/dhbbs-ting.jpg", "/pic/dhbbs-boat.jpg"];
var imgSel = document.querySelectorAll("img#random-pic");
var randomNumber = Math.round(Math.random() * (picLink.length) - 1);
imgSel[0].src = picLink[randomNumber];
```

<script>
    function showRandomPic() {
        var picLink = ["/pic/naozhong.jpg", "/pic/dog-heihei.jpg", "/pic/pencil-box.jpg", "/pic/class-balloon.jpg", "/pic/dgbbs-bridge.jpg", "/pic/dhbbs-ting.jpg", "/pic/dhbbs-boat.jpg"];
        var imgSel = document.querySelectorAll("img#random-pic");
        var randomNumber = Math.round(Math.random() * (picLink.length - 1));
        console.log("[INFO] randomNumber: " + randomNumber + "\n[INFO] picLink: " + picLink[randomNumber]);
        imgSel[0].src = picLink[randomNumber];
    }
    window.addEventListener("load", showRandomPic);
</script>

<p style="border-radius:2px; border:1px solid #999;">
    <img id="random-pic" style="margin:3px; width:70%;" alt="img1" src="/pic/icon.png">
    <a href="javascript:showRandomPic()" class="btn" style="margin:5px;">换张图片？</a>
</p>

## 封装函数

<p style="border-radius:2px; border:1px solid #999;">
    <img id="random-pic2" alt="img" style="margin:3px; width:70%;" src="/pic/icon.png">
    <a id="rdm-btn" class="btn" style="margin:5px;">换张图片？</a>
</p>

<script>
    var imgArr = ["/pic/naozhong.jpg", "/pic/dog-heihei.jpg", "/pic/pencil-box.jpg", "/pic/class-balloon.jpg", "/pic/dgbbs-bridge.jpg", "/pic/dhbbs-ting.jpg", "/pic/dhbbs-boat.jpg", "/pic/tree-sun.jpg", "/pic/Inkeddog-huahua.jpg"];

    function showRandomImage(ImgArray, Selector) {
        return function() {
            var imgSel = document.querySelectorAll(Selector);
            var randomNumber = Math.round(Math.random() * (ImgArray.length - 1));
            console.log("[INFO] randomNumber: " + randomNumber + "\n[INFO] picLink: " + ImgArray[randomNumber] + "\n[INFO] Listener return.");
            imgSel[0].src = ImgArray[randomNumber];
        }
    }

    const clkBtn = document.getElementById("rdm-btn");
    clkBtn.addEventListener("click", showRandomImage(imgArr, "img#random-pic2"), false);
</script>

就改了一点点而已，代码如下：

```javascript
function showRandomImage(ImgArray, Selector) {
    var imgSel = document.querySelectorAll(Selector);
    var randomNumber = Math.round(Math.random() * (ImgArray.length - 1));
    imgSel[0].src = ImgArray[randomNumber];
}
```

使用的时候，第一个参数填上图片链接的数组，第二个填上选择器。

如果想使用 `addEventListener` 可以这样使用：

```javascript
function showRandomImage(ImgArray, Selector) {
    return function() { // 二次封装
        var imgSel = document.querySelectorAll(Selector);
        var randomNumber = Math.round(Math.random() * (ImgArray.length - 1));
        imgSel[0].src = ImgArray[randomNumber];
    }
}

const clkBtn = document.getElementById("rdm-btn");
clkBtn.addEventListener("click", showRandomImage(imgArr, "img#random-pic2"), false);
```

二次封装之后就可以正常使用。
