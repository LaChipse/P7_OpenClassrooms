<template>
  <div>
    <b-container>
      <b-row class="mt-4 justify-content-around" id="mypost">
        <b-col
          v-for="(post, id) in postsList"
          :key="id"
          class="d-flex mt-4 pt-4 justify-content-around"
          md="6"
        >
          <div>
            <b-link id="linkPost" v-on:click="getId(post.id)">
              <h4>
                <b-avatar :src="post.avatar" class="mr-3"></b-avatar
                ><strong>{{ post.title }}</strong>
              </h4>
              <acronym :title="post.content">
                <b-img
                  :id="post.id"
                  :src="post.imageUrl"
                  :alt="post.content"
                  fluid
                  rounded
                ></b-img>
              </acronym>
            </b-link>
            <p>Posté le : {{ post.updatedAt | moment("DD/MM/YY à H:mm") }}</p>
          </div>
        </b-col>
      </b-row>
      <div class="overflow-auto">
        <b-pagination
          class="mt-4"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="mypost"
          align="center"
          size="sm"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      posts: [],
      image: "",
    };
  },
  computed: {
    rows() {
      return this.posts.length;
    },
    postsList() {
      return this.posts.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
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
        this.posts = response.data,
        console.log(response);
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