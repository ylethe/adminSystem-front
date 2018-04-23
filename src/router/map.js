
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
        name: '我的',
        component: (resolve) => {
          require(['../view/mine'], resolve)
        }
      },
      {
        path: 'me/add-task',
        name: '添加任务',
        component: (resolve) => {
          require(['../views/mine/taskAdd/index.vue'], resolve)
        }
      },
      {
        path: 'user/add',
        name: '添加员工',
        component: (resolve) => {
          require(['../views/user/add'], resolve)
        }
      },
      {
        path: 'user/list',
        name: '员工列表',
        component: (resolve) => {
          require(['../views/user/list'], resolve)
        }
      },
      {
        path: 'medical/list ',
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
