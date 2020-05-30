<template>
  <div class="GlobalSummaryContainer">
    <!-- Conteiner da soma de todos os registros -->
    <section class="all__register__container">
      <!-- Casos Confirmados -->
      <article class="all__register__item__container">
        <span class="all__register__title">Casos Confirmados:</span>
        <span class="all__register__value">{{ valueWithPoints.confirmed }} ({{ percentageValue.confirmed }}%)</span>
      </article>

      <!-- Recuperados -->
      <article class="all__register__item__container">
        <span class="all__register__title">Recuperados:</span>
        <span class="all__register__value">{{ valueWithPoints.recovered }} ({{ percentageValue.recovered }}%)</span>
      </article>

      <!-- Mortos -->
      <article class="all__register__item__container">
        <span class="all__register__title">Mortos:</span>
        <span class="all__register__value">{{ valueWithPoints.deaths }} ({{ percentageValue.deaths }}%)</span>
      </article>
    </section>

    <!-- Gráfico de Doughnut -->
    <section class="graph__doughnut__container">
      <GlobalSummaryAppDoughnut ref="attGlobalSummaryAppDoughnut" class="graph__doughnut" />
    </section>
  </div>
</template>

<script src="./GlobalSummary.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./GlobalSummary";
@import "./GlobalSummary_Media";
</style>