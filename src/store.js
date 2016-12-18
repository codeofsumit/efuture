import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import credentials from '../credentials.json';

Vue.use(Vuex);


firebase.initializeApp({
  apiKey: credentials.firebase.apiKey,
  databaseURL: credentials.firebase.databaseURL,
  authDomain: credentials.firebase.authURL,
});

const database = firebase.database();

const store = new Vuex.Store({
  state: {
    cars: [],
    translations: {},
    market: 'de_de',
    allowed: false,
    newCar: {
      model: '',
      brand: '',
      img: 'https://getuikit.com/docs/images/placeholder_600x400.svg',
      url: '',
      available: false,
      baseSpecs: {
        range: null,
        price: null,
        battery: null,
        biggerBatteryAvailable: false,
      },
      maxSpecs: {
        range: null,
        price: null,
        battery: null,
      },
    },
  },
  mutations: {
    setCars(state, cars) {
      state.cars = cars;
    },
    setTranslations(state, translations) {
      state.translations = translations;
    },
    setMarket(state, market) {
      state.market = market;
    },
    setUser(state, user) {
      if (user.email === 'sk@outlook.com') {
        state.allowed = true;
      } else {
        state.allowed = false;
      }
    },
  }
});

database.ref('de_de').once('value').then((result) => {
  const cars = result.val().cars;
  const translations = result.val().translations;

  store.commit('setTranslations', translations);

  store.commit('setCars', cars);
});

export default store;
