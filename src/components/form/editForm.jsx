import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox, DatePicker } from 'antd';

import { ImageTools, randomString, getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
// import styles from './login.less';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const { TextArea } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);
    const { coupon } = this.props.COUPONITEM;
    this.state = {
      coupon: coupon,
    };

    this.formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    const { coupon } = nextProps.COUPONITEM;
    this.state = {
      coupon: coupon,
    };

  }

  shouldComponentUpdate(nextProps, nextState) {

    return shallowCompare(this, nextProps, nextState);
  }

  /**
   * 表单提交 
   * 
   * @param {any} e 
   * @memberof App
   */
  handleSubmit(e) {
    e.preventDefault();
    // const _this = this;

    this.props.form.validateFields((err, values) => {
      getJSON(requestList.login).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    });
  }
  onChange(value) {
    console.log(value);
  }
  onDatePickerChange(e) {
    console.log(e);
  }
  render() {

    const { coupon } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...this.formItemLayout}
            label="卷号"
          >
            {getFieldDecorator('code', {
              initialValue: coupon.code,
            })(
              <Input />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="密码"
          >
            {getFieldDecorator('codePwd', {
              initialValue: coupon.codePwd,
            })(
              <Input />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="卡卷创建时间"
          >
            {getFieldDecorator('dt_add', {
              initialValue: moment(coupon.dt_add||''),
            })(
              <DatePicker onChange={this.onDatePickerChange} />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="提货申请时间"
          >
            {getFieldDecorator('dt_pick', {
              initialValue: moment(coupon.dt_pick||''),
            })(
              <DatePicker onChange={this.onDatePickerChange} />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="提货预约时间"
          >
            {getFieldDecorator('dt_pick_order', {
              initialValue: moment(coupon.dt_pick_order||''),
            })(
              <DatePicker onChange={this.onDatePickerChange} />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="发货时间"
          >
            {getFieldDecorator('dt_track', {
              initialValue: moment(coupon.dt_track||''),
            })(
              <DatePicker 
                onChange={this.onDatePickerChange} 
              />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="备注"
          >
            {getFieldDecorator('comment', {
              
            })(
              <TextArea rows={4} />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="卡状态"
          >
            {getFieldDecorator('status', {

            })(
              <Select >
                <Option value="unUse">未激活</Option>
                <Option value="readyUse">已售卖</Option>
                <Option value="orderPick" >已预约</Option>
                <Option value="tracked">已发货</Option>
                <Option value="unabled">已停用</Option>
              </Select>
              )}
          </FormItem>

          <FormItem>


            <Button type="primary" htmlType="submit" className="login-form-button">
              保存
            </Button>

          </FormItem>
        </Form>
      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
