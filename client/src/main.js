import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import VueObserveVisibility from 'vue3-observe-visibility2'

var firebaseConfig = {
  apiKey: "AIzaSyCLyw1A-g9bdfDOGaJw01I2ss0JpIP_PmY",
  authDomain: "clone-d50f8.firebaseapp.com",
  projectId: "clone-d50f8",
  storageBucket: "clone-d50f8.appspot.com",
  messagingSenderId: "774731191147",
  appId: "1:774731191147:web:d3f4b2b1f39739ab19722e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const store = createStore({
  state () {
    return {
      logged: false,
      email: null,
      user: null
    }
  },
  mutations: {
    log (state, status) {
      state.logged = status;
    },
    setUser (state, user) {
      state.user = user;
    },
    setEmail (state, email) {
      state.email = email;
    }
  }
})

createApp(App).use(router).use(store).use(VueObserveVisibility).mount('#app')
