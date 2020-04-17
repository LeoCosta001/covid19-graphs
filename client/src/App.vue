<template>
  <div id="app">
    <!-- fix-bm-overlay é editado em @/sass/global/externalComponents/sideBar_vueBurgerMenu -->
    <div class="fix-bm-overlay"></div>
    <router-view />
  </div>
</template>

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
