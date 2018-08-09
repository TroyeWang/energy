'use strict'

const routes = []
// 首页
routes.push({
  path: "/",
  name: "home",
  component: () =>
    import ("../views/layout/Home")
})

export default routes