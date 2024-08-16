---
title: 最小生成树
date: 2024-08-16 17:50:32
categories: CourseNotes
tags:
  - 树
  - 图论
---

## 前置概念

**生成树** 即从一个*连通图*中选择结点数减一条边构成一个树。  
最小生成树，即所有生成树中边权和*最小*。

<!--more-->

## Kruskal

克鲁斯卡尔（？好像这么译），使用贪心。  
它的思想就是从小到大加入边，同时避免形成环（使用[并查集](/posts/bichaj/)判断两点是否联通【是否在同一集合中】，这是树的要求）。当加入的边数为结点数减一时，就可以退出了。

详见 [P3366 最小生成树](https://www.luogu.com.cn/problem/P3366) 的代码和注释。

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;

const int TMP = 5e5 + 3;
int fa[TMP]/*并查集*/, n/*结点数*/, m/*边数*/, ans;

struct node
{
    int x, y, z; // x --z--> y
} a[TMP];
bool cmp(node a, node b)
{
    return a.z < b.z; // 按照边权从小到达排序（思想）
}

// 并查集模板：这里只使用路径压缩
void init() // 初始化
{
    for(int i = 1; i <= n; i++)
    {
        fa[i] = i;
    }
}
int find(int num) // 寻找其所在集合根节点
{
    if(fa[num] != num) fa[num] = find(fa[num]);
    return fa[num];
}
void merge(int x, int y) // 合并
{
    fa[find(fa[x])] = find(fa[y]);
}

int main()
{
    scanf("%d %d", &n, &m);
    init();
    for(int i = 1; i <= m; i++)
    {
        scanf("%d %d %d", &a[i].x, &a[i].y, &a[i].z);
    }
    sort(a + 1, a + m + 1, cmp); // 按照边权从小到达排序
    
    int cnt = 0; // 加入的边数
    for(int i = 1; i <= m; i++)
    {
        if(cnt == n - 1) // 已经是生成树了（加入的边为 n - 1），不用再找
        {
            break;
        }
        if(find(a[i].x) != find(a[i].y)) // 判断 x, y 是否联通（在同一集合中），避免形成环
        {
            merge(a[i].x, a[i].y); // 如果不在同一集合中，就合并（加入了边）
            ++cnt;
            ans += a[i].z;
        }
    }
    if(cnt >= n - 1) printf("%d\n", ans);
    else printf("orz\n"); // 加入的边数不到 n - 1，生成的不是树
    
    return 0;
}
```

## Prim

与 Kruskal 不同，它的思想是加点，类似于 [Dijkstra](/posts/shortest-pth/#Dijkstra)

> 堆优化的方式类似 Dijkstra 的堆优化，但如果使用二叉堆等不支持 O(1) decrease-key 的堆，复杂度就不优于 Kruskal，常数也比 Kruskal 大。所以，一般情况下都使用 Kruskal 算法，在稠密图尤其是完全图上，暴力 Prim 的复杂度比 Kruskal 优，但**不一定**实际跑得更快。  
> <span style="text-align:right; display:block"><a href="https://oi-wiki.org/graph/mst/#%E5%AE%9E%E7%8E%B0_1">OI-Wiki</a></span>

主要原因是老师没具体说，所以也不知道代码怎么写。~~所以就偷懒不写了。~~