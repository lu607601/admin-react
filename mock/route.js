import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zh: {
      name: '仪表盘',
    },
    'pt-br': {
      name: 'Dashboard',
    },
    route: '/dashboard',
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    name: 'Users',
    zh: {
      name: '用户管理',
    },
    'pt-br': {
      name: 'Usuário',
    },
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'User Detail',
    zh: {
      name: '用户详情',
    },
    'pt-br': {
      name: 'Detalhes do usuário',
    },
    route: '/user/:id',
  },
  {
    id: '4',
    breadcrumbParentId: '1',
    name: 'UI Element',
    zh: {
      name: 'UI组件',
    },
    'pt-br': {
      name: 'Elementos UI',
    },
    icon: 'camera-o',
  },
  {
    id: '45',
    breadcrumbParentId: '4',
    menuParentId: '4',
    name: 'Editor',
    zh: {
      name: 'Editor',
    },
    'pt-br': {
      name: 'Editor',
    },
    icon: 'edit',
    route: '/UIElement/editor',
  },
  {
    id: '5',
    icon: 'file-text',
    breadcrumbParentId: '1',
    name: 'articles',
    zh: {
      name: '文章',
    },
    'pt-br': {
      name: '文章',
    },
    route: '/articles',
  },
  {
    id: '51',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'lists',
    zh: {
      name: '文章列表',
    },
    'pt-br': {
      name: '文章列表',
    },
    route: '/articles/lists',
  },
  {
    id: '52',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'createArticle',
    zh: {
      name: '文章创作',
    },
    'pt-br': {
      name: '文章创作',
    },
    route: '/articles/createArticle',
  },
  {
    id: '6',
    icon: 'setting',
    breadcrumbParentId: '1',
    name: 'Type',
    zh: {
      name: '类别管理',
    },
    'pt-br': {
      name: '类别管理',
    },
    route: '/type',
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
