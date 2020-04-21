<template>
  <div class="localContainer">
    <GraphGrowthRate
      ref="attGraphData"
      @selectTableDataNumber="showDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./GraphGrowthRate.js">
</script>
