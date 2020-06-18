<template>
  <div id="app">
    <MainHeader />
    <!-- fix-bm-overlay escurece a tela ao abrir o menu, ele é editado em @/sass/global/externalComponents/sideBar_vueBurgerMenu -->
    <div class="fix-bm-overlay"></div>
    <router-view class="router__view" />
    <MainFooter class="MainFooter" />
  </div>
</template>

<script>
// Componentes
import MainHeader from "@/components/Header/Header_Menu/Header_Menu.vue";
import MainFooter from "@/components/MainFooter/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter
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
  display: flex;
  justify-content: center;
  min-height: 100%;
}

#app {
  background-color: $flatLightMidnightBlue;
  color: $flatLightGrey;
  font-family: "Open Sans";
  width: 100%;
}

.router__view {
  min-height: calc(100vh - 275px);
}

@media (max-width: 1000px) {
  .router__view {
    min-height: calc(100% - 460px);
  }
}

@media (max-width: 780px) {
  .router__view {
    min-height: calc(100% - 915px);
  }
}
</style>
