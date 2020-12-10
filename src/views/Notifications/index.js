import React, {Component} from 'react'
import {
  Card,
  Button,
  List,
  Avatar,
  Badge,
  Spin
} from 'antd'
import {connect} from 'react-redux'

import {markNotifiactionAsReadById, markAllNotificationRead} from "../../actions/notifications"
//获取  reducers里边的  notifications 里边的数据
const mapState = state => {
  const {
    list,
    isLoading
  } = state.notifications

  return {
    list,
    isLoading
  }
}

@connect(mapState, {markNotifiactionAsReadById, markAllNotificationRead})
class Notifications extends Component {
  render() {
    console.log(this.props)
    return (
      <Spin spinning={this.props.isLoading}>
        <Card
          title="通知中心."
          bordered={false}
          extra={<Button
            //disabled ：当全部  读完之后 不能点这个Button
            disabled={this.props.list.every(item => item.hasRead === true)}
            onClick={this.props.markAllNotificationRead}
          >全部已读</Button>}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.props.list} // 留消息的名字
            renderItem={item => (
              <List.Item
                extra={
                  item.hasRead
                    ?
                    null
                    :
                    <Button
                      onClick={this.props.markNotifiactionAsReadById.bind(this, item.id)
                      }
                    >
                      已读
                    </Button>}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.desc} //消息信息
                />
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    )
  }
}

export default Notifications
