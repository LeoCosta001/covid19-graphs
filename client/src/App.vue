<template>
  <div id="app">
    <HeaderMenu @resCountryData="countryData" />
    <!-- fix-bm-overlay é editado em @/sass/global/externalComponents/sideBar_vueBurgerMenu -->
    <div class="fix-bm-overlay"></div>
    <router-view ref="childReqData" :reqCountryData="resCountryData"/>
  </div>
</template>

<script>
// Métodos
import mapData from "@/methods/changeData/mapData.js";

// Componentes
import HeaderMenu from "@/components/Header/Header_Menu/Header_Menu.vue";

export default {
  name: "App",
  components: {
    HeaderMenu
  },
  data() {
    return {
      resCountryData: undefined
    };
  },
  methods: {
    countryData(req) {
      this.resCountryData = {
        countrySelected: req.countrySelected,
        countryData: mapData.init(req.countryData),
        countryDataLoading: req.countryDataLoading,
        countryDataErro: req.countryDataErro
      }
      // Ativando o método do componente filho que receberá os dados
      this.$refs.childReqData.showDataNumber()
    },
  }
};
</script>

<style lang="scss">
// Variáveis
@import "@/sass/variables/_flatUiColors";

// Base de estilos
@import "@/sass/global/fontsImport";
@import "@/sass/global/resetStyles";

// Componentes externos
@import "@/sass/global/externalComponents/sideBar_vueBurgerMenu";

body {
  background-color: $flatLightMidnightBlue;
  color: $flatLightGrey;
  font-family: "Open Sans";
  display: flex;
  justify-content: center;
}

#app {
  width: 90vw;
}
</style>
