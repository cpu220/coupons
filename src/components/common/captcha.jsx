import React from 'react';
import { Form } from 'antd';

// import { ImageTools, randomString, getJSON, postJSON, GetQueryString } from '../../common/ApiUtil';
// import { getJSON, postJSON } from '../../common/request';
import { requestList } from '../../common/requestList';
import shallowCompare from 'react-addons-shallow-compare';
import styles from './captcha.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { random } = this.props;
    this.state = {
      random,
    };


    this.change = this.change.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    const { random } = nextProps;
    this.state = {
      random,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  change() {
    this.setState({
      random: Date.parse(new Date()),
    });
  }

  render() {
    const { random } = this.state;

    return (
      <img className={styles.captcha} src={`/captcha?t=${random}`} onClick={this.change} title="点击更换验证码" />
    );
  }
}

const reactApp = Form.create()(App);
export default reactApp;
