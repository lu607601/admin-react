import React from 'react'
import { Editor } from 'components'
import { router } from 'utils'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import { connect } from 'dva'
import { Row, Col, Card, Form, Input, Select, Button } from 'antd'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
@connect(({ article, articleDetail, tag, category }) => ({
  article,
  articleDetail,
  tag,
  category,
}))
class EditorPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      flag: 0,
      content: '',
      origin: '0', // 文章转载状态 => 0 原创，1 转载，2 混合
      state: '0', // 文章发布状态 => 0 草稿，1 已发布
      type: '0', // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
      tags: [],
      categorys: [],
      tagPage: 1,
      tagPageSize: 20,
      categoryPage: 1,
      categoryPageSize: 20,
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleTagSearch = () => {
    const { dispatch } = this.props
    const param = {
      page: this.state.tagPage,
      pageSize: this.state.tagPageSize,
    }
    dispatch({
      type: 'tag/query',
      payload: param,
    })
  }
  handleCategorySearch = () => {
    const { dispatch } = this.props
    const param = {
      page: this.state.categoryPage,
      pageSize: this.state.categoryPageSize,
    }
    dispatch({
      type: 'category/query',
      payload: param,
    })
  }
  onEditorStateChange = editorCnt => {
    this.props.form.setFieldsValue({
      content: editorCnt
        ? draftToHtml(convertToRaw(editorCnt.getCurrentContent()))
        : '',
    })
    this.setState({
      content: editorCnt,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (!err) {
        const { dispatch } = this.props
        data._id = this.props.match.params._id
        dispatch({
          type: `articleDetail/update`,
          payload: data,
        }).then(() => {
          router.push('/article/list')
        })
      }
    })
  }
  componentWillMount = () => {
    this.handleTagSearch()
    this.handleCategorySearch()
  }
  componentWillReceiveProps = nextProps => {
    // 设置flag fix编辑输入时从新 将 articleDetail里的data值 赋值给 state.content
    if (!this.state.flag) {
      if (
        !this.props.articleDetail.data.data ||
        !this.props.articleDetail.data.data.content
      ) {
        return
      }
      const contentTmp = this.props.articleDetail.data.data.content
      const contentBlock = htmlToDraft(contentTmp)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        )
        this.setState({
          content: EditorState.createWithContent(contentState),
          flag: 1,
        })
      }
    }
  }
  render() {
    const tagList = this.props.tag.list
    const categoryList = this.props.category.list
    const children = []
    const categoryChildren = []
    for (let i = 0; i < tagList.length; i++) {
      const e = tagList[i]
      children.push(
        <Select.Option key={e._id} value={e._id}>
          {e.title}
        </Select.Option>
      )
    }
    for (let i = 0; i < categoryList.length; i++) {
      const e = categoryList[i]
      categoryChildren.push(
        <Select.Option key={e._id} value={e._id}>
          {e.title}
        </Select.Option>
      )
    }
    const colProps = {
      lg: 12,
      md: 24,
      style: {
        marginBottom: 32,
      },
    }
    const textareaStyle = {
      minHeight: 496,
      width: '100%',
      background: '#f7f7f7',
      borderColor: '#F1F1F1',
      padding: '16px 8px',
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    }
    const { getFieldDecorator } = this.props.form
    const { articleDetail } = this.props
    const { content } = this.state
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <div className="header">
            <Form.Item {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                initialValue: articleDetail.data.data
                  ? articleDetail.data.data.title
                  : '',
                rules: [
                  {
                    required: true,
                    message: '请输入标题!',
                  },
                ],
              })(<Input size="large" placeholder="标题" name="title" />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="作者">
              {getFieldDecorator('author', {
                initialValue: articleDetail.data.data
                  ? articleDetail.data.data.author
                  : '',
                rules: [
                  {
                    required: true,
                    message: '请输入作者!',
                  },
                ],
              })(<Input size="large" placeholder="作者" name="author" />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="关键字">
              {getFieldDecorator('keyword', {
                initialValue: articleDetail.data.data
                  ? articleDetail.data.data.keyword
                  : '',
                rules: [
                  {
                    required: true,
                    message: '请输入关键字!',
                  },
                ],
              })(<Input size="large" placeholder="关键字" name="keyword" />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="描述">
              {getFieldDecorator('desc', {
                initialValue: articleDetail.data.data
                  ? articleDetail.data.data.desc
                  : '',
                rules: [
                  {
                    required: true,
                    message: '请输入描述!',
                  },
                ],
              })(<Input size="large" placeholder="描述" name="desc" />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="封面链接">
              {getFieldDecorator('imgUrl', {
                initialValue: articleDetail.data.data
                  ? articleDetail.data.data.imgUrl
                  : '',
                rules: [
                  {
                    required: true,
                    message: '请输入封面链接!',
                  },
                ],
              })(<Input size="large" placeholder="封面链接" name="imgUrl" />)}
            </Form.Item>

            {getFieldDecorator('state', {
              initialValue: articleDetail.data.data
                ? articleDetail.data.data.state
                : '',
              rules: [
                {
                  required: true,
                  message: '请选择发布状态！',
                },
              ],
            })(
              <Select
                style={{ width: 200, marginBottom: 20 }}
                placeholder="选择发布状态"
              >
                {/*  0 草稿，1 发布 */}
                <Select.Option value="0">草稿</Select.Option>
                <Select.Option value="1">发布</Select.Option>
              </Select>
            )}

            {getFieldDecorator('type', {
              initialValue: articleDetail.data.data
                ? articleDetail.data.data.type
                : '',
              rules: [
                {
                  required: true,
                  message: '请选择文章类型',
                },
              ],
            })(
              <Select
                style={{
                  width: 200,
                  marginLeft: 10,
                  marginBottom: 20,
                }}
                placeholder="选择文章类型"
              >
                {/* 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍 */}
                <Select.Option value="0">普通文章</Select.Option>
                <Select.Option value="1">简历</Select.Option>
                <Select.Option value="2">管理员介绍</Select.Option>
              </Select>
            )}

            {getFieldDecorator('origin', {
              initialValue: articleDetail.data.data
                ? articleDetail.data.data.origin
                : '',
              rules: [
                {
                  required: true,
                  message: '请选择文章转载状态',
                },
              ],
            })(
              <Select
                style={{
                  width: 200,
                  marginLeft: 10,
                  marginBottom: 20,
                }}
                placeholder="选择文章转载状态"
              >
                {/* 0 原创，1 转载，2 混合 */}
                <Select.Option value="0">原创</Select.Option>
                <Select.Option value="1">转载</Select.Option>
                <Select.Option value="2">混合</Select.Option>
              </Select>
            )}

            {getFieldDecorator('tags', {
              initialValue: articleDetail.data.data
                ? articleDetail.data.data.tags
                : [],
              rules: [
                {
                  required: true,
                  message: '请选择标签',
                  type: 'array',
                },
              ],
            })(
              <Select
                allowClear
                mode="multiple"
                style={{
                  width: 200,
                  marginLeft: 10,
                  marginBottom: 20,
                }}
                placeholder="标签"
              >
                {children}
              </Select>
            )}

            {getFieldDecorator('categorys', {
              initialValue: articleDetail.data.data
                ? articleDetail.data.data.categorys
                : [],
              rules: [
                {
                  required: true,
                  message: '请选择文章分类',
                },
              ],
            })(
              <Select
                allowClear
                mode="multiple"
                style={{
                  width: 200,
                  marginLeft: 10,
                  marginBottom: 10,
                }}
                placeholder="文章分类"
              >
                {categoryChildren}
              </Select>
            )}
          </div>
          <div className="content">
            <Row gutter={32}>
              <Col {...colProps}>
                <Form.Item label="">
                  {getFieldDecorator('content', {
                    initialValue: articleDetail.data.data
                      ? articleDetail.data.data.content
                      : '',
                    rules: [
                      {
                        required: true,
                        message: '请输入文章内容!',
                      },
                    ],
                  })(
                    <Card title="Editor" style={{ overflow: 'visible' }}>
                      <Editor
                        wrapperStyle={{
                          minHeight: 500,
                        }}
                        editorStyle={{
                          minHeight: 376,
                        }}
                        editorState={content}
                        onEditorStateChange={this.onEditorStateChange}
                      />
                    </Card>
                  )}
                </Form.Item>
              </Col>
              <Col {...colProps}>
                <Card title="Markdown">
                  <textarea
                    style={textareaStyle}
                    disabled
                    value={
                      content
                        ? draftToMarkdown(
                            convertToRaw(content.getCurrentContent())
                          )
                        : ''
                    }
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <div className="footer" style={{ textAlign: 'right' }}>
            <Button
              htmlType="submit"
              loading={this.state.loading}
              style={{ marginBottom: '10px' }}
              type="primary"
            >
              提交
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const ArticleEditor = Form.create()(EditorPage)
ArticleEditor.propTypes = {
  article: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default ArticleEditor
