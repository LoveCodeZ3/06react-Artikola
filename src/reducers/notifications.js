import actionTypes from "../actions/actionType"

const initState = {
  isLoading: false,
  list: [{
    id: 1,
    title: "Lorem sit 111",
    desc: "111 Lorem sit",
    hasRead: false
  },
    {
      id: 2,
      title: "Lorem sit 222",
      desc: "222 Lorem sit",
      hasRead: false
    }
  ]
}
export default (state = initState, action) => {
  switch (action.type) {

    case actionTypes.RECIVED_NOTIFICATIONS:
      return {

        ...state,
        list: action.payload.list,
      }
    //可以出现等待2秒的 loading
    case actionTypes.START_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newlist = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newlist,

      }
    case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
      const ALLlist = state.list.map(item => {
        item.hasRead = true
        return item
      })
      return {
        ...state,
        list: ALLlist,

      }
    default:
      return state
  }
} 