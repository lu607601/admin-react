import { Mock, Constant, qs, randomAvatar } from './_utils'

const { ApiPrefix } = Constant

let articlesListData = Mock.mock({
  'data|10-30': [
    {
      id: '@id',
      title: '@title',
      author: '@last',
      categories: '@word',
      tags: '@word',
      visibility: false,
      'comments|1-100': 0,
      'views|1-100': 0,
      email: '@email',
      createTime: '@datetime',
      modifyTime: '@datetime',
    },
  ],
})

let database = articlesListData.data
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

module.exports = {
  [`GET ${ApiPrefix}/articles`](req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()
              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            )
          }
          return true
        })
      }
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`POST ${ApiPrefix}/articles/delete`](req, res) {
    console.log('mock-article-delete')
    const { ids = [] } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },

  [`POST ${ApiPrefix}/article`](req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')
    database.unshift(newData)
    res
      .status(200)
      .json({
        status: 200,
        message: '添加成功',
      })
      .end()
  },

  [`GET ${ApiPrefix}/article/:id`](req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(200).end()
    }
  },

  [`DELETE ${ApiPrefix}/article/:id`](req, res) {
    console.log('delete-article-patch')
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(200).end()
    }
  },

  [`PATCH ${ApiPrefix}/article/:id`](req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false
    console.log('mock-article-patch')
    database = database.map(item => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(200).end()
    }
  },
}
