---
title: C++ 数据范围
date: 2023-07-02 17:30:34
tags: 语言入门
categories: Programming
mathjax: true
---

这就是一个随记，方便自己用的。

<!--more-->

|名称(可加)|所占字节|数据范围(以 $2^n$ 表示)|
|:----|:---:|:----|
|`(signed) int`|`4`|`-2147483648` ~ `2147482647` ($-2^{31}$ ~ $2^{31}-1$)|
|`unsigned int`|`4`|`0` ~ `4294967295` ($0$ ~ $2^{32}-1$)|
|`(signed) long (int)`|`4`|`-2147483648` ~ `2147483647` ($-2^{31}$ ~ $2^{31}-1$)|
|`unsigned long (int)`|`4`|`0` ~ `4294967295` ($0$ ~ $2^{32}-1$)|
|`long long`|`8`|`-9223372036854775808` ~ `9223372036854775807` ($-2^{63}$ ~ $2^{63}-1$)|
|`unsigned long long`|`8`|`0` ~ `18446744073709551615` ($0$ ~ $2^{64}-1$)|
|`(signed) short (int)`|`2`|`-32768` ~ `32767` ($-2^{15}$ ~ $2^{15}-1$)|
|`unsigned short (int)`|`2`|`0` ~ `65535` ($0$ ~ $2^{16}-1$)|
|`float`|`4`|`3.4E +/- 38`|
|`double`|`8`|`1.7E +/- 308`|
|`long double`|`8`|`1.7E +/- 308`|
|`bool`|`1`|`true` or `false` or `1` or `0`|
|`char`|`1`|`-128` ~ `127` ($-2^{7}$ ~ $2^{7}-1$)|
