<template>
  <div class="localContainer">
    <h2 class="title__h2">
      Dados do COVID-19 no país:
      <br />
      {{ countryData.selectedValues.selectCountry.countryNameTranslated }}
    </h2>

    <!-- Título -->
    <article
      class="about__graph"
      id="summary-graph"
      v-if="countryData.selectedValues.selectInfo.summaryGraph"
    >
      <hr />
      <h3>Gráfico Resumido</h3>
      <p>Grafico atualizado diariamente com a soma de todos os novos registros.</p>
      <hr />
    </article>

    <!-- Gráfico Resumido -->
    <section
      class="graph__content__container"
      v-if="countryData.selectedValues.selectInfo.summaryGraph"
    >
      <!-- Mensagem de país não selecionado -->
      <div v-if="!countryData.data">
        <div class="select__country__msg__container" @click="openModalDataOption">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </div>

      <!-- Grafico em Linha -->
      <div class="graph__container">
        <SummaryGraphAppLine ref="summaryGraphAppLine" />
      </div>
    </section>

    <!-- Título -->
    <article
      class="about__graph"
      id="growth-rate"
      v-if="countryData.selectedValues.selectInfo.growthRate"
    >
      <hr />
      <h3>Taxa de Crescimento Diário</h3>
      <p>Cálculo da Taxa de Crescimento relacionando sempre com o dia anterior.</p>
      <hr />
    </article>

    <!-- Gráfico em Barras -->
    <section
      class="graph__content__container"
      v-if="countryData.selectedValues.selectInfo.growthRate"
    >
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.data">
        <div class="select__country__msg__container" @click="openModalDataOption">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Gráfico -->
      <div class="graph__container" :class="{ 'unselect--country': !countryData.data }">
        <CountriesChartsAppBar ref="countriesChartsAppBar" />
      </div>
    </section>

    <!-- Título -->
    <article
      class="about__graph"
      id="new-register"
      v-if="countryData.selectedValues.selectInfo.newRegister"
    >
      <hr />
      <h3>Novos Registros Diário</h3>
      <p>Dados com a quantidade de novos registros diários.</p>
      <hr />
    </article>

    <!-- Gráfico em Linha -->
    <section
      class="graph__content__container"
      v-if="countryData.selectedValues.selectInfo.newRegister"
    >
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.data">
        <div class="select__country__msg__container" @click="openModalDataOption">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Gráfico Linear -->
      <div class="graph__container" :class="{ 'unselect--country': !countryData.data }">
        <CountriesChartsAppLine ref="countriesChartsAppLine" />
      </div>
    </section>

    <!-- Título -->
    <article class="about__graph" id="summary" v-if="countryData.selectedValues.selectInfo.summary">
      <hr />
      <h3>Resumo</h3>
      <p>
        Cálculo da Taxa de Crescimento e quantidade de Novos Registros
        relacionando apenas as duas datas selecionadas.
      </p>
      <p>
        (De {{ countryData.selectedValues.selectDate.firstDate }} até
        {{ countryData.selectedValues.selectDate.lastDate }})
      </p>
      <hr />
    </article>

    <!-- Gráfico de Doughnut -->
    <section class="graph__content__container" v-if="countryData.selectedValues.selectInfo.summary">
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.data">
        <div class="select__country__msg__container" @click="openModalDataOption">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Conteúdo -->
      <div class="graph__doughnut__container" :class="{ 'unselect--country': !countryData.data }">
        <div class="graph__doughnut__content">
          <!-- Total de Novos Registros -->
          <div class="content__title">Total de Novos Registros</div>
          <div class="register__item__container">
            <span class="register__title">Casos Confirmados:</span>
            <span class="register__value">{{ graphDoughnutTable.confirmed }}</span>
          </div>

          <div class="register__item__container">
            <span class="register__title">Recuperados:</span>
            <span class="register__value">{{ graphDoughnutTable.recovered }}</span>
          </div>

          <div class="register__item__container">
            <span class="register__title">Mortos:</span>
            <span class="register__value">{{ graphDoughnutTable.deaths }}</span>
          </div>

          <!-- Taxa de Crescimento Total -->
          <div class="content__title">Taxa de Crescimento Total</div>
          <div class="register__item__container">
            <span class="register__title">Casos Confirmados:</span>
            <span
              class="register__value"
              v-if="graphDoughnutTable.growthRate.confirmed != null"
            >+{{ graphDoughnutTable.growthRate.confirmed }}%</span>
            <span
              class="register__value growthRate__null__information"
              v-else
              v-b-tooltip.left.hover
              title="Só é possivel calcular a taxa de crescimento a partir da data do primeiro resgistro."
            >
              <unicon class="unicon" name="exclamation-triangle" width="22.5px" height="22.5px" />
            </span>
          </div>

          <div class="register__item__container">
            <span class="register__title">Recuperados:</span>
            <span
              class="register__value"
              v-if="graphDoughnutTable.growthRate.recovered != null"
            >+{{ graphDoughnutTable.growthRate.recovered }}%</span>
            <span
              class="register__value growthRate__null__information"
              v-else
              v-b-tooltip.left.hover
              title="Só é possivel calcular a taxa de crescimento a partir da data do primeiro resgistro."
            >
              <unicon class="unicon" name="exclamation-triangle" width="22.5px" height="22.5px" />
            </span>
          </div>

          <div class="register__item__container">
            <span class="register__title">Mortos:</span>
            <span
              class="register__value"
              v-if="graphDoughnutTable.growthRate.deaths != null"
            >+{{ graphDoughnutTable.growthRate.deaths }}%</span>
            <span
              class="register__value growthRate__null__information"
              v-else
              v-b-tooltip.left.hover
              title="Só é possivel calcular a taxa de crescimento a partir da data do primeiro resgistro."
            >
              <unicon class="unicon" name="exclamation-triangle" width="22.5px" height="22.5px" />
            </span>
          </div>
        </div>

        <!-- Gráfico de Doughnut -->
        <div class="graph__doughnut">
          <CountriesChartsAppDoughnut
            ref="countriesChartsAppDoughnut"
            @resGraphDataEmit="reqGraphDataEmit"
            class="graph__size"
          />
        </div>
      </div>
    </section>

    <!-- Título -->
    <article
      class="about__graph"
      id="additional-information"
      v-if="countryData.selectedValues.selectInfo.additionalInformation"
    >
      <hr />
      <h3>Informações Adicionais</h3>
      <p>Estas informações são baseadas nas datas selecionadas.</p>
      <p>
        (De {{ countryData.selectedValues.selectDate.firstDate }} até
        {{ countryData.selectedValues.selectDate.lastDate }})
      </p>
      <hr />
    </article>
    <!-- Informações Adicionais (Conteúdo) -->
    <section
      class="graph__content__container"
      v-if="countryData.selectedValues.selectInfo.additionalInformation"
    >
      <!-- Mensagem de país não selecionado -->
      <article v-if="!countryData.data">
        <div class="select__country__msg__container" @click="openModalDataOption">
          <span class="select__country__msg">Selecione um País...</span>
        </div>
      </article>

      <!-- Tabela: Dia com o maior registro de "Casos Confirmados" -->
      <article
        class="countryDataTable__container"
        :class="{ 'unselect--country': !countryData.data }"
      >
        <table class="countryDataTable__main">
          <tbody class="main__tbody">
            <tr class="main__tr" @click="countryDataTableConfirmedToggle()">
              <td colspan="3">Dia com o maior registro de "Casos Confirmados"</td>
            </tr>
            <tr>
              <td colspan="3">
                <table
                  class="countryDataTable__internal"
                  :class="{ 'countryDataTable--close': !countryDataTableConfirmed }"
                  v-if="additionalInformation.highestNumberOfConfirmed"
                >
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Nº de novos registros</th>
                      <th>Total de registros</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr
                      v-for="(data,
                      index) in additionalInformation.highestNumberOfConfirmed"
                      :key="index"
                    >
                      <td>{{ data.date }}</td>
                      <td>{{ data.value }}</td>
                      <td>{{ data.totalValue }}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="countryDataTable__internal" v-else>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>
                        Nenhum novo registro encontrado entre as datas
                        selecionadas.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- Tabela: Dia com o maior registro de "Mortos" -->
      <article
        class="countryDataTable__container"
        :class="{ 'unselect--country': !countryData.data }"
      >
        <table class="countryDataTable__main">
          <tbody class="main__tbody">
            <tr class="main__tr" @click="countryDataTableDeathsToggle()">
              <td colspan="3">Dia com o maior registro de "Mortos"</td>
            </tr>
            <tr>
              <td colspan="3">
                <table
                  class="countryDataTable__internal"
                  :class="{ 'countryDataTable--close': !countryDataTableDeaths }"
                  v-if="additionalInformation.highestNumberOfDeaths"
                >
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Nº de novos registros</th>
                      <th>Total de registros</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr
                      v-for="(data,
                      index) in additionalInformation.highestNumberOfDeaths"
                      :key="index"
                    >
                      <td>{{ data.date }}</td>
                      <td>{{ data.value }}</td>
                      <td>{{ data.totalValue }}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="countryDataTable__internal" v-else>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>
                        Nenhum novo registro encontrado entre as datas
                        selecionadas.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- Tabela: Dia com o maior registro de "Recuperados" -->
      <article
        class="countryDataTable__container"
        :class="{ 'unselect--country': !countryData.data }"
      >
        <table class="countryDataTable__main">
          <tbody class="main__tbody">
            <tr class="main__tr" @click="countryDataTableRecoveredToggle()">
              <td colspan="3">Dia com o maior registro de "Recuperados"</td>
            </tr>
            <tr>
              <td colspan="3">
                <table
                  class="countryDataTable__internal"
                  :class="{ 'countryDataTable--close': !countryDataTableRecovered }"
                  v-if="additionalInformation.highestNumberOfRecovered"
                >
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Nº de novos registros</th>
                      <th>Total de registros</th>
                    </tr>
                  </thead>
                  <tbody class="internal__tbody">
                    <tr
                      v-for="(data,
                      index) in additionalInformation.highestNumberOfRecovered"
                      :key="index"
                    >
                      <td>{{ data.date }}</td>
                      <td>{{ data.value }}</td>
                      <td>{{ data.totalValue }}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="countryDataTable__internal" v-else>
                  <tbody class="internal__tbody">
                    <tr>
                      <td>
                        Nenhum novo registro encontrado entre as datas
                        selecionadas.
                      </td>
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

<script src="./CountriesCharts.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// Mixin
@import "@/sass/mixin/alerts/invalidDate";
@import "@/sass/mixin/alerts/unselectCountry";
@import "@/sass/mixin/containers/localContainerDefault";
@import "@/sass/mixin/titles/graphTitles";
@import "@/sass/mixin/titles/title_h2";
@import "@/sass/mixin/modifiers/unselectCountry";

// SCSS deste componente
@import "./CountriesCharts";
@import "./CountriesCharts_Media";
@import "./modifiers";
</style>
