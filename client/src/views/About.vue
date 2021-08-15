<template>
  <div class="about">
    <h1 @click="test">This is an about page</h1>
    <input type="text" placeholder="Origin" ref="origin"/>
  </div>
</template>

<script>
export default {
  mounted() {
    new google.maps.places.Autocomplete(
      this.$refs["origin"],
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(22.3193, 114.1694)
        ),
      });
  },
  methods : {
    test(){
      console.log(this.$refs["origin"].value)
    }
  }
};
</script>

<style scoped>

div {
  display: grid;
  place-items: center;
}

</style>