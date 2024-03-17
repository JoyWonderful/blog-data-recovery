---
title: 时间复杂度和空间复杂度
date: 2023-05-08 20:13:18
tag:
- 语言入门
categories: 课程笔记
mathjax: true
---

## 时间复杂度

时间复杂度，就是**电脑运行一段程序所需要的时间**。

另外，电脑每秒可以运行`1e8`次。($x$ e $y$代表$x$乘10的$y$次方，即`100000000`次)

时间复杂度记作$O$(n)。

----------

普通的时间复杂度**(常数时间)**记作$O$(1)，为一段最简单的程序的时间复杂度。

如以下程序的时间复杂度为$O$(1)：

```cpp
#include <stdio.h>
using namespace std ;

int main()
{
    int n ;
    
    return 0 ;
}
```

没错，什么都没有干，只创建了一个变量。

<!--more-->

----------

其他时间复杂度(我所知道的很少，只会`O(n^n)`)，有几个循环时间复杂度就为^n。

如以下程序的时间复杂度为$O$(i^2^)

```cpp
#include <stdio.h>
using namespace std ;

int main()
{
    for(int i = 0; i < 10; i ++)
    {
        for(int j = 0; j < 10; j ++)
        {
            printf("%d", i) ;
        }
    }
    
    return 0 ;
}
```

----------

~~老师的~~练习:

[U262459 数位和3 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/U262459)

注意注意:

这道题的数据范围很大，($0\le x \le10^6$)，双重循环直接炸。($O$(1000000^2^))

所以需要:

[记录详情 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/record/96951779)

## 空间复杂度

和时间复杂度差不多，只不过这个是和**内存**有关的。

~~不多讲了。~~就比如：

```cpp
#include <stdio.h>
using namespace std ;

int main()
{
    int a[100] ;
    
    return 0 ;
}
```

这里，我们定义了一个类型为`int`的数组，`int`占4字节，产生的空间就为$4 * 1000$字节。

这就是**空间复杂度**。