import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import DataTable from "../views/DataTable/DataTable.vue";
import GraphSummary from "../views/GraphSummary/GraphSummary.vue";
import GraphGrowthRate from "../views/GraphGrowthRate/GraphGrowthRate.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/data-table",
    name: "DataTable",
    component: DataTable
  },
  {
    path: "/graphs/graph-summary",
    name: "GraphSummary",
    component: GraphSummary
  },
  {
    path: "/graphs/graph-growth-rate",
    name: "GraphGrowthRate",
    component: GraphGrowthRate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
