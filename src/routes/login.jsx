import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import LoginForm from '../components/form/login';
import styles from './login.less';

const FormItem = Form.Item;

const App = ({ dispatch }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const _this = this;
    this.props.form.validateFields((err, values) => {
      console.log(values);
    });
  }
  return (
    <div>
      <div className={styles.loginContent}>
        <div className={styles.title}>后台管理</div>
        <div className={styles.LoginForm} >
          <LoginForm />
        </div> 
      </div>
    </div>
  );
}
export default connect(({ }) => ({}))(App);

