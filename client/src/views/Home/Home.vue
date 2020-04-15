<template>
  <div class="home">
    <FORMSelectCountry @resCountryData="countryData" />
    <TABLECountryData
      @selectTableDataNumber="tableShowDataNumber"
      :country-data="resForTableCountryData"
    />
  </div>
</template>

<script src="./Home.js">
</script>
