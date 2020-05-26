// Metodos
import _date from "@/methods/changeDate/dateIdentify.js";

// Apollo Client
import { client } from "@/apolloConfig/apollo-client";
import gql from "graphql-tag";

// Componentes
import SelectDate from "@/components/Modal/GlobalDataOptions/Content/SelectDate/SelectDate.vue";
import SelectCountry from "@/components/Modal/GlobalDataOptions/Content/SelectCountry/SelectCountry.vue";
import SelectInfo from "@/components/Modal/GlobalDataOptions/Content/SelectInfo/SelectInfo.vue";

export default {
  name: "GlobalDataOptions",
  components: {
    SelectDate,
    SelectCountry,
    SelectInfo
  },
  data() {
    return {
      reqResult: undefined,
      // Variáveis de controle
      controller: {
        showGlobalDataOptions: true,
        hideModal: false
      },

      // Status da requisição
      gqlReqStatus: {
        loading: false,
        success: true
      },

      // Opções selecionadas
      selectedValues: {
        selectDate: {
          firstDate: _date.calcDate(-7, false),
          lastDate: _date.calcDate(-1, false),
          invalidStatus: false
        },
        selectCountry: {
          countryName: "",
          countrySelectedTranslated: "",
          invalidStatus: true
        },
        selectInfo: {
          summaryGraph: true,
          growthRate: true,
          newRegister: true,
          summary: true,
          additionalInformation: true,
          invalidStatus: false
        }
      },

      // Informações que serão exibidas
      selectInfoLocal: {
        summaryGraph: true,
        growthRate: true,
        newRegister: true,
        summary: true,
        additionalInformation: true,
        invalidStatus: false
      }
    };
  },
  computed: {
    // Valores que serão emitidos
    GlobalDataOptionsEmit() {
      return {
        data: this.reqResult,
        selectedValues: this.selectedValues
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
    }
  },
  methods: {
    // Emitir dados com os valores locais
    localEmit() {
      this.$emit("GlobalDataOptions_return", this.GlobalDataOptionsEmit);
    },

    modalOpenButton() {
      this.controller.showGlobalDataOptions = false;
    },

    modalCloseButton() {
      this.controller.showGlobalDataOptions = true;
    },

    // Atualizar componentes de informações que serão exibidos
    attSelectInfo() {
      this.selectedValues.selectInfo.summaryGraph = this.selectInfoLocal.summaryGraph;
      this.selectedValues.selectInfo.growthRate = this.selectInfoLocal.growthRate;
      this.selectedValues.selectInfo.newRegister = this.selectInfoLocal.newRegister;
      this.selectedValues.selectInfo.summary = this.selectInfoLocal.summary;
      this.selectedValues.selectInfo.additionalInformation = this.selectInfoLocal.additionalInformation;
      this.selectedValues.selectInfo.invalidStatus = this.selectInfoLocal.invalidStatus;
    },

    // Requisição com Apollo Client
    async gql_Covid19inCountry() {
      try {
        this.gqlReqStatus.loading = true;
        const query = this.GraphQLQuery;

        await client
          .query({ query })
          .then(res => {
            this.gqlReqStatus.loading = false;
            this.gqlReqStatus.success = true;

            this.reqResult = res.data.case;

            this.localEmit();
          })
          .catch(err => {
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
    SelectCountry_method(result) {
      this.selectedValues.selectCountry.countryName = result.countrySelected;
      this.selectedValues.selectCountry.countryNameTranslated =
        result.countrySelectedTranslated;
      this.selectedValues.selectCountry.invalidStatus = result.invalidStatus;
    },

    // Atualizando as informações que serão exibidas
    SelectInfo_method(result) {
      this.selectInfoLocal.summaryGraph = result.summaryGraph_checkbox;
      this.selectInfoLocal.growthRate = result.growthRate_checkbox;
      this.selectInfoLocal.newRegister = result.newRegister_checkbox;
      this.selectInfoLocal.summary = result.summary_checkbox;
      this.selectInfoLocal.additionalInformation =
        result.additionalInformation_checkbox;
      this.selectInfoLocal.invalidStatus = result.invalidStatus;
    },

    /********************
     * Botões do rodapé *
     ********************/
    // Botão de "Aplicar"
    async applyButton() {
      if (
        !this.selectedValues.selectDate.invalidStatus &&
        // !this.selectedValues.selectCountry.invalidStatus &&
        !this.selectedValues.selectInfo.invalidStatus
      ) {
        try {
          this.attSelectInfo();
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
      this.$refs.refSelectCountry.resetValue(this.resetSelectCountry);
    },

    // Botão de "Resetar"
    resetButton() {
      this.$refs.refSelectDate.resetValue();
      this.$refs.refSelectCountry.resetValue();
      this.$refs.refSelectInfo.resetValue();
    }
  }
};
