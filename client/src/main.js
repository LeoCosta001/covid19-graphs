import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Icones
// OBS: A lista de icones está neste link "https://antonreshetov.github.io/vue-unicons/"
import Unicon from 'vue-unicons'
import { uniHome, uniSync, uniExclamationOctagon, uniCheckCircle, uniListUl, uniPresentationLinesAlt, uniQuestionCircle, uniHeartMedical, uniCell, uniAmbulance, uniChartGrowth, uniChartLine, uniChartBar, uniFrown, uniChartPie, uniChart} from 'vue-unicons/src/icons'
Unicon.add([uniHome, uniSync, uniExclamationOctagon, uniCheckCircle, uniListUl, uniPresentationLinesAlt, uniQuestionCircle, uniHeartMedical, uniCell, uniAmbulance, uniChartGrowth, uniChartLine, uniChartBar, uniFrown, uniChartPie, uniChart])
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

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
