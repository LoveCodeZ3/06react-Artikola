import actionTypes from './actionType'
import {getNotification} from "../requsets"

const startPost = () => {
  return {
    type: actionTypes.START_NOTIFICATION_POST
  }
}
const finishPost = () => {
  return {
    type: actionTypes.FINISH_NOTIFICATION_POST
  }
}


export const markNotifiactionAsReadById = (id) => {
  console.log(id)

  return dispatch => {

    //这里是模拟  一个服务端的请求
    dispatch(startPost())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        }
      })

      dispatch(finishPost())
    }, 2000)
  }
}
export const markAllNotificationRead = () => {
  //全部已读
  console.log("接收到了吗")

  return dispatch => {
    dispatch(startPost())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ,

      })
      dispatch(finishPost())
    }, 2000)
  }
}
export const getNotificationList = () => {
  //全部已读
  console.log("接收到了吗")

  return dispatch => {
    dispatch(startPost())
    getNotification()
      .then(resp => {
        console.log(resp)
        dispatch({
          type: actionTypes.RECIVED_NOTIFICATIONS,
          payload: {
            list: resp.list
          }
        })
        dispatch(finishPost())
      })


  }
}