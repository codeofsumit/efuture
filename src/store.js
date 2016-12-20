import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import _ from 'lodash';
import credentials from '../credentials.json';

Vue.use(Vuex);


firebase.initializeApp({
  apiKey: credentials.firebase.apiKey,
  databaseURL: credentials.firebase.databaseURL,
  authDomain: credentials.firebase.authURL,
});

const database = firebase.database();

const newCarModel = {
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
};

const store = new Vuex.Store({
  state: {
    cars: [],
    translations: {},
    market: 'de_de',
    allowed: false,
    editCar: {
      id: undefined,
      car: _.cloneDeep(newCarModel),
    },
  },
  actions: {
    saveCar(context) {
      const id = store.state.editCar.id;
      const car = store.state.editCar.car;

      const callback = (result) => {
        context.commit('setEditCar');
        context.dispatch('getCars');
      };

      let promise;

      if (id) {
        promise = database.ref(`de_de/carlist/${id}`).set(car);
      } else {
        promise = database.ref('de_de/carlist').push(car);
      }

      promise.then(callback);

      return promise;
    },
    getCars(context) {
      database.ref('de_de/carlist').once('value').then((result) => {
        const cars = result.val();

        context.commit('setCars', cars);
      });
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
    setEditCar(state, carId) {
      if (carId) {
        state.editCar.id = carId;
        state.editCar.car = store.state.cars[carId];
      } else {
        state.editCar.car = _.cloneDeep(newCarModel);
        state.editCar.id = undefined;
      }
    },
  },
});

store.dispatch('getCars');

database.ref('de_de').once('value').then((result) => {
  const translations = result.val().translations;

  store.commit('setTranslations', translations);
});

export default store;
