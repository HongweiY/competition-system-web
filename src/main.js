import {createApp, provide} from 'vue'
//element-plus
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
//router
import router from './router'
import store from './store'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
//rem
import './utils/rem'
import App from './App.vue'
//字体
import './assets/css/font.scss'


const app = createApp(App)



app.provide('$api', api)
app.provide('$storage', storage)
app.provide('$request', request)



app.use(router).use(ElementPlus).use(store).mount('#app')

