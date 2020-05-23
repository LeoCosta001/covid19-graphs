import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Unicon from 'vue-unicons'

// Icones
// OBS: A lista de icones está neste link "https://antonreshetov.github.io/vue-unicons/"
import { uniHome, uniSync, uniExclamationOctagon, uniCheckCircle, uniListUl, uniPresentationLinesAlt, uniQuestionCircle, uniCell, uniAmbulance, uniChartGrowth, uniChartLine, uniChartBar, uniFrown, uniChartPie, uniChart, uniSchedule, uniCommentQuestion, uniHeart, uniExclamationTriangle, uniAngleRight, uniAngleLeft, uniLinkedin, uniGithub, uniTwitter, uniEnvelope, uniCog, uniTimes, uniCheck} from 'vue-unicons/src/icons'
Unicon.add([uniHome, uniSync, uniExclamationOctagon, uniCheckCircle, uniListUl, uniPresentationLinesAlt, uniQuestionCircle, uniCell, uniAmbulance, uniChartGrowth, uniChartLine, uniChartBar, uniFrown, uniChartPie, uniChart, uniSchedule, uniCommentQuestion, uniHeart, uniExclamationTriangle, uniAngleRight, uniAngleLeft, uniLinkedin, uniGithub, uniTwitter, uniEnvelope, uniCog, uniTimes, uniCheck])
Vue.use(Unicon);

// API de calendário
import FunctionalCalendar from 'vue-functional-calendar';
Vue.use(FunctionalCalendar, {
    isAutoCloseable: true,
    dateFormat: 'dd/mm/yyyy',
    dayNames: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    shortMonthNames: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    disabledDates:['afterToday'],
    hiddenElements:['leftAndRightDays'],
});

// Componentes do bootstrap-vue
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
