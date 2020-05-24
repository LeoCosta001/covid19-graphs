// Métodos
import _debounce from "@/methods/others/debounceFunction.js";

// APIs
import { Slide } from "vue-burger-menu";

export default {
  name: "HeaderMenu",
  components: {
    Slide
  },
  data() {
    return {
      // Posição do Scrollbar
      showHeaderbar: true,
      lastScrollPosition: 0
    };
  },
  methods: {
    // Evento ativado quando é movido o Scrollbar
    onScroll() {
      // Posição atual do Scrollbar
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      // FIX: Não continuar caso o scroll de celular estiver menor que zero "0"
      if (currentScrollPosition < 0) {
        return;
      }

      // Esconder Headerbar apenas com scroll igual ou acima de 40
      if (currentScrollPosition < 40) {
        this.showHeaderbar = true;
        this.lastScrollPosition = currentScrollPosition;
      } else {
        // Ativando a variável que exibirá o Headerbar caso a posição atual do scrollbar seja menor que a ultima posição
        this.showHeaderbar = currentScrollPosition < this.lastScrollPosition;

        // Atualizar a ultima posição com a posição atual
        this.lastScrollPosition = currentScrollPosition;
      }
    }
  },
  mounted() {
    // Inicia o evento de scroll (OBS: O 2º Param do _debounce.use() é o tempo de delay entre a execução das funções)
    window.addEventListener("scroll", _debounce.use(this.onScroll, 50));
  },
  beforeDestroy() {
    // Inicia o evento de scroll (OBS: O 2º Param do _debounce.use() é o tempo de delay entre a execução das funções)
    window.removeEventListener("scroll", _debounce.use(this.onScroll, 50));
  }
};
