import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App);

app.use(router);

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDKD3Hnr_ZjJ0zxWwvqE_Dkz_pu3Q4hQJs',
    libraries: 'places', 
  },
});

app.mount('#app');