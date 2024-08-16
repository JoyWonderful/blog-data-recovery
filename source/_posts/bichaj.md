---
title: 并查集概念
date: 2023-11-26 10:29:30
tags: 基础算法
categories: CourseNotes
mathjax: true
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
按照树来说，就是找到根节点。可以通过递归的方式。如果要判断两个数是否在同一个集合中，只要判断他们的根结点是否相同（`find(a) == find(b)`）

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
void merge(int a, int b)
{
    fa[find(fa[a])] = find(fa[b]);
}
```

## 优化

**路径压缩**：
在查询的时候，我们只想知道这个数的**根结点**。这样在查询时可以直接找到根结点。所以，可以在查询时把结点的父结点设为它的根结点：

```cpp
int find(int num)
{
    if(fa[num] != num) fa[num] = find(fa[num]); // 操作了原有结点指向根结点，路径压缩
    return fa[num];
}
```

**按秩合并**（启发式合并）：
每次查找时，深度（秩）影响查找的速度。当一个深度较大的集合合并到深度较小的集合中时，它的深度一定会加一，就像这样：

> ![mrg-wrong](https://s21.ax1x.com/2024/03/10/pFy3OhT.png)  
> \[1, 2, 3, 4\] 这个集合深度为 4；\[5, 6\] 这个集合深度为 2；将 1 的父结点设为 5 合并后整个集合深度为 5。  
> 深度加一，这不利于查找

当深度较小的集合合并到较大的集合中，深度才不会加深（也就保持在较深集合的深度）：

> ![mrg-azhb](https://s21.ax1x.com/2024/03/10/pFy3LNV.png)  
> 两个集合同上。将 5 的父结点设为 1，深度还是 4。  
> 查找集合 \[1, 2, 3, 4\] 中任意一个结点，花费时间不变。

所以，要记录集合的深度，合并时将深度较大的放“上面”。只有在两个集合深度相等时，才可以（不得不）加深。  
代码是：

```cpp
void merge(int a, int b)
{
    if(rk[a] < rk[b]) fa[find(fa[a])] = find(fa[b]); // rk 记录集合的深度
    else
    {
        fa[find(fa[b])] = find(fa[a]);
        if(rk[a] == rk[b]) ++rk[a]; // 按秩合并
    }
}
```

[评测记录](https://www.luogu.com.cn/record/list?pid=P3367&user=857826&orderBy=1&status=&page=1)，最下面是优化前，最上面一条最快的是优化后。

## 例题
并查集最经典的就是亲戚问题。

比较完整的代码是：

```cpp
#include <cstdio>
using namespace std;

int n, m;
const int T = 1e4 + 3;
int fa[T], rk[T]; // rk 记录集合深度（秩）
void init()
{
    for(int i = 1; i <= n; i++)
    {
        fa[i] = i;
    }
}
int find(int num)
{
    if(fa[num] != num) fa[num] = find(fa[num]); // 操作了原有结点指向根结点，路径压缩
    return fa[num];
}
void merge(int a, int b)
{
    if(rk[a] < rk[b]) fa[find(fa[a])] = find(fa[b]);
    else
    {
        fa[find(fa[b])] = find(fa[a]);
        if(rk[a] == rk[b]) ++rk[a]; // 按秩合并
    }
}

int main()
{
    scanf("%d %d", &n, &m);

    init();
    for(int i = 1; i <= m; i++)
    {
        int z, x, y;
        scanf("%d %d %d", &z, &x, &y);
        if(z == 1) merge(x, y);
        else
        {
            if(find(x) == find(y)) printf("Y\n");
            else printf("N\n");
        }
    }

    return 0;
}
```

例如：
<a href="https://www.luogu.com.cn/problem/P1551" target="_blank">[洛谷 P1151] 亲戚</a>
<a href="https://www.luogu.com.cn/problem/P3367" target="_blank">[洛谷 P3367] 并查集</a>
