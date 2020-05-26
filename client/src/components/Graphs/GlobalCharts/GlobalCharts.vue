<template>
  <div class="localContainer">
    <h2 class="title__h2">Dados do COVID-19 no Mundo</h2>

    <!-- Título -->
    <article class="about__content" id="summary-graph">
      <hr />
      <h3>Mapa Mundial</h3>
      <hr />
    </article>

    <!-- Mapa global -->
    <section class="content__container">
      <article class="geochart__data__type__container"></article>
      <article class="geochart__map__container">
        <GlobalMapApp ref="attGlobalMapApp" :globalDataOptions="globalData" />
      </article>
    </section>

    <!-- Título -->
    <article class="about__content" id="summary-graph">
      <hr />
      <h3>Rank dos países</h3>
      <p>Lista atualizada diariamente com os registros de todos os países.</p>
      <hr />
    </article>
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
