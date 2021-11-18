import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import {makeServer} from "./server"

process.env.NODE_ENV === 'development' && makeServer();

const app = createApp(App);
app.use(VueAxios, axios).mount('#app');