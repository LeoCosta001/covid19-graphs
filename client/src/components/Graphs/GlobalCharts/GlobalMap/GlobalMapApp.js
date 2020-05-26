// APIs
import { GChart } from 'vue-google-charts';

// Métodos
import _renameCountryForAPI from '@/methods/translation/renameCountryForAPI';

// Configurações do componente
export default {
  name: 'GlobalMapApp',
  components: {
    GChart,
  },
  props: {
    globalDataOptions: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      newGlobalMapData: [],

      // "zoomOption" define quantos pixels o mapa irá crescer e quantas vezes é possivel aplica-los
      zoomOption: {
        valuePerClick: 250,
        multiplier: 5,
      },

      // "zoonValue" define o tamanho do mapa em relação ao tamanho do container
      zoomValue: {
        height: (window.innerHeight / 100) * 60,
        width: (window.innerWidth / 100) * 80 - 50,
      },

      // Dados do mapa
      chartData: [
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700], // Para usar strings na visualização é necessário passar um objeto onde "v" é o valor e "f" é a exibição (ex: ['RU', {v: 700, f: '700%'] = 700%)
      ],
      chartOptions: {
        displayMode: 'regions',
        /*region: '002', // Africa (Aqui vai ser usada a opção de selecionar areas especificas, o valor padrão é "world")*/
        height: (window.innerHeight / 100) * 60,
        width: (window.innerWidth / 100) * 80 - 50,
        backgroundColor: '#2C3750',
        colorAxis: { colors: ['#7b5e46', '#E67E22', '#C0392B'] },
        datalessRegionColor: '#34495E',
        defaultColor: '#f5f5f5',
        /*  colorAxis.minValue: 0,
        colorAxis.maxValue: 0, // Aqui vai o valor  do país que tiver o maio valor de dados */
      },
    };
  },
  computed: {
    containerSize() {
      return {
        height: (window.innerHeight / 100) * 60,
        width: (window.innerWidth / 100) * 80 - 50,
      };
    },

    // Método que atualiza o Mapa global
    attMap() {
      // Dados do mapa
      this.chartData = this.newGlobalMapData;
      this.chartOptions = {
        displayMode: 'regions',
        /*region: '002', // Africa (Aqui vai ser usada a opção de selecionar areas especificas, o valor padrão é "world")*/
        width: this.zoomValue.width,
        height: this.zoomValue.height,
        backgroundColor: '#2C3750',
        colorAxis: { colors: ['#7b5e46', '#E67E22', '#C0392B'] },
        datalessRegionColor: '#34495E',
        defaultColor: '#f5f5f5',
        /*  colorAxis.minValue: 0,
        colorAxis.maxValue: 0, // Aqui vai o valor  do país que tiver o maio valor de dados */
      };
    },
  },
  methods: {
    // Emitir dados com os valores locais
    localEmit() {
      this.$emit('DataOptions_return', this.SelectCountryEmit);
    },

    zoomIn() {
      let newZoomValue = {
        width: this.zoomValue.width + this.zoomOption.valuePerClick,
        height: this.zoomValue.height + this.zoomOption.valuePerClick,
      };

      if (!this.zoomLimitCheck(newZoomValue).zoomIn) {
        this.zoomValue.width += this.zoomOption.valuePerClick;
        this.zoomValue.height += this.zoomOption.valuePerClick;
        this.attMap;
      }
    },

    zoomOut() {
      let newZoomValue = {
        width: this.zoomValue.width - this.zoomOption.valuePerClick,
        height: this.zoomValue.height - this.zoomOption.valuePerClick,
      };

      if (!this.zoomLimitCheck(newZoomValue).zoomOut) {
        this.zoomValue.width -= this.zoomOption.valuePerClick;
        this.zoomValue.height -= this.zoomOption.valuePerClick;
        this.attMap;
      }
    },

    // Verifica se ainda é possivel usar o zoom
    zoomLimitCheck(newZoomValue) {
      let result = {
        zoomIn: false,
        zoomOut: false,
      };

      let calcLimit = {
        maxHeight:
          this.containerSize.height +
          (this.zoomOption.multiplier + 1) * this.zoomOption.valuePerClick,
        maxWidth:
          this.containerSize.width +
          (this.zoomOption.multiplier + 1) * this.zoomOption.valuePerClick,
        minHeight: this.containerSize.height - this.zoomOption.valuePerClick,
        minWidth: this.containerSize.width - this.zoomOption.valuePerClick,
      };

      // Verificando limite de ampliação
      if (
        newZoomValue.height >= calcLimit.maxHeight ||
        newZoomValue.width >= calcLimit.maxWidth
      ) {
        result.zoomIn = true;
        this.zoomValue.width = calcLimit.maxWidth;
        this.zoomValue.height = calcLimit.maxHeight;
      }

      if (
        newZoomValue.height <= calcLimit.minHeight ||
        newZoomValue.width <= calcLimit.minWidth
      ) {
        result.zoomOut = true;
        this.zoomValue.width = calcLimit.minWidth;
        this.zoomValue.height = calcLimit.minHeight;
      }

      return result;
    },

    // Atualizar dados do mapa global
    attGlobalMap(req) {
      this.newGlobalMapData = req.data.map((value) => {
        let countryRename = _renameCountryForAPI.countryName(value.country);
        return [countryRename, value.casesSummary.confirmed];
      });

      this.newGlobalMapData.unshift(['País', 'Casos confirmados']);

      console.log(this.newGlobalMapData);
      this.attMap;
    },
  },
};
