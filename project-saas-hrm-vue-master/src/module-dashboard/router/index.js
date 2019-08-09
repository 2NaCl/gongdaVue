import Layout from '@/module-dashboard/pages/layout'

const _import = require('@/router/import_' + process.env.NODE_ENV)
export default [
  {
    root: true,
    path: '/reg',
    component: Layout,
    name: 'reg',
    // hidden: true
    children: [{
      path: 'index',
      component: _import
    }]
  }
]
