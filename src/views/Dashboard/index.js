//Dashboard 标识版

import React, {Component, createRef} from 'react'

import {
  Card,
  Row,
  Col,
} from 'antd'
import axios from 'axios'
import './dashboard.less'
import echarts from 'echarts'

export default class Dashboard extends Component {
  constructor() {
    super()
    this.articleAment = createRef()
  }

  initArticleChart = () => {
    //看 echarts文档
    this.ArticleChart = echarts.init(this.articleAment.current)
    const getArticlesAmount = () => {
      axios.post("http://rap2api.taobao.org/app/mock/249769/api/v1/articleAmount")
        .then(resp => {
          console.log(resp.data.data.amount
          )
          const option = {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: resp.data.data.amount.mount.map(item => item)

            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: resp.data.data.amount.nmb.map(item => item),
              type: 'line',
              areaStyle: {}
            }]
          }

          // 使用刚指定的配置项和数据显示图表。
          this.ArticleChart.setOption(option);
        })
    }
    getArticlesAmount()
  }
  componentDidMount() {
    this.initArticleChart()
  }

  render() {
    return (
      <>
        <Card
          title="概流"
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: "red"}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: "green"}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: "#FF7043"}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box" style={{backgroundColor: "yellow"}}>col-6</div>
            </Col>
          </Row>
        </Card>
        <Card
          title="最近浏览量"
          bordered={false}
        >
          <div ref={this.articleAment} style={{height: "400px"}}></div>
        </Card>
      </>
    )
  }
}
