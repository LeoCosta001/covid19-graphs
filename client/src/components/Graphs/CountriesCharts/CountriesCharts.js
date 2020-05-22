// APIs
import { FunctionalCalendar } from 'vue-functional-calendar';

// Componentes
import CountriesChartsAppBar from '@/components/Graphs/CountriesCharts/CountriesChartsAppBar/GraphGrouthRateApp.js';
import CountriesChartsAppDoughnut from '@/components/Graphs/CountriesCharts/CountriesChartsAppDoughnut/GraphResumeGrouthRateApp.js';
import CountriesChartsAppLine from '@/components/Graphs/CountriesCharts/CountriesChartsAppLine/RegisterNumbersApp.js';
import SummaryGraphAppLine from '@/components/Graphs/CountriesCharts/CountriesChartsAppLine/SummaryGraphApp.js';

// Metodos
import _date from '@/methods/changeDate/dateIdentify.js';

// Configurações do componente
export default {
  name: 'CountriesCharts',
  components: {
    FunctionalCalendar,
    CountriesChartsAppBar,
    CountriesChartsAppDoughnut,
    CountriesChartsAppLine,
    SummaryGraphAppLine,
  },
  data() {
    return {
      // Variáves
      countryData: {
        selectedValues: {
          selectDate: {
            firstDate: _date.calcDate(-7, false),
            lastDate: _date.calcDate(-1, false),
            invalidStatus: false,
          },
          selectCountry: {
            countryName: '',
            invalidStatus: true,
          },
          selectInfo: {
            summaryGraph: true,
            growthRate: true,
            newRegister: true,
            summary: true,
            additionalInformation: true,
            invalidStatus: false,
          },
        },
      },
      graphDoughnutTable: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        growthRate: {
          confirmed: 0,
          deaths: 0,
          recovered: 0,
        },
      },
      // Controladores de display
      inputTableDataNumberInvalid: false,
      tableLineDetailStatus: undefined,
      // Transferir dados para o componente de Gráfico
      resForGraph: this.countryData,
    };
  },
  methods: {
    // Método ativado quando o grafico de Doughnut é calculado
    reqGraphDataEmit(req) {
      this.graphDoughnutTable = req.graphData;
    },

    // Ativado quando é alterada as datas para a exibição de dados
    async attTableData(attCountryData) {
      this.countryData = attCountryData;

      // Fechando a tabela
      this.tableLineDetail(-1);

      // Atualizando gráficos
      if (this.countryData.selectedValues.selectInfo.summaryGraph) {
        this.$refs.summaryGraphAppLine.attGraph(this.countryData);
      }

      if (this.countryData.selectedValues.selectInfo.growthRate) {
        this.$refs.countriesChartsAppBar.attGraph(this.countryData);
      }

      if (this.countryData.selectedValues.selectInfo.newRegister) {
        this.$refs.countriesChartsAppLine.attGraph(this.countryData);
      }

      if (this.countryData.selectedValues.selectInfo.summary) {
        this.$refs.countriesChartsAppDoughnut.attGraph(this.countryData);
      }

      this.attGraphResumeTable();
    },

    // Atualizando dados da tabela "GraphResumeGrouthRate"
    attGraphResumeTable() {
      let data = this.countryData.data.cases;

      // Somando de todos os novos registros
      this.graphDoughnutTable.confirmed = 0;
      this.graphDoughnutTable.deaths = 0;
      this.graphDoughnutTable.recovered = 0;

      data.forEach((value) => {
        this.graphDoughnutTable.confirmed += value.in24Hours.confirmed;
        this.graphDoughnutTable.deaths += value.in24Hours.deaths;
        this.graphDoughnutTable.recovered += value.in24Hours.recovered;
      });

      // Calculo de crescimento de todos os novos registros
      this.graphDoughnutTable.growthRate.confirmed = (
        ((data[0].confirmed - data[data.length - 1].confirmed) /
          data[data.length - 1].confirmed) *
        100
      ).toFixed(2);
      this.graphDoughnutTable.growthRate.deaths = (
        ((data[0].deaths - data[data.length - 1].deaths) /
          data[data.length - 1].deaths) *
        100
      ).toFixed(2);
      this.graphDoughnutTable.growthRate.recovered = (
        ((data[0].recovered - data[data.length - 1].recovered) /
          data[data.length - 1].recovered) *
        100
      ).toFixed(2);
    },

    // Abrindo linha de informações detalhadas da tabela
    tableLineDetail(index) {
      if (this.tableLineDetailStatus == index) {
        this.tableLineDetailStatus = undefined;
      } else {
        this.tableLineDetailStatus = index;
      }
    },
  },
};
