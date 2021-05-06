<template>
  <div class="home-component">
    <div class="text">
      Welcome!
      This is Collaborate Text Editor.
      The users browse to a web site (no need for login) and a text editor app will open, multiple users
      can open this app and edit the same files, the files are saved automatically and will be available
      when opening the app next time or on a different device.
      The edit will be online, everytime someone edits the files all the other users that are viewing the
      file will see the changes in real time.
      Users can add files and remove them
    </div>

  </div>
</template>

<script>

export default {
  name: "HomeComponent",
  components: {}
}
</script>

<style lang="scss" scoped>
  .home-component{
    .text{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>