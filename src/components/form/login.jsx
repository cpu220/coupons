import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox } from 'antd';

import { ImageTools, randomString, getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import styles from './login.less';
import xlsx from 'node-xlsx';
import FileSaver from 'file-saver';
import ExcellentExport from 'ExcellentExport';


const FormItem = Form.Item;
// const Option = Select.Option;
// const Search = Input.Search;
// const ButtonGroup = Button.Group;

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

    this.test = this.test.bind(this);
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
    this.props.form.validateFields((err, values) => {
      postJSON({
        url: requestList.login,
        data: {
          username: values.username,
          password: values.password,
        },
      }).then((res) => {
        location.href = `http://pick.mawc.top/#/admin`;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  test() {
    // const data = [[1, 2, 3]];
    // // var buffer = xlsx.build([{name: "mySheetName", data: data}]);
    // let blob = new Blob([JSON.stringify([{ "a": "1" }, { "a": "2" }])]);

    // FileSaver.saveAs(blob, 'test.xlsx');
    // return ExcellentExport.convert({ anchor: this, filename: 'data_123.array', format: 'xlsx'},[{name: 'Sheet Name Here 1', from: {table: 'datatable'}}]);

  }
  render() {

    const { typeSelect, groupId, step } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
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
        <div>
          <Button onClick={this.test}>  test </Button>
        </div>
      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
