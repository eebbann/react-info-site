import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
 
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Dashboard.vue")
      } 
    ]
  },
    
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(() => {
 
  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
