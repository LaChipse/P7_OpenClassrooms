<template>
  <b-container>
    <b-row align-h="center" align-v="center">
      <b-col class="mt-4 pt-4" cols="6">
        <b-form method="POST" @submit.prevent="envoi">
          <b-form-group
            id="input-group-1"
            label="Email:"
            label-size="lg"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="dataLog.email"
              type="email"
              size="lg"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label-size="lg"
            label="Password:"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="dataLog.password"
              size="lg"
              type="password"
              show="false"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>

          <b-row align-h="center" class="mt-4">
            <b-button type="submit" variant="primary">Se connecter</b-button>
          </b-row>
          <b-row align-h="center">
            <div class="mt-2">{{ dataLog.error }}</div>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Loggin",
  data() {
    return {
      dataLog: {
        email: null,
        password: null,
        error: "",
      },
      show: true,
    };
  },
  methods: {
    envoi: function () {
      //Fonction qui envoi le formulaire d'inscription à l'API

      console.log(this.dataLog);
      axios
        .post("http://localhost:3000/api/user/login", this.dataLog)
        .then((response) => {
          console.log("Connexion réussite !");
          localStorage.setItem("id", response.data.userId);
          localStorage.setItem("token", response.data.token);
          window.location.href = "http://localhost:8080//#/accueil";
        })
        .catch((err) => {
          this.dataLog.error = err.response.data;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
