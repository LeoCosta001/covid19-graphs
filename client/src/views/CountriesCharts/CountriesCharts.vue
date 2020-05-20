<template>
  <div class="localContainer">
    <DataOptions />>
    <CountriesCharts
      ref="attGraphData"
      @selectTableDataNumber="showDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./CountriesCharts.js">
</script>
