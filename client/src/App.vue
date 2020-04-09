<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/sass/variables/_flatUiColors";
@import "@/sass/global/fontsImport";
@import "@/sass/global/resetStyles";

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
