import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
import firebaseInstance from "./middleware/firebase";
import store from './store'

Vue.config.productionTip = false


firebaseInstance.firebase.auth().onAuthStateChanged((user)=>{
  if (user) {
    window.user = user;
  }
  else{
    window.user=null;
  }
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
})
