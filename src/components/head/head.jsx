// 首页头
import React from 'react'; 
import { Row, Col } from 'antd';   
import MenuList from '../../components/menu/headMenu'; 
import styles from './head.less'; 
import comstyles from '../../common/less/common.less';
import PackageInfo from '../../../package.json';

// import CountDown from '../../components/date/countdown';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    // this.childMenu = this.childMenu.bind(this);
  } 
  render() {
    return (
      <Row type="flex" align="middle">
        <Col span={12}>
        <div className={styles.logo}>
          <img src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2118713449,2884619798&fm=200&gp=0.jpg' /> 
          <span className={styles.logoTitle}>
            <span className={styles.mainTitle}>Coupons</span> 
            <span className={styles.subTitle}> - 反正就是xxx的管理后台 {PackageInfo.version}</span>
             
          </span>
        </div> 
       
        </Col>
        <Col span={12}  className={styles.operation}>
          
          <MenuList  />
        </Col>
        
      </Row>
    );
  }
}
export default App;