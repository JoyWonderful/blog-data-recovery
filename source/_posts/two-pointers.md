---
title: 双指针-快慢指针
date: 2023-06-26 18:00:45
tags: 
    - 基础算法
    - 解题思想
categories: CourseNotes
---

> 双指针其实不是真正的指针，而是有两个变量在序列上进行一些操作。
> ——Lqingyi(Lxandqi)

## 思想分类
- 普通双指针 也就是两个普通的 `for` （也可以是其他的）循环嵌套。
- 左右指针 其实就是二分搜索，一个变量指向开头，一个变量指向末尾，根据条件向中间遍历，直到指针相遇或满足某种条件。（也就是逼近答案）
- 快慢指针 两个指针（变量）开始同时开头，但一个遍历的快，一个慢，直到条件满足或指针到末尾。

<!--more-->

## 提示
双指针是二重循环。

一般来说，快慢指针的第二个指针（快指针）的变量是在 `for` 循环体之外定义的。因为 `for` 循环会初始化变量。快慢指针的变量是不可以初始化的，因为已经遍历过的就不用遍历了，再遍历一遍就变成普通双指针（暴力枚举）了。

~~怎么感觉只有例题才能讲清楚？？？~~

## 例题
给定一个长度为 $n$ 的整数序列 $a_1,a_2,…,a_n$ 以及一个长度为 $m$ 的整数序列 $b_1,b_2,…,b_m$。  
请你判断 $a$ 序列是否为 $b$ 序列的子序列。  
子序列指序列的一部分项按原有次序排列而得的序列，例如序列 $a_1,a_3,a_5$ 是序列 $a_1,a_2,a_3,a_4,a_5$ 的一个子序列。

**输入时：**  
第一行包含两个整数 $n,m$。  
第二行包含 $n$ 个整数，表示 $a_1,a_2,...,a_n$。  
第三行包含 $m$ 个整数，表示 $b_1,b_2,...,b_m$。  
**输出时：**  
如果 $a$ 序列是 $b$ 序列的子序列，输出一行 `Yes`。  
否则，输出 `No`。

**数据保证：**  
$1 \le n \le m \le 10^5$
$−10^9 \le a_i,b_i \le 10^9$

----------

**解题：**  
数据那么大，暴枚肯定不行。那么就用今天学的双指针。  
一个指针 $i$ 遍历数组 $a$ 的元素，指针 $j$ 遍历数组 $b$ 的元素。写一个 `while(1)` 死循环， $j$ 在 `while` 中每次 `++`，如果 $a_i = b_j$ ，则 `break` ，如果 $j > m$ 则输出 `No` 。 $j$ 变量（指针）的定义要写在循环之外。

**代码：**  
```cpp
#include <cstdio>
using namespace std;

int n, m ;
const int N = 1e5 + 5 ;
int a[N], b[N] ;
int main()
{
    scanf("%d %d", &n, &m) ;
    for(int i = 1; i <= n; i++) scanf("%d", &a[i]) ;
    for(int i = 1; i <= m; i++) scanf("%d", &b[i]) ;
    
    int j = 1 ;
    for(int i = 1; i <= n; i++)
    {
        while(1)
        {
            if(j > m)
            {
                printf("No\n") ;
                return 0 ;
            }
            if(a[i] == b[j])
            {
                j++ ;
                break ;
            }
            j++ ;
        }
    }
    
    printf("Yes\n") ;
    
    return 0 ;
}
```