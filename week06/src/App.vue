<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
#front-nav {
  a {
    &.router-link-exact-active {
      color: rgba(0, 0, 0, 0.7);
    }
  }
}
h2 {
  text-align: center;
}
#back-nav {
  a {
    &.router-link-exact-active {
      color: rgba(255, 255, 255, 0.75);
    }
  }
}
</style>
