<template>
  <div class="localContainer">
    <!-- Header: Carousel principal -->
    <section class="section__container">
      <article class="article__title__container"></article>
      <article class="main__content__container">
        <b-carousel
          id="carousel-1"
          :interval="5000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          class="main__carousel__container"
        >
          <!-- Slides with custom text -->
          <b-carousel-slide class="main__carousel__slide slide__01">
            <span class="slide__title">A PREVENÇÃO É A MELHOR SOLUÇÃO!</span>
            <div class="slide__msg">
              <img
                src="../../../public/assets/locawebStyle/images/icons/usar-mascara.png"
                alt
                srcset
              />
              <div>
                <div>
                  <strong>Cubra a boca e o nariz com a máscara</strong>
                </div>
                <div>e garanta que não haja espaços entre seu rosto e a máscara.</div>
              </div>
            </div>
          </b-carousel-slide>

          <b-carousel-slide class="main__carousel__slide slide__02">
            <span class="slide__title">A PREVENÇÃO É A MELHOR SOLUÇÃO!</span>
            <div class="slide__msg">
              <img
                src="../../../public/assets/locawebStyle/images/icons/lavar-as-maos.png"
                alt
                srcset
              />
              <div>
                <div>Lave a mão com água e sabão ou use álcool em gél.</div>
              </div>
            </div>
          </b-carousel-slide>

          <b-carousel-slide class="main__carousel__slide slide__03">
            <span class="slide__title">A PREVENÇÃO É A MELHOR SOLUÇÃO!</span>
            <div class="slide__msg">
              <img
                src="../../../public/assets/locawebStyle/images/icons/evite-multidoes.png"
                alt
                srcset
              />
              <div>
                <div>Evite locais onde houver aglomerações de pessoas.</div>
              </div>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </article>
    </section>

    <!-- Sobre: Apresentação do site -->
    <section class="section__container light--background">
      <article class="about__content__container">
        <div class="about__image">
          <img
            src="../../../public/assets/locawebStyle/images/icons/grafico-dos-paises.png"
            alt
            srcset
          />
        </div>
        <div class="about__content">
          <router-link to="/graphs/countries-charts" class="about__title title__left">Gráfico dos países</router-link>
          <div class="about__msg msg__left">
            Visualize gráficos com informações atualizadas de mais de 180 países.
            <br />Dados separados em soma total, taxa de crescimento, quantidade de novos registros diários, dias com as maiores taxas de crescimento e muito mais.
          </div>
        </div>
      </article>
      <article class="about__content__container">
        <div class="about__content">
          <router-link to="/graphs/global-charts" class="about__title title__right">Gráfico mundial</router-link>
          <div
            class="about__msg msg__right"
          >Faça uma análise comparando os registros dos países simultaneamente, podendo escolher uma data específica, visualizar um mapa-múndi, ter uma lista de rank dos países baseados na totalidade de cada registro (casos confirmados, mortos e recuperados).</div>
        </div>
        <div class="about__image">
          <img
            src="../../../public/assets/locawebStyle/images/icons/grafico-mundial.png"
            alt
            srcset
          />
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeContent",
  component: {}
};
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./HomeContent";
@import "./HomeContent_Media";
@import "./modifiers";
</style>
