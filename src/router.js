import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import Addfunds from './views/Addfunds.vue';
import Notfound from './views/Notfound.vue';
import Crash from './views/Crash.vue';

Vue.use(Router);

function loggedInRedirect(to, from, next) {
  if(localStorage.token) {
    next('/dashboard');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if(localStorage.token) {
    next();
  } else {
    next('/login');
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: loggedInRedirect,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: loggedInRedirect,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: isLoggedIn,
    },
    {
      path: '/crash',
      name: 'crash',
      component: Crash,
      beforeEnter: isLoggedIn,
    },
    {
      path: '/addfunds',
      name: 'addfunds',
      component: Addfunds,
      beforeEnter: isLoggedIn,
    },
    {
      path: '*',
      component: Notfound,
    }
  ],
});
