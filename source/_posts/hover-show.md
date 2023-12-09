---
title: CSS 鼠标悬浮窗口效果
date: 2023-11-12 11:45:14
tags: HTML
categories: 编程随记
---

最近弄的 github 卡片，弄了半天弄出来的鼠标悬浮显示文字的效果。使用 CSS 伪元素弄出来的小提示。但是不适合 `overflow: hidden;` 的元素。不管怎么说，还是很好用的，忘掉了就不太好，也就放到博客里来了。

<!--more-->

<span>测试：<span><span aria-label="左边提示" balloon-shown="left" style="margin-left:30px;">把鼠标悬浮到这段文字上会在左边显示提示</span>  
<span style="margin-right:20px;">这是一个使用场景的实例（图标解说）：</span><a aria-label="刷新" balloon-shown="right" style="border-bottom:none;border:1px solid #aaa;border-radius:3px;background-color:inherit;transition:backgrond-color .3s;padding:5px;" href="#" class="yigethis-page-button"><i class="fa fa-rotate"></i></a>  
<span style="margin-right:20px;">实例（更详细的说明）</span><span aria-label="公开程度" balloon-shown="up" style="border:1px solid #aaa;border-radius:2em;padding:1px 7px;">受保护的</span>  
<span style="margin-right:20px;">使用场景实例</span><a aria-label="共 3 只" balloon-shown="down" class="tag-cloud-1" href="#">猫咪</a> <a aria-label="共 2 只" balloon-shown="down" class="tag-cloud-1" href="#">狗勾</a> <a aria-label="共 1 只" balloon-shown="down" class="tag-cloud-1" href="#">蛙蛙</a> <a aria-label="共 4 只" balloon-shown="down" class="tag-cloud-1" href="#">仓鼠</a> <a aria-label="共 2 只" balloon-shown="down" class="tag-cloud-1" href="#">乌龟</a>  

代码是这样的：
```css
[aria-label][balloon-shown] {
    position: relative;
}
[aria-label][balloon-shown="left"]::before {
    border: 5px solid transparent;
    border-left-color: #202335;
}
[aria-label][balloon-shown="right"]::before {
    border: 5px solid transparent;
    border-right-color: #202335;
}
[aria-label][balloon-shown="up"]::before {
    border: 5px solid transparent;
    border-top-color: #202335;
}
[aria-label][balloon-shown="down"]::before {
    border: 5px solid transparent;
    border-bottom-color: #202335;
}
[aria-label][balloon-shown]::before {
    width: 0;
    height: 0;
    /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
    z-index: 10;
    content: "";
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: opacity .4s, transform .4s, visibility .4s;
}
[aria-label][balloon-shown]::after {
    opacity: 0;
    z-index: 10;
    /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
    visibility: hidden;
    background-color: #202335;
    content: attr(aria-label);
    white-space: nowrap;
    border-radius: 2px;
    position: absolute;
    padding: .5em 1em;
    transition: opacity .4s, transform .4s, visibility .4s;
    color: #eee;
}
[aria-label][balloon-shown]:hover::after, [aria-label][balloon-shown]:hover::before {
    opacity: 0.9;
    visibility: visible;
}
[aria-label][balloon-shown="left"]::after {
    margin-right: 10px;
}
[aria-label][balloon-shown="left"]::after, [aria-label][balloon-shown="left"]::before {
    right: 100%;
    top: 50%;
    transform: translate(5px, -50%);
}
[aria-label][balloon-shown="right"]::after {
    margin-left: 10px;
}
[aria-label][balloon-shown="right"]::after, [aria-label][balloon-shown="right"]::before {
    left: 100%;
    top: 50%;
    transform: translate(-5px, -50%);
}
[aria-label][balloon-shown="left"]:hover::after, [aria-label][balloon-shown="left"]:hover::before, [aria-label][balloon-shown="right"]:hover::after, [aria-label][balloon-shown="right"]:hover::before {
    transform: translate(0, -50%);
}
[aria-label][balloon-shown="up"]::after {
    margin-bottom: 10px;
}
[aria-label][balloon-shown="up"]::after, [aria-label][balloon-shown="up"]::before {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 5px);
}
[aria-label][balloon-shown="down"]::after {
    margin-top: 10px;
}
[aria-label][balloon-shown="down"]::after, [aria-label][balloon-shown="down"]::before {
    left: 50%;
    top: 100%;
    transform: translate(-50%, -5px);
}
[aria-label][balloon-shown="up"]:hover::after, [aria-label][balloon-shown="up"]:hover::before, [aria-label][balloon-shown="down"]:hover::after, [aria-label][balloon-shown="down"]:hover::before {
    transform: translate(-50%, 0);
}
```

使用时这样使用：
```html
<标签 aria-label="文字" balloon-shown="up"或"down"或"left"或"right">文字</标签>
```

可以回到上面的实例部分右键选择审查元素。