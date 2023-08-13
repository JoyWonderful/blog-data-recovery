---
title: 个人意见：如何写出漂亮的代码
date: 2023-07-07 16:42:34
tags: 
  - 代码格式化
categories: 编程随记
---

{% note warning %}
<p style="color:#f0ad4e;font-weight:800;margin-bottom:0px;">创作说明：</p>
<p style="margin-bottom:0px;">此文章仅为个人看法。您写代码的习惯可以依据您的个人喜好。此文章只是一些个人的建议。</p>
<p style="margin-bottom:0px;">您在 OI 竞赛中，您<strong>完全可以</strong>不去注意代码风格。</p>
<p style="margin-bottom:0px;">此文章的建议主要用于工程代码中。</p>
{% endnote %}

代码的维护还是很重要的。相信谁也不愿意去维护连自己都看得头晕的代码。在这里，我想给出一些个人建议，让代码的可读性强一些。大部分代码以 C++ 为例。这篇文章其实也是给自己看的。

<!--more-->

## <!--一、-->空行与空格
无论是什么代码，空行往往代表着一个功能块，或是一个逻辑的结束，在适当的地方空行可以增强代码的可读性。空格也是这样。虽然一些地方的空格和空行会被编译器（或解释器）忽略，但是空行和空格必不可少。就比如说这样一个示例：
```cpp
#include<iostream>
#include<string>
using namespace std;
int main(){
    string s,a,b,c;cin>>s;cin>>a;
    cin>>b;cin>>c;
    cout<<"Hello,"<<s<<endl;cout<<"Hello,"<<a<<endl;
    cout<<"Hello,"<<b<<endl;cout<<"Hello,"<<c<<endl;
    return 0;
}
```
这段代码是可以编译的，但是逻辑很混乱。流输入输出符之间没有空格，也没有空行。这样导致可读性很差。

一些建议：
- **关于空格**
  1. 在运算符之间尽量加上空格。
  2. 逗号之后加上空格。例如 `int a, b, c;`。
  3. 括号两边不必要加空格。例如应该这样 `if(n == 1)` 而不是这样 `if ( n == 1 )`。
  4. 特殊的建议，C++ 逻辑运算符如 `&&` `||` 最好这样写： `if(i==1 || j!=2 && k>3)`。
- **关于空行**
  1. C++ 中（以及其他语言）确实可以使用语句分隔符 `;` 在一行完成几个操作。但完全不相关的操作最好不要放一行，也不要把一行代码弄得很长很长。
  2. 不要完全没有空行，空行往往可以增加代码的可读性。在不同的功能代码或逻辑之间空行，不要将相关联的代码空开来。

## <!--二、-->缩进
很多代码都最好写缩进，哪怕有大括号也不例外。在 C++ 中，虽然不写它也没有关系，但这是一种编码习惯，也可以增强代码的可读性。在 Python 中，缩进更为重要，不写那就报错了。

这里有一些错误示例：
```cpp
#include <stdio.h>

int main() {
int a, b;
scanf("%d %d", &a, &b);
for(int i = 1; i <= 10; i++){
printf("%d\n", a + b);
}
return 0;
}
```

```python
i = int(input())
for i in range(i):
	print(i)
  print("hello")
```

C++ 的示例虽然不会报错，但是很不美观,看不出层次。Python 的缩进一个使用了 `Tab`，另一个使用了两个空格，导致 <code style="color:#fa0000">SyntaxError: unindent does not match any outer indentation level</code>。

一些建议：
- 缩进最好使用空格，不要使用 Tab 字符。
- 遵循使用语言的缩进规则，不要弄出奇怪的缩进。例如 1 个空格。
- 不要混用空格个数或 Tab。例如同样的层次，一个用 2 个空格，一个用 4 个空格。有些语言（例如 Python）会直接报错。

## <!--三、-->命名方法
一段代码中应该尽量使用恰当的命名方法。不可以随意命名，命名应该表达元素的含义和作用避免使用冗余无意义的词汇。

以下是常用的命名方法：
- **驼峰命名法** 使用大小写混合的格式，单词间不适用空格或连接符。一般来说，类名的开头字母大写，例如 `GetConsoleInfo`, `PrintSystemVersion`；方法名、参数名、变量名开头字母小写，例如 `redGem`, `heroLife`。
- **匈牙利命名法** 使用变量类型的缩写作为前缀，其余部分使用驼峰命名法。例如 `char cMyAnswer`, `int iPersonAge`, `double dManWeight`。
- **下划线命名法** 使用下划线连接单词，大小写统一。例如 `clear_all`, `set_color`, `MAX_WIDTH`。

建议：一般来说，常量、宏定义等全部使用大写，其他使用小写。
