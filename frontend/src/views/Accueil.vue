<template>
  <div class="accueil">
    <NavbarGeneral/>
    <Accueil/>
  </div>
</template>

<script>
import NavbarGeneral from "@/components/NavbarGeneral.vue";
import Accueil from "@/components/FormAccueil.vue";

export default {
  name: "accueil",
  components: {
    NavbarGeneral,
    Accueil,
  },
};
</script>