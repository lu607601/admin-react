/* global document */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Button, Row, Col, DatePicker, Input } from 'antd'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@withI18n()
@Form.create()
class Filter extends PureComponent {
  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter, form, i18n } = this.props
    const { getFieldDecorator } = form
    const { title } = filter

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
          {getFieldDecorator('title', { initialValue: title })(
            <Search
              placeholder={i18n.t`Search Title`}
              onSearch={this.handleSubmit}
            />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 8 }}
          md={{ span: 8 }}
          id="createTimeRangePicker"
        >
          <FilterItem label={i18n.t`CreateTime`}>
            {getFieldDecorator('createTime', {
              initialValue: initialCreateTime,
            })(
              <RangePicker
                style={{ width: '100%' }}
                onChange={this.handleChange.bind(this, 'createTime')}
                getCalendarContainer={() => {
                  return document.getElementById('createTimeRangePicker')
                }}
              />
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 8 }}>
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                className="margin-right"
                onClick={this.handleSubmit}
              >
                <Trans>Search</Trans>
              </Button>
              <Button className="margin-right" onClick={this.handleReset}>
                <Trans>Reset</Trans>
              </Button>
              <Button onClick={onAdd}>
                <Trans>Create</Trans>
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter