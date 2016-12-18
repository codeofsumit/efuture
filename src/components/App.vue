<template>
  <div id="app" v-bind:class="market">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="level">
            <div class="level-left">
              <div>
                <h1 class="title">The <span class="isGreen">E</span>lectric Future, is it here yet?</h1>
                <h2 class="subtitle">Eine Liste von Elektrofahrzeugen die <u>heute</u> zu kaufen sind!</h2>
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
      <div class="filter container">
        <div class="columns">
          <div class="column">
            <label>Sortieren nach</label>
            <div class="control">
              <p class="select">
                <select v-model="sortBy">
                  <option value="brand">Marke</option>
                  <option value="baseSpecs.price">Preis</option>
                  <option value="baseSpecs.range">Reichweite</option>
                  <option value="baseSpecs.battery">Kapazität</option>
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
          <Car v-for="car in availableCars" v-bind:car="car"></Car>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Solltest du noch warten?</h1>
        <h2 class="subtitle">Folgende Fahrzeuge wurden für die nächsten 12 Monate angekündigt.</h2>
        <hr />
      </div>
      <div class="container content">
        <div class="columns is-multiline">
          <Car v-for="car in announcedCars" v-bind:car="car"></Car>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        No guarantee for accurate information | Made by <a href="https://www.twitter.com/tweetsofsumit" target="_blank">a guy</a> who wants to buy an EV soon.
        | <a v-on:click="login()">Login</a>
        <span v-show="allowed">Lalalala</span>
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

  firebase.auth().getRedirectResult().then((result) => {
    // The signed-in user info.
    const user = result.user;

    console.log(user);

    store.commit('setUser', user);
  }).catch(() => {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // const credential = error.credential;
    // ...
  });

  export default {
    store,
    components: {
      Car,
    },
    methods: {
      changeMarket() {
        const newLang = this.market === 'us_us' ? 'de_de' : 'us_us';
        // store.commit('setMarket', newLang);
      },
      login() {
        const provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithRedirect(provider);
      },
    },
    data() {
      return {
        sortBy: 'baseSpecs.range',
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
      availableCars() {
        let cars = this.cars.filter(car => car.available);
        cars = _.sortBy(cars, car => _.get(car, this.sortBy));

        if (this.sortBy !== 'brand') {
          cars = _.reverse(cars);
        }

        return cars;
      },
      announcedCars() {
        let cars = this.cars.filter(car => !car.available);
        cars = _.sortBy(cars, car => _.get(car, this.sortBy));

        if (this.sortBy !== 'brand') {
          cars = _.reverse(cars);
        }

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
