<template>
  <div class="mainFooterContainer">
    <!-- Sobre -->
    <article class="footer__about">
      <!-- Titulo -->
      <div class="footer__title">
        Sobre
        <hr />
      </div>

      <div class="footer__subtitle">COVID-19</div>
      <div class="footer__about__content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit corrupti
        obcaecati dignissimos voluptatum nobis distinctio commodi accusantium!
      </div>
    </article>

    <!-- Social -->
    <article class="footer__contact">
      <!-- Titulo -->
      <div class="footer__title">
        Contato
        <hr />
      </div>
      <div class="footer__contact__content">
        <unicon class="unicon" name="envelope" width="25px" height="25px" />
        <span>leocosta.black@gmail.com</span>
      </div>
      <div class="footer__subtitle">Social</div>
      <div class="footer__social">
        <a
          href="https://github.com/LeoCosta001/covid19-graphs"
          class="footer__social__content"
          target="_blank"
        >
          <unicon class="unicon" name="github" width="35px" height="35px" />
        </a>
        <a
          href="https://www.linkedin.com/in/leocosta001"
          class="footer__social__content"
          target="_blank"
        >
          <unicon class="unicon" name="linkedin" width="35px" height="35px" />
        </a>
        <a
          href="https://twitter.com/LeoCostaBlack"
          class="footer__social__content"
          target="_blank"
        >
          <unicon class="unicon" name="twitter" width="35px" height="35px" />
        </a>
      </div>
    </article>

    <!-- Links -->
    <article class="footer__links">
      <!-- Titulo -->
      <div class="footer__title">
        Links
        <hr />
      </div>

      <div class="footer__links__content__container">
        <!-- Links de Dúvidas -->
        <div class="footer__links__content__subcontainer">
          <div class="footer__subtitle">Dúvidas</div>
          <router-link to="#" class="footer__links__content">
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Cuidados Pessoais
          </router-link>

          <router-link to="#" class="footer__links__content">
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Sintomas
          </router-link>

          <router-link
            to="/questions/modes-of-transmission"
            class="footer__links__content"
          >
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Meios de Transmissão
          </router-link>

          <router-link to="#" class="footer__links__content">
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Perguntas Frequentes
          </router-link>

          <router-link to="#" class="footer__links__content">
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Emergência
          </router-link>

          <router-link to="#" class="footer__links__content">
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Sobre o COVID-19
          </router-link>
        </div>

        <!-- Links de Dados -->
        <div class="footer__links__content__subcontainer">
          <div class="footer__subtitle">Dados</div>
          <router-link to="/data-table" class="footer__links__content">
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Tabela de Dados
          </router-link>

          <router-link
            to="/graphs/countries-charts"
            class="footer__links__content"
          >
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Gráficos dos Países
          </router-link>

          <router-link to="#" class="footer__links__content">
            <unicon
              class="unicon"
              name="angle-right"
              width="20px"
              height="20px"
            />Gráficos Mundiais
          </router-link>
        </div>
      </div>
    </article>

    <!-- Divulgue -->
    <article class="footer__help">
      <!-- Titulo -->
      <div class="footer__title">
        Divulgue
        <hr />
      </div>

      <div class="footer__help__content">
        Ajude a conscientizar as pessoas para que cada um faça a sua parte nesta
        luta contra o COVID-19! Compartilhe estas imagens.
      </div>

      <div class="footer__subtitle">Imagens</div>
    </article>
  </div>
</template>

<script src="./MainFooter.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./MainFooter";</style
>;
