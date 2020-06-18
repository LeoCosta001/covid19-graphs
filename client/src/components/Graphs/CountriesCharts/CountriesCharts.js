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
      additionalInformation: {
        highestNumberOfDeaths: {
          date: 'dd/mm/aaaa',
          value: 0,
          totalValue: 0,
        },
        highestNumberOfRecovered: {
          date: 'dd/mm/aaaa',
          value: 0,
          totalValue: 0,
        },
        highestNumberOfConfirmed: {
          date: 'dd/mm/aaaa',
          value: 0,
          totalValue: 0,
        },
      },
      // Controladores de display
      inputTableDataNumberInvalid: false,
      tableLineDetailStatus: undefined,
      countryDataTableConfirmed: true,
      countryDataTableDeaths: true,
      countryDataTableRecovered: true,
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

      // Atualizar Tabelas
      this.attGraphResumeTable();
      this.attAdditionalInformation();
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

      // Calculo de crescimento de todos os novos registros (OBS: Resultados "infinity" é substituido por "null")
      let calcConfirmedGrowthRate = (
        ((data[0].confirmed - data[data.length - 1].confirmed) /
          data[data.length - 1].confirmed) *
        100
      ).toFixed(2);
      this.graphDoughnutTable.growthRate.confirmed = isFinite(
        calcConfirmedGrowthRate
      )
        ? calcConfirmedGrowthRate
        : null;

      let calcDeathsGrowthRate = (
        ((data[0].deaths - data[data.length - 1].deaths) /
          data[data.length - 1].deaths) *
        100
      ).toFixed(2);
      this.graphDoughnutTable.growthRate.deaths = isFinite(calcDeathsGrowthRate)
        ? calcDeathsGrowthRate
        : null;

      let calcRecoveredGrowthRate = (
        ((data[0].recovered - data[data.length - 1].recovered) /
          data[data.length - 1].recovered) *
        100
      ).toFixed(2);
      this.graphDoughnutTable.growthRate.recovered = isFinite(
        calcRecoveredGrowthRate
      )
        ? calcRecoveredGrowthRate
        : null;
    },

    // Abrindo linha de informações detalhadas da tabela
    tableLineDetail(index) {
      if (this.tableLineDetailStatus == index) {
        this.tableLineDetailStatus = undefined;
      } else {
        this.tableLineDetailStatus = index;
      }
    },

    // Atualizar dados da tabela de "Informações Adicionais"
    attAdditionalInformation() {
      let data = this.countryData.data.cases;

      // Calcular e separa os dias que tiveram os maiores registros
      function highestValueSearch(valueType) {
        let result = data
          .sort((currentValue, nextValue) => {
            return (
              currentValue.in24Hours[valueType] - nextValue.in24Hours[valueType]
            );
          })
          .reverse();

        result = result
          .filter((value) => {
            return value.in24Hours[valueType] == result[0].in24Hours[valueType]
              ? true
              : false;
          })
          .map((value) => {
            return {
              date: value.date,
              value: value.in24Hours[valueType],
              totalValue: value[valueType],
            };
          });

        return result;
      }

      let highestNumberOfConfirmedResult = highestValueSearch('confirmed');
      this.additionalInformation.highestNumberOfConfirmed =
        highestNumberOfConfirmedResult[0].value > 0
          ? highestNumberOfConfirmedResult
          : false;

      let highestNumberOfDeathsResult = highestValueSearch('deaths');
      this.additionalInformation.highestNumberOfDeaths =
        highestNumberOfDeathsResult[0].value > 0
          ? highestNumberOfDeathsResult
          : false;

      let highestNumberOfRecoveredResult = highestValueSearch('recovered');
      this.additionalInformation.highestNumberOfRecovered =
        highestNumberOfRecoveredResult[0].value > 0
          ? highestNumberOfRecoveredResult
          : false;
    },

    // Abrir e fechar as tabelas de "Informações Adicionais"
    countryDataTableConfirmedToggle() {
      this.countryDataTableConfirmed = this.countryDataTableConfirmed ? false : true;
    },

    countryDataTableDeathsToggle() {
      this.countryDataTableDeaths = this.countryDataTableDeaths ? false : true;
    },

    countryDataTableRecoveredToggle() {
      this.countryDataTableRecovered = this.countryDataTableRecovered ? false : true;
    },

    // Abrir modal DataOption ao clicar na mensaem de país não selecionado
    openModalDataOption() {
      this.$emit('OpenModalDataOption');
    }
  },
};
