<template>
  <div id="app">
    <div className="header">
      <div className="logo"></div>
      <div className="header-text">GorAlex</div>
    </div>
    <div className="menu">
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- <router-link> will be rendered as an `<a>` tag by default -->
      <router-link to="/" tag="div" className="menu-option">Home</router-link>
      <router-link to="/files" tag="div" className="menu-option">File Editor</router-link>
    </div>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .header {
    display: flex;
    height: 80px;
    background-color: #c9c9c9;

    .header-text {
      display: flex;
      align-items: center;
      height: 80px;
      font-weight: bold;
      font-size: 40px;
      font-style: italic;
      margin: 0 35px;
    }
  }

  .menu {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 100%;
    background-color: #ebebeb;
    list-style-type: none;
    padding: 0;
    margin: 0;

    .menu-option {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0 15px;

      a {
        text-decoration: none;
      }

      &.router-link-exact-active {
        background-color: #848484;
        color: #ffffff;
      }

      &:not(.router-link-exact-active) {
        &:hover {
          cursor: pointer;
          background-color: #d9d9d9;
        }
      }
    }
  }
}
</style>
