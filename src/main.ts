import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import 'reflect-metadata';
import { ArcElement, Chart, Legend, PieController, Title, Tooltip } from 'chart.js';
import VueCompositionApi from '@vue/composition-api';

Chart.register(PieController, ArcElement, Legend, Title, Tooltip);

Vue.config.productionTip = false;
Vue.use(VueCompositionApi)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
