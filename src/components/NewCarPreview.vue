<template>
  <div class="column is-6 car">
    <div class="card is-fullwidth">
      <div class="card-image">
        <figure class="image">
          <img v-bind:src="car.img" alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="level">
            <div class="level-left">
              <strong>{{car.brand}} {{car.model}}</strong>
            </div>
            <div class="level-right" v-if="car.url">
              <a class="link" v-bind:href="car.url" target="_blank">Zur Seite</a>
            </div>
          </div>
          <ul v-if="specsAvailable">
            <li v-if="car.baseSpecs.price">
              <span>Preis ab {{car.baseSpecs.price}} {{translations.currency}}</span>
            </li>
            <li v-if="car.baseSpecs.range">
              <span>Reichweite: {{car.baseSpecs.range}} {{translations.rangeUnit}}</span>
            </li>
            <li v-if="car.baseSpecs.battery">
              <span>Kapazität: {{car.baseSpecs.battery}} {{translations.batteryUnit}}</span>
            </li>
            <li v-if="car.baseSpecs.biggerBatteryAvailable !== null">
              Batterie Upgrade:
              <span v-bind:class="car.baseSpecs.biggerBatteryAvailable ? 'is-green' : 'is-red'">
                {{car.baseSpecs.biggerBatteryAvailable ? 'Ja' : 'Nein'}}
              </span>
            </li>
          </ul>
          <button v-bind:class="{'is-loading': loading}" class="button is-primary" v-on:click="save">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import _ from 'lodash';

  export default {
    data() {
      return {
        loading: false,
      };
    },
    computed: {
      car() {
        return this.$store.state.editCar.car;
      },
      translations() {
        return this.$store.state.translations;
      },
      specsAvailable() {
        const specs = _.values(this.car.baseSpecs);
        _.remove(specs, _.isNil);

        return specs.length > 0;
      },
    },
    methods: {
      save() {
        if (this.loading) {
          return false;
        }
        this.loading = true;
        this.$store.dispatch('saveCar').then(() => {
          this.loading = false;
        });

        return true;
      },
    },
  };
</script>
