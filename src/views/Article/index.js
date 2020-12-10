import React, {Component} from 'react'
import
{
  Card,
  Button
  , Table
  , Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd'
import {getArticles, deleteArticle} from '../../requsets'

import moment from 'moment'  //显示时间用的

import XLSX from 'xlsx'

const ButtonGroup = Button.Group
const titleDisplayMap = {
  id: '编号',
  title: '标题',
  author: '作者',
  createAt: '创作时间',
  amount: '阅读量'
}

export default class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      //这里 都是 antd 的 默认配置  名字不能换
      //这里是页面显示的dataIndex
      columns: [],//标题栏
      dataSource: [],//数据
      total: 0,//几页
      isLoading: false, //等待
      offset: 0,
      limited: 10,
      //删除用的
      deleteArticletitle: null,
      isShowArticleModal: false,
      deleteArticleID: null,
      deleteArticleConfirmLoading: false,

    }
  }
  //标题的 渲染
  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const {amount} = record
            return (
              <Tooltip title={amount > 250 ? '超过250' : '没有超过250'}>
                <Tag color={amount > 250 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
            )
          }
        }
      }
      if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const {createAt} = record
            return moment(createAt).format('YYYY年MM月DD日 hh时mm分ss秒')
          }
        }
      }
      return {
        //这里 要参考  columns   的格式
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      }
    })
    columns.push({
      title: "操作",
      key: 'action',
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.toEdit.bind(this, record)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.showDeleteArticleModal.bind(this, record)}>删除</Button>
          </ButtonGroup>
        )
      }

    })
    return columns
  }
  //编辑       *****
  toEdit = (record) => {
    //第一种   带着  标题为 id
    //  this.props.history.push(`/admin/article/edit/${record.title}`)
    //第二种
    this.props.history.push({
      //因为 设计到光标的停留问题   这里的  title  被删除了  获取不到
      pathname: `/admin/article/edit/${record.id}`,
      state: {
        title: record.title
      }
    })
  }
  //删除 文章
  showDeleteArticleModal = (record) => {
    this.setState({
      isShowArticleModal: true,
      deleteArticletitle: record.title,
      deleteArticleID: record.id
    })
  }
  //确定删除
  deleteArticletitle = () => {
    console.log(this.state.deleteArticleID)
    this.setState({
      deleteArticleConfirmLoading: true
    })
    deleteArticle(this.state.deleteArticleID)
      .then(resp => {
        message.success(resp.msg)
        //这里     是删除 后  是留来当前页  还是返回首页
        this.setState({
          offset: 0
        }, () => {
          this.getData()
        })
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowArticleModal: false
        })
      })
  }
  //取消删除
  quxiaoDELETE = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticletitle: '',
      deleteArticleConfirmLoading: false
    })
  }
  //得到数据 跟数据跟随
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        console.log(resp)
        const columnKeys = Object.keys(resp.list[0]) //把 json 变成数组字符串
        const columns = this.createColumns(columnKeys)
        if (!this.updater.isMounted(this))
          return
        this.setState({

          total: resp.total, //这是页数
          dataSource: resp.list,//这里是数据 的改写
          columns: columns,//这是  标题栏

        })
      })
      .catch(err => {
        //错误处理
      })
      .finally(() => {

        if (!this.updater.isMounted(this))  //因为  前面的权限设置  导致 获取不到数据   所以没办法更新数据，所以 用这个个取消一下错误
          return
        this.setState({
          isLoading: false
        })
      })

  }
  //分页
  onpageChange = (page, pageSize) => {
    console.log(page, pageSize)
    this.setState({
      offset: pageSize * (page - 1), //offset 是页数
      limited: pageSize
    }, () => { //回调函数
      this.getData()
    })
  }

  onShowSizeChange = (current, size) => {
    //这里出去喝产品聊得实惠必须仔细问清楚需求，究竟是回到第一页还是留在当前页， 要问清楚
    this.setState({
      offset: 0, //offset 是页数
      limited: size
    }, () => { //回调函数
      this.getData()
    })
  }

  //Excel表格导出
  onGetExcel = () => {

    //看npm.js    然后有个  黄色的 damoe      在找到 jsx 文件   然后  有个exportFile()
    /* convert state to workbook */
    const data = [Object.keys(this.state.dataSource[0])]
    //第一种     但是  keys 不是有序的   不推荐
    // for( var i= 0 ; i < this.state.dataSource.length ; i++){
    //         data.push(Object.values(this.state.dataSource[i]))
    //     }
    //第二种
    for (var i = 0; i < this.state.dataSource.length; i++) {
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 hh时mm分ss秒')
      ])

    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited}-${moment().format
    ('YYYY-MM-DD-HH-mm-ss')}`)
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    return (
      <Card
        title="文章列表"
        bordered={false}
        extra={<Button onClick={this.onGetExcel}>导出excel</Button>}
      >

        <Table
          rowKey={record => record.id}//没有实质的效果  防止 key 报错   //主键
          dataSource={this.state.dataSource} //数据
          columns={this.state.columns}//标题栏
          loading={this.state.isLoading}//等待
          pagination={{//这个是页数的配置
            total: this.state.total,
            hideOnSinglePage: true,
            onChange: this.onpageChange,
            showQuickJumper: true,//跳转页
            showSizeChanger: true,  //直接跳转10页
            onShowSizeChange: this.onShowSizeChange, //每页几条后  要跳转到首页
            current: this.state.offset / this.state.limited + 1
          }}
        />

        {/* 删除的设置 */}
        <Modal
          title="删除不可逆"
          visible={this.state.isShowArticleModal}
          onCancel={this.quxiaoDELETE}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticletitle}
        >
          <Typography>确定要删除<span style={{color: '#f00'}}>{this.state.deleteArticletitle}</span></Typography>
        </Modal>
      </Card>

    )
  }
}
