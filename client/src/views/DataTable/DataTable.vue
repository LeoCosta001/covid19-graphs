<template>
  <div class="localContainer">
    <TABLECountryData
      @selectTableDataNumber="showDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./DataTable.js">
</script>
