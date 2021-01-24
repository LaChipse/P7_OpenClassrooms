<template>
  <div class="home">
    <NavbarSign />
    <Home />
  </div>
</template>

<script>
import NavbarSign from "@/components/NavbarSign.vue";
import Home from "@/components/FormHome.vue";

export default {
  name: "home",
  components: {
    NavbarSign,
    Home,
  },
};
</script>

<style scoped lang="scss">
h1 {
  color: #091f42;
}
</style>