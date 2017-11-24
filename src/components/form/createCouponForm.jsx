import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox, DatePicker } from 'antd';

import { getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList, online } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
// import styles from './login.less';


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
      _this.setState({
        loading: true,
      });
      postJSON({
        url: requestList.couponCreate,
        data: values,
      }).then((res) => {
        message.success('创建成功');
        _this.setState({
          loading: false,
        });
      }).catch((err) => {
        console.log(err);
        _this.setState({
          loading: false,
        });
      });
    });
  }
  render() {
    const { typeSelect, groupId, step, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...this.formItemLayout}
            label="商品名称"
          >
            {getFieldDecorator('goodsName', {

            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="卡券数量"
          >
            {getFieldDecorator('num', {

            })(
              <Input />,
            )}
          </FormItem>


          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              创建
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
