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

    <!-- Gráfico Linear (Título) -->
    <article class="about__graph">
      <hr />
      <h3>Novos Registros Diário</h3>
      <p>Dados atualizados com a quantidade dos novos registros de cada dia.</p>
      <hr />
    </article>

    <!-- Gráfico Linear -->
    <section v-if="!countryData.countryData">
      <div class="select__country__msg__container">
        <span class="select__country__msg">Selecione um País...</span>
      </div>
    </section>

    <div class="graph__container">
      <GraphGrowthRateAppLine ref="graphGrowthRateAppLine" :country-data="countryData" />
    </div>

    <!-- Gráfico de Doughnut (Título) -->
    <article class="about__graph">
      <hr />
      <h3>Soma dos Novos Registros</h3>
      <p>Soma de todos os novos registros entre as datas selecionadas.</p>
      <hr />
    </article>

    <!-- Gráfico de Doughnut -->
    <section v-if="!countryData.countryData">
      <div class="select__country__msg__container">
        <span class="select__country__msg">Selecione um País...</span>
      </div>
    </section>

    <div class="graph__doughnut__container">
      <div class="graph__doughnut__content">
        <table>
          <tbody class="main__tbody">
            <tr>
              <td>Casos Confirmados:</td>
              <td>{{ graphDoughnutTable.confirmed }} (+{{ graphDoughnutTable.growthRate.confirmed }}%)</td>
            </tr>
            <tr>
              <td>Mortos:</td>
              <td>{{ graphDoughnutTable.deaths }} (+{{ graphDoughnutTable.growthRate.deaths }}%)</td>
            </tr>
            <tr>
              <td>Recuperados:</td>
              <td>{{ graphDoughnutTable.recovered }} (+{{ graphDoughnutTable.growthRate.recovered }}%)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="graph__doughnut">
      <GraphGrowthRateAppDoughnut ref="graphGrowthRateAppDoughnut" @resGraphDataEmit="reqGraphDataEmit" :country-data="countryData" />
      </div>
    </div>

    <!-- Informações Adicionais (Titulo) -->
    <article class="about__graph">
      <hr />
      <h3>Informações Adicionais</h3>
      <p>Estas informações são baseadas nas datas selecionadas.</p>
      <hr />
    </article>

    <!-- Informações Adicionais (Conteúdo) -->
    <section>
      <!-- Tabela -->
      <article>
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
@import "@/sass/mixin/titles/graphTitles";
@import "@/sass/mixin/alerts/invalidDate";

// SCSS deste componente
@import "./GraphGrowthRate";
@import "./GraphGrowthRate_Media";
</style>