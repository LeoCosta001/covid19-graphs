<template>
  <div class="localContainer">
    <h2 class="title">Gráfico da Taxa de Crescimento</h2>

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
      <h3>Resumo</h3>
      <p>Cálculo da Taxa de Crescimento e quantidade de Novos Registros relacionando apenas as duas datas selecionadas.</p>
      <hr />
    </article>

    <!-- Gráfico de Doughnut -->
    <section class="graph__content__container">
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.countryData">
        <div class="select__country__msg__container">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Conteúdo -->
      <div
        class="graph__doughnut__container"
        :class="{'unselect--country': !countryData.countryData}"
      >
        <div class="graph__doughnut__content">
          <!-- Tabela (Total de Novos Registros)-->
          <table>
            <thead>
              <tr>
                <th colspan="2">Total de Novos Registros</th>
              </tr>
            </thead>
            <tbody class="main__tbody">
              <tr>
                <td>Casos Confirmados:</td>
                <td>{{ graphDoughnutTable.confirmed }}</td>
              </tr>
              <tr>
                <td>Mortos:</td>
                <td>{{ graphDoughnutTable.deaths }}</td>
              </tr>
              <tr>
                <td>Recuperados:</td>
                <td>{{ graphDoughnutTable.recovered }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Tabela (Taxa de Crescimento Total)-->
          <table>
            <thead>
              <tr>
                <th colspan="2">Taxa de Crescimento Total</th>
              </tr>
            </thead>
            <tbody class="main__tbody">
              <tr>
                <td>Casos Confirmados:</td>
                <td>
                  <span
                    v-if="graphDoughnutTable.growthRate.confirmed != undefined"
                  >+{{ graphDoughnutTable.growthRate.confirmed }}%</span>
                </td>
              </tr>
              <tr>
                <td>Mortos:</td>
                <td>
                  <span
                    v-if="graphDoughnutTable.growthRate.deaths != undefined"
                  >+{{ graphDoughnutTable.growthRate.deaths }}%</span>
                </td>
              </tr>
              <tr>
                <td>Recuperados:</td>
                <td>
                  <span
                    v-if="graphDoughnutTable.growthRate.recovered != undefined"
                  >+{{ graphDoughnutTable.growthRate.recovered }}%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Gráfico de Doughnut -->
        <div class="graph__doughnut">
          <GraphGrowthRateAppDoughnut
            ref="graphGrowthRateAppDoughnut"
            @resGraphDataEmit="reqGraphDataEmit"
            :country-data="countryData"
          />
        </div>
      </div>
    </section>

    <!-- Título -->
    <article class="about__graph">
      <hr />
      <h3>Taxa de Crescimento Diário</h3>
      <p>Cálculo da Taxa de Crescimento relacionando sempre com o dia anterior.</p>
      <hr />
    </article>

    <section class="graph__content__container">
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.countryData">
        <div class="select__country__msg__container">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Gráfico Linear -->
      <div class="graph__container" :class="{'unselect--country': !countryData.countryData}">
        <GraphGrowthRateAppBar ref="GraphGrowthRateAppBar" :country-data="countryData" />
      </div>
    </section>

    <!-- Título -->
    <article class="about__graph">
      <hr />
      <h3>Novos Registros Diário</h3>
      <p>Dados com a quantidade de todos os novos registros diários.</p>
      <hr />
    </article>

    <section class="graph__content__container">
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.countryData">
        <div class="select__country__msg__container">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Gráfico Linear -->
      <div class="graph__container" :class="{'unselect--country': !countryData.countryData}">
        <GraphGrowthRateAppLine ref="graphGrowthRateAppLine" :country-data="countryData" />
      </div>
    </section>

    <!-- Título -->
    <article class="about__graph">
      <hr />
      <h3>Informações Adicionais</h3>
      <p>Estas informações são baseadas nas datas selecionadas.</p>
      <hr />
    </article>

    <!-- Informações Adicionais (Conteúdo) -->
    <section class="graph__content__container">
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.countryData">
        <div class="select__country__msg__container">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Tabela -->
      <article :class="{'unselect--country': !countryData.countryData}">
        <table class="countryDataTable__main">
          <tbody class="main__tbody">
            <tr class="main__tr">
              <td colspan="3">Dia com o maior registro de "Casos Confirmados"</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="countryDataTable__internal">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Quantidade de novos registros</th>
                      <th>Total de registros</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>00/00/0000</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr class="main__tr">
              <td colspan="3">Dia com o maior registro de "Mortos"</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="countryDataTable__internal">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Quantidade de novos registros</th>
                      <th>Total de registros</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>00/00/0000</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr class="main__tr">
              <td colspan="3">Dia com o maior registro de "Recuperados"</td>
            </tr>
            <tr>
              <td colspan="3">
                <table class="countryDataTable__internal">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Quantidade de novos registros</th>
                      <th>Total de registros</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>00/00/0000</td>
                      <td>0</td>
                      <td>0</td>
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

<script src="./GraphGrowthRate.js">
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
@import "./GraphGrowthRate";
@import "./GraphGrowthRate_Media";
@import "./modifiers";
</style>