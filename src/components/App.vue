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
    <section class="section filter">
      <div class="container">
        <div class="columns">
          <div class="column">
            <label>Minimum Range</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. 200"/>
            </div>
          </div>
          <div class="column">
            <label>Minimum Battery Capacity</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. 60"/>
            </div>
          </div>
          <div class="column">
            <label>Maximum Price</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. 45.000"/>
            </div>
          </div>
          <div class="column">
            <label>Brand</label>
            <div class="control">
              <span class="select">
                <select class="select">
                  <option>Mercedes-Benz</option>
                  <option>Tesla</option>
                  <option>BMW</option>
                  <option>Audi</option>
                  <option>Ford</option>
                  <option>Nissan</option>
                  <option>Smart</option>
                  <option>Volvo</option>
                  <option>Porsche</option>
                  <option>Volkswagen</option>
                </select>
              </span>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container content">
        <!-- <h5 class="has-text-centered">
          Es gibt {{modelCount}} Autos von {{brandCount}} Marken. Zu wenig!
        </h5> -->
        <div class="columns is-multiline">
          <div class="column is-3" v-for="car in cars" v-if="car.available">
            <div class="card">
              <div class="card-image" v-bind:class="{announced: !car.available}">
                <figure class="image">
                  <img v-bind:src="car.img" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <div class="level">
                    <div class="level-left">
                      <strong>{{car.name}}</strong>
                    </div>
                    <div class="level-right" v-if="car.url">
                      <a class="link" v-bind:href="car.url" target="_blank">Zur Seite</a>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <span>Preis ab {{car.baseSpecs.price}} {{translations.currency}}</span>
                    </li>
                    <li>
                      <span>Reichweite: {{car.baseSpecs.range}} {{translations.rangeUnit}}</span>
                    </li>
                    <li>
                      <span>Kapazität: {{car.baseSpecs.battery}} {{translations.batteryUnit}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <footer class="footer">
      <div class="container">
        Made by <a href="https://www.twitter.com/tweetsofsumit" target="_blank">Sumit</a>
      </div>
    </footer>
  </div>
</template>

<script>

  import store from '../store';
  import _ from 'lodash';

  export default {
    store,
    methods: {
      changeMarket() {
        const newLang = this.market === 'us_us' ? 'de_de' : 'us_us';
        store.commit('setMarket', newLang);
      }
    },
    data() {
      return {
      }
    },
    computed: {
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
        return this.cars.filter((car) => car.available);
      },
      modelCount() {
        return this.availableCars.length;
      },
      brandCount() {
        const brands = _.map(this.availableCars, (car) => car.brand);
        const uniqueBrands = _.uniq(brands);

        return uniqueBrands.length;
      }
    }
  }
</script>

<style lang="scss" src="../styles/app.scss"></style>
