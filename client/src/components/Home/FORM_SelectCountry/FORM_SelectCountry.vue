<template>
  <div class="localContainer">
    <div v-if="countryDataLoading">Carregando...</div>
    <div v-if="countryDataErro">
      ERRO! Não foi possivel carregar os dados.
      <br />Tente novamente mais tarde.
    </div>
    <form>
      <select
        v-if="countryList"
        v-model="countrySelected"
        @change="casesData"
        name="country_select"
        id="countrySelect"
      >
        <option value="undefined" disabled selected>Selecione um País</option>
        <option :value="country" v-for="(country) in countryList" :key="country">{{ country }}</option>
      </select>
    </form>
  </div>
</template>

<script>
import { http } from "@/axiosConfig/axiosConfig";
import casesList from "@/axiosConfig/countryList";

export default {
  name: "FORM_SelectCountry",
  data() {
    return {
      // Variaveis
      countrySelected: "undefined",
      countryList: false,
      countryData: undefined,
      countryDataLoading: false,
      countryDataErro: false,

      // Rota de requisição de dados para o back-end
      casesDataReq: () => {
        return http.get(`country-data/?country_select=${this.countrySelected}`);
      }
    };
  },
  computed: {
    // Dados para serem emitidos para outros componentes
    FORM_SelectCountryEmit() {
      return {
        countrySelected: this.countrySelected,
        countryData: this.countryData,
        countryDataLoading: this.countryDataLoading,
        countryDataErro: this.countryDataErro
      };
    }
  },
  props: {
    msg: String
  },
  methods: {
    // Método acionado quando é selecionado um novo país
    async casesData() {
      // Ativar variável de "Carregamento" e desativar variável de "Erro"
      this.countryDataLoading = true;
      this.countryDataErro = false;

      // Fazendo requisição
      await this.casesDataReq()
        .then(res => {
          // Verificando retorno de dados
          if (res.data.resError) {
            this.countryDataLoading = false;
            this.countryDataErro = true;
          } else {
            this.countryDataLoading = false;
            this.countryData = res.data.countryCases;
          }
        })
        .catch(err => {
          console.log(err);

          // Desativando variável de "Carregamento" e ativando variável de "Erro"
          this.countryDataLoading = false;
          this.countryDataErro = true;
        });
      console.log("teste: " + this.FORM_SelectCountryEmit.countrySelected);
      // Emitindo dados
      this.$emit("resCountryData", this.FORM_SelectCountryEmit);
    }
  },
  mounted() {
    // Lista do nome dos países
    casesList.toList().then(res => {
      this.countryList = res.data;
    });
  }
};
</script>

<style scoped lang="scss">
@import "@/sass/variables/_flatUiColors";

.localContainer {
  display: flex;
  flex-direction: column;
}

form {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  & select {
    background-color: $flatLightGrey;
    padding: 10px;
  }
}
</style>
