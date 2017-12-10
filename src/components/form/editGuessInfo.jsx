import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox, DatePicker, Alert, Cascader } from 'antd';

import { postJSON } from '../../common/ApiUtil';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import styles from './editGuessInfo.less';

const json = require('../../common/city');

const FormItem = Form.Item;

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
      if (!err) {
        const dataJSON = _this.formatJSON(values);
        postJSON({
          url: requestList.CouponPick,
          data: dataJSON,
        }).then((res) => {
          message.success(res.msg || '提货成功，请耐心等候发货');
          _this.props.onSaveForm(dataJSON);
        }).catch((err) => {
          console.log(err);
        });
      }

    });
  }

  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }
  formatJSON(values) {
    // console.log(values['dt_pick_order'].format('YYYY-MM-DD'));
    const { goodsID, goodsPwd } = this.props.GUEST;
    return {
      couponCode: goodsID,
      couponPwd: goodsPwd,
      address: `${values.address1.join(',')},${values.address2}`,
      name: values.name,
      tele: values.tele,
      dt_pick_order: values['dt_pick_order'].format('YYYY-MM-DD'),
      memo: values.memo,
    };
  }



  render() {
    const { typeSelect, groupId, step, options } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { goodsName, goodsID, goodsPwd } = this.props.GUEST;

    return (
      <div>
        <div className={styles.info}>{goodsName}333</div>
        {/* <div className={styles.info}><span className={styles.title}>券号:</span><span className={styles.text}>222{goodsID}</span></div> */}
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...this.formItemLayout}
            label="省市"
          >
            {getFieldDecorator('address1', {
              rules: [{
                required: true,
                message: '请选择省市',
              }],
            })(
              <Cascader options={options} placeholder="点击选择省市" changeOnSelect />,
            )}
          </FormItem>

          <FormItem
            {...this.formItemLayout}
            label="详细地址"
          >
            {getFieldDecorator('address2', {
              rules: [{
                required: true,
                message: '请输入收件人详细地址',
              }],
            })(
              <Input
                placeholder="请输入收件人详细地址"
              />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="收件人姓名"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入收件人姓名',
              }],
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
            {getFieldDecorator('tele', {
              rules: [{
                required: true,
                message: '请输入联系人电话',
              }],
            })(
              <Input prefix={<Icon type="phone" />} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="希望发货时间"
          >
            {getFieldDecorator('dt_pick_order', {
              rules: [{
                required: true,
                message: '请输入希望发货时间',
              }],
            })(
              <DatePicker
                disabledDate={this.disabledDate}
                showToday={false}
                format={'YYYY-MM-DD'}
              />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="备注"
          >
            {getFieldDecorator('memo', {

            })(
              <TextArea rows={4} />,
            )}
          </FormItem>

          <FormItem className={styles.btnContent}>
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
