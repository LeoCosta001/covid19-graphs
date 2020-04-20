<template>
  <div>
    <form>
      <select
        v-if="countryList"
        v-model="countrySelected"
        @change="casesData"
        name="country_select"
        id="countrySelect"
      >
        <option value="undefined" disabled selected>Selecione um País</option>
        <option :value="country" v-for="(country, index) in countryList" :key="index">{{ country }}</option>
      </select>
      <select v-else>
        <option value="undefined" disabled selected>Carregando...</option>
      </select>
    </form>
  </div>
</template>

<script src="./FORM_SelectCountry.js">
</script>

<style scoped lang="scss">
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./FORM_SelectCountry";
</style>
