// 首页头部菜单状态栏
import React from 'react';
import { Menu, Dropdown, Icon, Modal, Button } from 'antd';
import Author from '../../components/author/authors';
import styles from './headMenu.less';
import comstyle from '../../common/less/common.less';
import PackageInfo from '../../../package.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.childMenu = this.childMenu.bind(this);
    this.about = this.about.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  childMenu() {
    return (
      <Menu selectable={false}>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#/createCoupon">信息录入</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href={`#/${window.config.admin}`}>列表总览</a>
        </Menu.Item>
         
        <Menu.Item>
          <div className={comstyle.ftCursor} onClick={this.about}>关于</div>
        </Menu.Item>
      </Menu>
    );
  }
  about() {
    this.setState({
      visible: true,
    });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  render() {
    
    return (
      <div className={`${styles.menu} ${comstyle.fnClear}`}>
        <ul className={`${comstyle.fnClear}`}>
          <li>
            <Dropdown overlay={this.childMenu()}>
              <a className="ant-dropdown-link">
                帮助 <Icon type="down" />
              </a>
            </Dropdown>
          </li>
          <li><Author/></li>
        </ul>
        <Modal
          title={`关于 本平台 ${PackageInfo.version}`}
          visible={this.state.visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          maskClosable
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>知道了</Button>,
          ]}
        >
          <p className={styles.menuDesc}>没什么想说的</p>

        </Modal>
      </div>
    );
  }
}
export default App;