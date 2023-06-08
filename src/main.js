import { createApp } from 'vue'

import router from './router'
import store from './store/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-icons/iconfont/material-icons.css';
import App from './App.vue'
import NavButton from './components/ui/NavButton.vue'
import TaskItem from './components/ui/TaskItem.vue'
import InfoMessage from './components/ui/InfoMessage.vue'


const app = createApp(App);

app.use(router);
app.use(store);

app.component('nav-button', NavButton);
app.component('task-item', TaskItem);
app.component('info-message', InfoMessage);

app.mount('#app');