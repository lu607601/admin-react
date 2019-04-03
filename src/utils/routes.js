module.exports = [
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
    id: '3',
    icon: 'file-text',
    breadcrumbParentId: '1',
    name: 'article',
    zh: {
      name: '文章',
    },
    'pt-br': {
      name: '文章',
    },
    route: '/article',
  },
  {
    id: '31',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: 'list',
    zh: {
      name: '文章列表',
    },
    'pt-br': {
      name: '文章列表',
    },
    route: '/article/list',
  },
  {
    id: '32',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: 'createArticle',
    zh: {
      name: '文章创作',
    },
    'pt-br': {
      name: '文章创作',
    },
    route: '/article/createArticle',
  },
  {
    id: '33',
    breadcrumbParentId: '3',
    menuParentId: '-1',
    name: 'article Detail',
    zh: {
      name: '文章详情',
    },
    'pt-br': {
      name: '文章详情',
    },
    route: '/article/detail/:_id',
  },
  {
    id: '4',
    icon: 'tag',
    breadcrumbParentId: '1',
    name: 'Tag',
    zh: {
      name: '标签管理',
    },
    'pt-br': {
      name: '标签管理',
    },
    route: '/tag',
  },
  {
    id: '5',
    icon: 'book',
    breadcrumbParentId: '1',
    name: 'Category',
    zh: {
      name: '类别管理',
    },
    'pt-br': {
      name: '类别管理',
    },
    route: '/category',
  },
]
