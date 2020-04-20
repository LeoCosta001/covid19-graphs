<template>
  <div class="localContainer">
    <GraphSummary
      ref="attGraphData"
      @selectTableDataNumber="showDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./GraphSummary.js">
</script>
