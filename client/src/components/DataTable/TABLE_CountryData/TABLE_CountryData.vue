<template>
  <div class="localContainer">
    <h2 class="title_h2">Tabela de Dados Registrados</h2>
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
            :limits="{ min: '22/01/2020', max: maxLimit }"
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
            :limits="{ min: '22/01/2020', max: maxLimit }"
            :change-month-function="true"
            :is-date-picker="true"
          ></FunctionalCalendar>
        </div>
      </div>
      <div class="data__error__msg" v-if="inputTableDataNumberInvalid">
        <p class="error__msg__title">Data invalida!</p>
        <p class="error__msg__content">
          A data de ínicio tem que ser menor que a data final.
        </p>
      </div>
    </div>

    <!-- Registro Total -->
    <section class="graph__content__container">
      <!-- Mensagem de país não selecionado -->
      <div v-if="!countryData.countryData">
        <div class="select__country__msg__container">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </div>

      <!-- Tabela -->
      <article class="table__container" v-if="countryData.countryData">
        <table class="countryDataTable__main">
          <thead class="main__thead">
            <tr>
              <th>Data</th>
              <th>Casos confirmados</th>
              <th>Mortos</th>
              <th>Recuperados</th>
            </tr>
          </thead>
          <tbody
            v-for="(data, index) in countryData.countryData()"
            :key="index"
            class="main__tbody"
          >
            <tr @click="tableLineDetail(index)" class="main__tr">
              <td>{{ data.date }}</td>
              <td>{{ data.confirmed }}</td>
              <td>{{ data.deaths }}</td>
              <td>{{ data.recovered }}</td>
            </tr>
            <tr v-if="tableLineDetailStatus == index">
              <td colspan="4">
                <table class="countryDataTable__internal">
                  <thead>
                    <tr>
                      <th>Informação</th>
                      <th>Casos confirmados</th>
                      <th>Mortos</th>
                      <th>Recuperados</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>Novos registros deste dia:</td>
                      <td>{{ data.in24Hours.confirmed }}</td>
                      <td>{{ data.in24Hours.deaths }}</td>
                      <td>{{ data.in24Hours.recovered }}</td>
                    </tr>
                    <tr>
                      <td>Taxa de crescimento:</td>
                      <td>{{ data.growthRate.confirmed }}%</td>
                      <td>{{ data.growthRate.deaths }}%</td>
                      <td>{{ data.growthRate.recovered }}%</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article
        v-else
        class="table__container"
        :class="{ 'unselect--country': !countryData.countryData }"
      >
        <table class="countryDataTable__main">
          <thead class="main__thead">
            <tr>
              <th>Data</th>
              <th>Casos confirmados</th>
              <th>Mortos</th>
              <th>Recuperados</th>
            </tr>
          </thead>
          <tbody class="main__tbody">
            <tr class="main__tr">
              <td>00/00/0000</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td colspan="4">
                <table class="countryDataTable__internal">
                  <thead>
                    <tr>
                      <th>Informação</th>
                      <th>Casos confirmados</th>
                      <th>Mortos</th>
                      <th>Recuperados</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>Novos registros deste dia:</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Taxa de crescimento:</td>
                      <td>0%</td>
                      <td>0%</td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  </div>
</template>

<script src="./TABLE_CountryData.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// Mixin
@import "@/sass/mixin/alerts/invalidDate";
@import "@/sass/mixin/alerts/unselectCountry";
@import "@/sass/mixin/containers/localContainerDefault";
@import "@/sass/mixin/mediaQueries/dateSelection";
@import "@/sass/mixin/modifiers/unselectCountry";
@import "@/sass/mixin/titles/title_h2";

// SCSS deste componente
@import "./TABLE_CountryData";
@import "./TABLE_CountryData_Media";
@import "./modifiers";
</style>
