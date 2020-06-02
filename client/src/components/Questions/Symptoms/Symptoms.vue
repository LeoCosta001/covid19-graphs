<template>
  <div class="localContainer">
    <h2 class="title__h2">Sintomas</h2>
    <section class="section__content__container">
      <!-- Artigo: Sintomas comuns -->
      <article>
        <!-- Titulo -->
        <div class="title__h3">
          <hr />
          <h3>Sintomas comuns</h3>
          <hr />
        </div>
        <!-- Conteúdo -->
        <div class="content__container">
          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />Os sintomas mais comuns da COVID-19 são:
            </span>
            <span class="content__paragraph">
              - Febre.
              <br />- Cansaço.
              <br />- Tosse seca.
            </span>
          </div>

          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />Alguns pacientes podem ter:
            </span>
            <span class="content__paragraph">
              - Dores.
              <br />- Congestão nasal.
              <br />- Corrimento nasal.
              <br />- Dor de garganta.
              <br />- Diarreia.
            </span>
          </div>
        </div>
      </article>

      <!-- Artigo: Casos graves -->
      <article>
        <!-- Titulo -->
        <div class="title__h3">
          <hr />
          <h3>Casos graves</h3>
          <hr />
        </div>
        <!-- Conteúdo -->
        <div class="content__container">
          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />Em casos graves os sintomas são:
            </span>
            <span class="content__paragraph">
              - Febre alta.
              <br />- Pneumonia.
              <br />- Dificuldade de respirar.
            </span>
          </div>
        </div>
      </article>

      <!-- Artigo: Informações Adicionais -->
      <article>
        <!-- Titulo -->
        <div class="title__h3">
          <hr />
          <h3>Informações Adicionais</h3>
          <hr />
        </div>
        <!-- Conteúdo -->
        <div class="content__container">
          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />Outras informações sobre os sintomas:
            </span>
            <span class="content__paragraph">
              - Esses sintomas geralmente são leves e aumentam gradualmente.<br>
              - Algumas pessoas são infectadas, mas não apresentam sintomas e não se sentem mal.<br>
              - A maioria das pessoas (cerca de 80%) se recupera da doença sem precisar de tratamento especial.<br>
              - Uma em cada seis pessoas que se infectam com o COVID-19 fica gravemente doente e desenvolve dificuldade em respirar.<br>
              - As pessoas idosas e as que têm outras condições de saúde como pressão alta, problemas cardíacos ou diabetes, têm maior probabilidade de desenvolver doenças graves.<br>
              - Pessoas com febre, tosse e dificuldade em respirar devem procurar atendimento médico.
            </span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script src="./Symptoms.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// Mixin
@import "@/sass/mixin/containers/localContainerDefault";
@import "@/sass/mixin/texts/questionPageContent";
@import "@/sass/mixin/titles/title_h2";
@import "@/sass/mixin/titles/title_h3";

// SCSS deste componente
@import "./Symptoms";
</style>
