import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { withI18n } from '@lingui/react'
import { stringify } from 'qs'
import List from './components/List'
import Modal from './components/Modal'
import Filter from './components/Filter'

@withI18n()
@connect(({ tag, loading }) => ({ tag, loading }))
class Tag extends PureComponent {
  render() {
    const { tag, dispatch, loading, location } = this.props
    const { list, pagination, modalVisible, modalType, currentItem } = tag
    const { query, pathname } = location
    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`user/${modalType}`],
      title: `${modalType === 'create' ? `创建` : `更新`}`,
      label: '标签名',
      centered: true,
      onOk(data) {
        dispatch({
          type: `tag/${modalType}`,
          payload: Object.assign({ status: query.status }, data),
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'tag/hideModal',
        })
      },
    }

    const filterProps = {
      filter: {
        ...query,
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1,
        })
      },
      onAdd() {
        dispatch({
          type: 'tag/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
    const listProps = {
      pagination,
      dataSource: list,
      loading: loading.effects['type/query'],
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(_id) {
        dispatch({
          type: 'tag/delete',
          payload: _id,
        }).then(() => {
          handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'tag/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
    }

    // const handleTabClick = key => {
    //   router.push({
    //     pathname,
    //     search: stringify({
    //       status: key,
    //     }),
    //   })
    // }
    // const onAdd = () => {
    //   dispatch({
    //     type: 'type/showModal',
    //     payload: {
    //       modalType: 'create',
    //       currentItem: {},
    //     },
    //   })
    // }
    return (
      <div className="tag">
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </div>
    )
  }
}
Tag.propTypes = {
  tag: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default Tag
