import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox, DatePicker } from 'antd';

import { ImageTools, randomString, getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
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
  render() {

    const { typeSelect, groupId, step } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.fnBody}>
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...this.formItemLayout}
            label="劵号"
          >
            {getFieldDecorator('code', {

            })(
              <Input placeholder="请输入劵号" />
              )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="密码"
          >
            {getFieldDecorator('password', {

            })(
              <Input type="password" placeholder="请输入密码" />
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
