import React, { PureComponent } from 'react'
import { Table, Modal } from 'antd'
import { withI18n } from '@lingui/react'
import { DropOption } from 'components'
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
        title: i18n.t`确定删除此标签吗?`,
        onOk() {
          onDeleteItem(record._id)
        },
      })
    }
  }
  render() {
    const { i18n, ...tableProps } = this.props
    const columns = [
      {
        title: i18n.t`Title`,
        dataIndex: 'title',
      },
      {
        title: i18n.t`Desc`,
        dataIndex: 'desc',
      },
      {
        title: i18n.t`CreateTime`,
        dataIndex: 'createTime',
      },
      {
        title: i18n.t`Operation`,
        key: 'operation',
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
        bordered
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
