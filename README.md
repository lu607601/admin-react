<h1 align="center">Admin-REACT</h1>

## 前言

此项目 是基于 [https://github.com/zuiidea/antd-admin](https://github.com/zuiidea/antd-admin) 进行的开发， 同时参考了项目 [https://github.com/biaochenxuying/blog-react-admin](https://github.com/biaochenxuying/blog-react-admin)

## src 目录结构

```
├── components
│   ├── DropOption
│   ├── Editor
│   ├── FilterItem
│   ├── Layout
│   ├── Loader
│   ├── Page
│   ├── ScrollBar
│   └── index.js
├── e2e
│   └── login.e2e.js
├── layouts
│   ├── BaseLayout.js
│   ├── BaseLayout.less
│   ├── PrimaryLayout.js
│   ├── PrimaryLayout.less
│   ├── PublicLayout.js
│   └── index.js
├── locales
│   ├── en
│   ├── pt-br
│   └── zh
├── models              model层
│   ├── app.js
│   ├── article.js
│   ├── category.js
│   ├── tag.js
│   └── user.js
├── pages
│   ├── 404.js
│   ├── 404.less
│   ├── article         文章管理
│   ├── category        分类管理
│   ├── dashboard
│   ├── index.js
│   ├── login           登录
│   ├── tag             标签管理
│   └── user            用户管理
├── plugins
│   └── onError.js
├── services
│   ├── api.js 接口api
│   └── index.js
├── themes
│   ├── default.less
│   ├── index.less
│   ├── mixin.less
│   └── vars.less
└── utils
    ├── city.js
    ├── config.js
    ├── constant.js
    ├── index.js
    ├── index.test.js
    ├── model.js
    ├── request.js     接口请求配置
    ├── routes.js      路由
    └── theme.js

```

## 功能

### 已实现功能

- 登录
- 权限管理
- 文章管理：文章列表&发表文章[支持富文本编辑啊]&删除文章(包括批量)&更新文章
- 标签管理：标签列表&创建标签&删除标签(包括批量)&更新标签
- 分类管理：分类列表&创建分类&删除分类(包括批量)&更新分类

### 待实现功能

- 留言
- 点赞
- 评论

## 技术

- umi: 2.5.5
- dva: 2.5.0-beta.2
- react：16.8.3
- redux: 3.7.2
- react-router:：4.3.1
- antd：3.13.6
- webpack：4.28.4
- axios：0.18.0

## 使用

1. start server (localhost: 3000)

2. git clone https://gitlab.com/blog-CRYSTALLYM/admin-react

3. npm install

4. npm run start (localhost: 3001)
