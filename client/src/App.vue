<template>
  <div id="app">
    <MainHeader @resCountryData="countryData" />
    <!-- fix-bm-overlay é editado em @/sass/global/externalComponents/sideBar_vueBurgerMenu -->
    <div class="fix-bm-overlay"></div>
    <router-view ref="childReqData" :reqCountryData="resCountryData" />
    <MainFooter class="MainFooter" />
  </div>
</template>

<script>
// Métodos
import mapData from "@/methods/changeData/mapData.js";

// Componentes
import MainHeader from "@/components/Header/Header_Menu/Header_Menu.vue";
import MainFooter from "@/components/MainFooter/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter
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
      };
      // Ativando o método do componente filho que receberá os dados
      this.$refs.childReqData.showDataNumber();
    }
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
