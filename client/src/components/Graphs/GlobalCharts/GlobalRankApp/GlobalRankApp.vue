<template>
  <div class="GlobalRankAppContainer">
    <!-- Lista de países -->
    <section class="rank__list__container">
      <div
        v-for="(data, index) in newGlobalRankData.data"
        :key="index"
        @click="attgraphDoughnut(data.country, data.countryTranslated)"
        class="rank__item__container"
      >
        <span class="rank__position">{{ index + 1 }}º</span>
        <div>
          <span class="rank__country__name">{{ data.countryTranslated }}</span>
          <span
            class="rank__value"
            v-if="newGlobalRankData.selectedValues.selectDataType.dataType == 'confirmed'"
          >{{ data.valueWithPoints.confirmed }} ({{ data.globalPercentage.confirmed }}%)</span>
          <span
            class="rank__value"
            v-if="newGlobalRankData.selectedValues.selectDataType.dataType == 'deaths'"
          >{{ data.valueWithPoints.deaths }} ({{ data.globalPercentage.deaths }}%)</span>
          <span
            class="rank__value"
            v-if="newGlobalRankData.selectedValues.selectDataType.dataType == 'recovered'"
          >{{ data.valueWithPoints.recovered }} ({{ data.globalPercentage.recovered }}%)</span>
        </div>
      </div>
    </section>

    <!-- Gráfico de Doughnut -->
    <section class="graph__doughnut__container">
      <span class="graph__doughnut__title">
        {{ countryRankSelected.countryTranslateSelected }}
      </span>
      <GlobalRankAppDoughnut ref="attGlobalRankAppDoughnut" class="graph__doughnut" />
    </section>
  </div>
</template>

<script src="./GlobalRankApp.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./GlobalRankApp";
@import "./GlobalRankApp_Media";
</style>
