<template>
  <div class="localContainer">
    <DataOptions @DataOptions_return="dataOptionsReturn" />
    <CountriesCharts ref="attGraphData" :country-data="dataOptions" />
  </div>
</template>

<script src="./CountriesCharts.js"></script>
