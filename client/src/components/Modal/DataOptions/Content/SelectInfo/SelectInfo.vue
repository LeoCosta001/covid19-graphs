<template>
  <div class="select__info__container">
    <article class="select__info">
      <div class="select__info__graph">
        <p>Selecione as informações que serão exibidas:</p>
        <div class="select__input__container">
          <!-- Opção: Gráfico resumido -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="summaryGraph_checkbox"
              @change="checkSelectedInfo"
              id="summaryGraph_checkbox"
              checked
            />
            <label
              for="summaryGraph_checkbox"
              :class="{ 'select_info--input--checked': summaryGraph_checkbox }"
            >
              <unicon
                v-if="summaryGraph_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Gráfico resumido</span>
            </label>
          </span>

          <!-- Opção: Taxa de crescimento diário -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="growthRate_checkbox"
              @change="checkSelectedInfo"
              id="growthRate_checkbox"
              checked
            />
            <label
              for="growthRate_checkbox"
              :class="{ 'select_info--input--checked': growthRate_checkbox }"
            >
              <unicon
                v-if="growthRate_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Taxa de crescimento diário</span>
            </label>
          </span>

          <!-- Opção: Novos registros diários -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="newRegister_checkbox"
              @change="checkSelectedInfo"
              id="newRegister_checkbox"
              checked
            />
            <label
              for="newRegister_checkbox"
              :class="{ 'select_info--input--checked': newRegister_checkbox }"
            >
              <unicon
                v-if="newRegister_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Novos registros diários</span>
            </label>
          </span>

          <!-- Opção: Resumo -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="summary_checkbox"
              @change="checkSelectedInfo"
              id="summary_checkbox"
              checked
            />
            <label
              for="summary_checkbox"
              :class="{ 'select_info--input--checked': summary_checkbox }"
            >
              <unicon
                v-if="summary_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Resumo</span>
            </label>
          </span>

          <!-- Opção: Informações adicionais -->
          <span class="select__input__item">
            <input
              type="checkbox"
              v-model="additionalInformation_checkbox"
              @change="checkSelectedInfo"
              id="additionalInformation_checkbox"
              checked
            />
            <label
              for="additionalInformation_checkbox"
              :class="{ 'select_info--input--checked': additionalInformation_checkbox }"
            >
              <unicon
                v-if="additionalInformation_checkbox"
                class="unicon"
                name="check"
                width="20px"
                height="20px"
              />
              <span>Informações adicionais</span>
            </label>
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script src="./SelectInfo.js">
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./SelectInfo";
@import "./modifiers";
</style>