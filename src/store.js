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
    market: 'us_us',
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
      const market = store.state.market;

      const callback = () => {
        context.commit('setEditCar');
        context.dispatch('getCars');
      };

      let promise;

      if (id) {
        promise = database.ref(`${market}/carlist/${id}`).set(car);
      } else {
        promise = database.ref(`${market}/carlist`).push(car);
      }

      promise.then(callback);

      return promise;
    },
    getCars(context) {
      const market = store.state.market;

      database.ref(`${market}/carlist`).once('value').then((result) => {
        const cars = result.val();

        // convert to array first
        const carArr = _.map(cars, (car, id) => {
          car.id = id;
          return car;
        });

        context.commit('setCars', carArr);
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
      getMarketData();
    },
    setUser(state, user) {
      if (user.uid === 'HrpTfO06FHMH2hI44uzcBmhTkWj2') {
        state.allowed = true;
      } else {
        state.allowed = false;
      }
    },
    setEditCar(state, carId) {
      if (carId) {
        state.editCar.id = carId;
        state.editCar.car = _.find(store.state.cars, ['id', carId]);
      } else {
        state.editCar.car = _.cloneDeep(newCarModel);
        state.editCar.id = undefined;
      }
    },
  },
});

const getMarketData = () => {
  // TODO: find a better place for this
  store.dispatch('getCars');

  // TODO: place this into an action
  database.ref(`${store.state.market}/translations`).once('value').then((result) => {
    const translations = result.val();

    store.commit('setTranslations', translations);
  });
};

getMarketData();

export default store;
