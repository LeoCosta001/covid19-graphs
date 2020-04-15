import Vue from "vue";
import App from "./App.vue";
import router from "./router";
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
