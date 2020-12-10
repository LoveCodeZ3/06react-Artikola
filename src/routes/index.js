import {
  ArticleList,
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleEdit,
  Notifications,
  NoAuth,
  Profile
} from '../views'


export const mainRoutes = [{
  pathname: '/login',  //url 里边直接输入
  component: Login
}, {
  pathname: '/404',
  component: NotFound
},]

export const adminRoutes = [{
  pathname: '/admin/dashboard',
  component: Dashboard,
  title: '仪表盘',
  isNAv: true,
  icon: 'dashboard',
  roles: ['001', '002', '003']  //访问权限的设置

}, {
  pathname: '/admin/article',
  component: ArticleList,
  title: '文章管理',
  exact: true,
  isNAv: true,
  icon: 'unordered-list',
  roles: ['001', '002']
}, {
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  roles: ['001', '002']
}, {
  pathname: '/admin/settings',
  component: Settings,
  title: '设置',
  isNAv: true,
  icon: 'setting',
  roles: ['001']
}, {
  pathname: "/admin/notifications",
  component: Notifications,
  roles: ['001', '002', '003']
}, {
  pathname: "/admin/NoAuth",
  component: NoAuth,
  roles: ['001', '002', '003']
}, {
  pathname: "/admin/Profile",
  component: Profile,
  roles: ['001', '002', '003']
}
]
