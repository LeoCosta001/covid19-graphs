<template>
  <div id="headerBar" class="localContainer" :class="{'hide--headerbar': !showHeaderbar}">
    <!-- Menu lateral -->
    <div class="open__menu">
      <Slide>
        <!-- Titulo Principal -->
        <span class="menu__page__title">
          <span class="page__title">COVID-19</span>
        </span>
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
          <router-link to="/graphs/countries-charts" class="menu__link__2">
            <unicon class="unicon" name="schedule" width="23px" height="23px" />
            <span class="link__title__2">Escolher Data</span>
          </router-link>

          <router-link
            :to="{ path: '/graphs/countries-charts', hash: '#summary-graph'}"
            class="menu__link__2"
          >
            <unicon class="unicon" name="chart-growth" width="23px" height="23px" />
            <span class="link__title__2">Gráfico Resumido</span>
          </router-link>

          <router-link
            :to="{ path: '/graphs/countries-charts', hash: '#growth-rate'}"
            class="menu__link__2"
          >
            <unicon class="unicon" name="chart-bar" width="23px" height="23px" />
            <span class="link__title__2">Taxa de Crescimento</span>
          </router-link>

          <router-link
            :to="{ path: '/graphs/countries-charts', hash: '#new-register'}"
            class="menu__link__2"
          >
            <unicon class="unicon" name="chart-line" width="23px" height="23px" />
            <span class="link__title__2">Novos Registros</span>
          </router-link>

          <router-link
            :to="{ path: '/graphs/countries-charts', hash: '#summary'}"
            class="menu__link__2"
          >
            <unicon class="unicon" name="chart-pie" width="23px" height="23px" />
            <span class="link__title__2">Resumo</span>
          </router-link>

          <router-link
            :to="{ path: '/graphs/countries-charts', hash: '#additional-information'}"
            class="menu__link__2"
          >
            <unicon class="unicon" name="list-ul" width="27.5px" height="27.5px" />
            <span class="link__title__2">Informações Adicionais</span>
          </router-link>
        </span>

        <!-- Link para Comparar Países -->
        <router-link to="#" class="menu__link__1">
          <unicon class="unicon" name="chart" width="23px" height="23px" />
          <span class="link__title__1">Comparar Países</span>
        </router-link>
        <hr />

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
            <unicon class="unicon" name="heart" width="23px" height="23px" />
            <span class="link__title__2">Cuidados Pessoais</span>
          </router-link>

          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="frown" width="23px" height="23px" />
            <span class="link__title__2">Sintomas</span>
          </router-link>

          <router-link to="/questions/modes-of-transmission" class="menu__link__2">
            <unicon class="unicon" name="exclamation-triangle" width="23px" height="23px" />
            <span class="link__title__2">Meios de Transmissão</span>
          </router-link>

          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="comment-question" width="23px" height="23px" />
            <span class="link__title__2">Perguntas Frequentes</span>
          </router-link>

          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="ambulance" width="23px" height="23px" />
            <span class="link__title__2">Emergência</span>
          </router-link>

          <router-link to="#" class="menu__link__2">
            <unicon class="unicon" name="cell" width="23px" height="23px" />
            <span class="link__title__2">Sobre o COVID-19</span>
          </router-link>
        </span>
      </Slide>
      <!-- Texto ao lado do botão que abre o menu -->
      <p class="open__menu__text">MENU</p>
    </div>

    <!-- Titulo principal da página -->
    <div class="page__title">COVID-19</div>
    <div class="aside__header">Aqui vai mais botões...</div>

  </div>
</template>

<script src="./Header_Menu.js">
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// OBS: Para cada item da sublista das classes "question__list" e "graphcs__list" deve ser adicionado mais 35px de altura.
$question__list__height: 215px;
$graphcs__list__height: 220px;

// SCSS deste componente
@import "./Header_Menu";
@import "./Header_Menu_Media";
@import "./keyframes";
@import "./modifiers";
</style>