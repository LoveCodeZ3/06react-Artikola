import React, {Component} from 'react';
import {Layout, Menu, Dropdown, Avatar, Badge} from 'antd';
import logo from './logo.png';
import {withRouter} from 'react-router-dom';
import {DashboardFilled, UnorderedListOutlined, SettingFilled, DownOutlined} from '@ant-design/icons';
import "./frame.less"
import {connect} from "react-redux"
import {getNotificationList} from "../../actions/notifications"
import {logout} from "../../actions/user"

const {Header, Content, Sider} = Layout;
//withRouter
//把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
//执行this.props.history.push('/detail')

const mapState = state => {
  return {
    notificationsCounts: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}

@connect(mapState, {getNotificationList, logout})
@withRouter

class Frame extends Component {
  componentDidMount() {
    this.props.getNotificationList()
  }

  onMenuClick = ({item, key, keyPath, domEven}) => {
    //这里只调用key就行
    console.log({item, key, keyPath, domEven});
    console.log(this.props);
    this.props.history.push(key);
    //默认进入首页
  };

  onDropdowMenuClick = ({key}) => {
    //点击进入 什么页
    if (key === "/Loginout") {
      this.props.logout()
    } else {
      this.props.history.push(key);
    }
  }


  RundeDomp = () => (
    <Menu onClick={this.onDropdowMenuClick}>
      <Menu.Item
        key="/admin/notifications"
      >
        <Badge dot={this.props.notificationsCounts}>
          通知中心
        </Badge>

      </Menu.Item>
      <Menu.Item
        key="/admin/Profile"
      >

        个人设置

      </Menu.Item>
      <Menu.Item
        key="/admin/settings"
      >

        管理员设置

      </Menu.Item>

      <Menu.Item
        key="/Loginout"
      >
        退出登录
      </Menu.Item>
    </Menu>
  )

  render() {
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header qf-header">
          <div className="qf-logo">
            <img src={logo} alt='logo'/>
          </div>
          <div>
            <Dropdown overlay={this.RundeDomp()} trigger={['click']}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <Avatar src={this.props.avatar}/>
                <span>欢迎你! {this.props.displayName} </span>
                <Badge count={this.props.notificationsCounts} offset={[-5, -10]}>
                  <DownOutlined/>
                </Badge>

              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>

          <Sider width={200} className="site-layout-background">
            <Menu mode="inline"
              //selectedKeys  这里是  默认进入首页时  导航栏 选中第一个列表
                  selectedKeys={[selectedKeyArr.join('/')]}
                  onClick={this.onMenuClick}
                  style={{height: '100%', borderRight: 0}}>

              <Menu.Item key={this.props.menus[0].pathname}><DashboardFilled/>{this.props.menus[0].title} </Menu.Item>
              <Menu.Item key={this.props.menus[1].pathname}><UnorderedListOutlined/>{this.props.menus[1].title}
              </Menu.Item>
              <Menu.Item key={this.props.menus[2].pathname}><SettingFilled/>{this.props.menus[2].title} </Menu.Item>
            </Menu>
          </Sider>

          <Layout style={{padding: '16px 24px 24px'}}>

            <Content className="site-layout-background" style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff'
            }}>
              {this.props.children}
            </Content>

          </Layout>

        </Layout>
      </Layout>);
  }
}

export default Frame
