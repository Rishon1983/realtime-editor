<template>
  <div id="page-not-found" class="page-not-found-component">
    <div class="container">
      <div class="title text">404</div>
      <div class="sub-title text">page not found</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFoundComponent"
}
</script>

<style lang="scss" scoped>
#page-not-found.page-not-found-component {
  width: 100%;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 3em;
    padding: 3em;
    background-color: #000000;

    .text {
      color: #ffffff;

      &.title {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-weight: bold;
        font-size: 7em;
      }

      &.sub-title {
        font-family: 'Lobster', Lobster, Arial, sans-serif;
        font-size: 3em;
      }
    }
  }
}

/*media*/
@media screen and (max-width: 1200px) {
}

@media screen and (max-width: 1000px) {
}

@media screen and (max-width: 770px) {
  #page-not-found.page-not-found-component {
    .container {
      .text {
        &.sub-title {
          font-family: 'Lobster', Lobster, Arial, sans-serif;
          font-size: 2em;
        }
      }
    }
  }
}
</style>