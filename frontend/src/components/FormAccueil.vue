<template>
  <div>
    <b-container>
      <b-row class="mt-4">
        <b-col
          v-for="(post, id) in posts"
          :key="id"
          class="mb-4 pb-4 col-4 d-flex justify-content-around"
        >
          <div>
            <b-link id="linkPost" v-on:click="getId(post.id)">
              <h4>
                <b-avatar :src="post.avatar" class="mr-3"></b-avatar
                ><strong>{{ post.title }}</strong>
              </h4>
              <b-img
                :id="post.id"
                :src="post.imageUrl"
                fluid
                rounded
              ></b-img>
            </b-link>
            <p>Posté le : {{ post.updatedAt | moment("DD/MM/YY à H:mm") }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      image: "",
    };
  },
  methods: {
    getId: function (id) {
      localStorage.setItem("imgId", id), this.$router.push("/post");
    },
  },
  created() {
    axios
      .get("http://localhost:3000/api/post/", {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.posts = response.data;
      })
      .catch((err) => {
        this.errors.push(err);
      });

    axios
      .get("http://localhost:3000/api/user/" + localStorage.getItem("id"), {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.image = response.data.imageUrl;
      })
      .catch((err) => {
        this.errors.push(err);
      });
  },
};
</script>

<style scoped lang="scss">
.container,
.container-lg,
.container-md,
.container-sm,
.container-xl {
  max-width: 100%;
}
</style>