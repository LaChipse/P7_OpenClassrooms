<template>
  <b-navbar toggleable="lg" id="navbar" width="100%">
    <b-navbar-brand to="/accueil">
      <img
        src="../assets/images/icon.png"
        width="60"
        height="60"
        alt="Groupomania_logo"
      />
    </b-navbar-brand>

    <b-navbar-brand to="/profil">
      <b-avatar :src="avatar" size="lg" alt="profil_picture"></b-avatar>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" class="ml-auto"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/accueil" right>Accueil</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item to="/profil" right>Mon compte</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item to="/profil/post" right>Mes publications</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button
            size="sm"
            class="my-2 mr-4 my-sm-0"
            type="button"
            v-b-modal.modal-publication
            >Ajouter une publication</b-button
          >
        </b-nav-form>

        <b-nav-item to="/loggin">Deconnexion</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <div>
      <b-modal
        id="modal-publication"
        ref="modal"
        title="Editez votre publication"
        @ok.prevent="postPub"
      >
        <b-form ref="form">
          <b-form-group
            label="Titre de la publication :"
            label-for="title"
            valid-feedback="Merci!"
            invalid-feedback="Un titre d'au moins 3 caractères est requis"
            :state="stateTitle"
          >
            <b-form-input
              v-model="title"
              id="title"
              type="text"
              :state="stateTitle"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Description de la publication :"
            label-for="content"
            valid-feedback="Merci!"
            invalid-feedback="Une description d'au moins 9 caractères est requise"
            :state="stateContent"
          >
            <b-form-textarea
              v-model="content"
              id="content"
              type="text"
              rows="4"
              :state="stateContent"
              required
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            label="Importez votre publication :"
            label-for="publication"
            valid-feedback="Merci!"
            invalid-feedback="Une image est requise"
            :state="Boolean(imgPost)"
          >
            <b-form-file
              v-model="imgPost"
              id="publication"
              accept="image/png, image/jpeg, image/gif"
              type="file"
              :state="Boolean(imgPost)"
              plain
              required
            ></b-form-file>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </b-navbar>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      content: "",
      imgPost: null,
      avatar: "",
    };
  },
  computed: {
    stateTitle() {
      return this.title.length >= 3;
    },
    stateContent() {
      return this.content.length >= 9;
    },
  },
  created() {
    axios
      .get("http://localhost:3000/api/user/" + localStorage.getItem("id"), {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.avatar = response.data.imageUrl;
      })
      .catch((err) => {
        this.errors.push(err);
      });
  },
  methods: {
    postPub() {
      if (this.title.length < 3 || this.content.length < 9 || !this.imgPost) {
        return;
      } else {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("image", this.imgPost);
        formData.append("avatar", this.avatar);
        axios.post("http://localhost:3000/api/post/", formData, {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        });
        this.$nextTick(() => {
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
#navbar {
  background-color: #091f42;

  a {
    font-weight: bold;
    color: #d4d4d4;

    &.router-link-exact-active {
      color: rgb(208, 80, 89);
    }
  }
}
</style>