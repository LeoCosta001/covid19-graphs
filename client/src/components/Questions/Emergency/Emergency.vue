<template>
  <div class="localContainer">
    <h2 class="title__h2">Emergencia</h2>
    <section class="section__content__container">
      <!-- Artigo: O que fazer quando apresentar sintomas de COVID-19? -->
      <article>
        <!-- Titulo -->
        <div class="title__h3">
          <hr />
          <h3>O que fazer quando apresentar sintomas de COVID-19?</h3>
          <hr />
        </div>
        <!-- Conteúdo -->
        <div class="content__container">
          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />Apresentar apenas sintomas leves:
            </span>
            <span class="content__paragraph">
              Se você tiver sintomas menores, como tosse leve ou febre leve, geralmente não há
              necessidade de procurar atendimento médico.
              <br />Fique em casa, faça autoisolamento (conforme as orientações das autoridades nacionais)
              e monitore os seus sintomas.
            </span>
            <span class="content__obs">
              Observação: No entanto, se você mora em uma área com malária ou dengue, é importante
              não ignorar os sintomas da febre. Procure ajuda médica.
            </span>
          </div>

          <div class="new__paragraph">
            <span class="content__title">
              <unicon class="unicon" name="angle-right" width="23px" height="23px" />Apresentar sintomas graves:
            </span>
            <span class="content__paragraph">
              Procure atendimento médico imediato se tiver dificuldade de respirar ou dor/pressão no peito.
              <br />Se possível, ligue para o seu médico com antecedência, para que ele possa direcioná-lo
              para o centro de saúde certo.
            </span>
            <span class="content__obs">
              Observação: Ao comparecer ao serviço de saúde, use uma máscara, se possível mantenha pelo menos
              1 metro de distância de outras pessoas e não toque nas superfícies com as mãos.
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

<script src="./Emergency.js"></script>

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
@import "./Emergency";
</style>
