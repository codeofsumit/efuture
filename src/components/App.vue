<template>
  <div id="app" v-bind:class="market">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="level">
            <div class="level-left">
              <div>
                <h1 class="title">The <span class="isGreen">E</span>lectric Future, is it here yet?</h1>
                <h2 class="subtitle">{{translations.subtitle}}</h2>
              </div>
            </div>
            <div class="level-right">
              <div class="flag" v-on:click="changeMarket()">
                <img class="placeholder-image" src="../assets/images/flags/de_de.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container content" v-if="allowed">
        <div class="columns">
            <CarPreview></CarPreview>
            <NewCar></NewCar>
        </div>
        <hr />
      </div>
      <div class="filter container">
        <div class="columns">
          <div class="column is-2">
            <label>{{translations.sortBy}}</label>
            <div class="control">
              <p class="select is-fullwidth">
                <select v-model="sortBy">
                  <option value="brand">{{translations.brand}}</option>
                  <option value="baseSpecs.price">{{translations.price}}</option>
                  <option value="baseSpecs.range">{{translations.range}}</option>
                  <option value="baseSpecs.battery">{{translations.battery}}</option>
                </select>
              </p>
            </div>
          </div>
          <div class="column is-2">
            <label>{{translations.order}}</label>
            <div class="control">
              <p class="select is-fullwidth">
                <select v-model="sortOrder">
                  <option value="dsc">{{translations.dsc}}</option>
                  <option value="asc">{{translations.asc}}</option>
                </select>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container content">
        <!-- <h5 class="has-text-centered">
          Es gibt {{modelCount}} Autos von {{brandCount}} Marken. Zu wenig!
        </h5> -->
        <div class="columns is-multiline">
          <Car v-for="car in availableCars" v-bind:car="car" v-bind:carId="car.id"></Car>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">{{translations.shouldYouWait}}</h1>
        <h2 class="subtitle">{{translations.upcomingCars}}</h2>
        <hr />
      </div>
      <div class="container content">
        <div class="columns is-multiline">
          <Car v-for="car in announcedCars" v-bind:car="car" v-bind:carId="car.id"></Car>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        No guarantee for accurate information | Made by <a href="https://www.twitter.com/tweetsofsumit" target="_blank">a guy</a> who wants to buy an EV soon.
        <span v-if="!allowed"> | <a v-on:click="login()">Login</a></span>
        <span v-if="allowed"> | <a v-on:click="logout()">Logout</a></span>
      </div>
    </footer>
  </div>
</template>

<script>

  import _ from 'lodash';
  import firebase from 'firebase';
  import store from '../store';
  import credentials from '../../credentials.json';

  import Car from './Car.vue';
  import NewCar from './NewCar.vue';
  import CarPreview from './NewCarPreview.vue';

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      store.commit('setUser', user);
    } else {
      // No user is signed in.
    }
  });

  export default {
    store,
    components: {
      Car,
      NewCar,
      CarPreview,
    },
    methods: {
      changeMarket() {
        const newLang = this.market === 'us_us' ? 'de_de' : 'us_us';
        store.commit('setMarket', newLang);
      },
      login() {
        const provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithRedirect(provider);
      },
      logout() {
        firebase.auth().signOut().then(() => {
          store.commit('setUser', {});
        });
      },
    },
    data() {
      return {
        sortBy: 'baseSpecs.range',
        sortOrder: 'dsc',
      };
    },
    computed: {
      allowed() {
        return store.state.allowed;
      },
      market() {
        return store.state.market;
      },
      translations() {
        return store.state.translations;
      },
      cars() {
        return store.state.cars;
      },
      sortedCars() {
        let cars = _.sortBy(this.cars, this.sortBy);
        cars = this.sortOrder === 'asc' ? cars : _.reverse(cars);
        return cars;
      },
      availableCars() {
        const cars = _.filter(this.sortedCars, car => car.available);
        return cars;
      },
      announcedCars() {
        const cars = _.filter(this.sortedCars, car => !car.available);
        return cars;
      },
      modelCount() {
        return this.availableCars.length;
      },
      brandCount() {
        const brands = _.map(this.availableCars, car => car.brand);
        const uniqueBrands = _.uniq(brands);

        return uniqueBrands.length;
      },
    },
  };
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', credentials.ga.id, 'auto');
  ga('send', 'pageview');
  /* eslint-enable */
</script>

<style lang="scss" src="../styles/app.scss"></style>
