// APIs
import { http } from "@/axiosConfig/axiosConfig";
import casesList from "@/axiosConfig/countryList";

export default {
  name: "FORM_SelectCountry",
  data() {
    return {
      // Variaveis
      countrySelected: "undefined",
      countryList: false,
      countryData: [],
      countryDataLoading: false,
      countryDataErro: false,

      // Rota de requisição de dados para o back-end
      casesDataReq: () => {
        return http.get(`country-data/?country_select=${this.countrySelected}`);
      },
    };
  },
  computed: {
    // Dados para serem emitidos para outros componentes
    FORM_SelectCountryEmit() {
      return {
        countrySelected: this.countrySelected,
        countryData: this.countryData,
        countryDataLoading: this.countryDataLoading,
        countryDataErro: this.countryDataErro,
      };
    },
  },
  methods: {
    // Emitir dados que estiverem no data "FORM_SelectCountryEmit"
    localEmit() {
      this.$emit("resCountryData", this.FORM_SelectCountryEmit);
    },

    // Método acionado quando é selecionado um novo país
    async casesData() {
      if (this.countrySelected != "undefined") {
        // Ativar variável de "Carregamento" e desativar variável de "Erro"
        this.countryDataLoading = true;
        this.countryDataErro = false;
        this.localEmit();
        // Fazendo requisição
        await this.casesDataReq()
          .then((res) => {
            // Verificando retorno de dados
            if (res.data.resError) {
              this.countryDataLoading = false;
              this.countryDataErro = true;
              this.localEmit();
            } else {
              this.countryDataLoading = false;
              this.countryData = res.data.countryCases;
              this.localEmit();
            }
          })
          .catch(() => {
            // Mantendo os dados apagados caso nenhum país seja selecionado
            if (this.countryData.length == 0) {
              this.countryData = false;
            }

            // Desativando variável de "Carregamento" e ativando variável de "Erro"
            this.countryDataLoading = false;
            this.countryDataErro = true;

            this.localEmit();
          });

        this.localEmit();
      }
    },
  },
  mounted() {
    // Lista do nome dos países
    casesList.toList().then((res) => {
      this.countryList = res.data;
    });
  },
};
