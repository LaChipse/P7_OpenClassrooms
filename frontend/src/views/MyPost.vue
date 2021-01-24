<template>
  <div class="post">
    <NavbarGeneral/>
    <PostsUser/>
  </div>
</template>

<script>
import NavbarGeneral from "@/components/NavbarGeneral.vue";
import PostsUser from "@/components/FormMyPost.vue";

export default {
  name: "post",
  components: {
    NavbarGeneral,
    PostsUser,
  },
};
</script>