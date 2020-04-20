<template>
  <div id="headerBar" class="localContainer" :class="{'hide--headerbar': !showHeaderbar}">
    <!-- Menu lateral -->
    <div class="open__menu">
      <Slide>
        <hr />
        <!-- Link para Início -->
        <router-link to="/" class="menu__link__1">
          <unicon class="unicon" name="home" width="27.5px" height="27.5px" />
          <span class="link__title__1">Início</span>
        </router-link>
        <hr />
        <!-- Link para Tabela de Dados -->
        <div v-on:click="casesDataAtt()">
          <router-link to="/data-table" class="menu__link__1">
            <unicon class="unicon" name="list-ul" width="27.5px" height="27.5px" />
            <span class="link__title__1">Tabela de Dados</span>
          </router-link>
        </div>
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
        <div v-on:click="casesDataAtt()">
          <router-link to="/graphs/graph-summary" class="menu__link__2">
            <unicon class="unicon" name="chart-line" width="23px" height="23px" />
            <span class="link__title__2">Resumo</span>
          </router-link>
        </div>
        <div v-on:click="casesDataAtt()">
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="chart-growth" width="23px" height="23px" />
            <span class="link__title__2">Taxa de Crescimento</span>
          </router-link>
        </div>
        <div v-on:click="casesDataAtt()">
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="chart-bar" width="23px" height="23px" />
            <span class="link__title__2">Comparar Países</span>
          </router-link>
        </div>
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
            <span class="link__title__2">Cuidados Pessoais</span>
          </router-link>
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="frown" width="23px" height="23px" />
            <span class="link__title__2">Sintomas</span>
          </router-link>
          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="ambulance" width="23px" height="23px" />
            <span class="link__title__2">Emergência</span>
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
      <FORMSelectCountry
        class="country__select__input"
        ref="casesDataReqAtt"
        @resCountryData="countryDataEmit"
      />

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
// Métodos
import _debounce from "@/methods/others/debounceFunction.js";

// APIs
import { Slide } from "vue-burger-menu";
// Componentes
import FORMSelectCountry from "@/components/Header/FORM_SelectCountry/FORM_SelectCountry.vue";

export default {
  name: "HeaderMenu",
  components: {
    Slide,
    FORMSelectCountry
  },
  data() {
    return {
      countryDataLoading: false,
      countryDataErro: false,
      // Posição do Scrollbar
      showHeaderbar: true,
      lastScrollPosition: 0
    };
  },
  methods: {
    casesDataAtt() {
      console.log("teste");
      this.$refs.casesDataReqAtt.casesData();
    },
    // Evento ativado quando é movido o Scrollbar
    onScroll() {
      // Posição atual do Scrollbar
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      // FIX: Não continuar caso o scroll de celular estiver menor que zero "0"
      if (currentScrollPosition < 0) {
        return;
      }

      // Ativando a variável que exibirá o Headerbar caso a posição atual do scrollbar seja menor que a ultima posição
      this.showHeaderbar = currentScrollPosition < this.lastScrollPosition;

      // Atualizar a ultima posição com a posição atual
      this.lastScrollPosition = currentScrollPosition;
    },

    // Emitir dados que foram recebidos pelo "FORMSelectCountry" e recolher dados de status do carregamento
    countryDataEmit(res) {
      this.countryDataLoading = res.countryDataLoading;
      this.countryDataErro = res.countryDataErro;
      this.$emit("resCountryData", res);
    }
  },
  mounted() {
    // Inicia o evento de scroll
    window.addEventListener("scroll", _debounce.use(this.onScroll, 200));
  },
  beforeDestroy() {
    // Finaliza o evento de scroll
    window.removeEventListener("scroll", _debounce.use(this.onScroll, 200));
  }
};
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// OBS: Para cada item da sublista das classes "question__list" e "graphcs__list" deve ser adicionado mais 35px de altura.
$question__list__height: 140px;
$graphcs__list__height: 105px;

// SCSS deste componente
@import "./Header_Menu";
@import "./keyframes";
@import "./modifiers";
</style>