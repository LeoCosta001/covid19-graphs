<template>
  <div class="GlobalMapAppContainer">
    <!-- Mapa global -->
    <section id="globalMapContainer" class="globalmap__container" >
      <GChart type="GeoChart" :data="chartData" :options="chartOptions" :settings="{packages: ['geochart'], mapsApiKey: 'AIzaSyAOU_B-vboM6gPUGO2BI0g6YcRzqRNRQ68'}" />
    </section>

    <!-- Botões laterais -->
    <section class="aside__map__button__container">
        <div @click="zoomIn" class="zoom__in__button map__button__box">
          <span>
            <unicon class="unicon" name="search-plus" width="25px" height="25px" />
          </span>
        </div>
        <div @click="zoomOut" class="zoom__out__button map__button__box">
          <span>
            <unicon class="unicon" name="search-minus" width="25px" height="25px" />
          </span>
        </div>
    </section>
  </div>
</template>

<script src="./GlobalMapApp.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./GlobalMapApp";
</style>
