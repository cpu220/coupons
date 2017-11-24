// 全局布局layout
import React from 'react';

import { Layout } from 'antd';

import HeaderContent from '../../components/head/head';
import FootIndex from '../../components/foot/foot';

import styles from './MainLayout.less';
import comStyles from '../../common/less/common.less';

const { Header, Footer, Sider, Content } = Layout;

function MainLayout({ children }) {
  return (
    <div className={styles.site}>
      <Layout className={`${comStyles.fnHeight100}`}>
        <Header className={styles.header}>
          <HeaderContent />
        </Header>
        <Content className={`${comStyles.fnHeight100}`}>
          {children}
        </Content>
      </Layout>


    </div>
  );
}

export default MainLayout;

