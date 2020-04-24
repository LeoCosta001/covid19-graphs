<template>
  <div class="localContainer">
    <CountriesCharts
      ref="attGraphData"
      @selectTableDataNumber="showDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./CountriesCharts.js">
</script>
