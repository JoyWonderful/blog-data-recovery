---
title: 有关进制的一些小记
tags:
  - 语言入门
categories: 编程随记
date: 2023-08-12 10:00:41
---


<style>
    .TEX-B {
        color: #000;
    }
</style>

x 进制，代表着在这个计数方法中逢 x 进一，例如十进制就代表着**逢十进一**。  
我们平常在生活中用的都是十进制。进制一类的东西在 OI 中也比较重要~~CCF 喜欢考~~，计算机中的数据都是以二进制储存的，二进制也完美地利用了每一个比特。当然，只要有足够的表示方法，人们可以弄出三十二进制、六十四进制，甚至一千进制。~~闲的没事情干，~~进制有关的以及进制之间的转换就是我想记下来的话题。

<!--more-->

## 进制转换
### 二进制和十进制的转换
这是 ~~€€£~~ CCF 出的题中一定会多少考到一点的知识，比较重要。一般来说，x 进制的数记作 $(\text {number})_x$，例如二进制数 <span style="font-family:monospace;">1011</span> 记作 $(1011)\_2$，十进制数 <span style="font-family:monospace;">114514</span> 记作 $(114514)\_{10}$。

#### 二进制 -> 十进制
二进制的数从右往左每一位都有权值，第 <span style="font-family:monospace;">i</span> 位的权值为 $2^{(i - 1)}$。举个例子：二进制数 <span style="font-family:monospace;">1011001</span> 的每一位权值是：  
$\mathbf{1} \to 2^6 \ \ \ \mathbf{0} \to 2^5 \ \ \ \mathbf{1} \to 2^4 \ \ \ \mathbf{1} \to 2^3 \ \ \ \mathbf{0} \to 2^2 \ \ \ \mathbf{0} \to 2^1 \ \ \ \mathbf{1} \to 2^0$。

从二进制转换为十进制只需要将当前二进制位的值乘上权值即可。还是 <span style="font-family:monospace;">1011001</span>：

$$
\begin{aligned}
&(1011001)\_2
\\\\
= &(\mathbf{1} \times 2^6) + (\mathbf{0} \times 2^5) + (\mathbf{1} \times 2^4) + (\mathbf{1} \times 2^3) + (\mathbf{0} \times 2^2) + (\mathbf{0} \times 2^1) + (\mathbf{1} \times 2^0)
\\\\
= &64 + 0 + 16 + 8 + 0 + 0 + 1
\\\\
= &(89)\_{10}
\end{aligned}
$$

可见，二进制 <span style="font-family:monospace;">1011001</span> 转换为十进制是 <span style="font-family:monospace;">89</span>。  
~~话说 hexo next 的 mathjax 渲染越来越奇怪了。。。~~

#### 十进制 -> 二进制
可以使用短除法，将十进制除以二取余，直至商为零。最后将取余的结果倒序输出。  
比如说，还是那个数字 $(89)\_{10}$：

$$
\begin{aligned}
2 \ | \underline{ \ \ \ \ \ \ \ \ } &\underline{89 \ }
\\\\
2 \ | \underline{ \ \ \ \ \ \ \ } &\underline{44 \ } \ \ \ \ \ \ \textbf{1}
\\\\
2 \ | \underline{ \ \ \ \ \ \ } &\underline{22 \ } \ \ \ \ \ \ \textbf{0}
\\\\
2 \ | \underline{ \ \ \ \ \ } &\underline{11 \ } \ \ \ \ \ \ \textbf{0}
\\\\
2 \ | \underline{ \ \ \ \ } &\underline{\ \ 5 \ } \ \ \ \ \ \ \textbf{1}
\\\\
2 \ | \underline{ \ \ \ } &\underline{\ \ 2 \ } \ \ \ \ \ \ \textbf{1}
\\\\
2 \ | \underline{ \ \ } &\underline{\ \ 1 \ } \ \ \ \ \ \ \textbf{0}
\\\\
2 \ | &\underline{\ \ 0 \ } \ \ \ \ \ \ \textbf{1}
\end{aligned}
$$

最后，倒着输出即可得知 $(89)\_{10} = (1011001)\_2$ 。  
~~ps: mathjax 没有特定的短除公式，只好用这种奇特的方法模拟短除。~~

