import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import DataTable from "../views/DataTable/DataTable.vue";
import CountriesCharts from "../views/CountriesCharts/CountriesCharts.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/data-table",
    name: "DataTable",
    component: DataTable,
  },
  {
    path: "/graphs/countries-charts",
    name: "CountriesCharts",
    component: CountriesCharts,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    return { x: 0, y: 0 };
  },
});

export default router;
