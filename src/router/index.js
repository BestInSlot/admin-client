import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../components/Auth.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const createListView = id => () =>
  import("../components/createListView").then(m => m.default(id));

const Manage = () => import("../components/Manage");

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/auth",
      component: Auth,
      meta: { title: "Admin CP Authentication" }
    },
    {
      path: "/",
      component: Home,
      meta: { title: "Admin Dashboard" }
    },
    {
      path: "/manage/posts",
      component: createListView("posts")
    },
    {
      path: "/manage/posts/edit/:id",
      component: Manage
    },
    {
      path: "/manage/posts/new",
      component: Manage
    },
    { 
      path: "/manage/users", 
      component: createListView("users") 
    }
  ]
});
