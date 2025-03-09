---
title: Github 仓库与 Glitch同步 
date: 2025-03-09 21:40:36
categories: Programming
tags: Git
---

由于 Github Pages 实在太慢，我的很多东西都迁移到功能和速度都更好的 Glitch 上。如你所见。  
Glitch 项目也是一个 Git Repository，可以 push。这里利用 Github Actions，使用 [wei/git-sync](https://github.com/wei/git-sync) 项目，进行落实。

参考 [https://support.glitch.com/t/automating-deployment-from-github-how-to/64642](https://support.glitch.com/t/automating-deployment-from-github-how-to/64642)。

<!--more-->

## Glitch 方面

打开项目的控制台，依次输入下列语句：

```sh
git config receive.denyCurrentBranch ignore

cat << EOF > .git/hooks/post-receive
unset GIT_INDEX_FILE
git --work-tree=/app --git-dir=/app/.git checkout -f
refresh
EOF

chmod u+x .git/hooks/post-receive
```

就是让 git 在收到 force push 的时候接受并且刷新项目。

## Github 方面

新建 `.github/workflows/sync.yml` 文件（其实文件名可以随便），添加如下内容：

```yml
name: Glitch Sync

on:
  push:
    branches:
      - main # 改成你要的分支

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Glitch Project
        uses: wei/git-sync@v3
        with:
          source_repo: https://${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git
          source_branch: main
          destination_repo: ${{ secrets.GLITCH_GIT_URL }}
          destination_branch: master
```

### Hexo 问题

如果是 Hexo 博客，你要在 `source` 下进行操作（即在 `source` 下建立 `.github/workflows/sync.yml`），并且在总的 `_config.yml` 中把这些改成：

```yml
skip_render: .github/**/*
include: .github/**/*
```
