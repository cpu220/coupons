import React from 'react';
import { connect } from 'dva';
import styles from './admin.less';

function IndexPage() {
  return (
    <div>
      管理界面
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
