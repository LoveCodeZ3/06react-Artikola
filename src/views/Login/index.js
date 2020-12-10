import React, {Component} from 'react'
import {Form, Input, Button, Checkbox, Card,} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Redirect} from "react-router-dom"
import "./login.less"
import {connect} from "react-redux"
import {login} from "../../actions/user"

const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

@connect(mapState, {login})
class Login extends Component {
  render() {


    const onFinish = values => {
      //onsole.log('Received values of form: ', values);
      this.props.login(values)
    };
    return (
      this.props.isLogin
        ?
        <Redirect to="/admin"/>
        :
        <Card
          title="QF admin 用户登录"
          className="qf-login-wrapper"
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{required: true, message: '必须有用户名'}]}
            >
              <Input
                disabled={this.props.isLoading}
                prefix={
                  <UserOutlined className="site-form-item-icon"/>
                } placeholder="用户名"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: '必须有密码'}]}
            >
              <Input
                disabled={this.props.isLoading}
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox disabled={this.props.isLoading}>记住登录</Checkbox>
              </Form.Item>


            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.props.isLoading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
    )

  }
}

export default Login
