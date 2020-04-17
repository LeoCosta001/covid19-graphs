<template>
  <div class="home">
    <TABLECountryData
      @selectTableDataNumber="showDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./Home.js">
</script>
