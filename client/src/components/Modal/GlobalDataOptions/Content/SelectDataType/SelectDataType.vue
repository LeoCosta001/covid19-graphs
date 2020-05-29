<template>
  <div class="select__data__type__container">
    <article class="select__data__type">
      <div class="select__data__type__graph">
        <p>Escolha o tipo de dado que será exibido:</p>
        <div class="select__button__container">
          <!-- Tipo de dado: Casos Confirmados -->
          <span class="select__button__item">
            <button
              @click="attSelectDataType('confirmed')"
              :class="{ 'select_data_type--button--checked': dataType == 'confirmed' }"
            >Casos Confirmados</button>
            <unicon
              v-if="dataType == 'confirmed'"
              class="unicon"
              name="check"
              width="20px"
              height="20px"
            />
          </span>

          <!-- Tipo de dado: Recuperados -->
          <span class="select__button__item">
            <button
              @click="attSelectDataType('recovered')"
              :class="{ 'select_data_type--button--checked': dataType == 'recovered' }"
            >Recuperados</button>
            <unicon
              v-if="dataType == 'recovered'"
              class="unicon"
              name="check"
              width="20px"
              height="20px"
            />
          </span>

          <!-- Tipo de dado: Mortos -->
          <span class="select__button__item">
            <button
              @click="attSelectDataType('deaths')"
              :class="{ 'select_data_type--button--checked': dataType == 'deaths' }"
            >Mortos</button>
            <unicon
              v-if="dataType == 'deaths'"
              class="unicon"
              name="check"
              width="20px"
              height="20px"
            />
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script src="./SelectDataType.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./SelectDataType";
@import "./modifiers";
</style>
