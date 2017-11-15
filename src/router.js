import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import admin from './routes/admin';
import login from './routes/login';


function RouterConfig({ history }) {
  const config = window.config;
  let adminRoute ='';
  if(!!config.admin && config.admin !== ''){ 
    adminRoute = ( <Route path={`/${config.admin}`} component={admin} />);
  }
  return (
    <Router history={history}>
      <Route path="/index" component={IndexPage} />
      <Route path="/login" component={login} />
      <Route path="/" component={IndexPage} />
      {adminRoute}
    </Router>
  );
}

export default RouterConfig;
