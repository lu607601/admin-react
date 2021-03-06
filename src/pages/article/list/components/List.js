import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`确定删除此文章吗?`,
        onOk() {
          onDeleteItem(record._id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>Title</Trans>,
        dataIndex: 'title',
        key: 'title',
        width: 72,
        fixed: 'left',
        render: (text, record) => (
          <Link to={`/article/detail/${record._id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>Author</Trans>,
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: <Trans>Categories</Trans>,
        dataIndex: 'categories',
        key: 'categories',
      },
      {
        title: <Trans>Tags</Trans>,
        dataIndex: 'tags',
        key: 'tags',
      },
      {
        title: <Trans>Visibility</Trans>,
        dataIndex: 'visibility',
        key: 'visibility',
      },
      {
        title: <Trans>Comments</Trans>,
        dataIndex: 'comments',
        key: 'comments',
      },
      {
        title: <Trans>Views</Trans>,
        dataIndex: 'views',
        key: 'views',
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: <Trans>UpdateTime</Trans>,
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        width: 120,
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1400 }}
        columns={columns}
        simple
        rowKey={record => record._id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
