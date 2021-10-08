<template>
  <div>
    <Navigation />
    <Movies />
  </div>
</template>


<script>
import Navigation from './Navigation.vue'
import Movies from './Movies.vue'

export default {
  name: 'Home',
	components: {
    Navigation,
    Movies
	}
}
</script>

<style scoped>
</style>
