import actionType from "../actions/actionType"

const isLogin = Boolean(window.localStorage.getItem("authToken")) || Boolean(window.sessionStorage.getItem("authToken"))
const userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || JSON.parse(window.sessionStorage.getItem("userInfo"))
const initState = {
  ...userInfo,
  isLogin, //登录的
  isLoading: false,//等待的 Loading

}

export default (state = initState, action) => {
  console.log(action)
  switch (action.type) {
    case actionType.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userInfo,
        isLoading: true,
        isLogin: true

      }
    case actionType.LOGIN_FAILEN:
      return {
        id: "",
        displayName: '',
        avatar: '',
        isLogin: false,
        isLoading: false,
        role: ''
      }
    case actionType.CHANGE_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatar
      }

    default:
      return state
  }
}
