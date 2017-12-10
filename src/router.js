import React from 'react';
import { Router, Route } from 'dva/router';
import list from './routes/list';
import login from './routes/login';
import editCoupon from './routes/editCoupon';
import guest from './routes/guest';
import createCoupon from './routes/createCoupon';


function RouterConfig({ history }) {
  const config = window.config;
  let adminRoute ='';
  if(!!config.admin && config.admin !== ''){ 
    adminRoute = (<Route path={`/${config.admin}`} component={list} />);
  }
  return (
    <Router history={history}>
      <div>
        <Route path="/login" component={login} />
        <Route path="/editCoupon" component={editCoupon} />
        <Route path="/guest" component={guest} />
        <Route path="/createCoupon" component={createCoupon} />
          {/* <Route path="/" component={IndexPage} /> */}
        {adminRoute}
      </div>
    </Router>
  );
}

export default RouterConfig;
