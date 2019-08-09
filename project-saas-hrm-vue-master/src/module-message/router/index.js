import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [

  {
    root: true,
    path: '/message',
    component: Layout,
    name: 'message',
    meta: {
      title: 'message',
      icon: 'message'
    },
    children: [
      // 列表
      {
        path: 'index',
        component: _import('message/pages/index'),
        name: 'employees-index',
        meta: {
          title: '通知消息',
          icon: 'message',
          noCache: true
        }
      },
      // 详情
      {
        path: 'details/:id',
        component: _import('message/pages/details'),
        // hidden: true // 是否显示在左侧菜单
        name: 'details',
        meta: {
          title: '详情'
        }
      }
    ]
  }
]
