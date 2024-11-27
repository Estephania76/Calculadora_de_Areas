const titulo = {
  template: `
    <div class="col-12 text-center mb-4">
      <h1 class="text-black">Calculadora de Áreas</h1>
      <h5 class="text-light">Con Vue</h5>
    </div>
  `,
};

const calcularFigura = {
  props: ['tipo', 'etiquetas', 'formula'],
  template: `
    <div class="col-md-6 mb-4">
      <div class="card shadow border-0">
        <div class="card-header text-white bg-success">
          <h3 class="card-title text-center m-0">{{ tipo }}</h3>
        </div>
        <div class="card-body bg-light">
          <div v-for="(etiqueta, index) in etiquetas" :key="index" class="form-group mb-3">
            <label :for="'dato' + index" class="text-success">{{ etiqueta }}:</label>
            <input :id="'dato' + index" v-model.number="datos[etiqueta]" type="number" class="form-control border-success" :placeholder="'Ingresa ' + etiqueta">
          </div>
          <button class="btn btn-success w-100" @click="calcularArea">Calcular Área</button>
          <p v-if="resultado !== null" class="mt-3 text-center text-success"><strong>Resultado:</strong> {{ resultado.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      datos: this.etiquetas.reduce((obj, etiqueta) => {
        obj[etiqueta] = 0;
        return obj;
      }, {}),
      resultado: null,
    };
  },
  methods: {
    calcularArea() {
      const valores = this.etiquetas.map((etiqueta) => this.datos[etiqueta]);
      this.resultado = this.formula(...valores);
    },
  },
};

const ap = {
  data() {
    return {
      figuras: [
        { tipo: 'Triángulo', etiquetas: ['Base', 'Altura'], formula: (base, altura) => 0.5 * base * altura },
        { tipo: 'Círculo', etiquetas: ['Radio'], formula: (radio) => Math.PI * Math.pow(radio, 2) },
        { tipo: 'Rectángulo', etiquetas: ['Base', 'Altura'], formula: (base, altura) => base * altura },
        { tipo: 'Rombo', etiquetas: ['Diagonal Mayor', 'Diagonal Menor'], formula: (d1, d2) => 0.5 * d1 * d2 },
        { tipo: 'Pentágono', etiquetas: ['Perímetro', 'Apotema'], formula: (perimetro, apotema) => 0.5 * perimetro * apotema },
      ],
    };
  },
  template: `
    <div>
      <enviar-titulo></enviar-titulo>
      <div class="row">
        <calcular-figura v-for="(figura, index) in figuras" :key="index" :tipo="figura.tipo" :etiquetas="figura.etiquetas" :formula="figura.formula"></calcular-figura>
      </div>
    </div>
  `,
  components: {
    'enviar-titulo': titulo,
    'calcular-figura': calcularFigura,
  },
};

const app = Vue.createApp(ap);
app.mount('#app');
