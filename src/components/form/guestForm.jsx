import React from 'react';
import { Form, Select, Input, Button, message, Radio } from 'antd';

import { ImageTools, randomString, getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import Captcha from '../common/captcha';
import styles from './guestForm.less';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      random: Date.parse(new Date()),
      loading: false,
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
  }


  componentWillReceiveProps(nextProps) {


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
        _this.setState({ loading: true });

        if (values.type === 1) {
          getJSON({
            url: `${requestList.CouponCheck}?couponCode=${values.couponCode}&couponPwd=${values.couponPwd}&captcha=${values.captcha}`,
          }).then((res) => {
            _this.setState({ loading: false });
            _this.props.onSaveForm(res, values);
          }).catch((err) => {
            _this.setState({
              random: Date.parse(new Date()),
              loading: false,
            });
          });
        } else if (values.type === 2) {
          getJSON({
            url: `${requestList.CouponTrack}?couponCode=${values.couponCode}&couponPwd=${values.couponPwd}&captcha=${values.captcha}`,
          }).then((res) => {
            _this.setState({ loading: false });
            console.log(res);
          }).catch((err) => {
            _this.setState({
              random: Date.parse(new Date()),
              loading: false,
            });
          });
        }
      } 
    });
  }

  render() {
    // this.initCaptcha();

    const { typeSelect, groupId, step, random, loading, } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.fnBody}>
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...this.formItemLayout}
            label="劵号"
          >
            {getFieldDecorator('couponCode', {
              rules: [{ required: true, message: '请填写券号' }],
            })(
              <Input placeholder="请输入劵号" />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="密码"
          >
            {getFieldDecorator('couponPwd', {
              rules: [{ required: true, message: '请填写券密码' }],

            })(
              <Input type="password" placeholder="请输入密码" />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="操作类型"
          >
            {getFieldDecorator('type', {
              initialValue: 1,
            })(
              <RadioGroup>
                <Radio value={1}>提货操作</Radio>
                <Radio value={2}>快递查询</Radio>
              </RadioGroup>
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="验证码"
          >
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请填写当前验证码' }],

            })(
              <Input type="captcha" placeholder="请输入验证码" className={styles.captchaInput} />
              )}
            <Captcha />

          </FormItem>
          <FormItem className={styles.btnContent}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
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
