<template>
  <div class="profil">
    <NavbarGeneral />
    <Profil />
  </div>
</template>

<script>
import NavbarGeneral from "@/components/NavbarGeneral.vue";
import Profil from "@/components/FormProfil.vue";

export default {
  name: "profil",
  components: {
    NavbarGeneral,
    Profil,
  },
};
</script>