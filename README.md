# blog-hexo
# 基于hexo + hexo-theme-next 搭建博客源项目

[hexo 官方文档](https://hexo.io/zh-cn/)

[hexo GitHub地址](https://hexo.io/zh-cn/)

[hexo-theme-next 官方文档](http://theme-next.iissnan.com/) 

[hexo-theme-next GitHub地址](https://github.com/iissnan/hexo-theme-next)

## 版本依赖信息：

    node: v8.16.1
    npm: v6.4.1
    pm2: v4.4.0
    hexo: v4.2.1
    hexo-cli: v3.1.0
    hexo-next: v5.1.4

## 快速启动：

拉取该项目，安装上述依赖，自定义相关配置，或是直接执行`./start.sh`文件即可

### - 自定义配置

主要是修改`站点配置文件`(`blog-hexo/_config.yml`)和`主题配置文件`(`blog-hexo/theme/next/_config.yml`)

站点配置文件主要配置站点整体的一些信息，包括主题选择、author信息、站点信息等，配置项相对简单，笔者已添加部分中文注释。

主题配置文件主要配置next主题的一些信息，包括样式、显示菜单、头像、评论、打赏， 主要的一些配置笔者已添加中文注释（`主题配置文件`已**`##`**开头标记的配置项）

**`blog-hexo/source/_post` 目录是存放文章的目录，笔者简单的记录了博客搭建的流程，也可在该目录找到**
    
### - 启动项目
    
```
$ cd blog-hexo
$ ./start.sh
```

**[在线查看地址](http://47.96.101.242)**
