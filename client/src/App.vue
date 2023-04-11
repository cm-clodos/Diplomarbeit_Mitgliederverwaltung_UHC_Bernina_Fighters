<template>
  <div id="app">

    <div class="app-content">



      <router-view :key="$route.fullPath" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}

</script>

<style lang="scss">
  @import "@/assets/styles/app.scss";
</style>
