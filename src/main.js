// import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'; // solid 圖標
import { fab } from '@fortawesome/free-brands-svg-icons'; // brands 圖標
import { far } from '@fortawesome/free-regular-svg-icons'; // regular 圖標

/* add icons to the library */
library.add(fas, fab, far);

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// 使用 Pinia
const pinia = createPinia();

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.mount('#app');
