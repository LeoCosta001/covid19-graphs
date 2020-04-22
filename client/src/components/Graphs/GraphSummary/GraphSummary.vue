<template>
  <div class="localContainer">
    <h2 class="title">Gráfico Resumido</h2>

    <!-- Seleção de datas para exibição de dados -->
    <div class="data__select__container" v-if="countryData.countryData">
      <div class="data__select">
        <div>
          <p>De:</p>
          <FunctionalCalendar
            @choseDay="attTableData"
            v-model="calendarMinDay"
            :placeholder="minDayPlaceholder"
            :is-dark="true"
            :is-modal="true"
            :limits="{min: '22/01/2020', max: maxLimit}"
            :change-month-function="true"
            :is-date-picker="true"
          ></FunctionalCalendar>
        </div>
        <div>
          <p>Até:</p>
          <FunctionalCalendar
            @choseDay="attTableData"
            v-model="calendarMaxDay"
            :placeholder="maxDayPlaceholder"
            :is-dark="true"
            :is-modal="true"
            :limits="{min: '22/01/2020', max: maxLimit}"
            :change-month-function="true"
            :is-date-picker="true"
          ></FunctionalCalendar>
        </div>
      </div>
      <div class="data__error__msg" v-if="inputTableDataNumberInvalid">
        <p class="error__msg__title">Data invalida!</p>
        <p class="error__msg__content">A data de ínicio tem que ser menor que a data final.</p>
      </div>
    </div>

    <!-- Título -->
    <article class="about__graph">
      <hr />
      <h3>Registro Total</h3>
      <p>Dados atualizados diariamente com a soma de todos os registros.</p>
      <hr />
    </article>

    <!-- Registro Total -->
    <section class="graph__content__container">
      <!-- Mensagem de país não selecionado -->
      <div v-if="!countryData.countryData">
        <div class="select__country__msg__container">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </div>

      <!-- Grafico em Linha -->
      <div class="graph__container">
        <GraphSummaryAppLine ref="graphSummaryAppLine" :country-data="countryData" />
      </div>
    </section>
  </div>
</template>

<script src="./GraphSummary.js">
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// Mixin
@import "@/sass/mixin/alerts/invalidDate";
@import "@/sass/mixin/alerts/unselectCountry";
@import "@/sass/mixin/titles/graphTitles";
@import "@/sass/mixin/mediaQueries/dateSelection";
@import "@/sass/mixin/modifiers/unselectCountry";

// SCSS deste componente
@import "./GraphSummary";
@import "./GraphSummary_Media";
@import "./modifiers";
</style>