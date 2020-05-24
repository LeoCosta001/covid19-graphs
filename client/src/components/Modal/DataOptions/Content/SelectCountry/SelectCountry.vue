<template>
  <div class="select__country__container">
    <article class="select__country">
      <div>
        <p>Escolha um país:</p>
        <form>
          <select
            v-if="countryList"
            v-model="countrySelected"
            @change="selectCountryAtt"
            name="country_select"
          >
            <option value="undefined" disabled selected
              >Selecione um País</option
            >
            <option
              :value="data.country"
              v-for="(data, index) in countryList"
              :key="index"
              >{{ data.countryTranslation }}</option
            >
          </select>
          <select v-else>
            <option value="undefined" disabled selected>Carregando...</option>
          </select>
        </form>
      </div>
    </article>
  </div>
</template>

<script src="./SelectCountry.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./SelectCountry";
</style>
