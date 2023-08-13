---
title: 二叉树的前序、中序、后序遍历
date: 2023-08-03 12:56:12
tags:
- 数据结构
- 树
categories: 课程笔记
---

二叉树的前序遍历中序遍历和后序遍历是比较重要的~~CCF办的比赛要考（雾~~。可以通过这三个遍历的顺序结果确定整个树的结构。前序遍历是**根左右**，中序遍历是**左根右**，后序遍历是**左右根**。（不想多写什么了）

## 实践：前序遍历中序遍历确定树
前序遍历：`1 2 4 3 5 6`  
中序遍历：`4 2 1 5 3 6`

先来看前序，由于前序遍历的顺序是根左右，那么 `1` 一定是整个树的根节点。<!--more-->随后在中序遍历找到 `1`，即可判断这个二叉树的左子树和右子树，就是这样分开来：  
前序遍历：<code><span style="border-bottom: solid 2px #999;">1</span> <span style="border: solid 1px #777; border-radius: 2px;">2 4</span> <span style="border: solid 1px #555; border-radius: 2px;">3 5 6</span></code>  
中序遍历：<code><span style="border: solid 1px #777; border-radius: 2px;">4 2</span> <span style="border-bottom: solid 2px #999;">1</span> <span style="border: solid 1px #555; border-radius: 2px;">5 3 6</span></code>  
在继续分下去，得到：  
前序遍历：<code><span style="border-bottom: solid 2px #999;">1</span> <span style="border: solid 1px #777; border-radius: 2px;"><span style="border-bottom: solid 2px #ccc;">2</span> 4</span> <span style="border: solid 1px #555; border-radius: 2px;"><span style="border-bottom: solid 2px #111;">3</span> 5 6</span></code>  
中序遍历：<code><span style="border: solid 1px #777; border-radius: 2px;">4 <span style="border-bottom: solid 2px #ccc;">2</span></span> <span style="border-bottom: solid 2px #999;">1</span> <span style="border: solid 1px #555; border-radius: 2px;">5 <span style="border-bottom: solid 2px #111;">3</span> 6</span></code>

最终，得到这样一个树：
![](https://s2.loli.net/2023/08/03/JqBMmjXIrFUk1L2.png)