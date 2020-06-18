<template>
  <div class="localContainer">
    <DataOptions ref="modalDataOption" @DataOptions_return="dataOptionsReturn" />
    <CountriesCharts ref="attGraphData" @OpenModalDataOption="showModalDataOption" :country-data="dataOptions" />
  </div>
</template>

<script src="./CountriesCharts.js"></script>
