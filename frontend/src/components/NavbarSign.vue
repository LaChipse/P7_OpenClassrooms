<template>
  <b-navbar toggleable="lg" id="navbar">
    <b-navbar-brand to="/">
      <img
        src="../assets/images/groupomania_logo.png"
        width="250"
        height="50"
        alt="Groupomania_logo"
      />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <!-- Right aligned nav items -->
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/loggin" right>Connexion</b-nav-item>
        <b-nav-item to="/signup" right>Inscription</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#navbar {
  background-color: #091f42;

  a {
    font-weight: bold;
    color: #d4d4d4;

    &.router-link-exact-active {
      color: rgb(208, 80, 89);
    }
  }
}
</style>