// 右上角的当前用户
import React from 'react';
// import ReactDOM from 'react-dom';
import { Menu, Dropdown, Icon, Avatar, Badge } from 'antd';
import { getJSON } from '../../common/ApiUtil';

import styles from './authors.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.childMenu = this.childMenu.bind(this);
    this.outLogin = this.outLogin.bind(this);
  }
  childMenu() {
    return (
      <Menu selectable={false}>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.outLogin} href="">退出登录</a>
        </Menu.Item>
      </Menu>
    );
  }
  // 退出登录
  outLogin() {
    getJSON('/logout').then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    // const { editPageForm } = this.props;
    return (
      <div>
        <Dropdown overlay={this.childMenu()}>
          <a className="ant-dropdown-link" href="javascript:void(0);">
            <Badge count={0}>
              <Avatar
                className={styles.authorPhoto}
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2118713449,2884619798&fm=200&gp=0.jpg"
              />
            </Badge>

            测试用户 <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    );
  }
}
export default App;