{% note info %}
<p style="color:#428bca;font-weight:bold;">P.S. 另一种更方便的双向转换方法</p>

<span style="margin-bottom: 0px;">可以发现，其实二进制十进制的互相转换都离不开 二的 i 次方，也可以将这张表记下来（也就是从右往左不断地乘二嘛），之后的转换会方便很多。</span>
其实这张表也就是二的 i 次方：

$$... 256 \ \ 128 \ \ 64 \ \ 32 \ \ 16 \ \ 8 \ \ 4 \ \ 2 \ \ 1$$

{% tabs demo %}
<!-- tab 二进制进制转十进制 -->
这算是这张表最方便的用法了，还是 $(1011001)\_2$
| 每一位 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
|:--:|:--|:--|:--|:--|:--|:--|:--|
| 每一位对应的权值 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

一代表着要加起来，否则不加起来，那么，这个二进制数等于这个十进制数：  
$(1011001)\_2 = 64 + 16 + 8 + 1 = (89)\_{10}$
<!-- endtab -->

<!-- tab 十进制转二进制 -->
同样的，也可以一位一位地尝试累加。假如十进制减去奶味的权值不小于 0，就减去，否则不减去，直至加起来的权值之和等于目标十进制数。例如十进制数 89：  
| 权值表 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|:---:|:---|:---|:---|:--|:--|:--|:--|
| 是否减去 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| 过程备注 | 初始的值是 89，64 < 89，就减去，89 - 64 = 25。结果 **1**。 | 32 > 25，不减去。结果 **0**。 | 16 < 25，25 - 16 = 9。结果 **1**。 | 8 < 9，9 - 8 = 1。结果 **1**。 | 4 > 1。结果 **0**。 | 2 > 1。结果 **0**。 | 1 = 1，1 - 1 = 0。结果 **1**。 |

可见：
$(89)\_{10} = (1011001)\_2$
<!-- endtab -->
{% endtabs %}

{% endnote %}

### 其他进制之间的转换
像其他进制，比如十六进制，大于 <span style="font-family:monospace;">9</span> 时就可以用字母 <span style="font-family:monospace;">A B C D E F</span> 按照顺序代替数字。

#### 使用十进制当作媒介的转换（对于所有进制通用）
其实，任何进制之间的转换都可以将那个进转换为十进制后再转换为目标进制。十进制也可以转换为任何进制。至于怎么转换，其实和 <a href="#二进制和十进制的转换"> <i class="fa-solid fa-hashtag" style="font-size:15px;"></i> 二进制和十进制之间的转换</a> 差不多。  
同样的，x 进制转十进制 每一位的 每一位乘上每一位的权值 之和。例如：

$$
\begin{aligned}
&(1021102)\_3
\\\\
= &(\mathbf{1} \times 3^6) + (\mathbf{0} \times 3^5) + (\mathbf{2} \times 3^4) + (\mathbf{1} \times 3^3) + (\mathbf{1} \times 3^2) + (\mathbf{0} \times 3^1) + (\mathbf{2} \times 3^0)
\\\\
= &729 + 0 + 162 + 27 + 9 + 0 + 2
\\\\
= &929
\end{aligned}
$$

$x$ 进制的从右往左数（从 1 开始数）第 $i$ 位的权值就是 $x^{(i - 1)}$。转换为十进制只需要将每一位的 每一位的权值乘那一位的数 加起来即可。

