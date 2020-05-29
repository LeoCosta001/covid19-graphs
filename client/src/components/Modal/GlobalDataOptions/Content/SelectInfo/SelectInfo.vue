<template>
  <div class="select__info__container">
    <article class="select__info">
      <div class="select__info__graph">
        <p>Selecione as informações que serão exibidas:</p>
        <div class="select__input__container">
          <!-- Opção: Mapa mundial -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="globalMap_checkbox"
              @change="checkSelectedInfo"
              id="globalMap_checkbox"
              checked
            />
            <label
              for="globalMap_checkbox"
              :class="{ 'select_info--input--checked': globalMap_checkbox }"
            >
              <unicon
                v-if="globalMap_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Mapa mundial</span>
            </label>
          </span>

          <!-- Opção: Rank dos países -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="countriesRank_checkbox"
              @change="checkSelectedInfo"
              id="countriesRank_checkbox"
              checked
            />
            <label
              for="countriesRank_checkbox"
              :class="{ 'select_info--input--checked': countriesRank_checkbox }"
            >
              <unicon
                v-if="countriesRank_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Rank dos países</span>
            </label>
          </span>

          <!-- Opção: Resumo global -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="globalSummary_checkbox"
              @change="checkSelectedInfo"
              id="globalSummary_checkbox"
              checked
            />
            <label
              for="globalSummary_checkbox"
              :class="{ 'select_info--input--checked': globalSummary_checkbox }"
            >
              <unicon
                v-if="globalSummary_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Resumo global</span>
            </label>
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script src="./SelectInfo.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./SelectInfo";
@import "./modifiers";
</style>
