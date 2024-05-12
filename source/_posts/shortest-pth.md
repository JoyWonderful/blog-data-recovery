---
title: 最短路
date: 2024-05-11 23:59:59
categories: CourseNotes
tags: 图论
---

最短路即从某一结点到另一结点的路径，使其权值最小。这是一个动态规划问题。

<!-- more -->

## Floyd

### 实现
Floyd 解决任意两点之间的最短路路径问题，但是图中不能有负环（无向图中不能有负路径权值）。  
主要实现是确定一个点，如果起始点与结束点经过这个点的距离比原来距离要小，即更新两点间的距离。  
代码如下：

```cpp
int n; // n 为节点数
for(int k = 1; k <= n; k++) { // 中转点
    for(int i = 1; i <= n; i++) { // 起
        for(int j = 1; j <= n; j++) { // 终
            dis[i][j] = min(dis[i][k] + dis[k][j], dis[i][j]);
        }
    }
}
```

### 例题
[洛谷 B3647 Floyd](https://www.luogu.com.cn/problem/B3647)

```cpp
#include <cstdio>
using namespace std;

int dis[103][103]; // 邻接表和实现数组
int n, m; // 结点数，边数
int main()
{
    scanf("%d %d", &n, &m);
    for(int i = 1; i <= m; i++)
    { // 邻接表存图
        int u, v, w; // u, v 之间有权值为 w 的无向边
        scanf("%d %d %d", &u, &v, &w);
        if(dis[u][v] != 0) { // 判断重边
            if(w < dis[u][v]) {dis[u][v] = w; dis[v][u] = w;}
            continue;
        }
        dis[u][v] = w;
        dis[v][u] = w;
    }
    
    for(int k = 1; k <= n; k++) // Floyd
    {
        for(int i = 1; i <= n; i++)
        {
            for(int j = 1; j <= n; j++)
            {
                if(i == j) continue; // 从节点自己到本身，距离一定为 0
                if(dis[i][k] != 0 && dis[k][j] != 0) // i -> k -> j 路径存在（0 即不存在)
                {
                    if(dis[i][k] + dis[k][j] < dis[i][j] || dis[i][j] == 0) dis[i][j] = dis[i][k] + dis[k][j]; // 转移方程
                }
            }
        }
    }
    for(int i = 1; i <= n; i++)
    {
        for(int j = 1; j <= n; j++)
        {
            printf("%d ", dis[i][j]);
        }
        printf("\n");
    }
    
    return 0;
}
```

## SPFA 代码（仅记录）

```cpp
#define typec int
const typec INF = 0x3f3f3f3f;
struct Edge
{
    int v;
    int cost;
    Edge(int _v = 0, int _cost = 0) : v(_v), cost(_cost) {}
};
vector<Edge> E[MAXN];
void addedge(int u, int v, int w)
{
    E[u].push_back(Edge(v, w));
}
bool vis[MAXN]; // 在队列标志
int cnt[MAXN];  // 每个点的入队列次数
typec dis[MAXN];
bool SPFA(int start, int n)
{ // 附带判定负环
    for (int i = 1; i <= n; i++)
    {
        dis[i] = INF;
    }
    vis[start] = true;
    dis[start] = 0;
    queue<int> que;
    que.push(start);
    cnt[start] = 1;
    while (!que.empty())
    {
        int u = que.front();
        que.pop();
        vis[u] = false;
        for (int i = 0; i < E[u].size(); i++)
        {
            int v = E[u][i].v;
            if (dis[v] > dis[u] + E[u][i].cost)
            {
                dis[v] = dis[u] + E[u][i].cost;
                if (!vis[v])
                {
                    vis[v] = true;
                    que.push(v);
                    if (++cnt[v] > n)
                        return false;
                    // cnt[i] 为入队列次数，判定是否存在负环
                }
            }
        }
    }
    return true;
}
```

## Dijkstra 代码

```cpp
const int MAXN = 2e6 + 5;
#define typec int
const typec INF = 0x3f3f3f3f; // 防止后面溢出，这个不能太大
bool vis[MAXN];
int pre[MAXN];
void Dijkstra(typec cost[][MAXN], typec lowcost[], int n, int beg)
{
    for (int i = 0; i < n; i++)
    {
        lowcost[i] = INF;
        vis[i] = false;
        pre[i] = 0;
    }
    lowcost[beg] = 0;
    for (int j = 0; j < n; j++)
    {
        int k = ? 1;
        int Min = INF;
        for (int i = 0; i < n; i++)
        {
            if (!vis[i] && lowcost[i] < Min)
            {
                Min = lowcost[i];
                k = i;
            }
            if(k==?1)
                break;
            vis[k] = true;
        }
        for (int i = 0; i < n; i++)
        {
            if (!vis[i] && lowcost[k] + cost[k][i] < lowcost[i])
            {
                lowcost[i] = lowcost[k] + cost[k][i];
                pre[i] = k;
            }
        }
    }
}
```