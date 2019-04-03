export default {
  queryUserInfo: '/admin/user',
  logoutUser: '/admin/loginout',
  loginUser: 'POST /admin/login',

  queryUser: '/user/:_id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:_id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:_id',
  removeUserList: 'POST /users/delete',

  // 文章
  queryArticleList: '/articles',
  queryArticle: '/article/:_id',
  updateArticle: 'Patch /article/:_id',
  createArticle: 'POST /article',
  removeArticle: 'DELETE /article/:_id',
  removeArticleList: 'POST /articles/delete',

  // 标签
  queryTagList: '/tags',
  createTag: 'POST /tag',
  removeTag: 'DELETE /tag/:_id',
  updateTag: 'Patch /tag/:_id',

  // 分类
  queryCategoryList: '/categorys',
  createCategory: 'POST /category',
  removeCategory: 'DELETE /category/:_id',
  updateCategory: 'Patch /category/:_id',

  queryDashboard: '/dashboard',
}
