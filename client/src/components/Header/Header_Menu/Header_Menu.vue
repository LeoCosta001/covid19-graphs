<template>
  <div class="localContainer">
    <!-- Menu lateral -->
    <div class="open__menu">
      <Slide>
        <hr />
        <!-- Link para Início -->
        <router-link to="#" class="menu__link__1">
          <unicon class="unicon" name="home" width="27.5px" height="27.5px" />
          <span class="link__title__1">Início</span>
        </router-link>
        <hr />
        <!-- Link para Tabela de Dados -->
        <router-link to="#" class="menu__link__1">
          <unicon class="unicon" name="list-ul" width="27.5px" height="27.5px" />
          <span class="link__title__1">Tabela de Dados</span>
        </router-link>
        <hr />
        <!-- Link para Gráficos -->
        <input type="checkbox" id="checkGraphcsList" />
        <label class="menu__link__1" for="checkGraphcsList">
          <unicon class="unicon" name="presentation-lines-alt" width="27.5px" height="27.5px" />
          <span class="link__title__1">Gráficos</span>
        </label>
        <hr />
        <!-- Sublinks de Gráficos -->
        <span class="graphcs__list">
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="chart-line" width="23px" height="23px" />
            <span class="link__title__2">Resumo</span>
          </router-link>
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="chart-growth" width="23px" height="23px" />
            <span class="link__title__2">Taxa de Crescimento</span>
          </router-link>
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="chart-bar" width="23px" height="23px" />
            <span class="link__title__2">Comparar Países</span>
          </router-link>
        </span>
        <!-- Link para Dúvidas -->
        <input type="checkbox" id="checkQuestionList" />
        <label class="menu__link__1" for="checkQuestionList">
          <unicon class="unicon" name="question-circle" width="27.5px" height="27.5px" />
          <span class="link__title__1">Dúvidas</span>
        </label>
        <hr />
        <!-- Sublinks de Dúvidas -->
        <span class="question__list">
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="heart-medical" width="23px" height="23px" />
            <span class="link__title__2">Cuidados passoais</span>
          </router-link>
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="ambulance" width="23px" height="23px" />
            <span class="link__title__2">Emergencia</span>
          </router-link>
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="cell" width="23px" height="23px" />
            <span class="link__title__2">Covid-19</span>
          </router-link>
        </span>
      </Slide>
      <!-- Texto ao lado do botão que abre o menu -->
      <p class="open__menu__title">MENU</p>
    </div>

    <!-- Titulo principal da página -->
    <div class="page__title">COVID-19</div>

    <!-- Seleção de países -->
    <div class="country__select">
      <FORMSelectCountry class="country__select__input" @resCountryData="countryDataEmit" />
      <!-- Icone informativo de requisição para o client -->
      <div class="data__req__status">
        <div v-if="countryDataErro">
          <unicon class="unicon__error" name="exclamation-octagon" width="27.5px" height="27.5px" />
          <!-- ERRO! Não foi possivel carregar os dados.
          <br />Tente novamente mais tarde.-->
        </div>
        <div v-else>
          <div v-if="countryDataLoading">
            <unicon class="unicon__loading" name="sync" width="25px" height="25px" />
          </div>
          <div v-else>
            <unicon class="unicon__complete" name="check-circle" width="27.5px" height="27.5px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// APIs
import { Slide } from "vue-burger-menu";
// Componentes
import FORMSelectCountry from "@/components/Home/FORM_SelectCountry/FORM_SelectCountry.vue";

export default {
  name: "HeaderMenu",
  components: {
    Slide,
    FORMSelectCountry
  },
  data() {
    return {
      countryDataLoading: false,
      countryDataErro: false
    };
  },
  methods: {
    // Emitir dados que foram recebidos pelo "FORMSelectCountry" e recolher dados de status do carregamento
    countryDataEmit(res) {
      this.countryDataLoading = res.countryDataLoading;
      this.countryDataErro = res.countryDataErro;
      this.$emit("resCountryData", res);
    }
  }
};
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// OBS: Para cada item da sublista das classes "question__list" e "graphcs__list" deve ser adicionado mais 35px de altura.
$question__list__height: 105px;
$graphcs__list__height: 105px;

/*
* OBS: Os "!important" servem para resolver o conflito dos estilos pré-definidos pelo "vue-burger-menu".
*/

hr {
  margin: 0px;
}

.localContainer {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: space-between;
  z-index: 999;

  & div {
    align-items: center;
    white-space: nowrap;
    display: flex;
  }
}

.open__menu {
  width: 450px;
  padding: 0px 60px 0px 60px;
  justify-content: flex-start;

  & .open__menu__title {
    justify-self: flex-end;
    margin-top: 15px;
    font-weight: 300;
    font-size: 1.5em;
    letter-spacing: 2px;
  }
  // Estilo dos elementos que estão dentro do menu
  & .menu__link__1 {
    padding: 10px 0px 10px 20px !important;
  }

  & .menu__link__1,
  & .menu__link__2 {
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none !important;

    & .unicon {
      fill: $flatLightGrey;
      transition: 0.1s;
    }

    &:hover .unicon {
      fill: $flatLightGreenSea;
    }

    & .link__title__1 {
      letter-spacing: 1px;
      transition: 0.1s;
    }

    &:hover .link__title__1,
    &:hover .link__title__2 {
      color: $flatLightGreenSea !important;
    }
  }

  /*
  * Dropdown do menu
  */
  & input {
    display: none;
  }

  & .link__title__2 {
    color: $flatLightGrey;
    font-size: 0.8em;
    font-weight: 500 !important;
    letter-spacing: 1px;
    margin-left: 10px;
    transition: 0.1s;
  }

  & .question__list,
  & .graphcs__list {
    background-color: $flatSmoke25;
    height: 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.5s;

    & .menu__link__2 {
      padding: 6px 0px 6px 50px;

      &:hover {
        background-color: $flatMidnightBlue25;
      }
    }
  }

  & #checkQuestionList:checked ~ .question__list {
    height: $question__list__height;
  }

  & #checkGraphcsList:checked ~ .graphcs__list {
    height: $graphcs__list__height;
  }
}

.page__title {
  font-weight: 300;
  font-size: 2.5em;
  letter-spacing: 2px;
  justify-content: center;
  flex: 2;
}

.country__select {
  justify-content: flex-end;
  padding: 0px 60px 0px 60px;
  width: 450px;

  & .country__select__input {
    margin-right: 10px;
  }
}

.data__req__status {
  & .unicon__error {
    fill: $flatLightRed;
  }

  & .unicon__loading {
    margin: 1px;
    fill: $flatLightSmoke;
    animation: __rotate__unicon__loading 1s linear 0s normal infinite none
      running;
  }

  & .unicon__complete {
    fill: $flatLightGreen;
  }
}

/*
* ##### Keyframes #####
*/

// Animação de rotação para o icone de "Loading"
@keyframes __rotate__unicon__loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>