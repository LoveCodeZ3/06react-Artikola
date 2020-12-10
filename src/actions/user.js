import actionTypes from "./actionType"
import {loginRequsets} from "../requsets"

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  }
}

const loginFailed = () => {
  window.localStorage.removeItem("authToken")
  window.sessionStorage.removeItem("authToken")
  window.localStorage.removeItem("userInfo")
  window.localStorage.removeItem("userInfo")
  return {
    type: actionTypes.LOGIN_FAILEN
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(loginFailed())
  }
}


export const login = (userInfo) => {
  return dispatch => {
    dispatch(startLogin())
    loginRequsets(userInfo)
      .then(resp => {
        console.log(resp.data.code)
        if (resp.data.code === "200") {
          const {
            authToken,
            ...userInfo
          } = resp.data.data
          if (userInfo.remember === true) {
            window.localStorage.setItem("authToken", resp.data.data.authToken)// 本地化存储
            window.localStorage.setItem("userInfo", JSON.stringify(resp.data.data))
          } else {
            window.sessionStorage.setItem("authToken", resp.data.data.authToken)
            window.sessionStorage.setItem("userInfo", JSON.stringify(resp.data.data))
          }
          dispatch(loginSuccess(resp.data.data))
        } else {
          dispatch(loginFailed())
        }

      })
  }
}

export const changeAvatar = (avatar) => {
  return {
    type: actionTypes.CHANGE_AVATAR,
    payload: {
      avatar
    }
  }
}
