<template>
  <div class="column is-6 car">
    <div class="card is-fullwidth">
      <div class="card-content">
        <div class="content">
          <label v-if="carId" class="label">Edit Existing Car</label>
          <p v-if="carId" class="control has-addons">
            <input disabled class="input is-expanded" type="text" placeholder="Tesla" v-model="carId">
            <button class="button is-primary" v-on:click="createNewCar()">Create New Car Instead</button>
          </p>
          <label class="label">Car Brand</label>
          <p class="control">
            <input class="input" type="text" placeholder="Tesla" v-model="car.brand">
          </p>
          <label class="label">Car Model</label>
          <p class="control">
            <input class="input" type="text" placeholder="Model S" v-model="car.model">
          </p>
          <label class="label">Image URL</label>
          <p class="control">
            <input class="input" type="url" placeholder="http://cdn.com/image.jpg" v-model="car.img">
          </p>
          <label class="label">Page URL</label>
          <p class="control">
            <input class="input" type="url" placeholder="http://tesla.com/models" v-model="car.url">
          </p>
          <label class="label">Price</label>
          <p class="control">
            <input class="input" type="number" placeholder="70000" v-model="car.baseSpecs.price">
          </p>
          <label class="label">Range</label>
          <p class="control">
            <input class="input" type="number" placeholder="200" v-model="car.baseSpecs.range">
          </p>
          <label class="label">Battery</label>
          <p class="control">
            <input class="input" type="number" placeholder="60" v-model="car.baseSpecs.battery">
          </p>
          <label class="label"><input class="checkbox" type="checkbox" v-model="car.baseSpecs.biggerBatteryAvailable" /> Bigger Battery?</label>
          <label class="label"><input class="checkbox" type="checkbox" v-model="car.available" /> Available</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    computed: {
      car() {
        return this.$store.state.editCar.car;
      },
      carId() {
        return this.$store.state.editCar.id;
      },
    },
    methods: {
      createNewCar() {
        this.$store.commit('setEditCar');
      },
    },
  };
</script>
