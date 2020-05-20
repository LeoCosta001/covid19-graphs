<template>
  <div class="select__date__container">
    <article class="select__date">
      <div>
        <p>De:</p>
        <FunctionalCalendar
          @choseDay="checkDate"
          v-model="firstDate"
          :placeholder="firstDatePlaceholder"
          :is-dark="true"
          :is-modal="true"
          :limits="{min: '22/01/2020', max: maxDate}"
          :change-month-function="true"
          :is-date-picker="true"
        ></FunctionalCalendar>
      </div>
      <div>
        <p>Até:</p>
        <FunctionalCalendar
          @choseDay="checkDate"
          v-model="lastDate"
          :placeholder="lastDatePlaceholder"
          :is-dark="true"
          :is-modal="true"
          :limits="{min: '22/01/2020', max: maxDate}"
          :change-month-function="true"
          :is-date-picker="true"
        ></FunctionalCalendar>
      </div>
    </article>
  </div>
</template>

<script src="./SelectDate.js">
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./SelectDate";
</style>