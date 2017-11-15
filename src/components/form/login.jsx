import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox, Cascader } from 'antd';

import { ImageTools, randomString, getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
// import styles from './login.less';

import city from '../../common/city';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    // const _this = this;
    const json = city;
    console.log(json);
    // this.props.form.validateFields((err, values) => {
    //   getJSON(requestList.login).then((res) => {
    //     console.log(res);
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // });
  }
  onChange(value) {
    console.log(value);
  }
  render() {

    const { typeSelect, groupId, step } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
          </FormItem>
          <FormItem>
            {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )} */}

            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>

          </FormItem>
        </Form>
        <Cascader options={city} onChange={this.onChange} placeholder="Please select" />
      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
