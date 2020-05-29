<template>
  <div class="modal__data__options__container">
    <!-- Botão lateral que abre o modal -->
    <section class="modal__data__options__button">
      <div @click="modalOpenButton" class="aside__navbar__content">
        <unicon class="unicon" name="cog" width="30px" height="30px" />
        <span class="aside__navbar__hide">
          <div class="aside__navbar__title">Opções</div>
        </span>
      </div>
    </section>

    <!-- Navbar lateral que desliza pela página -->
    <section class="aside__navbar__container">
      <div class="aside__navbar__content">
        <unicon class="unicon" name="list-ul" width="30px" height="30px" />
        <span class="aside__navbar__hide">
          <div class="aside__navbar__title">Barra de Navegação</div>

          <b-nav v-b-scrollspy:nav-scroller class="aside__navbar__links">
            <b-nav-item class="aside__navbar__link" to="#global-map" active>Mapa Mundial</b-nav-item>
            <b-nav-item class="aside__navbar__link" to="#countries-rank">Rank dos Países</b-nav-item>
            <b-nav-item class="aside__navbar__link" to="#global-summary">Resumo Global</b-nav-item>
          </b-nav>
        </span>
      </div>
    </section>

    <!-- Lista lateral que seleicona os dados -->
    <section class="aside__data__type__container">
      <div class="aside__data__type__content">
        <unicon class="unicon" name="layer-group" width="30px" height="30px" />
        <span class="aside__data__type__hide">
          <div class="aside__data__type__title">Tipo de dados</div>

          <div class="aside__data__type__radios">
            <button
              class="aside__data__type__radio"
              :class="{ 'data--type--active': selectedValues.dataType == 'confirmed' }"
              @click="attGlobalData('confirmed')"
            >Casos Confirmados</button>
            <button
              class="aside__data__type__radio"
              :class="{ 'data--type--active': selectedValues.dataType == 'recovered' }"
              @click="attGlobalData('recovered')"
            >Recuperados</button>
            <button
              class="aside__data__type__radio"
              :class="{ 'data--type--active': selectedValues.dataType == 'deaths' }"
              @click="attGlobalData('deaths')"
            >Mortos</button>
          </div>
        </span>
      </div>
    </section>

    <!-- Popup que exibe o status da requisição -->
    <section class="request__status__container" v-if="controller.hideModal">
      <div class="popup__status popup__status__error" v-if="gqlReqStatus.success == false">
        <unicon class="unicon__error unicon" name="exclamation-octagon" width="25px" height="25px" />
        <span>Erro!</span>
      </div>
      <span v-else>
        <div class="popup__status popup__status__loading" v-if="gqlReqStatus.loading">
          <unicon class="unicon__loading unicon" name="sync" width="22.5px" height="22.5px" />
          <span>Carregando...</span>
        </div>
        <div class="popup__status popup__status__complete" v-else>
          <unicon class="unicon__complete unicon" name="check-circle" width="25px" height="25px" />
          <span>Sucesso!</span>
        </div>
      </span>
    </section>

    <!-- Modal -->
    <section
      :class="{ 'display--none': controller.showGlobalDataOptions }"
      class="modal__background"
    >
      <div :class="{ 'display--none': controller.hideModal }" class="modal__container">
        <!-- Cabeçalho -->
        <header class="modal__header">
          <div class="header__icon">
            <unicon class="unicon" name="cog" width="40px" height="40px" />
          </div>
          <div class="header__title">
            <span>Opções</span>
          </div>
          <div @click="modalCloseButton" class="modal__close">
            <unicon class="unicon" name="times" width="30px" height="30px" />
          </div>
        </header>

        <!-- Conteúdo -->
        <section class="modal__content__container">
          <!-- Opção: Selecionar Datas -->
          <article class="content__date">
            <div class="content__title">
              <p>Data</p>
            </div>
            <div class="content__invalid__value" v-if="selectedValues.selectDate.invalidStatus">
              <hr />
              <div>
                <unicon class="unicon" name="exclamation-triangle" width="20px" height="20px" />
                <p>A data inicial tem que ser menor do que a data final.</p>
              </div>
              <hr />
            </div>
            <div class="content_body">
              <SelectDate ref="refSelectDate" @SelectDate_return="SelectDate_method" />
            </div>
          </article>

          <!-- Opção: Selecionar País -->
          <article class="content__country">
            <div class="content__title">
              <p>Tipo de Dado</p>
            </div>
            <div class="content__invalid__value" v-if="selectedValues.selectDataType.invalidStatus">
              <hr />
              <div>
                <unicon class="unicon" name="exclamation-triangle" width="20px" height="20px" />
                <p>Selecione algum tipo de dado.</p>
              </div>
              <hr />
            </div>
            <div class="content_body">
              <SelectDataType ref="refSelectDataType" @SelectDataType_return="SelectDataType_method" />
            </div>
          </article>

          <!-- Opção: Escolher Informações a serem exibidas -->
          <article class="content__info">
            <div class="content__title">
              <p>Informações</p>
            </div>
            <div class="content__invalid__value" v-if="selectInfoLocal.invalidStatus">
              <hr />
              <div>
                <unicon class="unicon" name="exclamation-triangle" width="20px" height="20px" />
                <p>Selecione no mínimo 1 das informações para ser exibida.</p>
              </div>
              <hr />
            </div>
            <div class="content_body">
              <SelectInfo ref="refSelectInfo" @SelectInfo_return="SelectInfo_method" />
            </div>
          </article>
        </section>

        <!-- Rodapé -->
        <footer class="modal__footer">
          <div class="footer__button__container modal__button__reset">
            <div @click="resetButton()">Desfazer</div>
          </div>
          <div class="footer__button__container modal__button__cancel">
            <div @click="cancelButton()">Cancelar</div>
          </div>
          <div class="footer__button__container modal__button__apply">
            <div @click="applyButton()">Confirmar</div>
          </div>
        </footer>
      </div>
    </section>
  </div>
</template>

<script src="./GlobalDataOptions.js"></script>

<style lang="scss" scoped>
// Variáveis
@import "@/sass/variables/_flatUiColors";

// SCSS deste componente
@import "./GlobalDataOptions";
@import "./modifiers";
@import "./keyframes";
</style>
