---
title: 并查集概念
date: 2023-11-26 10:29:30
tags: 基础算法
categories: 课程笔记
---

## 写在前面

> 又有好长时间没有写过课程笔记了啊~  
> <span style="display:block;text-align:right">—— by JoyWonderful</span>

**并查集**就是将一些集合融合，然后查询某个数字和某个数字是否在这个集合里~~（蒟蒻奇怪的自我理解，大概也没人看这句话）~~。  
并查集有一个思想，一个元素的父亲为自己，这是**初始化**时会用到的。

<!--more-->

并查集只有两种操作：
- **合并**：将两个元素所在的集合合并；
- **查找**：两个元素是否都在同一个集合里。

并查集的“集合”中有<a href="/posts/graph-tree" style="border-bottom:none">树</a>的概念，每一个集合就像是树，父亲就像父结点（根节点）。

## 代码
### 初始化
一个元素的父亲为自己，所以可以使用一个数组为 `fa`(father)，$fa_i$ 代表第 $i$ 个元素的父亲为 $fa$。所以，可以使用以下代码：

```cpp
int fa[10003];
void init()
{
    for(int i = 1; i <= n; i++) // n 代表有 n 个元素
    {
        fa[i] = i; // 开始时一个元素的父亲为自己
    }
}
```

### 查询
按照树来说，就是找到根节点。可以通过递归的方式。

```cpp
int find(int num)
{
    if(fa[num] == num) return fa[num];
    else return find(fa[num]);
}
```

### 合并
其实就是找到两个元素的根节点，然后将其中的一个设置为另一个的父亲。

```cpp
void _union(int a, int b)
{
    fa[find(fa[a])] = find(fa[b]);
}
```

## 例题
并查集最经典的就是亲戚问题。  
例如：
<a href="https://www.luogu.com.cn/problem/P1551" target="_blank">[洛谷 P1151] 亲戚</a>
<a href="https://www.luogu.com.cn/problem/P3367" target="_blank">[洛谷 P3367] 并查集</a>
