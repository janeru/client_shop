import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Products from './components/products/Products.vue'
import Add_Product from './components/products/Add_Product.vue'
import Loading from '@/components/loading/Loading'
import NotFound from '@/components/NotFount.vue/NotFound'
import BasicDialog from '@/components/UI/BasicDialog'
import BasicButton from '@/components/UI/BasicButton'
import store from './store/index'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', component: Products },
    { path: '/products/add', component: Add_Product },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

const app = createApp(App)
app.use(store)
app.use(router)
app.component('loading', Loading)
app.component('basic-dialog', BasicDialog)
app.component('basic-button', BasicButton)
app.mount('#app');
//为了顺利利用vue add vuetify命令进行安装，需要在输入命令之前更改main.js代码
//main.js 更改后代码
// import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify';
// 
// new Vue({
    // router,
    // vuetify,
    // render: h => h(App)
// }).$mount('#app');
// 