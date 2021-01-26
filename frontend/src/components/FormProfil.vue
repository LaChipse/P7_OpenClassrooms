<template>
  <b-container class="mt-4 pt-4">
    <b-row class="mt-4 d-flex text-center">
      <b-col class="d-flex justify-content-around">
        <b-img
          id="img_profil"
          rounded
          alt="Circle image profil"
          :src="user.imageUrl"
          fluid
          class="ml-1"
        >
        </b-img>
      </b-col>
      <b-col sm="6" class="mt-4">
        <b-form-group
          label-size="lg"
          label="Nom : "
          label-for="nom"
          class="d-flex"
        >
          <p class="mt-3 ml-2" variant="warning">{{ user.lastName }}</p>
        </b-form-group>

        <b-form-group
          label-size="lg"
          label="Prenom : "
          label-for="Prenom"
          class="d-flex"
        >
          <p class="mt-3 ml-2">{{ user.firstName }}</p>
        </b-form-group>

        <b-form-group
          label-size="lg"
          label="Email : "
          label-for="Email"
          class="d-flex"
        >
          <p class="mt-3 ml-2">{{ user.email }}</p>
        </b-form-group>

        <b-form-group
          label-size="lg"
          label="Publications : "
          label-for="Email"
          class="d-flex"
        >
          <p class="mt-3 ml-2">{{ posts.length }}</p>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-4 d-flex justify-content-around text-center">
      <b-col lg="10" xl="8" class="d-flex justify-content-around">
        <b-col>
          <b-button type="button" variant="primary" v-b-modal.modal-avatar
            >Modifier l'avatar</b-button
          >
        </b-col>

        <b-col>
          <b-button type="button" variant="danger" v-b-modal.modal-deleteProfil
            >Supprimer le profil</b-button
          >
        </b-col>

        <b-col>
          <b-button type="button" to="/profil/post"
            >Voir mes publications</b-button
          >
        </b-col>
      </b-col>
    </b-row>
    <div>
      <b-modal
        id="modal-deleteProfil"
        ref="modal"
        title="Etes vous sur ? Cette action est irréversible"
        @ok="deleteUser()"
      >
      </b-modal>
    </div>
    <div>
      <b-modal
        id="modal-avatar"
        ref="modal"
        title="Choisissez votre photo de profil :"
        @ok="handleOk"
        @hidden="remove"
      >
        <form ref="form">
          <b-form-group
            label="Choisissez votre avatar"
            label-for="avatar"
            invalid-feedback="Une image est requise"
          >
            <b-form-file
              v-model="avatar"
              id="avatar"
              accept="image/png, image/jpeg"
              plain
            ></b-form-file>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: [],
      avatar: [],
      posts: [],
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/user/" + localStorage.getItem("id"), {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.user = response.data;
      })
      .catch((err) => {
        this.errors.push(err);
      });
    axios
      .get("http://localhost:3000/api/post/user/", {
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
  },
  methods: {
    deleteUser() {
      axios
        .delete(
          "http://localhost:3000/api/user/" + localStorage.getItem("id"),
          {
            headers: {
              authorization: "bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      window.location.href = "http://localhost:8080//#/";
    },
    remove() {
      (this.title = ""), (this.imgPost = null);
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      const formData = new FormData();
      formData.append("image", this.avatar);
      axios.put(
        "http://localhost:3000/api/user/" + localStorage.getItem("id"),
        formData,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      );
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      this.$nextTick(() => {
        this.$bvModal.hide("modal-avatar");
        setTimeout(function () {
          location.reload();
        }, 500);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container-sm,
.container-xl {
  max-width: 90%;
}

.container-md {
  max-width: 80%;
}

p {
  font-size: 1.2rem;
  color: black;
}

.img-fluid {
  width: 350px;
  height: 300px;
}

.rounded {
  border-radius: 5rem !important;
  border-top-left-radius: 5rem;
  border-top-right-radius: 5rem;
  border-bottom-right-radius: 5rem;
  border-bottom-left-radius: 5rem;
}
</style>