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
    cars: []
  },
  mutations: {
    setCars(state, cars) {
      state.cars = cars;
    }
  }
});

database.ref('/cars').once('value').then(function(result) {
  var cars = result.val();

  console.log(cars);

  store.commit('setCars', cars);
});

export default store;
