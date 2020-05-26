// Componentes
import DataOptions from "@/components/Modal/DataOptions/DataOptions.vue";
import CountriesCharts from "@/components/Graphs/CountriesCharts/CountriesCharts.vue";

export default {
  name: "CountriesChartsView",
  components: {
    DataOptions,
    CountriesCharts
  },
  data() {
    return {
      // Dados recebidos do componente "DataOptions"
      dataOptions: undefined
    };
  },
  methods: {
    // Recebe novos valores no componente "DataOptions" e os envia para o componente "CountriesCharts"
    dataOptionsReturn(req) {
      this.$refs.attGraphData.attTableData(req);
    }
  }
};
