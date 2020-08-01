import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '', // 巢狀路由的子路由，路徑前面不用斜線
        name: 'Index',
        component: () =>
          import('../views/front/Index.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () =>
          import('../views/front/About.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () =>
          import('../views/front/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () =>
          import('../views/front/Product.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () =>
          import('../views/front/Cart.vue'),
      },

    ],

  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () =>
      import('../views/back/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () =>
          import("../views/back/Products.vue"),
      },
      {
        path: 'products',
        component: () =>
          import("../views/back/Products.vue"),
      },
      {
        path: 'coupons',
        component: () =>
          import("../views/back/Coupons.vue"),
      },
      {
        path: 'orders',
        component: () =>
          import("../views/back/Orders.vue"),
      },
      {
        path: 'storage',
        component: () =>
          import("../views/back/Storage.vue"),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('../views/Login.vue'),
  },
  {
    path: '*', // 亂填路徑 無法判別的時候
    redirect: '/', // 重新導向首頁
  }
  // {
  //   path: '/products',
  //   name: 'Products',
  //   component: () =>
  //     import('../views/front/Products.vue')
  // }
];

const router = new VueRouter({
  routes
});

export default router;