十进制转 x 进制也可以用短除法，不断整除 x，取余，然后倒序输出。  
照理说，将十进制作为媒介可以将任意进制转换为其他任意进制。  
同样的，也可以通过代码更方便地实现（说一句，还是别人的代码写的好看，我写的屎山简直不忍直视，而且只能大到十六进制）：
```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <cmath>
using namespace std;

int xtoten(int x, string s) // x 进制转十进制
{
    int tensum = 0, cnt = 0 ;
    for(int i = s.length() - 1; i >= 0; i--) // 从右往左求权值
    {
        int t;
        if(s[i] == '0') t = 0; // 屎山代码的本质。。。
        else if(s[i] == '1') t = 1;
        else if(s[i] == '2') t = 2;
        else if(s[i] == '3') t = 3;
        else if(s[i] == '4') t = 4;
        else if(s[i] == '5') t = 5;
        else if(s[i] == '6') t = 6;
        else if(s[i] == '7') t = 7;
        else if(s[i] == '8') t = 8;
        else if(s[i] == '9') t = 9;
        else if(s[i] == 'A') t = 10;
        else if(s[i] == 'B') t = 11;
        else if(s[i] == 'C') t = 12;
        else if(s[i] == 'D') t = 13;
        else if(s[i] == 'E') t = 14;
        else if(s[i] == 'F') t = 15;
        tensum += t * pow(x, cnt); // $x$ 进制的从右往左数（从 1 开始数）第 $i$ 位的权值就是 $x^{(i - 1)}$。
        cnt++ ;
    }
    return tensum;
}
string tentoy(int y, int n) // 十进制转 x 进制
{
    string ret = "" ;
    for( ; ; )
    {
        int t = n % y; // 除以 x 剩下的余数
        if(t == 0) ret += '0'; // 屎山依旧。。。
        else if(t == 1) ret += '1';
        else if(t == 2) ret += '2';
        else if(t == 3) ret += '3';
        else if(t == 4) ret += '4';
        else if(t == 5) ret += '5';
        else if(t == 6) ret += '6';
        else if(t == 7) ret += '7';
        else if(t == 8) ret += '8';
        else if(t == 9) ret += '9';
        else if(t == 10) ret += 'A';
        else if(t == 11) ret += 'B';
        else if(t == 12) ret += 'C';
        else if(t == 13) ret += 'D';
        else if(t == 14) ret += 'E';
        else if(t == 15) ret += 'F';
        n /= y; // 整除
        if(n <= 0)
        {
            break ; // 除到零为止
        }
    }
    return ret;
}

int main()
{
    int n, m;
    string qwq;
    
    cin >> n >> qwq >> m; // n: x 进制;  qwq: 一个 x 进制的数;  m: 需要转换成的进制
    
    string ans = tentoy(m, xtoten(n, qwq));
    for(int i = ans.length() - 1; i >= 0; i--) // 十进制转 x 进制需要倒序输出
    {
        cout << ans[i];
    }
    
    return 0 ;
}
// 比如输入  3 1021102 10  会输出  929。
// 其实这个代码就是 洛谷 P1143 的代码 https://www.luogu.com.cn/problem/P1143
```

#### 将二进制转换为八进制、十六进制
注意一下，二进制并不可以直接转换为其他进制，只不过对于二进制转八进制、十六进制比较方便。若是这二进制转八进制或十六进制，要是嫌使用十进制作为媒介比较麻烦，那就可以用二进制作为媒介更加方便一些。  

将二进制转换为八进制，可以从右往左三位三位分开来，再将那三位二进制转换为十进制，合起来（注意是字符意义上的合起来）就是八进制。十六进制则是四位四位分开来。这里举两个例子：

{% tabs binhex %}
<!-- tab 二进制转八进制-->
$$
\because
\underset{\text{八进制：}}{\text{二进制：}} ( \underset{1}{\underline{1}} \ \underset{2}{\underline{010}} \ \underset{7}{\underline{111}} )\_{2}
$$

$$
\therefore
(1010111)\_{2} = (127)\_{8}
$$
<!-- endtab -->

<!-- tab 二进制转十六进制 -->
$$
\because
\underset{\text{十六进制：}}{\text{二进制：}} ( \underset{3}{\underline{11}} \ \underset{\text{A}}{\underline{1010}} \ \underset{1}{\underline{0001}} )\_{2}
$$

$$
\therefore
(1110100001)\_{2} = (\text{3A1})\_{16}
$$
<!-- endtab -->
{% endtabs %}

{% note info %}
<p style="color:#428bca;font-weight:bold;">P.S. 二进制、八进制、十进制、十六进制在 C++ 中的表示方法（前缀）</p>

以上这些进制自然有自己的表示方法。其中，二进制以 `0b` 开头；八进制以 `0` 开头；十进制就是平常的写法，没有任何前缀；十六进制以 `0x` 开头。  
例如，以下代码会输出四个 `2147483647`。

