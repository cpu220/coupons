/**
 * 编辑页面
 */
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
import CouponList from '../components/list/couponList';

import { requestList, downloadList } from '../common/requestList';
import { Form, Row, Col, Table, Icon } from 'antd';
import { log, randomString, GetQueryString, getJSON, postJSON } from '../common/ApiUtil';



import styles from './list.less';
import comstyles from '../common/less/common.less';
// import FileSaver from 'file-saver';


const App = ({ dispatch, LIST }) => {

  return (
    <MainLayout >
      <div className={`${comstyles.fnHeight100} ${styles.fnBody}`}>
        <CouponList
          LIST={LIST}
          dispatch={dispatch}
        />
      </div>
    </MainLayout>

  );
};

// export default Products;
export default connect(({ LIST }) => ({
  LIST,
}))(App);
