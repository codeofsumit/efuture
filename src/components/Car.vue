<template>
  <div class="column is-4 car">
    <div class="card is-fullwidth">
      <div class="card-image" v-on:click="edit">
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
              <a class="link" v-bind:href="car.url" target="_blank">{{translations.toPage}}</a>
            </div>
          </div>
          <ul v-if="specsAvailable">
            <li v-if="car.baseSpecs.price">
              <span>{{translations.priceFrom}}:</span>
              <span v-if="translations.currency === '$'">{{translations.currency}}</span>
              <span>{{car.baseSpecs.price}}</span>
              <span v-if="translations.currency === '€'">{{translations.currency}}</span>
            </li>
            <li v-if="car.baseSpecs.range">
              <span>{{translations.range}}: {{car.baseSpecs.range}} {{translations.rangeUnit}}</span>
            </li>
            <li v-if="car.baseSpecs.battery">
              <span>{{translations.capacity}}: {{car.baseSpecs.battery}} {{translations.batteryUnit}}</span>
            </li>
            <li v-if="car.baseSpecs.biggerBatteryAvailable !== null">
              {{translations.batteryUpgrade}}:
              <span v-bind:class="car.baseSpecs.biggerBatteryAvailable ? 'is-green' : 'is-red'">
                {{car.baseSpecs.biggerBatteryAvailable ? `${translations.yes}` : `${translations.no}`}}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import _ from 'lodash';

  export default {
    props: {
      car: {
        type: Object,
      },
      carId: {},
    },
    data() {
      return {};
    },
    computed: {
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
      edit() {
        // if (this.$store.state.allowed) {
        this.$store.commit('setEditCar', this.carId);
        // }
      },
    },
  };
</script>
