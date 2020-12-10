import axios from 'axios'

import {message} from 'antd'

const isDev = process.env.NODE_ENV === 'development'

//用拦截器的 用这个service
const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/249769' : ''
})

//不用拦截器的用这个service1

const service1 = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/249769' : ''
})

service.interceptors.request.use((config) => {  //请求

  config.data = Object.assign({}, config.data, {
    authToken: 'aasdasd'
  })
  return config

})

service.interceptors.response.use((resp) => { //返回   有  对 错
  console.log(resp)
  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    //全局处理错误
    message.error(resp.data.errMsg)
  }
})


//得到文章列表
export const getArticles = (offset = 0, limited = 10) => {
  return service.post('/api/v1/articleList', {
    offset,
    limited
  })
}

//通过id  删除 文章

export const deleteArticle = (id) => {
  return service.post(`/api/v1/articleList/delete/${id}`)
}
//通过id 来获取 文章
export const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`)
}

//保存修改文章
export const saveArticle = (id, data) => {
  return service.post(`/api/v1/articlexiugai/${id}`, data)
}
//获取通知列表
export const getNotification = () => {
  return service.post('/api/v1/notifications')
}

//登录接口
export const loginRequsets = (userInfo) => {
  return service1.post('/api/v1/login', userInfo)
}
