
---
layout:
title: 基于hexo + hexo-theme-next搭建自己的博客
updated:
comments: ture
tags: [hexo, hexo-theme-next, 搭建博客]
categories: [文档]
permalink:
keywords: [hexo, 搭建博客， hexo-theme-next]
---

**这是写的第一篇博客，算是写的一个testing博客咯，hahh... 顺便也记录一下这个博客系统的搭建过程及中间遇到的一些坑**

**这里只作为一个记录和个人的理解，更加权威、详尽的文档请查看官方文档：**

[hexo 官方文档](https://hexo.io/zh-cn/)

[hexo GitHub地址](https://hexo.io/zh-cn/)

[hexo-theme-next 官方文档](http://theme-next.iissnan.com/) 

[hexo-theme-next GitHub地址](https://github.com/iissnan/hexo-theme-next) 


# 1. hexo 是什么？

- 引用[hexo官方文档](https://hexo.io/zh-cn/)来描述：

	Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

- 我的理解：

	Hexo是一个开源的搭建博客的博客框架，基于node.js.
	但它又不是一个博客系统，
	因为Hexo提供的功能主要是：将我们编写的Markdown文档（也可以基于其他渲染引擎的模版）即我们写的博客文章，自动解析生成html页面，然后基于不同的主题样式，进行展示。
	特别注意的事，Hexo提供的是文档解析生成html的功能，要进行博客的展示都是需要基于选择的博客主题theme，下面具体的搭建的过程我们会有更好的理解。

# 2. hexo 服务构建
- 安装 node

	因为hexo是基于node.js写的，需要安装node和npm（一般安装好了node的时候npm也附带装好了），node最好是v8.0以上，具体安装方式不赘述。

- 使用 npm 安装 hexo-cli


```
$ npm install -g hexo-cli
```

install之后，试着在命令行输入`hexo -v`,如果正常打印出了版本信息，直接进入下一步。（笔者在mac os系统上ok了，但是阿里云的linxu系统上未找到命令）

如果未找到命令hexo: `No command 'hexo' found`， 则需要将hexo命令手动设为可执行程序。
npm安装完hexo-cli完之后， hexo的命令是放在`{{node_path}}/lib/node_modules/hexo-cli/bin/hexo`，在`/usr/lobal/bin`目录下设置一个软链指向hexo命令就行了，如下：

```
$ cd /usr/local/bin
$ ls -n {{替换成你node的安装路径}}/lib/node_modules/hexo-cli/bin/hexo hexo
```

- SetUp

```
$ hexo init my-blog
$ cd my-blog
$ npm install
$ hexo s
```

执行完`hexo s`（hexo server的简写）后，hexo的server就起来了，默认在4000端口。
但是这个时候我们在浏览器中看到的是一片空白, 那是因为我们没有设置博客的主题。

# 3. 切换为 hexo-next 主题
hexo方便的主题支持功能使得它有丰富的可选主题，在[hexo的官网](https://hexo.io/zh-cn/)可以根据自己的喜好的样式选择自己喜欢的主题。
引用[知乎：有哪些好看的 Hexo 主题？](https://www.zhihu.com/question/24422335)也可以了解下比较受欢迎的Hexo 主题。

官方默认选择的主题是`landscape`，在`_config.yml`文件的`theme`配置项可以查看到，但是因为我们刚才没有下载`landscape`的主题（主题都放在 themes 目录下），所以我们看到的是空白页面。

这里我选用了`hexo-next`主题，简洁的样式和排版是个人喜欢的（ps: 感觉[hexo-theme-next的官方文档](http://theme-next.iissnan.com/)超棒，hexo文档中未理解的在hexo-next的文档中有了更清楚的理解）

- 下载 hexo-next 源码

```
$ cd my-blog
$ git clone git@github.com:iissnan/hexo-theme-next.git themes/next
```

吐槽一下，笔者在github上下载这个项目的时候可能是由于网速原因，下载了N遍未能成功，这里自己在gitee上fork了一个镜像，方便下载：

```
$ git clone git@gitee.com:cyril_lee1314/hexo-theme-next.git themes/next
```

- 选择 hexo-next 版本

clone下来的项目默认在master分支，可能会不稳定，但是包含最新的特色
这里笔者选用了v5.1.4

```
$ cd themes/next
$ git tag -l
$ git checkout tags/v5.1.4
```

- 在 hexo 站点配置文件设置主题

修改`my-blog/_config.yml`文件， 将`theme`配置项默认的landscape改成next即可

# 4. hexo 站点配置文件

[站点配置文件](../../_config.yml)

```
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# hexo站点配置文件
title: Cyril's Blog
subtitle: '记录成长'
description: '日新其德 止于至善'
keywords: '编程,java,python,node.js,爬虫,框架,spring'
author: cyril
language: zh-Hans
#language: cn
timezone: ''

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks

# 目录配置
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# 写作配置
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ''
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false

# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Metadata elements
## https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
meta_generator: true

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss
## Use post's date for updated date unless set in front-matter
use_date_for_updated: false

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Include / Exclude file(s)
## include:/exclude: options only apply to the 'source/' folder
include:
exclude:
ignore:

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: next

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: ''
```

# 5. hexo-next 主题配置文件

[主题配置文件](../../_config.yml)

下面示例一些主要配置项

```
## 网站favicon配置
favicon:
  small: /images/favicon-16x16-next.png
  medium: /images/favicon-32x32-next.png
  apple_touch_icon: /images/apple-touch-icon-next.png
  safari_pinned_tab: /images/logo.svg
  #android_manifest: /images/manifest.json
  #ms_browserconfig: /images/browserconfig.xml

# Set default keywords (Use a comma to separate)
## 关键字设置
keywords: "Hexo, NexT"

## 文章的footer设置
footer:
  # Specify the date when the site was setup.
  # If not defined, current year will be used.
  #since: 2015

  # Icon between year and copyright info.
  icon: user

  # If not defined, will be used `author` from Hexo main config.
  copyright:
  # -------------------------------------------------------------
  # Hexo link (Powered by Hexo).
  powered: true

  theme:
    # Theme & scheme info link (Theme - NexT.scheme).
    enable: true
    # Version info of NexT after scheme info (vX.X.X).
    version: true
  # -------------------------------------------------------------
  # Any custom text can be defined here.
  #custom_text: Hosted by <a target="_blank" href="https://pages.github.com">GitHub Pages</a>

## 菜单设置
## 启用的菜单 
## 菜单内容的设置格式是：item name: link。其中 item name 是一个名称，这个名称并不直接显示在页面上，她将用于匹配图标以及翻译。
## !! 菜单项的显示文本在 NexT 主题目录下的 languages/{language}.yml 文件进行配置（（{language} 为你所使用的语言））
menu:
  home: / 
  #about: /about/ || user
  tags: tags
  categories: categories
  archives: archives
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  commonweal: 404.html

## 启用菜单的图标
menu_icons:
  enable: true

## Scheme主题设定
## Scheme 是 NexT 提供的一种特性，借助于 Scheme，NexT 为你提供多种不同的外观。
## 同时，几乎所有的配置都可以 在 Scheme 之间共用。
## 目前 NexT 支持三种 Scheme，他们是：
## Muse - 默认 Scheme，这是 NexT 最初的版本，黑白主调，大量留白
## Mist - Muse 的紧凑版本，整洁有序的单栏外观
## Pisces - 双栏 Scheme，小家碧玉似的清新
## ps: 官网描述如上，Gemini应该是近期版本新加的
#scheme: Muse
#scheme: Mist
scheme: Pisces
#scheme: Gemini

## 设置侧边栏社交链接
## 侧栏社交链接的修改包含两个部分，第一是链接，第二是链接图标。
## 链接放置在 social 字段下，一行一个链接。其键值格式是 显示文本: 链接地址
social:
  GitHub: https://github.com/cyril-lee-zh
  #E-Mail: mailto:yourname@gmail.com || envelope
  #Google: https://plus.google.com/yourname || google
  #Twitter: https://twitter.com/yourname || twitter
  #FB Page: https://www.facebook.com/yourname || facebook
  #VK Group: https://vk.com/yourname || vk
  #StackOverflow: https://stackoverflow.com/yourname || stack-overflow
  #YouTube: https://youtube.com/yourname || youtube
  #Instagram: https://instagram.com/yourname || instagram
  #Skype: skype:yourname?call|chat || skype

## 设置侧边栏社交链接的图标
## 其键值格式是 匹配键: Font Awesome 图标名称
## 匹配键 与上一步所配置的链接的 显示文本 相同（大小写严格匹配）
## 图标名称 是 Font Awesome 图标的名字（不必带 fa- 前缀）。
## enable 选项用于控制是否显示图标，你可以设置成 false 来去掉图标。
social_icons:
  enable: true
  icons_only: false
  transition: false

## 头像设置，可以是本地资源目录，也可以url链接
## 下面示例的在`/themes/next/source/images/`目录下放置名为`avatar.jpeg`的头像图片即可
avatar: /images/avatar.jpeg

## 文章的侧边栏，显示文章的目录
# Table Of Contents in the Sidebar
toc:
  enable: true

  # Automatically add list number to toc.
  number: true

  # If true, all words will placed on next lines if header width longer then sidebar width.
  wrap: false

# Wechat Subscriber
## 订阅微信公众号
## 在每篇文章的末尾显示微信公众号二维码，扫一扫，轻松订阅博客。
## 在微信公众号平台下载您的二维码，并将它存放于博客source/uploads/目录下。
#wechat_subscriber:
  #enabled: true
  #qcode: /path/to/your/wechatqcode ex. /uploads/wechat-qcode.jpg
  #description: ex. subscribe to my blog by scanning my public wechat account


# Reward
## 打赏配置
reward_comment: 坚持原创技术分享，您的支持将鼓励我继续创作！
wechatpay: /reward/wechatpay.jpeg
alipay: /reward/alipay.jpeg
#bitcoin: /images/bitcoin.png


# Code Highlight theme
# Available value:
#    normal | night | night eighties | night blue | night bright
# https://github.com/chriskempson/tomorrow-theme
## 代码高亮设置
## NexT 使用 Tomorrow Theme 作为代码高亮，共有5款主题供你选择。 
## NexT 默认使用的是 白色的 normal 主题
## 可选的值有 normal，night， night blue， night bright， night eighties：
highlight_theme: night


# ---------------------------------------------------------------
# Third Party Services Settings
## 第三方服务设置
# ---------------------------------------------------------------

# Disqus
## 评论系统配置
disqus:
  enable: false
  shortname:
  count: true


# Theme version
version: 5.1.4
```

# 6. 添加标签页面
此时标签页面还是显示的404,需要我们添加标签页面
```
$ cd hexo-blog
$ hexo new page tags
```
hexo会帮我们在source目录下新建一个tags目录，下面有个index.md文件

编辑`source/tags/index.md`，将type设置为`tags`，主题将自动为这个页面显示标签云。页面内容如下：

```
---
title: 标签
date: 2020-05-16 22:31:58
type: 'tags'
---
```

# 7. 添加分类页面
```
$ cd hexo-blog
$ hexo new page categories
```
同标签页的页面设置，编辑`source/tags/index.md`，将type设置为`categories`即可。

# 8. 文章front-matter设置
front-matter是在文章最上方，以'---'包裹的代码块，支持yaml格式和json格式。
front-matter主要是针对当前文章的一些配置支持一下配置：

|参数|描述|默认值|
|-|-|-|
|layout|布局|	
|title|标题|文章的文件名|
|date|建立日期|文件建立日期|
|updated|更新日期|文件更新日期|
|comments|开启文章的评论功能|true|
|tags|标签（不适用于分页）|
|categories|	分类（不适用于分页）|	
|permalink|覆盖文章网址|
|keywords|仅用于 meta 标签和 Open Graph 的关键词（不推荐使用）|

示例配置：

```
---
layout:
title: 基于hexo + hexo-theme-next搭建自己的博客
updated：
comments: ture
tags: [hexo, hexo-theme-next, 搭建博客]
categories:
  - [建站, 搭建博客]
  - hexo	
permalink:
keywords: [hexo, 搭建博客， hexo-theme-next]
---
```	