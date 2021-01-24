<template>
  <div class="signup">
    <NavbarSign />
    <FormSignup />
  </div>
</template>

<script>
import FormSignup from "@/components/FormSignup.vue";
import NavbarSign from "@/components/NavbarSign.vue";

export default {
  name: "signup",
  components: {
    FormSignup,
    NavbarSign,
  },
};
</script>