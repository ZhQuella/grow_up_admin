import { createApp } from 'vue';
import App from './App.vue';
import plugin from "plugin/index";

const app = createApp(App);
plugin(app);
app.mount('#app');
