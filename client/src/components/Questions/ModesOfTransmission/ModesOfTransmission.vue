<template>
  <div class="localContainer">
    <h2 class="title__h2">Meios de Transmissão</h2>
    <section class="section__content__container">
      <!-- Artigo: Meios mais comuns de transmissão -->
      <article>
        <!-- Titulo -->
        <div class="title__h3">
          <hr />
          <h3>Meios mais comuns de transmissão</h3>
          <hr />
        </div>
        <!-- Conteúdo -->
        <div class="content__container">
          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />De pessoa para pessoa (diretamente):
            </span>
            <span class="content__paragraph">
              Pessoas infectadas com o COVID-19 podem transmitir o vírus
              através de pequenas gotículas de saliva ou catarro que saem de seus narizes e
              bocas através da tosse ou espirro, desta forma qualquer pessoa
              que estiver próxima o suficiente para que estas gotículas entre em
              contato com seu nariz, boca ou olhos também será infectada.
            </span>
            <span class="content__obs">
              Observação: Por isso é importante ficar a mais de 1 metro de
              distância de pessoas que estiverem doentes.
            </span>
          </div>

          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />De pessoa para pessoa (indiretamente):
            </span>
            <span class="content__paragraph">
              Pessoas infectadas com o COVID-19 que expõe alguma parte do seu
              corpo ao seu próprio espirro, tosse, catarro ou saliva também
              poderá transmitir o vírus ao fazer com que a parte do seu corpo
              que foi exposta diretamente ao vírus (principalmente as mãos)
              entre em contato com alguma pessoa ou algum objeto que
              posteriormente será tocado por outras pessoas.
            </span>
            <span class="content__obs">
              Observação: Por esta razão é importante estar lavando as mãos com
              frequência, para evitar se contaminar por tocar em superfícies que
              contenham o vírus.
            </span>
          </div>
        </div>
      </article>

      <!-- Artigo: Outros meios de transmissão -->
      <article>
        <!-- Titulo -->
        <div class="title__h3">
          <hr />
          <h3>Outros meios de transmissão</h3>
          <hr />
        </div>
        <!-- Conteúdo -->
        <div class="content__container">
          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />De fezes para pessoa:
            </span>
            <span class="content__paragraph">
              Através de tocar nas fezes de pessoas que estão infectadas pelo
              COVID-19 e em seguida tocar nos olhos, nariz ou boca.
            </span>
            <span class="content__obs">
              Observação: Foi comprovado a presença do novo coronavírus em
              fezes de pessoas que estão infectadas.
            </span>
          </div>
        </div>
      </article>
    </section>
    <section class="questions__source">
      <span>
        Fonte:
        <a
          href="https://www.paho.org/bra/index.php?option=com_content&view=article&id=6101:covid19&Itemid=875"
          class="questions__source__link"
          target="_blank"
        >OMS (Organização Mundial da Saúde) e OPAS (Organização Pan-Americana da Saúde).</a>
      </span>
    </section>
  </div>
</template>

<script src="./ModesOfTransmission.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// Mixin
@import "@/sass/mixin/containers/localContainerDefault";
@import "@/sass/mixin/texts/questionPageContent";
@import "@/sass/mixin/titles/title_h2";
@import "@/sass/mixin/titles/title_h3";
@import "@/sass/mixin/linkSource/questions_source";

// SCSS deste componente
@import "./ModesOfTransmission";
</style>
