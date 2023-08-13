---
title: 订阅选项
date: 2023-06-20 10:16:34
---

<script>
    function changeCopyInfo() {
      navigator.clipboard.writeText("https://joywonderful.github.io/atom.xml").then(
        function () {
            var cpinnertext = document.getElementById("copybtninfo");
            cpinnertext.innerHTML = "已复制";
            setTimeout(() => cpinnertext.innerHTML = "复制atom.xml源文件链接", 2000);
        },
        function () {
            var cpinnertext = document.getElementById("copybtninfo");
            cpinnertext.innerHTML = "复制时出现错误";
            setTimeout(() => cpinnertext.innerHTML = "复制atom.xml源文件链接", 2000);
        },
      );
    } /*自己又写了一个屎山 JS。。。也没啥用，我的强迫症本质让我写了显示“已复制” By JoyWonderful*/
    /* 要是某个用户突然兴起狂点复制，屎山的本质据显现出来了吧。（大雾 我猜没有人会来看这行代码注释，除了我。*/
</script>

<!--屎山代码 QwQ-->
<span class="links-of-author-item">
    <a href="https://www.innoreader.com/search/feeds/https%3A%2F%2Fjoywonderful.github.io%2Fatom.xml" rel="noopener me" target="_blank">通过inoreader订阅（国内源）</a>
</span>
<span class="links-of-author-item">
    <a href="https://theoldreader.com/" rel="noopener me" target="_blank">通过theoldreader订阅（无法定向，请点击最下面的按钮复制链接后粘贴至搜索框）</a>
</span>
<span class="links-of-author-item">
    <a href="https://www.qireader.com/discover" rel="noopener me" target="_blank">通过qireader订阅（无法定向，请点击最下面的按钮复制链接后粘贴至搜索框）</a>
</span>
<span class="links-of-author-item">
    <a href="https://www.readdig.com/feed/6496a90063a9490018d26791" rel="noopener me" target="_blank">通过readdig订阅</a>
</span>
<span class="links-of-author-item">
    <a href="/atom.xml">通过atom.xml源文件</a>
</span>
<span class="links-of-author-item">
    <a href="javascript:changeCopyInfo();" id="copybtninfo">复制atom.xml源文件链接</a>
</span>