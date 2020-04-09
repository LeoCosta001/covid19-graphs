<template>
  <div class="home">
    <FORMSelectCountry @resCountryData="countryData" />
    <TABLECountryData :country-data="resCountryData" />
  </div>
</template>

<script>
// @ is an alias to /src
import FORMSelectCountry from "@/components/Home/FORM_SelectCountry/FORM_SelectCountry.vue";
import TABLECountryData from "@/components/Home/TABLE_CountryData/TABLE_CountryData.vue";

export default {
  name: "Home",
  components: {
    FORMSelectCountry,
    TABLECountryData
  },
  data() {
    return {
      resCountryData: undefined
    }
  },
  methods: {
    countryData(req) {
      console.log(req.cuntryData)
      this.resCountryData = req;
    }
  }
};
</script>
