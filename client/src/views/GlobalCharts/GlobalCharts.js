// Componentes
import GlobalDataOptions from "@/components/Modal/GlobalDataOptions/GlobalDataOptions.vue";
import GlobalCharts from "@/components/Graphs/GlobalCharts/GlobalCharts.vue";

export default {
  name: "GlobalChartsView",
  components: {
    GlobalDataOptions,
    GlobalCharts
  },
  methods: {
    // Recebe novos valores no componente "GlobalDataOptions" e os envia para o componente "GlobalCharts"
    globalDataOptionsReturn(req) {
      this.$refs.attGlobalCharts.attGlobalData(req);
    }
  }
};
