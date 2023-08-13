---
title: test-tag-pulgins
date: 2023-06-04 11:14:18
tags: 网站测试
categories: 测试
hidden: true
#comments: false
---

{% note default %}
#### Default Header
Welcome to [Hexo!](https://hexo.io)
{% endnote %}

<!--more-->

{% note primary %}
#### Primary Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

{% note success %}
#### Success Header
**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

{% note danger %}
#### Danger Header
**Welcome** to [Hexo!](https://hexo.io)
{% note info no-icon %}
#### No icon note
Note **without** icon: `note info no-icon`
{% endnote %}
{% endnote %}

{% note info %}
test
{% endnote %}

<details>
    <summary>title</summary>
    <p>https://joywonderful.github.io/</p>
</details>
<details open>
    <summary>default open</summary>
    <p>https://joywonderful.github.io/</p>
</details>

{% mermaid pie %}
"test1" : 386
"test2" : 85
"test3" : 15
{% endmermaid %}

Lorem {% label @ipsum %} {% label primary@dolor sit %} amet, consectetur {% label success@adipiscing elit, %} sed {% label info@do eiusmod %} tempor incididunt ut labore et dolore magna aliqua.

Ut enim *{% label warning @ad %}* minim veniam, quis **{% label danger@nostrud %}** exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate ~~{% label default @velit %}~~ <mark>esse</mark> cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

{% mermaid sequenceDiagram %}
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
{% endmermaid %}


{% gp 10-7 %}
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
![](/pic/icon.png)
{% endgp %}