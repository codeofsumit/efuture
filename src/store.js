import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import credentials from '../credentials.json';

Vue.use(Vuex);


firebase.initializeApp({
  apiKey: credentials.firebase.apiKey,
  databaseURL: credentials.firebase.databaseURL,
});

const database = firebase.database();

const store = new Vuex.Store({
  state: {
    cars: [],
    translations: {},
    market: 'de_de'
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
  }
});

database.ref('de_de').once('value').then(function(result) {
  var cars = result.val().cars;
  var translations = result.val().translations;

  store.commit('setTranslations', translations);

  store.commit('setCars', cars);
});

export default store;
