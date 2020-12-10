import React, {Component} from 'react'
import {adminRoutes} from './routes'
import {Switch, Route, Redirect} from 'react-router'
import {Frame} from './components'
import {connect} from "react-redux"

const menus = adminRoutes.filter(route => route.isNAv === true)

//filter  过滤器  相当于map  但是  必须有一个  键值对  a:true    才能返回这个值
console.log(menus)

const mapState = state => ({

  isLogin: state.user.isLogin,
  role: state.user.role

})

@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin
        ?
        <Frame menus={menus}>
          <Switch>
            {
              adminRoutes.map(route => {
                return (
                  <Route
                    key={route.pathname}
                    path={route.pathname}
                    exact={route.exact}
                    render={
                      (routeProps) => {
                        //console.log(route.roles.includes(this.props.role))

                        return (
                          //includes   roles  里边包括的权限值  是否在this.props.role里边
                          route.roles.includes(this.props.role)
                            ?
                            <route.component {...routeProps}/>
                            :
                            <Redirect to="/admin/NoAuth"/>
                        )
                      }
                    }/>
                )
              })
            }
            {/* 设置用户首页 */}
            <Redirect to={adminRoutes[0].pathname} from='/admin' exact/>
            {/* 任何没有配置的路由都是404 */}
            <Redirect to='/404' exact/>


          </Switch>
        </Frame>
        :
        <Redirect to="/Login"/>
    )

  }
}

export default App
