---
title: C++类（结构体）
date: 2023-05-31 19:16:45
tags:
- 语言入门
categories: 课程笔记
---

## 创建一个类

**类**类似于结构体，只不过他是C++独有的而已。对于我这个入门者来说，类几乎等于结构体，只不过他出现了一种概念：公有 `public` 私有 `private` 受保护的 `protected` 。当然，对于我来说，除了 `public` 能用，其他的**都不能用**。~~我还是**太蒻了**。捂脸.jpg~~ 但是继承类似乎可以用。例如：

```cpp
class myclass
{
    public :
        int a ;
    private :
        int b ;
    protected :
        int c ;
}
```

对于我来说，除了 a 都不能用。  
好像也没啥能记的了。再次捂脸.jpg