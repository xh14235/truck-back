import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue")
  },
  {
    path: "/entry",
    name: "Entry",
    component: () =>
      import(/* webpackChunkName: "entry" */ "../views/entry/Entry.vue")
  },
  {
    path: "/user",
    // redirect: "/user/userlist",
    name: "User",
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/User.vue"),
    children: [
      {
        path: "userlist",
        name: "UserList",
        meta: {
          auth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user/userlist" */
            "../views/user/components/UserList.vue"
          )
      },
      {
        path: "rolelist",
        name: "RoleList",
        meta: {
          auth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user/rolelist" */
            "../views/user/components/RoleList.vue"
          )
      },
      {
        path: "menulist",
        name: "MenuList",
        meta: {
          auth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user/menulist" */
            "../views/user/components/MenuList.vue"
          )
      },
      {
        path: "resourcelist",
        name: "ResourceList",
        meta: {
          auth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user/resourcelist" */
            "../views/user/components/ResourceList.vue"
          )
      }
    ]
  },
  {
    path: "/account",
    // redirect: "/account/equipment",
    name: "Account",
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/account/Account.vue"),
    children: [
      {
        path: "equipment",
        name: "Equipment",
        meta: {
          auth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "account/equipment" */
            "../views/account/components/Equipment.vue"
          )
      },
      {
        path: "meter",
        name: "Meter",
        meta: {
          auth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "account/meter" */
            "../views/account/components/Meter.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const token = store.state.common.token;
  if (to.meta.auth) {
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
