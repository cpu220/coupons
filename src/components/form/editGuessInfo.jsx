import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox, DatePicker, Alert, Cascader } from 'antd';

import { ImageTools, randomString, getJSON, postJSON, fetchJsonp } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
// import styles from './login.less';

const json = require('../../common/city');

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;

const { TextArea } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);
    const { goodsName } = this.props.GUEST;
    this.state = {
      options: json || [],
      goodsName: goodsName, 
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
    this.disabledDate = this.disabledDate.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      goodsName: nextProps.GUEST.goodsName,
    });

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
    const _this = this;

    this.props.form.validateFields((err, values) => {
      // getJSON(requestList.login).then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // })
      _this.props.onSaveForm(values);
    });
  }
  onChange(value) {
    console.log(value);
  }
  onDatePickerChange(e) {
    console.log(e);
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

   

  render() {
    const { typeSelect, groupId, step, options } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { goodsName } = this.props.GUEST;
 
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...this.formItemLayout}
            label="商品名"
          >
            {getFieldDecorator('goodsName', {
              initialValue: goodsName
            })(
              <Input disabled={true} />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="省市"
          >
            {getFieldDecorator('address1', {

            })(
              <Cascader options={options} placeholder="点击选择省市" changeOnSelect />,
            )}
          </FormItem>

          <FormItem
            {...this.formItemLayout}
            label="详细地址"
          >
            {getFieldDecorator('address2', {

            })(
              <Input
                placeholder="请输入收件人地址"
              />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="收件人姓名"
          >
            {getFieldDecorator('name', {

            })(
              <Input
                placeholder="请输入收件人姓名"
              />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="收件人电话"
          >
            {getFieldDecorator('phone', {
            })(
              <Input prefix={<Icon type="phone" />} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="希望发货时间"
          >
            {getFieldDecorator('dt_pick_order', {

            })(
              <DatePicker
                disabledDate={this.disabledDate}
                showToday={false}
              />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="备注"
          >
            {getFieldDecorator('备注', {

            })(
              <TextArea rows={4} />,
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              下一步
            </Button>
          </FormItem>
        </Form>

      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
