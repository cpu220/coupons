import React from 'react';
import { Form, Table, Modal, Button } from 'antd';
import { getJSON, postJSON } from '../../common/ApiUtil';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import styles from './couponList.less';
import comstyles from '../../common/less/common.less';


const FormItem = Form.Item;
class App extends React.Component {
  constructor(props) {
    super(props);
    const { couponList, total, pageSize } = this.props.LIST;
    const _this = this;


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
    this.createTable = this.createTable.bind(this);
    this.createStatus = this.createStatus.bind(this);
    this.createCouponStatus = this.createCouponStatus.bind(this);
    this.modalOK = this.modalOK.bind(this);
    this.modalCancel = this.modalCancel.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      couponList: couponList,
      modalVisible: false,
      item: {},

      pagination: {
        total: total,
        pageSize: pageSize,
        onChange: _this.onChangePage,
      },
    };
  }


  componentWillReceiveProps(nextProps) {
    const { couponList, total, pageSize } = nextProps.LIST;
    const { pagination } = this.state;

    this.setState({
      couponList: couponList,
      pagination: Object.assign({}, pagination, { total: total }),

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

    });
  }
  createTable() {
    const _this = this;
    // getJSON({
    //   url: '/couponList',
    // }).then((res) => {
    //   _this.setState({
    //     data: res.data.couponList,
    //   }); 
    // }).catch((err) => {
    //   console.log(err);
    // })

  };
  // 创建状态
  createStatus(status) {
    let DOM;
    switch (status) {
      case 'unUse':
        DOM = (<span className={`${comstyles.ftError}`}>未激活</span>);
        break;
      case 'readyUse':
        DOM = (<span className={`${comstyles.ftSuccess}`}>已售卖</span>);
        break;
      case 'orderPick':
        DOM = (<span className={`${comstyles.ftInfo}`}>已预约</span>);
        break;
      case 'tracked':
        DOM = (<span className={`${comstyles.ftWarn}`}>已发货</span>);
        break;
      case 'unabled':
        DOM = (<strike className={`${comstyles.ftError}`}>已停用</strike>);
        break;
      default:
        DOM = (<span>-未知-</span>);
        break;
    }
    return DOM;
  };
  createCouponStatus(status) {
    let DOM;
    switch (status) {
      case '0':
        DOM = (<span className={`${comstyles.ftError}`}>未激活</span>);
        break;
      case '1':
        DOM = (<span className={`${comstyles.ftSuccess}`}>已售卖</span>);
        break;
      case '4':
        DOM = (<span className={`${comstyles.ftInfo}`}>停用</span>);
        break;
      default:
        DOM = (<span>-未知-</span>);
        break;
    }
    return DOM;
  };
  showCouponDetail(json) {
    this.setState({
      modalVisible: true,
      item: json,
    })
  }
  modalOK() {
    this.setState({
      modalVisible: false,
    })
  }
  modalCancel() {
    this.setState({
      modalVisible: false,
    })
  }
  /**
   * 分页切换
   * 
   * @param {any} e 
   * @memberof App
   */
  onChangePage(current) {
    const { pagination } = this.state;
    const { dispatch } = this.props;

    getJSON({
      url: `${requestList.couponList}?pageSize=${pagination.pageSize}&current=${current - 1}`,
    }).then((res) => {
      dispatch({
        type: 'LIST/save',
        payload: {
          couponList: res.data.couponList,
          total: res.data.total,
        },
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const _this = this;
    const { couponList, modalVisible, pagination,item } = this.state;
    const { getFieldDecorator } = this.props.form;
    // this.createTable();
    const columns = [{
      title: '劵号',
      dataIndex: 'code',
      key: 'code',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '商品名',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '收件人',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        // const DOM = createStatus(record.status);
        const DOM = _this.createCouponStatus(record.status);
        return DOM;
      },
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={this.showCouponDetail.bind(this, record)} >查看详情</a>
          <span className="ant-divider" />
          <a href={`#/editCoupon?id=${record.id}`}>编辑</a>
          {/* <span className="ant-divider" /> */}
          {/* <a href="#">删除</a> */}
        </span>
      ),
    }];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={couponList}
          rowKey={'code'}
          total={500}
          pagination={pagination}
        />
        <Modal
          visible={modalVisible}
          title="详情"
          onCancel={this.modalCancel}
          footer={[
            <Button key="back" size="large" onClick={this.modalCancel}>取消</Button>,
          ]}
        >
          <table>
            <tbody>
              <tr><td className={styles.title}>ID</td><td>{item.id}</td></tr>
              <tr><td className={styles.title}>券号</td><td>{item.code}</td></tr>
              <tr><td className={styles.title}>密码</td><td>{item.codePwd}</td></tr>
              <tr><td className={styles.title}>商品名称</td><td>{item.goodsName}</td></tr>
              <tr><td className={styles.title}>状态</td><td>{_this.createCouponStatus(item.status)}</td></tr>
              <tr><td className={styles.title}>收件人</td><td>{item.name}</td></tr>
              <tr><td className={styles.title}>收件地址</td><td>{item.address}</td></tr>
              
              <tr><td className={styles.title}>卡券创建时间</td><td>{item.dt_add}</td></tr>
              <tr><td className={styles.title}>提货申请时间</td><td>{item.dt_pick}</td></tr>
              <tr><td className={styles.title}>提货预约时间</td><td>{item.dt_pick_order}</td></tr>
              <tr><td className={styles.title}>发货时间</td><td>{item.dt_track}</td></tr>
            </tbody>
          </table>
        </Modal>
      </div>
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
