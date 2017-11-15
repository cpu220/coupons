import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';

function IndexPage() {
  return (
    <div>
      展示界面
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