```cpp
printf("%d %d %d %d\n", 
       0b1111111111111111111111111111111,  // 二进制
       017777777777,  // 八进制
       2147483647,  // 十进制
       0x7fffffff); // 十六进制
```
{% endnote %}

## 位运算
位运算是一个比较~~毒瘤~~有趣的运算，是二进制的运算。当然也可以通过位运算做一些与平常的（逻辑）运算符等价的运算，但速度更快。

### 按位与运算 `&`
将两个二进制的每一位逐个比较，若这一位都为 1 则得出 1，否则得出 0。若这两个二进制数字位数不同可以在前面补零。

```
1 & 1 = 1;
0 & 0 = 0;
1 & 0 = 0;
0 & 1 = 0;
```

这个运算符还有一个备选关键字：`bitand`，比如 `10 & 3` 等价于 `10 bitand 3`。  
其实所有位运算也可以在 C++ 中用十进制直接运算，例如 `10 & 3`，用 `0b` 前缀也行，也就是 `0b1010 & 0b11` 或 `0b1010 & 0b0011`。  
举个更详细的例子：

$$
\begin{matrix}
& 1011001 \\\\
\\& & 0111101 \\\\
\hline
& 0011001
\end{matrix}
$$

转为十进制就是 <span style="font-family:monospace;">89 & 61 = 15</span>。

### 按位或运算 `|`
两个二进制的每一位比较，若有一个为 1 则得出 1，否则得出 0。同样的，若这两个二进制数字位数不同可以在前面补零。

```
1 | 1 = 1;
0 | 0 = 0;
1 | 0 = 1;
0 | 1 = 1;
```

这个运算符也有一个备选关键字 `bitor`，`10 | 3` 等价于 `10 bitor 3`。  
例子：

$$
\begin{matrix}
& 1011001 \\\\
| & 0111101 \\\\
\hline
& 1111101
\end{matrix}
$$

转为十进制就是 <span style="font-family:monospace;">89 | 61 = 125</span>。

### 按位非运算 `~`
这算是最简单的运算符了，即将每一位取反。例如 `~0` 就等于 1，`~1` 就等于 0。
例子：

$$
\begin{matrix}
\sim & 0111101 \\\\
\hline
& 1000010
\end{matrix}
$$

### 按位异或 `^`
其实就是比较每一位是否相同，若相同为 `0`， 不相同为 `1`。

```
1 ^ 1 = 0; 
0 ^ 0 = 0; 
1 ^ 0 = 1; 
0 ^ 1 = 1;
```

C++ 中也有备选关键字，就是 `xor`。`10 ^ 3` 等价于 `10 xor 3`。  
例如：

$$
\begin{matrix}
& 1011001 \\\\
\text{^} & 0111101 \\\\
\hline
& 1100100
\end{matrix}
$$

转为十进制就是 <span style="font-family:monospace;">89 ^ 61 = 100</span>。

### 左移 `<<` 右移 `>>`
将所有二进制位全部左移，也就是将最左边的二进制位丢弃，右边补上一个 0。例如：  
`10110011 << 1 = 01100110`。
右移也是一样，不过负数往左边补 1，正数补 0。

{% note info %}
<p style="color:#428bca;font-weight:bold;">P.S. 位运算时赋值</p>

同 `+=` `-=` 等符号一样，位运算也可以在符号后面加上 `=`，`>>=` `^=` `&=` `<<=` `|=` 等运算符都是可以的。
{% endnote %}

{% note info %}
<p style="color:#428bca;font-weight:bold;">P.S. 位运算的一些使用技巧</p>
位运算其实有很多奇怪的应用。例如：

1. **判断偶数奇数**（能否被 2 整除）。0 是偶数 1 是奇数。`([number] & 1) == 1` 相当于 `([number] % 2) == 1`，平常还是写 `[number] & 1`。举个例子，`10 & 1 = 0`、`13 & 1 = 1`。
2. **求 2 的几次方**，`1 << [number]` 就是求 2 的 \[number\] 次方。例如 `1 << 10 = sqrt(2, 10) = 1024`。
3. **交换 `a b` 两个数字**。可以 `a ^= b; b ^= a; a ^= b`，效率比普通交换要高。
4. **正数变负数，负数变正数**。假设一个数字 `n`，只需要 `~n + 1` 就可以转变该数正负号。例如 `~1024 + 1 = -1024`、`~-114 + 1 = 114`。（在 “补码” 中，详见下面的二进制编码）
5. **除以 2**，使用 `[number] >> 1`。例如 `100 >> 1` 等价于 `100 / 2`，再比如 `int a = 1024; a >>= 1; printf("%d\n", a);` 输出 `512`。

