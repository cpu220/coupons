import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox, DatePicker } from 'antd';

import { ImageTools, randomString, getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import Captcha from '../common/captcha';
import styles from './guestForm.less';


const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;

const { TextArea } = Input;

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
    this.onChange = this.onChange.bind(this);
    // this.initCaptcha= this.initCaptcha.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   typeSelect: nextProps.pageConfig.listConfig.typeSelect,
    // });

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
      _this.setState({ loading: true });

      getJSON({
        url: `${requestList.CouponCheck}?couponCode=${values.couponCode}&couponPwd=${values.couponPwd}&captcha=${values.captcha}`,
      }).then((res) => {
        _this.setState({ loading: false }); 
        _this.props.onSaveForm(res);
      }).catch((err) => {
        _this.setState({
          random: Date.parse(new Date()),
          loading: false,
        });
      });
    });
  }
  onChange(value) {
    console.log(value);
  }
  onDatePickerChange(e) {
    console.log(e);
  }
  // 初始化验证码
  // initCaptcha() {
  //   getJSON({
  //     url: '/captcha',
  //   }).then((res) => {
  //     console.log(res);
  //   }).catch(err => console.log(err));
  // }
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

            })(
              <Input placeholder="请输入劵号" />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="密码"
          >
            {getFieldDecorator('couponPwd', {

            })(
              <Input type="password" placeholder="请输入密码" />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="验证码"
          >
            {getFieldDecorator('captcha', {

            })(
              <Input type="captcha" placeholder="请输入验证码" className={styles.captchaInput} />
              )}
            <Captcha
              random={random}
            />

          </FormItem>

          <FormItem>
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
