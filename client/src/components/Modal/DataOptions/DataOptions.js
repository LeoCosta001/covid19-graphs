// Metodos
import _date from '@/methods/changeDate/dateIdentify.js';

// Apollo Client
import { client } from '@/apolloConfig/apollo-client';
import gql from 'graphql-tag';

// Componentes
import SelectDate from '@/components/Modal/DataOptions/Content/SelectDate/SelectDate.vue';
import SelectCountry from '@/components/Modal/DataOptions/Content/SelectCountry/SelectCountry.vue';
import SelectInfo from '@/components/Modal/DataOptions/Content/SelectInfo/SelectInfo.vue';

export default {
  name: 'DataOptions',
  components: {
    SelectDate,
    SelectCountry,
    SelectInfo,
  },
  data() {
    return {
      reqResult: undefined,
      // Variáveis de controle
      controller: {
        showDataOptions: true,
        hideModal: false,
      },

      // Status da requisição
      gqlReqStatus: {
        loading: false,
        success: true,
      },

      // Opções selecionadas
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
          summaryGraph: '',
          growthRate: '',
          newRegister: '',
          summary: '',
          additionalInformation: '',
          invalidStatus: false,
        },
      },
      // Valores a serem emitidos para outros componentes
      localEmit: undefined,
    };
  },
  computed: {
    GraphQLQuery() {
      let query = gql`
        query {
          case(
            country: "${this.selectedValues.selectCountry.countryName}",
            firstDate: "${this.selectedValues.selectDate.firstDate}",
            lastDate: "${this.selectedValues.selectDate.lastDate}"
          ) {
            country
            cases {
              date
              confirmed
              deaths
              recovered
              growthRate {
                deaths
                confirmed
                recovered
              }
              in24Hours {
                deaths
                confirmed
                recovered
              }
            }
          }
        }
      `;

      return query;
    },
  },
  methods: {
    modalOpenButton() {
      this.controller.showDataOptions = false;
    },

    modalCloseButton() {
      this.controller.showDataOptions = true;
    },

    /*********************
     * Retorno dos Emits *
     *********************/

    // Atualizando as informações das datas
    SelectDate_method(result) {
      this.selectedValues.selectDate.firstDate = result.firstDate;
      this.selectedValues.selectDate.lastDate = result.lastDate;
      this.selectedValues.selectDate.invalidStatus = result.invalidStatus;
    },

    // Atualizando as informações do país selecionado
    SelectCountry_method(result) {
      this.selectedValues.selectCountry.countryName = result.countrySelected;
      this.selectedValues.selectCountry.invalidStatus = result.invalidStatus;
    },

    // Atualizando as informações que serão exibidas
    SelectInfo_method(result) {
      this.selectedValues.selectInfo.summaryGraph =
        result.summaryGraph_checkbox;
      this.selectedValues.selectInfo.growthRate = result.growthRate_checkbox;
      this.selectedValues.selectInfo.newRegister = result.newRegister_checkbox;
      this.selectedValues.selectInfo.summary = result.summary_checkbox;
      this.selectedValues.selectInfo.additionalInformation =
        result.additionalInformation_checkbox;
      this.selectedValues.selectInfo.invalidStatus = result.invalidStatus;
    },

    /********************
     * Botões do rodapé *
     ********************/
    async applyButton() {
      this.controller.hideModal = true;
      await this.gql_Covid19inCountry();

      console.log(this.reqResult);

      setTimeout(() => {
        this.controller.showDataOptions = true;
        this.controller.hideModal = false;
      }, 2000);
    },

    // Requisição com Apollo Client
    async gql_Covid19inCountry() {
      try {
        this.gqlReqStatus.loading = true;
        const query = this.GraphQLQuery;

        await client
          .query({ query })
          .then((res) => {
            this.gqlReqStatus.loading = false;
            this.gqlReqStatus.success = true;

            this.reqResult = res;
          })
          .catch((err) => {
            this.gqlReqStatus.loading = false;
            this.gqlReqStatus.success = false;

            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
