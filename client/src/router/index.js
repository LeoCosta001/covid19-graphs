import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import CountriesCharts from "../views/CountriesCharts/CountriesCharts.vue";
import GlobalCharts from "../views/GlobalCharts/GlobalCharts.vue";
import PersonalCare from "../views/PersonalCare/PersonalCare.vue";
import Symptoms from "../views/Symptoms/Symptoms.vue";
import ModesOfTransmission from "../views/ModesOfTransmission/ModesOfTransmission.vue";
import CommonQuestions from "../views/CommonQuestions/CommonQuestions.vue";
import Emergency from "../views/Emergency/Emergency.vue";
import AboutCovid19 from "../views/AboutCovid19/AboutCovid19.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
  },
  {
    path: "/questions/emergency",
    name: "Emergency",
    component: Emergency
  },
  {
    path: "/questions/about-covid-19",
    name: "AboutCovid19",
    component: AboutCovid19
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
