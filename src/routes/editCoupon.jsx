/**
 * 编辑页面
 */
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/layout/MainLayout';
import { requestList, downloadList } from '../common/requestList';
import { Form, Row, Col } from 'antd';
import { log, randomString, GetQueryString, getJSON, postJSON } from '../common/ApiUtil';
import EditForm from '../components/form/editForm';


import styles from './list.less';
import comstyles from '../common/less/common.less';
// import FileSaver from 'file-saver';


const App = ({ dispatch, COUPONITEM }) => {
  return (
    <MainLayout >
      <div className={`${comstyles.fnHeight100} ${styles.fnBody}`}>
        <EditForm
          dispatch={dispatch}
          COUPONITEM={COUPONITEM}
        />
      </div>
    </MainLayout>

  );
};

// export default Products;
export default connect(({ COUPONITEM }) => ({
  COUPONITEM,
}))(App);
