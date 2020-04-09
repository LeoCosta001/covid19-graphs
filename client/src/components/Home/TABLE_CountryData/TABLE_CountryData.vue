<template>
  <div class="localContainer">
    <div v-if="FORM_SelectCountryEmit.countryData">
      <table>
        <thead>
          <tr>
            <th>Data:</th>
            <th>Casos confirmados:</th>
            <th>Mortos:</th>
            <th>Recuperados:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in FORM_SelectCountryEmit.countryData" :key="data">
            <td>{{ data.date }}</td>
            <td>{{ data.confirmed }}</td>
            <td>{{ data.deaths }}</td>
            <td>{{ data.recovered }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TABLE_CountryData",
  props: {
    countryData: {
      type: Object,
      required: true,
      default: () => {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>