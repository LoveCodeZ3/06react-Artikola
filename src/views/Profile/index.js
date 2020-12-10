import React, {Component} from 'react'
import {Card, Upload, Spin,} from 'antd'
import Axios from 'axios'
import {connect} from "react-redux"
import {changeAvatar} from '../../actions/user'

const mapState = state => ({


  avatarUrl: state.user.avatar

})

@connect(mapState, {changeAvatar})
class Profile extends Component {
  state = {
    isUploading: false,
  }
  handleUploadAvatar = ({file}) => { //file 是 antd 自带的
    console.log(file)
    console.log(this.props.avatarUrl)
    const data = new FormData()  //
    data.append("Token",
      'f352d243c1ff585fd0bedc56023e2f3cf88a4b1e:5ptq90Si2dWqmkNkwcDfcq4GfGc=:eyJkZWFkbGluZSI6MTU4OTE2MzcxMCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzE4NjY3IiwiYWlkIjoiMTY4NzczOCIsImZyb20iOiJmaWxlIn0='
    )
    data.append('file', file)
    this.setState({
      isUploading: true
    })
    Axios.post("http://up.imgapi.com/", data)
      .then((resp) => {
        console.log(resp)
        if (resp.status === 200) {
          this.setState({
            isUploading: false
          })
          this.props.changeAvatar(resp.data.linkurl)
        } else {
          // 自行处理错误
        }

      })
      .catch(error => {
        // 自行处理错误
      })
  }


  render() {

    return (
      <Card
        title="个人设置"
        bordered={false}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={this.handleUploadAvatar} //等待过程


        >
          <Spin
            spinning={this.state.isUploading}
          >
            {
              this.props.avatarUrl ? <img style={{width: 80, height: 80}} src={this.props.avatarUrl} alt="头像"/> :
                <span>点击上传</span>
            }
          </Spin>
        </Upload>
      </Card>
    )
  }
}

export default Profile
