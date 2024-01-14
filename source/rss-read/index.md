---
title: 订阅选项
date: 2023-06-20 10:16:34
---

<script>
    function changeCopyInfo() {
        const atomUrl = "https://joywonderful.github.io/atom.xml";
        if(navigator.clipboard) {
            navigator.clipboard.writeText(atomUrl).then(
            function () {
                Toast.fire({icon: "success", text: "已复制"});
                console.debug("[debug] navigator.clipboard success.");
            },
            function () {
                Toast.fire({icon: "error", text: "复制时出现错误"});
                console.debug("[debug] navigator error.");
            },);
        }
        else { // 兼容不支持 clipboard 方法的
            console.debug("[debug] broswer do not support clipboard.")
            const ta = document.createElement("textarea");
            ta.style.top = window.scrollY + "px";
            ta.style.position = "absolute";
            ta.style.opacity = "0";
            ta.readOnly = true;
            ta.value = atomUrl;
            document.body.append(ta);
            ta.select();
            ta.setSelectionRange(0, atomUrl.length);
            ta.readOnly = false;
            const res = document.execCommand("copy");
            if(res){Toast.fire({icon: "success", text: "已复制"});}
            else{Toast.fire({icon: "error", text: "复制时出现错误"});}
            ta.blur();
            document.body.removeChild(ta);
        }
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
    <a href="/atom.xml">通过atom.xml源文件</a>
</span>
<span class="links-of-author-item">
    <a href="javascript:changeCopyInfo();" id="copybtninfo">复制atom.xml源文件链接</a>
</span>