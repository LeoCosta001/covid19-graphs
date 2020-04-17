<template>
  <div class="home">
    <HeaderMenu @resCountryData="countryData" />
    <TABLECountryData
      @selectTableDataNumber="tableShowDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./Home.js">
</script>
