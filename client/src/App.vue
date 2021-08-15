<template>
  <div>
    <Icon v-if="!this.$store.state.user"/>
    <router-view/>
  </div>
</template>

<script>
import Icon from './components/Icon.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: "App",
  components: {
    "Icon" : Icon,
    "NavBar" : NavBar,
  }
}
</script>


<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
