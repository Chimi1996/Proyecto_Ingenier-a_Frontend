import Vue from 'vue'
import Router from 'vue-router'

import DriverMapPage from '@/pages/DriverMapPage'
import LoginPage from '@/pages/LoginPage'
import RegisterDriverPage from '@/pages/RegisterDriverPage'
import RegisterPhonePage from '@/pages/RegisterPhonePage'
import RegisterUserPage from '@/pages/RegisterUserPage'
import RegisterVehicle from '@/pages/RegisterVehicle'
import UserMapPage from '@/pages/UserMapPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/DriverMapPage',
      name: 'DriverMapPage',
      component: DriverMapPage
    },
    {
      path: '/RegisterDriverPage',
      name: 'RegisterDriverPage',
      component: RegisterDriverPage
    },
    {
      path: '/RegisterPhonePage',
      name: 'RegisterPhonePage',
      component: RegisterPhonePage
    },
    {
      path: '/RegisterUserPage',
      name: 'RegisterUserPage',
      component: RegisterUserPage
    },
    {
      path: '/RegisterVehicle',
      name: 'RegisterVehicle',
      component: RegisterVehicle
    },
    {
      path: '/UserMapPage',
      name: 'UserMapPage',
      component: UserMapPage
    }
  ]
})
