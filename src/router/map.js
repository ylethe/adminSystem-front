
export default [
  {
    path: '/',
    name: '首页',
    component: (resolve) => {
      require(['../views/index'], resolve)
    },
    children: [
      {
        path: 'me',
        name: '我的主页',
        component: (resolve) => {
          require(['../views/mine'], resolve)
        }
      },
      {
        path: 'me/task/add',
        name: '任务添加',
        component: (resolve) => {
          require(['../views/mine/taskAdd'], resolve)
        }
      },
      {
        path: 'staff/add',
        name: '添加员工',
        component: (resolve) => {
          require(['../views/staff/add'], resolve)
        }
      },
      {
        path: 'staff/list',
        name: '员工列表',
        component: (resolve) => {
          require(['../views/staff/list'], resolve)
        }
      },
      {
        path: 'medical/list',
        name: '药品库存列表',
        component: (resolve) => {
          require(['../views/medical/list'], resolve)
        }
      },
      {
        path: 'medical/add',
        name: '药品入库',
        component: (resolve) => {
          require(['../views/medical/add'], resolve)
        }
      },
      {
        path: 'medical/out',
        name: '药品出库',
        component: (resolve) => {
          require(['../views/medical/out'], resolve)
        }
      },
      {
        path: 'customer/list',
        name: '客户列表',
        component: resolve => {
          require(['../views/customer/list'], resolve)
        }
      },
      {
        path: 'customer/add',
        name: '添加客户',
        component: resolve => {
          require(['../views/customer/add'], resolve)
        }
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: (resolve) => {
      require(['../views/login'], resolve)
    }
  },
  {
    path: '*',
    component: (resolve) => {
      require(['../views/index'], resolve)
    }
  }
]
