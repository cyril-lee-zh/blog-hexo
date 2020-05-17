
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
这里笔者选用了v5.1.0
```
$ cd themes/next
$ git tag -l
$ git checkout tags/v5.1.0
```

- 在 hexo 站点配置文件设置主题

修改`my-blog/_config.yml`文件， 将`theme`配置项默认的landscape改成next即可

# 4. hexo 站点配置文件

# 5. hexo-next 主题配置文件
```
# --------------------
#   next主题配置文件
# theme-next官方文档： http://theme-next.iissnan.com/
# --------------------

# 设置 favicon.ico 的相对路径，在 `hexo-site/source/` 目录下
favicon: /favicon.ico

# 设置站点关键字 
keywords: "Hexo, NexT"

# 设置 RSS
# 不太清楚这个是干嘛的emm...，直接贴了官方文档的描述
# NexT 中 RSS 有三个设置选项，满足特定的使用场景。 更改 主题配置文件，设定 rss 字段的值：
# false：禁用 RSS，不在页面上显示 RSS 连接。
# 留空：使用 Hexo 生成的 Feed 链接。 你可以需要先安装 hexo-generator-feed 插件。
# 具体的链接地址：适用于已经烧制过 Feed 的情形。
rss: false

# 站点建立时间
# 这个时间将在站点的底部显示，例如 © 2013 - 2015。
since: 2020

# icon between year and author @Footer
authoricon: heart

# Footer `powered-by` and `theme-info` copyright
copyright: true

# Canonical, set a canonical link tag in your hexo, you could use it for your SEO of blog.
# See: https://support.google.com/webmasters/answer/139066
# Tips: Before you open this tag, remember set up your URL in hexo _config.yml ( ex. url: http://yourdomain.com )
canonical: true

# Change headers hierarchy on site-subtitle (will be main site description) and on all post/pages titles for better SEO-optimization.
seo: false

# ---------------------------------------------------------------
# Menu Settings
# ---------------------------------------------------------------

# 设定菜单内容 
# 菜单内容的设置格式是：item name: link。其中 item name 是一个名称，这个名称并不直接显示在页面上，她将用于匹配图标以及翻译。
# !! 菜单项的显示文本在 NexT 主题目录下的 languages/{language}.yml 文件进行配置（（{language} 为你所使用的语言））
menu:
  home: /
  categories: /categories
  # about: /about
  archives: /archives
  tags: /tags
  # sitemap: /sitemap.xml
  commonweal: /404.html

# 设定菜单项的图标
menu_icons:
  enable: true
  #KeyMapsToMenuItemKey: NameOfTheIconFromFontAwesome
  home: home
  about: user
  categories: th
  schedule: calendar
  tags: tags
  archives: archive
  sitemap: sitemap
  commonweal: heartbeat




# ---------------------------------------------------------------
# Scheme主题设定
# ---------------------------------------------------------------
# Scheme 是 NexT 提供的一种特性，借助于 Scheme，NexT 为你提供多种不同的外观。
# 同时，几乎所有的配置都可以 在 Scheme 之间共用。
# 目前 NexT 支持三种 Scheme，他们是：
# Muse - 默认 Scheme，这是 NexT 最初的版本，黑白主调，大量留白
# Mist - Muse 的紧凑版本，整洁有序的单栏外观
# Pisces - 双栏 Scheme，小家碧玉似的清新
#scheme: Muse
#scheme: Mist
scheme: Pisces


# ---------------------------------------------------------------
# Font Settings
# - Find fonts on Google Fonts (https://www.google.com/fonts)
# - All fonts set here will have the following styles:
#     light, light italic, normal, normal italic, bold, bold italic
# - Be aware that setting too much fonts will cause site running slowly
# - Introduce in 5.0.1
# ---------------------------------------------------------------
# 字体设置
font:
  enable: true

  # Uri of fonts host. E.g. //fonts.googleapis.com (Default)
  host:

  # Global font settings used on <body> element.
  global:
    # external: true will load this font family from host.
    external: true
    family: Lato

  # 文章内标题的字体（h1, h2, h3, h4, h5, h6）
  headings:
    external: true
    family:
  # 文章字体
  posts:
    external: true
    family:

  # Logo字体
  # size 字段指定大小，单位是'px'
  logo:
    external: true
    family:
    size:

  # 代码字体，应用于 code 以及代码块
  codes:
    external: true
    family: PT Mono
    size:

# ---------------------------------------------------------------
# Sidebar Settings
# ---------------------------------------------------------------


# 设置侧边栏社交链接
# 侧栏社交链接的修改包含两个部分，第一是链接，第二是链接图标。
# 链接放置在 social 字段下，一行一个链接。其键值格式是 显示文本: 链接地址
social:
  GitHub: https://github.com/cyril-lee-zh
  # Twitter: https://twitter.com/your-user-name
  # 微博: http://weibo.com/your-user-name
  # 豆瓣: http://douban.com/people/your-user-name
  # 知乎: http://www.zhihu.com/people/your-user-name
  # 等等
# 设置侧边栏社交链接的图标
# 其键值格式是 匹配键: Font Awesome 图标名称
# 匹配键 与上一步所配置的链接的 显示文本 相同（大小写严格匹配）
# 图标名称 是 Font Awesome 图标的名字（不必带 fa- 前缀）。
# enable 选项用于控制是否显示图标，你可以设置成 false 来去掉图标。
social_icons:
  enable: true
  # Icon Mappings.
  # KeyMapsToSocialItemKey: NameOfTheIconFromFontAwesome
  GitHub: github
  Twitter: twitter
  Weibo: weibo


# Sidebar Avatar
# in theme directory(source/images): /images/avatar.jpg
# in site  directory(source/uploads): /uploads/avatar.jpg
avatar: http://img2.imgtn.bdimg.com/it/u=3434686726,1651926452&fm=11&gp=0.jpg


# Table Of Contents in the Sidebar
toc:
  enable: true

  # Automatically add list number to toc.
  number: true


# Creative Commons 4.0 International License.
# http://creativecommons.org/
# Available: by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero
#creative_commons: by-nc-sa
#creative_commons:


sidebar:
  # Sidebar Position, available value: left | right
  position: left
  #position: right

  # Sidebar Display, available value:
  #  - post    expand on posts automatically. Default.
  #  - always  expand for all pages automatically
  #  - hide    expand only when click on the sidebar toggle icon.
  #  - remove  Totally remove sidebar including sidebar toggle.
  display: post
  #display: always
  #display: hide
  #display: remove

  # Sidebar offset from top menubar in pixels.
  offset: 12
  offset_float: 0

  # Back to top in sidebar
  b2t: true

  # Scroll percent label in b2t button
  scrollpercent: true


# 友情链接
links_title: 友情链接
links_layout: block
# links_layout: inline
links:
  title: https://github.com/
  github: https://github.com/


# ---------------------------------------------------------------
# Post Settings
# ---------------------------------------------------------------

# Automatically scroll page to section which is under <!-- more --> mark.
scroll_to_more: true

# Automatically excerpt description in homepage as preamble text.
excerpt_description: true

# Automatically Excerpt. Not recommend.
# Please use <!-- more --> in the post to control excerpt accurately.
auto_excerpt:
  enable: false
  length: 150

# Post meta display settings
post_meta:
  item_text: true
  created_at: true
  updated_at: false
  categories: true

# Post wordcount display settings
# Dependencies: https://github.com/willin/hexo-wordcount
post_wordcount:
  item_text: true
  wordcount: false
  min2read: false

# 订阅微信公众号
# 在每篇文章的末尾显示微信公众号二维码，扫一扫，轻松订阅博客。
# 在微信公众号平台下载您的二维码，并将它存放于博客source/uploads/目录下。
# wechat_subscriber:
  #enabled: true
  #qcode: /uploads/wechat-qcode.jpg
  #description: ex. subscribe to my blog by scanning my public wechat account



# ---------------------------------------------------------------
# Misc Theme Settings
# ---------------------------------------------------------------

# Custom Logo.
# !!Only available for Default Scheme currently.
# Options:
#   enabled: [true/false] - Replace with specific image
#   image: url-of-image   - Images's url
custom_logo:
  enabled: false
  image:


# NexT 使用 Tomorrow Theme 作为代码高亮，共有5款主题供你选择。 
# NexT 默认使用的是 白色的 normal 主题
# 可选的值有 normal，night， night blue， night bright， night eighties：
highlight_theme: night


# ---------------------------------------------------------------
# 第三方服务配置 
# Third Party Services Settings
# ---------------------------------------------------------------

# MathJax Support
mathjax:
  enable: false
  per_page: false
  cdn: //cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML


# Swiftype Search API Key
#swiftype_key:

# Baidu Analytics ID
#baidu_analytics:

# Duoshuo ShortName
#duoshuo_shortname:

# Disqus  评论系统配置
disqus:
  enable: true
  shortname:
  count: true # 用于指定是否显示评论数量。
#disqus_shortname:

# Hypercomments
#hypercomments_id:

# Gentie productKey
#gentie_productKey:

# Support for youyan comments system.
# You can get your uid from http://www.uyan.cc
#youyan_uid: your uid

# Support for LiveRe comments system.
# You can get your uid from https://livere.com/insight/myCode (General web site)
#livere_uid: your uid

# Baidu Share
# Available value:
#    button | slide
# Warning: Baidu Share does not support https.
#baidushare:
##  type: button

# Share
#jiathis:
# Warning: JiaThis does not support https.
#add_this_id:

# Share
#duoshuo_share: true

# Google Webmaster tools verification setting
# See: https://www.google.com/webmasters/
#google_site_verification:

# Google Analytics
#google_analytics:

# Yandex Webmaster tools verification setting
# See: https://webmaster.yandex.ru/
#yandex_site_verification:

# CNZZ count
#cnzz_siteid:

# Application Insights
# See https://azure.microsoft.com/en-us/services/application-insights/
# application_insights:

# Make duoshuo show UA
# user_id must NOT be null when admin_enable is true!
# you can visit http://dev.duoshuo.com get duoshuo user id.
duoshuo_info:
  ua_enable: true
  admin_enable: false
  user_id: 0
  #admin_nickname: Author


# Facebook SDK Support.
# https://github.com/iissnan/hexo-theme-next/pull/410
facebook_sdk:
  enable: false
  app_id:       #<app_id>
  fb_admin:     #<user_id>
  like_button:  #true
  webmaster:    #true

# Facebook comments plugin
# This plugin depends on Facebook SDK.
# If facebook_sdk.enable is false, Facebook comments plugin is unavailable.
facebook_comments_plugin:
  enable: false
  num_of_posts: 10  # min posts num is 1
  width: 100%       # default width is 550px
  scheme: light     # default scheme is light (light or dark)

# VKontakte API Support.
# To get your AppID visit https://vk.com/editapp?act=create
vkontakte_api:
  enable: false
  app_id:       #<app_id>
  like:         true
  comments:     true
  num_of_posts: 10


# Show number of visitors to each article.
# You can visit https://leancloud.cn get AppID and AppKey.
leancloud_visitors:
  enable: false
  app_id: #<app_id>
  app_key: #<app_key>

# Show PV/UV of the website/page with busuanzi.
# Get more information on http://ibruce.info/2015/04/04/busuanzi/
busuanzi_count:
  # count values only if the other configs are false
  enable: false
  # custom uv span for the whole site
  site_uv: true
  site_uv_header: <i class="fa fa-user"></i>
  site_uv_footer:
  # custom pv span for the whole site
  site_pv: true
  site_pv_header: <i class="fa fa-eye"></i>
  site_pv_footer:
  # custom pv span for one page only
  page_pv: true
  page_pv_header: <i class="fa fa-file-o"></i>
  page_pv_footer:


# Tencent analytics ID
# tencent_analytics:

# Tencent MTA ID
# tencent_mta:


# Enable baidu push so that the blog will push the url to baidu automatically which is very helpful for SEO
baidu_push: false

# Google Calendar
# Share your recent schedule to others via calendar page
#
# API Documentation:
# https://developers.google.com/google-apps/calendar/v3/reference/events/list
calendar:
  enable: false
  calendar_id: <required>
  api_key: <required>
  orderBy: startTime
  offsetMax: 24
  offsetMin: 4
  timeZone:
  showDeleted: false
  singleEvents: true
  maxResults: 250

# Algolia Search
algolia_search:
  enable: false
  hits:
    per_page: 10
  labels:
    input_placeholder: Search for Posts
    hits_empty: "We didn't find any results for the search: ${query}"
    hits_stats: "${hits} results found in ${time} ms"


# Local search
local_search:
  enable: false

# External URL with BASE64 encrypt & decrypt
# Usage: {% exturl text url "title" %}
# Alias: {% extlink text url "title" %}
exturl: false


#! ---------------------------------------------------------------
#! DO NOT EDIT THE FOLLOWING SETTINGS
#! UNLESS YOU KNOW WHAT YOU ARE DOING
#! ---------------------------------------------------------------

# 设置「动画效果」
# NexT 默认开启动画效果，效果使用 JavaScript 编写，因此需要等待 JavaScript 脚本完全加载完毕后才会显示内容。
# 如果您比较在乎速度，可以将设置此字段的值为 false 来关闭动画。
use_motion: true

# Fancybox
fancybox: true

# 设置「背景动画」
# NexT 自带两种背景动画效果, canvas_nest 或 three_waves
# 注意： three_waves 在版本 5.1.1 中引入。只能同时开启一种背景动画效果。
canvas_nest: ture

# Script Vendors.
# Set a CDN address for the vendor you want to customize.
# For example
#    jquery: https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
# Be aware that you should use the same version as internal ones to avoid potential problems.
# Please use the https protocol of CDN files when you enable https on your site.
vendors:
  # Internal path prefix. Please do not edit it.
  _internal: lib

  # Internal version: 2.1.3
  jquery:

  # Internal version: 2.1.5
  # See: http://fancyapps.com/fancybox/
  fancybox:
  fancybox_css:

  # Internal version: 1.0.6
  # See: https://github.com/ftlabs/fastclick
  fastclick:

  # Internal version: 1.9.7
  # See: https://github.com/tuupola/jquery_lazyload
  lazyload:

  # Internal version: 1.2.1
  # See: http://VelocityJS.org
  velocity:

  # Internal version: 1.2.1
  # See: http://VelocityJS.org
  velocity_ui:

  # Internal version: 0.7.9
  # See: https://faisalman.github.io/ua-parser-js/
  ua_parser:

  # Internal version: 4.6.2
  # See: http://fontawesome.io/
  fontawesome:

  # Internal version: 1
  # https://www.algolia.com
  algolia_instant_js:
  algolia_instant_css:

  # Internal version: 1.0.0
  # https://github.com/hustcc/canvas-nest.js
  canvas_nest:



# Assets
css: css
js: js
images: images

# Theme version
version: 5.1.0

# 打赏配置
reward_comment: 坚持原创技术分享，您的支持将鼓励我继续创作！
wechatpay: /reward/wechatpay.jpeg
alipay: /reward/alipay.jpeg
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