// Metodos
import _date from '@/methods/changeDate/dateIdentify.js';

// Apollo Client
import { client } from '@/apolloConfig/apollo-client';
import gql from 'graphql-tag';

// Componentes
import SelectDate from '@/components/Modal/GlobalDataOptions/Content/SelectDate/SelectDate.vue';
import SelectDataType from '@/components/Modal/GlobalDataOptions/Content/SelectDataType/SelectDataType.vue';
import SelectInfo from '@/components/Modal/GlobalDataOptions/Content/SelectInfo/SelectInfo.vue';

export default {
  name: 'GlobalDataOptions',
  components: {
    SelectDate,
    SelectDataType,
    SelectInfo,
  },
  data() {
    return {
      reqResult: undefined,
      // Variáveis de controle
      controller: {
        showGlobalDataOptions: true,
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
        selectDataType: {
          dataType: 'confirmed',
          dataTypeTranslated: 'Casos Confirmados',
          invalidStatus: false,
        },
        selectInfo: {
          globalMap: true,
          countriesRank: true,
          globalSummary: true,
          invalidStatus: false,
        },
      },

      // Tipo de dados que serão exibidos
      selectDataTypeLocal: {
        dataType: '',
        dataTypeTranslated: '',
        invalidStatus: false,
      },

      // Informações que serão exibidas
      selectInfoLocal: {
        globalMap: true,
        countriesRank: true,
        globalSummary: true,
        invalidStatus: false,
      },
    };
  },
  computed: {
    // Valores que serão emitidos
    GlobalDataOptionsEmit() {
      return {
        data: this.reqResult,
        selectedValues: this.selectedValues,
      };
    },

    // Construção da "query" para fazer a requisição do GraphQL
    GraphQLQuery() {
      let query = gql`
        query {
          case(
            firstDate: "${this.selectedValues.selectDate.firstDate}",
            lastDate: "${this.selectedValues.selectDate.lastDate}"
          ) {
            country
            casesSummary {
              date {
                lastDate
                firstDate
              }
              confirmed
              deaths
              recovered
              growthRate {
                confirmed
                deaths
                recovered
              }
              inBetweenDays {
                confirmed
                deaths
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
    // Emitir dados com os valores locais
    localEmit() {
      this.$emit('GlobalDataOptions_return', this.GlobalDataOptionsEmit);
    },

    // Selecionar tipo de dado
    attGlobalData(dataType) {
      this.selectDataTypeLocal.dataType = dataType;
      switch (dataType) {
        case 'confirmed':
          this.selectDataTypeLocal.dataTypeTranslated = 'Casos Confirmados';
          break;
        case 'deaths':
          this.selectDataTypeLocal.dataTypeTranslated = 'Mortos';
          break;
        case 'recovered':
          this.selectDataTypeLocal.dataTypeTranslated = 'Recuperados';
          break;
      }
      this.$refs.refSelectDataType.changeValue(dataType);
      this.attSelectDataType();
      this.localEmit();
    },

    modalOpenButton() {
      this.controller.showGlobalDataOptions = false;
    },

    modalCloseButton() {
      this.controller.showGlobalDataOptions = true;
    },

    // Atualizar componentes de informações que serão exibidos
    attSelectInfo() {
      this.selectedValues.selectInfo.globalMap = this.selectInfoLocal.globalMap;
      this.selectedValues.selectInfo.countriesRank = this.selectInfoLocal.countriesRank;
      this.selectedValues.selectInfo.globalSummary = this.selectInfoLocal.globalSummary;
      this.selectedValues.selectInfo.invalidStatus = this.selectInfoLocal.invalidStatus;
    },

    attSelectDataType() {
      this.selectedValues.selectDataType.dataType = this.selectDataTypeLocal.dataType;
      this.selectedValues.selectDataType.dataTypeTranslated = this.selectDataTypeLocal.dataTypeTranslated;
      this.selectedValues.selectDataType.invalidStatus = this.selectDataTypeLocal.invalidStatus;
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

            this.reqResult = res.data.case;

            this.localEmit();
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
    SelectDataType_method(result) {
      this.selectDataTypeLocal.dataType = result.dataType;
      this.selectDataTypeLocal.invalidStatus = result.invalidStatus;
      switch (result.dataType) {
        case 'confirmed':
          this.selectDataTypeLocal.dataTypeTranslated = 'Casos Confirmados';
          break;
        case 'deaths':
          this.selectDataTypeLocal.dataTypeTranslated = 'Mortos';
          break;
        case 'recovered':
          this.selectDataTypeLocal.dataTypeTranslated = 'Recuperados';
          break;
      }
    },

    // Atualizando as informações que serão exibidas
    SelectInfo_method(result) {
      this.selectInfoLocal.globalMap = result.globalMap_checkbox;
      this.selectInfoLocal.countriesRank = result.countriesRank_checkbox;
      this.selectInfoLocal.globalSummary = result.globalSummary_checkbox;
      this.selectInfoLocal.invalidStatus = result.invalidStatus;
    },

    /********************
     * Botões do rodapé *
     ********************/
    // Botão de "Aplicar"
    async applyButton() {
      if (
        !this.selectedValues.selectDate.invalidStatus &&
        !this.selectedValues.selectDataType.invalidStatus &&
        !this.selectedValues.selectInfo.invalidStatus
      ) {
        try {
          this.attSelectInfo();
          this.attSelectDataType();
          this.controller.hideModal = true;
          await this.gql_Covid19inCountry();

          setTimeout(() => {
            this.controller.showGlobalDataOptions = true;
            this.controller.hideModal = false;
          }, 2000);
        } catch (err) {
          console.log(err);
        }
      }
    },

    // Botão de "Cancelar"
    cancelButton() {
      this.$refs.refSelectDataType.resetValue(this.resetSelectDataType);
    },

    // Botão de "Resetar"
    resetButton() {
      this.$refs.refSelectDate.resetValue();
      this.$refs.refSelectDataType.resetValue();
      this.$refs.refSelectInfo.resetValue();
    },
  },
  mounted() {
    // Requisição para pegar os dados resumidos ds países
    let query = gql`
      query {
        case(
          firstDate: "${this.selectedValues.selectDate.firstDate}",
          lastDate: "${this.selectedValues.selectDate.lastDate}"
        ) {
          country
          casesSummary {
            date {
              lastDate
              firstDate
            }
            confirmed
            deaths
            recovered
            growthRate {
              confirmed
              deaths
              recovered
            }
            inBetweenDays {
              confirmed
              deaths
              recovered
            }
          }
        }
      }
    `;

    client
      .query({ query })
      .then((res) => {
        this.attSelectInfo();
        this.reqResult = res.data.case;
        this.localEmit();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
