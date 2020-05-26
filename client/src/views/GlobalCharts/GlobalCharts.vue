<template>
  <div class="localContainer">
    <GlobalDataOptions @GlobalDataOptions_return="globalDataOptionsReturn" />>
    <GlobalCharts ref="attGlobalCharts" :global-data="globalDataOptions" />
  </div>
</template>

<script src="./GlobalCharts.js"></script>
