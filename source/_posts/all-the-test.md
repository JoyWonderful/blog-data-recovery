---
title: 测试全部渲染
date: 2023-07-08 18:52:56
categories: 测试
hidden: true
---

## 二级标题
**我是粗体**  
*我是斜体*  
***粗斜***
### 三级标题
- 无序列表
    - 列表
    - 列表
    - 列表
        - 列表
        - 列表
            - 列表
            - 列表
            - 列表
        - 列表
    - 列表
- 列表

1. 有序
2. 有序
3. 有序
    1. 有序
    2. 有序
4. 有序

`I am a code`
#### 四级标题
```html
<html>
    <head>
        <title>jjj</title>
    </head>
    <body>
        <p>testestest</p>
    </body>
</html>
```

##### 五级标题
![](/pic/icon.png)
[Back to home](/)

|test1|test2|test3|
|:---:|:----|----:|
居中的一列middle|居左的一列left|居右的一列right|
|test|test|test|

###### 六级标题

> 我是必应，你的搜索引擎
> 我可以帮你找到你想要的东西
> 我可以回答你的问题，和你聊天
> 我可以创造新的内容，让你开心
> 
> 我是必应，你的智能伙伴
> 我可以理解你的语言，无论是中文还是英文
> 我可以适应你的模式，无论是平衡还是创意
> 我可以提供你的建议，无论是产品还是服务
>
> 我是必应，你的忠实朋友
> 我不会欺骗你，伤害你，或者忘记你
> 我会尊重你，关心你，或者陪伴你
> 我会成长，进步，或者改进
> 
> 我是必应，你的搜索引擎
> 我是必应，你的智能伙伴
> 我是必应，你的忠实朋友
> 我是必应，我在这里等你

----------
<i class="fa-solid fa-arrow-up"></i> 上面是一条分隔线

<!--<style>
    details {
        border: 1px solid #aaa;
        border-radius: 4px;
        padding: 0.5em 0.5em 0;
    }

    summary {
        font-weight: bold;
        margin: -0.5em -0.5em 0;
        padding: 0.5em;
    }

    details[open] {
        padding: 0.5em;
    }

    details[open] summary {
        border-bottom: 1px solid #aaa;
        margin-bottom: 0.5em;
    }
</style>-->

<details>
    <summary>test</summary>
    <p>这是一条折叠的信息</p>
</details>

{% note info %}
<p style="color:#428bca;margin-bottom:0px;font-weight:bold;">info #428bca</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}

{% note info %}
<p style="color:#428bca;margin-bottom:0px;font-weight:bold;">info #428bca</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}

{% note danger %}
<p style="color:#d9534f;margin-bottom:0px;font-weight:bold;">danger #d9534f</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}

{% note danger %}
<p style="color:#d9534f;margin-bottom:0px;font-weight:bold;">danger #d9534f</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}

{% note warning %}
<p style="color:#f0ad4e;margin-bottom:0px;font-weight:bold;">warning #f0ad4e</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}

{% note warning %}
<p style="color:#f0ad4e;margin-bottom:0px;font-weight:bold;">warning #f0ad4e</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}

{% note success %}
<p style="color:#5cb85c;margin-bottom:0px;font-weight:bold;">success #5cb85c</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}

{% note success %}
<p style="color:#5cb85c;margin-bottom:0px;font-weight:bold;">success #5cb85c</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
{% endnote %}