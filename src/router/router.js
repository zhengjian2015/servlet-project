
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
      },
      {
        path: 'roleList',
        name: 'roleList',
        meta: {
          icon: 'solution',
          title: '角色管理',
          hideInMenu: false,
          code: 'system-manage-role',
          required: true // true表示需要鉴权
        },
        component: resolve => {
          require(['../views/sys/role/roleList.vue'], resolve)
        }
      },
      {
        path: 'orgList',
        name: 'orgList',
        meta: {
          icon: 'team',
          title: '组织管理',
          hideInMenu: false,
          code: 'system-manage-org',
          required: true // true表示需要鉴权
        },
        component: resolve => {
          require(['../views/sys/user/orgList.vue'], resolve)
        }
      }
    ]
  }
]
