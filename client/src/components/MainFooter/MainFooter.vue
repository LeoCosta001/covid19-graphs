<template>
  <div class="mainFooterContainer">
    <!-- Sobre -->
    <article class="footer__about">
      <div class="footer__title">
        Sobre
        <hr />
      </div>

      <div class="footer__subtitle">COVID-19</div>
      <div
        class="footer__about__content"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit corrupti obcaecati dignissimos voluptatum nobis distinctio commodi accusantium!</div>
    </article>

    <!-- Social -->
    <article class="footer__contact">
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
      </div>
    </article>

    <!-- Links -->
    <article class="footer__links">
      <div class="footer__title">
        Links
        <hr />
      </div>
    </article>

    <!-- Divulgue -->
    <article class="footer__help">
      <div class="footer__title">
        Divulgue
        <hr />
      </div>

      <div
        class="footer__help__content"
      >Ajude a concientizar as pessoas para que cada um faça a sua parte nesta luta contra o COVID-19! Compartilhe estas imagens.</div>
      
      <div class="footer__subtitle">Imagens</div>
    </article>
  </div>
</template>

<script src="./MainFooter.js">
</script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./MainFooter";
</style>;
