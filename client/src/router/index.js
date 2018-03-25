import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/Registration'
import TodoList from '@/components/Todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
      children: [{
        path: '/Todo/:projectid',
        name: 'Todo',
        component: TodoList,
        props: true
      }]
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Signup
    }
  ]
})