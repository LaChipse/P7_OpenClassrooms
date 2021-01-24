<template>
  <div class="loggin">
    <NavbarSign />
    <FormLoggin />
  </div>
</template>

<script>
import FormLoggin from "@/components/FormLoggin.vue";
import NavbarSign from "@/components/NavbarSign.vue";

export default {
  name: "loggin",
  components: {
    FormLoggin,
    NavbarSign,
  },
};
</script>
