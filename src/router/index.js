import { createRouter, createWebHistory } from 'vue-router'

import DriverMapPage from '@/pages/DriverMapPage'
import LoginPage from '@/pages/LoginPage'
import MapComponent from '@/components/MapComponent'
import RegisterPhonePage from '@/pages/RegisterPhonePage'
import RegisterUserPage from '@/pages/RegisterUserPage'
import RegisterVehicle from '@/pages/RegisterVehicle'
import UserMapPage from '@/pages/UserMapPage'

const routes = [
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
    path: '/MapComponent',
    name: 'MapComponent',
    component: MapComponent
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
