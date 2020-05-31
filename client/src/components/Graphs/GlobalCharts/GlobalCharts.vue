<template>
  <div class="localContainer">
    <h2 class="title__h2">Dados do COVID-19 no Mundo</h2>
    <p class="global__charts__subtitle">Dados atualizado de acordo com a data selecionada "{{ reqResult.selectedValues.selectDate.lastDate }}".</p>

    <!-- Título -->
    <article
      class="about__content"
      id="global-map"
      v-if="reqResult.selectedValues.selectInfo.globalMap"
    >
      <hr />
      <h3>Mapa Mundial</h3>
      <hr />
    </article>

    <!-- Mapa global -->
    <section class="content__container" v-if="reqResult.selectedValues.selectInfo.globalMap">
      <article class="component__GlobalMapApp__container">
        <GlobalMapApp ref="attGlobalMapApp" />
      </article>
    </section>

    <!-- Título -->
    <article
      class="about__content"
      id="countries-rank"
      v-if="reqResult.selectedValues.selectInfo.countriesRank"
    >
      <hr />
      <h3>Rank dos países</h3>
      <p>Rank baseado no tipo de dado selecionado "{{ reqResult.selectedValues.selectDataType.dataTypeTranslated }}".</p>
      <hr />
    </article>

    <!-- Rank dos países -->
    <section class="content__container" v-if="reqResult.selectedValues.selectInfo.countriesRank">
      <article class="component__GlobalRankApp__container">
        <GlobalRankApp ref="attGlobalRankApp" />
      </article>
    </section>

    <!-- Título -->
    <article
      class="about__content"
      id="global-summary"
      v-if="reqResult.selectedValues.selectInfo.globalSummary"
    >
      <hr />
      <h3>Resumo global</h3>
      <p>Soma de todos os registros até a data selecionada "{{ reqResult.selectedValues.selectDate.lastDate }}".</p>
      <hr />
    </article>
        <!-- Rank dos países -->
    <section class="content__container" v-if="reqResult.selectedValues.selectInfo.globalSummary">
      <article class="component__GlobalSummary__container">
        <GlobalSummary ref="attGlobalSummaryApp" />
      </article>
    </section>
  </div>
</template>

<script src="./GlobalCharts.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// Mixin
@import "@/sass/mixin/alerts/unselectCountry";
@import "@/sass/mixin/containers/localContainerDefault";
@import "@/sass/mixin/titles/graphTitles";
@import "@/sass/mixin/titles/title_h2";

// SCSS deste componente
@import "./GlobalCharts";
@import "./GlobalCharts_Media";
</style>
