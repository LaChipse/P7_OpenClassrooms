<template>
  <div class="post">
    <NavbarGeneral />
    <Post />
  </div>
</template>

<script>
import NavbarGeneral from "@/components/NavbarGeneral.vue";
import Post from "@/components/OnePost.vue";

export default {
  name: "post",
  components: {
    NavbarGeneral,
    Post,
  },
};
</script>