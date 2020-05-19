
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      icon: 'setting',
      title: '登陆页',
      hideInMenu: true,
      code: 'system-manage',
      required: false // true表示需要鉴权
    },
    component: resolve => {
      require(['../views/login/login.vue'], resolve)
    }
  },
  {
    path: '/sys',
    name: 'sys',
    meta: {
      icon: 'setting',
      title: '系统管理',
      hideInMenu: false,
      code: 'system-manage',
      required: true // true表示需要鉴权
    },
    component: resolve => {
      require(['../views/main/main.vue'], resolve)
    },
    children: [
      {
        path: 'dictList',
        name: 'dictList',
        meta: {
          icon: 'book',
          title: '字典管理',
          hideInMenu: false,
          code: 'system-manage',
          required: true // true表示需要鉴权
        },
        component: resolve => {
          require(['../views/sys/dict/dictList.vue'], resolve)
        }
      },
      {
        path: 'treeList',
        name: 'treeList',
        meta: {
          icon: 'thunderbolt',
          title: '菜单管理',
          hideInMenu: false,
          code: 'system-manage-tree',
          required: true // true表示需要鉴权
        },
        component: resolve => {
          require(['../views/sys/tree/treeList.vue'], resolve)
        }
      }
    ]
  }
]
