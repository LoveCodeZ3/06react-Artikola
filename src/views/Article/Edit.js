import React, {Component, createRef} from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Spin,
  message,
} from 'antd'
import E from 'wangeditor'
import {getArticleById, saveArticle} from "../../requsets"
import './edit.less'
import moment from 'moment'

class Edit extends Component {

  constructor() {
    super()
    this.editorRef = createRef()
    this.formRef = createRef() // 由于 Form.create方法已经被移除， 所以选择这种来实现， 需在Form组件中挂载 formRef
    this.state = {
      isLoading: false
    }
  }

  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      this.formRef.current.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }

  componentDidMount() {
    this.initEditor()
    console.log(this.props)
    this.setState({
      isLoading: true
    })
    getArticleById(this.props.match.params.id)
      .then(resp => {
        console.log(resp)
        const {id, ...data} = resp
        data.createAt = moment(data.createAt)
        this.formRef.current.setFieldsValue(data)
        this.editor.txt.html(data.content)
      })
    this.setState({
      isLoading: false
    })

  }

  render() {
    const layout = {
      labelCol: {span: 6},
      wrapperCol: {span: 12},
    };
    const tailLayout = {
      wrapperCol: {offset: 6},
    };
    const onFinish = values => {
      this.setState({
        isLoading: true
      })
      const data = Object.assign({}, values, {
        createAt: values.createAt.valueOf()
      })
      console.log(data)
      saveArticle(this.props.match.params.id, data)
        .then((res) => {
          message.success(res.msg)
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
          this.props.history.push('/admin/article')
        })
    };
    return (
      <div>
        <Card
          title="文章编辑"
          bordered={false}
          extra={
            <Button
              onClick={this.props.history.goBack}
            >返回
            </Button>}>
          <Spin spinning={this.state.isLoading}>
            <Form
              ref={this.formRef}
              {...layout}
              name="basic"
              initialValues={{remember: true}}
              onFinish={onFinish}
            >
              <Form.Item
                label="标题"
                name="title"
                rules={[{required: true, message: '请输入标题!'}]}
              >
                <Input placeholder='请输入标题'/>
              </Form.Item>
              <Form.Item
                label="作者"
                name="author"
                rules={[{required: true, message: '请输入作者名称!'}]}
              >
                <Input placeholder='作者'/>
              </Form.Item>
              <Form.Item
                label="阅读量"
                name="amount"
                rules={[{required: true, message: '请输入阅读量!'}]}
              >
                <Input placeholder='请输入阅读量'/>
              </Form.Item>
              <Form.Item
                label="发布时间"
                name="createAt"
                rules={[{required: true, message: '请选择时间!'}]}
              >
                <DatePicker showTime/>
              </Form.Item>
              <Form.Item
                label="内容"
                name='content'
                rules={[{required: true, message: '请输入内容!'}]}
              >
                {/* <Input placeholder='请输入阅读量' /> */}
                <div className='qf-editor' ref={this.editorRef}></div>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button size='large' type="primary" htmlType="Submit" onClick={this.onFinish}>
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>

      </div>
    )
  }
}

export default Edit


