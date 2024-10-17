import { createWebHistory, createRouter } from "vue-router";

//Helpers
import authGuard from "../helpers/authUser";

const routes = [
  {
    path: "/",
    name: "lv-home",
    component: () => import("../views/LvHome.vue"),
  },
  {
    path: "/pc-news",
    name: "lv-pc-news",
    component: () => import("../views/LvPCNews.vue"),
  },
  {
    path: "/psx-news",
    name: "lv-psx-news",
    component: () => import("../views/LvPSXNews.vue"),
  },
  {
    path: "/xbox-news",
    name: "lv-xbox-news",
    component: () => import("../views/LvXboxNews.vue"),
  },
  {
    path: "/ns-news",
    name: "lv-ns-news",
    component: () => import("../views/LvNsNews.vue"),
  },
  {
    path: "/mob-news",
    name: "lv-mob-news",
    component: () => import("../views/LvMobNews.vue"),
  },
  {
    path: "/details-new/:id",
    name: "lv-details-new",
    component: () => import("../views/LvDetailsNew.vue"),
  },
  {
    path: "/register",
    name: "lv-register",
    component: () => import("../views/LvRegister.vue"),
  },
  {
    path: "/login",
    name: "lv-login",
    component: () => import("../views/LvLogin.vue"),
  },
  {
    path: "/panel-user/:id",
    name: "lv-panel-user",
    component: () => import("../views/LvUserPanel.vue"),
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
    children: [
      {
        path: "/panel-user/my-news/:id",
        name: "/lv-my-news",
        component: () => import("../views/LvMyNews.vue"),
      },
    ],
  },
  {
    path: "/edit-user/:id",
    name: "lv-edit-user",
    component: () => import("../views/LvEditUser.vue"),
    meta: { authRequires: true },
    beforeEnter: authGuard,
  },
  {
    path: "/post-new",
    name: "lv-post-new",
    component: () => import("../views/LvPostNew.vue"),
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
  },
  {
    path: "/panel-user/my-news",
    name: "lv-my-news",
    component: () => import("../views/LvMyNews.vue"),
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
  },
  {
    path: "/panel-user/edit-new/:id",
    name: "lv-edit-new",
    component: () => import("../views/LvEditNew.vue"),
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
  },
  {
    path: "/panel-user/my-comments/:id",
    name: "lv-my-comments",
    component: () => import("../views/LvMyComments.vue"),
    meta: { authRequires: true },
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