其他的应用，这里不写了，有兴趣可以去网上找更多的。
{% endnote %}

## 二进制的编码
其实，刚才讲的（个别除外）二进制都是二进制中编码的一种：**原码**。二进制一共有三个编码：**原码**、**反码**和**补码**，计算机中真正使用的是**补码**。  
这些编码都要规定它们的位数，否则就弄不清楚到底是正数还是负数了。在下面的随记中，我用的是**8 位整型**。其实在 C++ 中，`int` 是 32 位整型。确定位数很重要，例如：

```cpp
int       a = 0b11111111111111111111111111111111;
long long b = 0b11111111111111111111111111111111; // int a 格式化了一下，更方便看
printf("%d %lld\n", a, b);
```

会输出 `-1 4294967295`。因为 `int` 是 32 位整型，而 `long long 是` 64 位。补码的第一位是符号位，若为 1 就是负数。而我给的二进制是 32 位，第一位是 1，`int` 就是负数。

原码、反码、补码的表示是将二进制用中括号括起来，再右下角写上 “原” “反”或“补”。例如 $[00001010]\_{\text{原}}$、$[11101110]\_{\text{补}}$。

### 原码
原码、反码以及补码的最左边的那一位都是**符号位**。例如 $[00000001]\_{\text{原}}$ 是十进制的 1，而 $[10000001]\_{\text{原}}$ 是十进制的 -1。

在原码中，除符号位外，剩下的二进制都是按照 <a href="#二进制-gt-十进制"> <i class="fa-solid fa-hashtag" style="font-size:15px;"></i> 二进制转十进制</a> 一样。若符号位是 1 那就将转换的十进制加个负号。例如：

$$
\begin{aligned}
(5)\_{10} &= [00000101]\_{\text{原}}
\\\\
(-12)\_{10} &= [10001100]\_{\text{原}}
\end{aligned}
$$

### 反码
原码变成反码，若原码是正数（符号位为 0）则不需要做任何改变；若原码是负数（符号位为 1）则将除符号位以外的位全部取反。例如：

$$
\begin{aligned}
(24)\_{10} &= [00011000]\_{\text{原}} = [00011000]\_{\text{反}}
\\\\
(-17)\_{10} &= [10010001]\_{\text{原}} = [11101110]\_{\text{反}}
\end{aligned}
$$

### 补码
其实这才是计算机真正使用的二进制编码，前面的两种编码基本上只供学习和理解用。

若那个二进制为正数，原码、反码和补码相同；若为负数，那么它的补码是它的反码加一。（请注意，二进制加法逢二进一）例如：

$$
\begin{aligned}
(27)\_{10} &= [00011011]\_{\text{原}} = [00011011]\_{\text{反}} = [00011011]\_{\text{补}}
\\\\
(-53)\_{10} &= [10110101]\_{\text{原}} = [11001010]\_{\text{反}} = [11001011]\_{\text{补}}
\end{aligned}
$$

{% note info %}
<p style="color:#428bca;font-weight:bold;">P.S. 补码的快速转十进制方法</p>

同普通二进制转十进制一样，可以弄一张差不多一样的表，不同的是，这张表的最左边的数（符号位）是负数。  
还是以 8 位整型为例，这张表是这样的：

$$-128 \ \ 64 \ \ 32 \ \ 16 \ \ 8 \ \ 4 \ \ 2 \ \ 1$$

刚才的 -53 就可以以这种方法转换：

$$
\begin{aligned}
&[11001011]\_{\text{补}}
\\\\
= &-128 + 64 + 0 + 0 + 8 + 0 + 2 + 1
\\\\
= &(-53)\_{10}
\end{aligned}
$$

{% endnote %}