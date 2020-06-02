<template>
  <div id="headerBar" class="localContainer" :class="{ 'hide--headerbar': !showHeaderbar }">
    <!-- Menu lateral -->
    <div class="open__menu">
      <Slide>
        <!-- Titulo Principal -->
        <span class="menu__page__title">
          <span class="page__title">COVID-19</span>
        </span>
        <hr />

        <!-- Link para Início -->
        <router-link to="/" class="menu__link__1" @click.native="attSublinkGroup(false)">
          <unicon class="unicon" name="home" width="23px" height="23px" />
          <span class="link__title__1">Início</span>
        </router-link>
        <hr />

        <!-- Link para Gráficos dos Países -->
        <router-link
          to="/graphs/countries-charts"
          class="menu__link__1"
          @click.native="attSublinkGroup(false)"
        >
          <unicon class="unicon" name="presentation-lines-alt" width="23px" height="23px" />
          <span class="link__title__1">Gráficos dos Países</span>
        </router-link>
        <hr />

        <!-- Link para Gráficos Globais -->
        <router-link
          to="/graphs/global-charts"
          class="menu__link__1"
          @click.native="attSublinkGroup(false)"
        >
          <unicon class="unicon" name="chart" width="23px" height="23px" />
          <span class="link__title__1">Gráficos Globais</span>
        </router-link>
        <hr />

        <!-- Link para Dúvidas -->
        <input type="checkbox" id="checkQuestionList" v-model="questionListChecked" />
        <label class="menu__link__1" for="checkQuestionList">
          <unicon
            class="unicon"
            :class="{ 'link--group--active': sublinkGroup == 'questions' }"
            name="question-circle"
            width="23px"
            height="23px"
          />
          <span
            class="link__title__1"
            :class="{ 'link--group--active': sublinkGroup == 'questions' }"
          >Dúvidas</span>
          <unicon
            class="unicon__sub__menu__status"
            :class="{ 'link--group--active': sublinkGroup == 'questions', 'sub--link--questions--active': questionListChecked == true }"
            name="angle-right"
            width="23px"
            height="23px"
          />
        </label>
        <hr />

        <!-- Sublinks de Dúvidas -->
        <span class="question__list">
          <router-link
            to="/questions/personal-care"
            class="menu__link__2"
            @click.native="attSublinkGroup('questions')"
          >
            <unicon class="unicon" name="heart" width="23px" height="23px" />
            <span class="link__title__2">Cuidados Pessoais</span>
          </router-link>

          <router-link
            to="/questions/symptoms"
            class="menu__link__2"
            @click.native="attSublinkGroup('questions')"
          >
            <unicon class="unicon" name="frown" width="23px" height="23px" />
            <span class="link__title__2">Sintomas</span>
          </router-link>

          <router-link
            to="/questions/modes-of-transmission"
            class="menu__link__2"
            @click.native="attSublinkGroup('questions')"
          >
            <unicon class="unicon" name="exclamation-triangle" width="23px" height="23px" />
            <span class="link__title__2">Meios de Transmissão</span>
          </router-link>

          <router-link to="/questions/common-questions" class="menu__link__2" @click.native="attSublinkGroup('questions')">
            <unicon class="unicon" name="comment-question" width="23px" height="23px" />
            <span class="link__title__2">Perguntas Frequentes</span>
          </router-link>

          <router-link to="/questions/emergency" class="menu__link__2" @click.native="attSublinkGroup('questions')">
            <unicon class="unicon" name="ambulance" width="23px" height="23px" />
            <span class="link__title__2">Emergência</span>
          </router-link>

          <router-link to="/questions/about-covid-19" class="menu__link__2" @click.native="attSublinkGroup('questions')">
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

<script src="./Header_Menu.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// OBS: Para cada item da sublista das classes "question__list" deve ser adicionado mais 35px de altura.
$question__list__height: 215px;

// SCSS deste componente
@import "./Header_Menu";
@import "./Header_Menu_Media";
@import "./keyframes";
@import "./modifiers";
</style>
