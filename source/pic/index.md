---
title: 记忆的留影
date: 2023-05-21 10:08:19
comments: false
---

<style type="text/css">
    .my-img-title {
        font-weight: bold;
        font-size: 20px;
        text-align: center;
    }

    .liuying {
        margin: 1px 1px 20px;
        position: relative;
        width: calc(100% - 20px);
        /*height: 830px;*/
        display: block;
    }
    .left-image {
        float: left;
        width: calc(100% / 2 - 10px);
        /*height: calc(100% / 2 - 10px);*/
        /*position: inline;*/
        display: block;
        margin-bottom: 10px;
        overflow: hidden;
    }
    .right-image {
        float: right;
        width: calc(100% / 2 - 10px);
        /*height: calc(100% / 2 - 10px);*/
        /*position: inline;*/
        display: block;
        margin-bottom: 10px;
        overflow: hidden;
    }
</style>

<div style="z-index:5;background-color:#ffffff;position:sticky;top:10px;opacity:0.9;border-radius:3px;width:90%;margin:0 auto;border:solid 1px #ccc;">
    <p style="color:#444444;font-weight:bold;font-size:14px;padding-left:5px;display:inline;position:sticky;top:10px;">分类：</p>
    <a style="border-bottom:none;font-size:14px;display:inline;margin-left:7px;position:sticky;top:10px;" href="#draws">画</a>
    <a style="border-bottom:none;font-size:14px;display:inline;margin-left:7px;position:sticky;top:10px;" href="#animals">动物</a>
    <a style="border-bottom:none;font-size:14px;display:inline;margin-left:7px;position:sticky;top:10px;" href="#landscapes">风景</a>
</div>

<p class="my-img-title" id="draws">纸与笔的摩擦，黑白之间见风韵</p>
<div class="liuying" id="draws-pic">
    <img src="/pic/pencil-box.jpg" title="这是我一节美术课闲着没事画的，画的是我自己的文具袋。" class="left-image" id="pencil-box">
    <img src="/pic/naozhong.jpg" title="这是我在家里照着姐姐的闹钟画的。" class="right-image" id="naozhong">
    <img src="/pic/class-balloon.jpg" title="这是同学送我的毕业礼物，谢谢那位同学！" class="left-image" id="class-balloon">
    <img src="/pic/classmategift.jpg" title="同学毕业送我这幅画有一段时间了，我暂时没和任何一位同学联系上..." class="right-image" id="classmategift">
</div>

<p class="my-img-title" id="animals">动物憨态，如何不爱</p>
<div class="liuying" id="animals-pic">
    <img src="/pic/dog-banyue-turtle.jpg" title="这是我们曾经养的一只小狗，旁边是乌龟。" class="left-image" id="dog-banyue-turtle">
    <img src="/pic/dog-dhbbs.jpg" title="这是我们去东海半边山路遇的一只狗狗。" class="right-image" id="dog-dhbbs">
    <img src="/pic/Inkeddog-huahua.jpg" title="这是几年前拍的照片。" class="right-image" id="Inkeddog-huahua">
    <img src="/pic/dog-heihei.jpg" title="这是我姥姥养的一只黑狗狗。" class="left-image" id="dog-heihei">
</div>

<p class="my-img-title" id="landscapes">风景如画，一天天的美好</p>
<div class="liuying" id="landscapes-pic">
    <img src="/pic/dgbbs-bridge.jpg" title="这是东海半边山。" class="left-image" id="dgbbs-bridge">
    <img src="/pic/dhbbs-boat.jpg" title="这也是在东海半边山拍的。" class="right-image" id="dgbbs-boat">
    <img src="/pic/dhbbs-ting.jpg" title="拍下的亭子。" class="left-image" id="dhbbs-ting">
    <img src="/pic/tree-sun.jpg" title="去老家的路上，在高速（？）上拍的太阳初升。" class="right-image" id="tree-sun">
</div>

<p style="color:#d7d7d7;text-align:center;font-size:3px;">更多内容，等待发现上传...</p>

<script>
    function divElementResizeHeight() {
        var all = document.querySelectorAll("div.post-body");
        var alldiv = all[0].querySelectorAll("div");

        for(let i = 1; i < alldiv.length; i++) {
            var idstr = "#" + alldiv[i].getAttribute("id");
            var querystrl = "div" + idstr + " img.left-image";
            var querystrr = "div" + idstr + " img.right-image";

            var leftsum = 0; var rightsum = 0;
            var imgql = document.querySelectorAll(querystrl);
            var imgqr = document.querySelectorAll(querystrr);
            for(let j = 0; j < imgql.length; j++) {
                leftsum += imgql[j].height;
            }
            for(let j = 0; j < imgqr.length; j++) {
                rightsum += imgqr[j].height;
            }
            var esum = Math.max(leftsum, rightsum) + 30;
            console.log("%cleft: %c%s\n%cright: %c%s\n%cleftsum: %c%d\n%crightsum: %c%d\n%cesum(change-height): %c%d\n\n%cdiv-idstr: %cdiv%s\n%cThis div was changed.", "color: #000000;", "color:#8959a8;", querystrl, "color: #000000;", "color:#8959a8;", querystrr, "color: #000000;", "color:#8959a8;", leftsum, "color: #000000;", "color:#8959a8;", rightsum, "color: #000000;", "color:#8959a8;", esum, "color: #000000;", "color:#8959a8;", idstr, "color: #999999; font-weight: bold;");

            alldiv[i].style.height = String(esum) + "px";
        }

        console.log("%cAll chaged.", "font-weight:bold; background-color:#52c41a; color:#ffffff; padding-left: 2px;");
    }
    window.addEventListener("load", divElementResizeHeight);
    window.addEventListener("resize", divElementResizeHeight);
</script>