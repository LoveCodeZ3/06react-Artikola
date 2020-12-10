// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'


import Loading from '../components/Loading';
//下面就是懒加载
import Loadable from 'react-loadable'


//第二种自己定义懒加载
//import Loadable from './loadable'这个是帮助理解react-loadable

//这样  在网页的 network 里边就能 更新出  新的 chuk  （）
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})
const Notifications = Loadable({
  loader: () => import('./Notifications'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})
const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading
})
export {
  ArticleList,
  ArticleEdit,
  Login,
  NotFound,
  Settings,
  Dashboard,
  Loading,
  Notifications,
  NoAuth,
  Profile
}
