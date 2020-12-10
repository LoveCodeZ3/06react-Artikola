import React from 'react'
import {render} from 'react-dom'
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd';
import App from './App'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import "./index.less"
import {mainRoutes} from './routes'

import store from "./store"
import {Provider} from "react-redux"

render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path='/admin' render={(routerProps) => {
            //TODO:权限 ，需要登录餐能访问 这里还没有写
            return <App {...routerProps}/>

          }}/>
          {
            mainRoutes.map(route => {
              return <Route key={route.pathname} path={route.pathname} component={route.component}/>
            })
          }
          <Redirect to="/admin" from="/"/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>
  ,
  document.querySelector('#root')
)