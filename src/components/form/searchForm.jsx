import React from 'react';
import { Form, Select, Input, Button, Icon, message, Checkbox } from 'antd';

import { ImageTools, randomString, getJSON, postJSON } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import styles from './searchForm.less';

const FormItem = Form.Item;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
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

    });
  }
  onChange(value) {
    console.log(value);
  }
  render() {
    // const { typeSelect, groupId, step } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col span={8}>
            <FormItem {...this.formItemLayout} label={'名称'}>
              {getFieldDecorator('a')(
                <Input placeholder="placeholder" />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...this.formItemLayout} label={'名称1'}>
              {getFieldDecorator('a1')(
                <Input placeholder="placeholder" />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...this.formItemLayout} label={'名称2'}>
              {getFieldDecorator('a2')(
                <Input placeholder="placeholder" />,
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
