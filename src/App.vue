<template>

  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from '@/components/Footer'
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },


  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
  }

  #app {
    min-height: 100%;
    position: relative;
  }
</style>