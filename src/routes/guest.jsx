import React from 'react';
import { connect } from 'dva';
import { Steps, Alert } from 'antd';
import GuestForm from '../components/form/guestForm';
import EditGuessInfo from '../components/form/editGuessInfo';
import { getJSON } from '../common/ApiUtil';
import { requestList } from '../common/requestList';

import styles from './guest.less';
import comstyles from '../common/less/common.less';
const Step = Steps.Step;

const App = ({ dispatch, GUEST }) => {



  const saveForm1 = (e, val) => { 
    // 根据返回结构来判断跳转2 还是 3
    dispatch({
      type: 'GUEST/update',
      payload: {
        step: 2,
        goodsName: e.data.goodsName,
        goodsID: val.couponCode,
        goodsPwd: val.couponPwd,
      },
    });
  }

  const saveForm2 = (v) => {
   
    dispatch({
      type: 'GUEST/update',
      payload: { 
        step: 3,
      },
    });
  } 
  return (
    <div className={styles.fnBody}>
      客户界面
       <div className={styles.step}>
        <Steps current={GUEST.step}>
          <Step title="第一步" description="输入卡券信息" />
          <Step title="第二步" description="编辑信息" />
          <Step title="第三步" description="结束" />
        </Steps>
      </div>
      {/* <div className={styles.alertContent}>
        <Alert
          message="重要提示"
          description="因xxxx的原因，我就是不想发货"
          type="error"
        />
      </div> */}
      <div className={`${GUEST.step === 1 ? '' : comstyles.fnHide}`}>
        <GuestForm
          GUEST={GUEST}
          onSaveForm={saveForm1}
        />
      </div>
      <div className={`${GUEST.step === 2 ? '' : comstyles.fnHide}`}>
        <EditGuessInfo
          GUEST={GUEST}
          onSaveForm={saveForm2}
        />
      </div>

      <div className={`${GUEST.step === 3 ? '' : comstyles.fnHide}`}>
        <div>
          <Alert
            message="这里是提示文案的标题"
            description="这里是提示文案"
            type="success"
            showIcon
          />
        </div>
      </div>
    </div>
  );
}
export default connect(({ GUEST }) => ({ GUEST }))(App);

