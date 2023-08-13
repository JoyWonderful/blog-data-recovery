---
title: 指针
date: 2023-05-18 19:50:56
tags:
- 语言入门
- 指针
categories: 课程笔记
#comments: false
---

## 指针的作用

指针，顾名思义，就是指向某一东西的标志。

当我们想存地址时，就可以使用指针变量：

```cpp
int a ;
int *b = &a ;
```

`b`就是一个指针变量，存着`a`的地址。

<!--more-->

## 普通指针

普通指针就是上面的例子中的`b`，它存着`a`的地址，因此`&a`和`b`的输出结果是一样的。

## 存指针地址的指针

当我们想存指针地址时那该怎么办呢？

很简单，嵌套：

```cpp
#include <cstdio>
using namespace std ;

int main()
{
    int a ;
    int *b = &a ;
    int **c = &b ;
    
    printf("%d %d %d", &a, b, c) ;
    
    return 0 ;
}
```

这样就不会出错了。

## 取地址和解地址

`*`既可以是乘号，又可以是解地址，还可以是指针变量；

`&`既可以是按位与运算，又可以是取地址。

解地址，与取地址相反，就是**按照地址去找地址里存的数**。

我们可以使用指针变量解地址得到原本的数，例如：

```cpp
#include <cstdio>
using namespace std ;

int main()
{
    int a = 10 ;
    int *b = &a ;
    int **c = &b ;
    
    printf("%d %d %d", a, *b, **c) ;
    
    return 0 ;
}
```

这段代码输出的应该是三个同样`10`，我们一个一个来：

- `a`，就是`a`本身，输出`10`；
- `*b`，就是解地址`b`，等于解地址`&a`，等于`a`，输出`10`；
- `**c`，就是解地址`c`，等于解地址`&b`，等于解地址`&a`，等于`a`，输出`10`。

画个图更清晰：

`**c=*(&b) → b=*(&a) → a = 10 → printf(10)`

因此，解地址也是可以嵌套的。

## 指针数组和数组指针

指针数组，用来存指针的数组；

数组指针，数组的首地址。

我们使用时`*a[100]`代表数组`a`的地址，因为数组的优先级更高。弄一个指针数组应该写`(*a)[100]`。

同样的，`a`代表**数组中第一个元素的首地址**，`&a`代表**整个数组的首地址**，我们是不是还可以这样写？

```cpp
#include <cstdio>
using namespace std ;

int main()
{
    int a[100] = {1, 2, 3, 4} ;
    printf("%d %d %d %d", *(a + 0), *(a + 1), *(a + 2), *(a + 3)) ;
    
    return 0 ;
}
```

输出`1 2 3 4`，这与`a[n]`的效果是一样的。

因此，我们得出结论：**数组的本质就是指针**。