---
title: 差分
date: 2023-05-02 17:47:43
tags: 
    - 基础算法
    - 前缀和，差分
    - 优化
categories: CourseNotes
mathjax: true
---

## 什么是差分，差分与前缀和的关系

差分也是一种**优化算法**。同时，差分是前缀和的逆运算，也就是说，前缀和也是差分的逆运算。因此，由前缀和数组可以求出差分数组，由差分数组也可以求出前缀和数组。

假设数组 $a$ 是原数组，数组 $b$ 是差分数组，则：$b_i = a_i - a_{i-1}$

<hr>

差分可以用于修改数组的操作。因为假设我需要将 $a_2$ $a_3$ $a_4$ 都加上 $2$ ，此时若使用前缀和则需要再使用递推重新求一遍前缀和，非常耗时。这时便可以使用差分数组。可以发现：

```mathKatex
\underbrace{b_1,\hspace{2mm} b_2}_{b_2 + 2 = b_1} ,\hspace{2mm} b_3,\hspace{2mm} \overbrace{b_4,\hspace{2mm} b_5}^{b_5 - 2 =b_4}
```

因此，只需修改差分数组中的两个项，然后再通过前缀和是差分的逆运算，即可求出原数组，从而完成数组的修改。

<!--more-->

## 具体例题（模板题）

### 差分模板题

#### 题目描述

给出一个数字$n$表示有个数字，

给出$n$ $n <= 10^5$个整数$a_1$,$a_2$,...$a_n$;

给出一个数字$m$ $m <= 10^5$ 有$m$个修改： 
每次询问给出三个整数$s$,$e$,$h$，使得 $a_s,a_{s+1}....a_{e}$每一个数加上h

最后给出两个数字 $start$,$end$。求出${ \sum_{i = start}^{end}} a_i $

#### 输入格式

第一行一个整数 $n$ 表示有$n$ 个数

第二行$n$个整数$a_1$,$a_2$,...$a_n$;

第三行一个整数$m$，表示有$m$个修改

接下来$m$行每次询问给出三个整数$s$,$e$,$h$，使得 $a_s,a_{s+1}....a_{e}$每一个数加上h

最后给出两个数字 $start$,$end$。求出${ \sum_{i = start}^{end}} a_i $

#### 输出格式

一个整数

#### 样例 #1

##### 样例输入 #1

```
5
1 2 3 4 5
3
1 2 1
1 3 1
4 5 1
1 5
```

##### 样例输出 #1

```
22
```

#### 提示

样例1解释

第一次修改序列变成 2 3 3 4 5

第二次修改序列变成 3 4 4 4 5

第三次修改序列变成 3 4 4 5 6

$0 <=$ $a_i$ 和 $h <= 10^4$

<hr>

同上，$b_{s-1} + h = b_s, b_{e + 1} - h = b_e$，即可使用前缀和倒退回原数组.

```cpp
#include <cstdio>
using namespace std ;

long long a[100002], b[100002], n, m, s, e, h, start, end, sum = 0 ;
int main()
{
    scanf("%lld", &n) ;
    for(int i = 1; i <= n; i ++)
    {
        scanf("%lld", &a[i]) ;
    }
    
    for(int i = 1; i <= n; i ++)
    {
        b[i] = a[i] - a[i - 1] ;
    }
    
    scanf("%lld", &m) ;
    for(int i = 1; i <= m; i ++)
    {
        scanf("%lld %lld %lld", &s, &e, &h) ;
        b[s] += h ;
        b[e + 1] -= h ;
    }
    for(int i = 1; i <= n; i ++)
    {
        a[i] = a[i - 1] + b[i] ;
    }
    
    scanf("%lld %lld", &start, &end) ;
    for(int i = start; i <= end; i ++)
    {
        sum += a[i] ;
    }
    printf("%lld\n", sum) ;
    
    return 0 ;
}
```