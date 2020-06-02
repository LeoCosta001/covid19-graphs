import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import DataTable from "../views/DataTable/DataTable.vue";
import CountriesCharts from "../views/CountriesCharts/CountriesCharts.vue";
import GlobalCharts from "../views/GlobalCharts/GlobalCharts.vue";
import PersonalCare from "../views/PersonalCare/PersonalCare.vue";
import Symptoms from "../views/Symptoms/Symptoms.vue";
import ModesOfTransmission from "../views/ModesOfTransmission/ModesOfTransmission.vue";
import CommonQuestions from "../views/CommonQuestions/CommonQuestions.vue";

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
    path: "/graphs/countries-charts",
    name: "CountriesCharts",
    component: CountriesCharts
  },
  {
    path: "/graphs/global-charts",
    name: "GlobalCharts",
    component: GlobalCharts
  },
  {
    path: "/questions/personal-care",
    name: "PersonalCare",
    component: PersonalCare
  },
  {
    path: "/questions/symptoms",
    name: "Symptoms",
    component: Symptoms
  },
  {
    path: "/questions/modes-of-transmission",
    name: "ModesOfTransmission",
    component: ModesOfTransmission
  },
  {
    path: "/questions/common-questions",
    name: "CommonQuestions",
    component: CommonQuestions
  }
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
        selector: to.hash
      };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
