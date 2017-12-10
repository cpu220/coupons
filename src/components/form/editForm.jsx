import React from 'react';
import { Form, Select, Input, Button, Icon, message, DatePicker } from 'antd';

import { postJSON, GetQueryString, copy } from '../../common/ApiUtil';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import styles from './editForm.less';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const { TextArea } = Input;

class App extends React.Component {
  constructor(props) {
    super(props);
    const { coupon } = this.props.COUPONITEM;
    this.state = {
      coupon,
      saveLoading: false,
      activateLoading: false,
      stopLoading: false,
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
    this.formatDate = this.formatDate.bind(this);
    this.copy = this.copy.bind(this);
    this.activate = this.activate.bind(this);
    this.stop = this.stop.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    const { coupon } = nextProps.COUPONITEM;
    this.state = {
      coupon,
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
    const _this = this;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const id = GetQueryString('id');
        _this.setState({
          saveLoading: true,
        })
        let dataJSON = {
          status: values.status,
          goodsName: values.goodsName,
          address: values.address,
          // dt_add: values.dt_add,
          // dt_pick: values.dt_pick,
          // dt_pick_order: values.dt_pick_order,
          dt_track: values['dt_track'].format('YYYY-MM-DD h:mm:ss'),
          remark: values.remark,
          memo: values.memo,
        };
        if (values.status !== '2') {
          // 这里不用做什么
        } else {
          dataJSON = Object.assign({}, dataJSON, {
            trackName: values.trackName,
            trackCode: values.trackCode,
            goodsName: values.goodsName,
          });
        }
        postJSON({
          url: `${requestList.couponEdit}/${id}`,
          data: dataJSON,
        }).then((res) => {
          console.log(res);
          _this.setState({
            saveLoading: false,
          });
          location.href = 'http://pick.mawc.top/#/admin';
        }).catch((err) => {
          message.error(err.errorMsg || '系统错误');
          _this.setState({
            saveLoading: false,
          })
        });
      }

    });
  }
  onChange(value) {
    console.log(value);
  }
  onDatePickerChange(e) {
    console.log(e);
  }
  formatDate(v) {

    if (!!v) {
      return moment(v);
    } else {
      return null;
    }
  }
  copy(e) {
    copy(e.target.value).then((res) => {
      message.success('复制成功');
    }).catch(err => message.error('复制失败'));
  }
  activate() {
    const _this = this;
    const id = GetQueryString('id');
    this.setState({
      activateLoading: true,
    })
    postJSON({
      url: requestList.changeStatus,
      data: {
        couponId: id,
        status: 1,
      }
    }).then((res) => {
      console.log(res);
      message.info('激活成功');
      _this.setState({
        activateLoading: false,
      })
    }).catch((err) => {
      console.log(err);
      _this.setState({
        activateLoading: false,
      })
    })
  }
  stop() {
    const _this = this;
    const id = GetQueryString('id');
    this.setState({
      stopLoading: true,
    })
    postJSON({
      url: requestList.changeStatus,
      data: {
        couponId: id,
        status: 4,
      }
    }).then((res) => {
      console.log(res);
      message.info('已成功停用');
      _this.setState({
        stopLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      _this.setState({
        stopLoading: false,
      })
    })
  }

  render() {
    const _this = this;
    const { coupon, saveLoading, activateLoading, stopLoading } = this.state;
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
              <Input readOnly={true} onClick={this.copy} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="密码"
          >
            {getFieldDecorator('codePwd', {
              initialValue: coupon.codePwd,
            })(
              <Input readOnly={true} onClick={this.copy} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="地址"
          >
            {getFieldDecorator('address', {
              initialValue: coupon.address,
            })(
              <Input readOnly={true} onClick={this.copy} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="商品名称"
          >
            {getFieldDecorator('goodsName', {
              initialValue: coupon.goodsName,
            })(
              <Input placeholder="商品名称" />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="快递公司"
          >
            {getFieldDecorator('trackName', {
              initialValue: coupon.trackName,
              rules: [{
                required: true,
                message: '请填写快递公司',
              }],
            })(
              <Input placeholder="请输入快递公司" />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="快递单号"
          >
            {getFieldDecorator('trackCode', {
              initialValue: coupon.trackCode,
              rules: [{
                required: true,
                message: '请填写快递单号',
              }],
            })(
              <Input placeholder="请输入快递单号" />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="卡卷创建时间"
          >
            {getFieldDecorator('dt_add', {
              initialValue: _this.formatDate(coupon.dt_add),
            })(
              <DatePicker
                disabled={true}
                onChange={this.onDatePickerChange} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="提货申请时间"
          >
            {getFieldDecorator('dt_pick', {
              initialValue: _this.formatDate(coupon.dt_pick),
            })(

              <DatePicker
                disabled={true}
                onChange={this.onDatePickerChange} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="提货预约时间"
          >
            {getFieldDecorator('dt_pick_order', {
              initialValue: _this.formatDate(coupon.dt_pick_order),
            })(
              <DatePicker
                disabled={true}
                onChange={this.onDatePickerChange} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="发货时间"
          >
            {getFieldDecorator('dt_track', {
              rules: [{
                required: true,
                message: '请填写发货时间',
              }],
              initialValue: _this.formatDate(coupon.dt_track),
            })(
              <DatePicker
                onChange={this.onDatePickerChange}
              />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="备注"
          >
            {getFieldDecorator('remark', {
              initialValue: coupon.remark,
            })(
              <TextArea rows={3} />,
            )}
          </FormItem>
          <FormItem
            {...this.formItemLayout}
            label="客户备注"
          >
            {getFieldDecorator('memo', {
              initialValue: coupon.memo,
            })(
              <TextArea rows={3} readOnly={true} disabled={true} />,
            )}
          </FormItem>
          {/* <FormItem
            {...this.formItemLayout}
            label="卡状态"
          >
            {getFieldDecorator('status', {
              initialValue: coupon.status,
            })(
              <Select >
                <Option value="0" >未激活</Option>
                <Option value="1" >已售卖</Option>
                <Option value="2" >已预约</Option>
                <Option value="3" >已发货</Option>
                <Option value="4" >停用</Option>
              </Select>,
            )}
          </FormItem> */}

          <FormItem className={styles.btnContent}>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={saveLoading}>
              保存
            </Button>
            <Button type="primary" className={` ${styles.ml15}`} onClick={this.activate} loading={activateLoading}>
              激活
            </Button>
            <Button type="error" className={`${styles.ml15}`} onClick={this.stop} loading={stopLoading}>
              停用
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
