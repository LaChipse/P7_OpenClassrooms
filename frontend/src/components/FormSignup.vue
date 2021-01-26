<template>
  <b-container>
    <b-row align-h="center">
      <b-col class="mt-4" md="8" lg="6">
        <b-form @submit.prevent="sendSignup">
          <b-form-group
            id="input-prenom"
            label-size="lg"
            label="Prenom :"
            label-for="prenom"
            valid-feedback=" "
            invalid-feedback="Un prenom valide est requis"
            :state="statePrenom"
          >
            <b-form-input
              id="prenom"
              v-model="dataSignup.firstName"
              placeholder="Entrer prenom"
              type="text"
              :state="statePrenom"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-nom"
            label-size="lg"
            label="Nom:"
            label-for="nom"
            valid-feedback=" "
            invalid-feedback="Un nom valide est requis"
            :state="stateNom"
          >
            <b-form-input
              id="nom"
              v-model="dataSignup.lastName"
              placeholder="Entrer nom"
              type="text"
              :state="stateNom"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-email"
            label-size="lg"
            label="Email:"
            label-for="input-1"
            valid-feedback=" "
            invalid-feedback="Une adresse mail valide est requise"
            :state="stateMail"
            description="Nous ne donnerons jamais votre email à quelqu'un d'autre."
          >
            <b-form-input
              id="email"
              v-model="dataSignup.email"
              type="email"
              placeholder="Entrer email"
              :state="stateMail"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-password"
            label-size="lg"
            label="Password:"
            valid-feedback=" "
            invalid-feedback="Un mot de passe sécurisé est requis (au moins 6 caractères dont une majuscule, une minuscule, un chiffre et un caractère spècial parmis ceux-là : #?!@$%^*-)."
            :state="statePassword"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="dataSignup.password"
              type="password"
              show="false"
              placeholder="Entrer password"
              :state="statePassword"
              required
            ></b-form-input>
          </b-form-group>

          <b-row align-h="center">
            <b-button type="submit" variant="primary">Envoyer</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      dataSignup: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      show: true,
    };
  },
  computed: {
    statePrenom() {
      var regPrenom = /^[A-Z a-z'-]+$/;
      return (
        Boolean(this.dataSignup.firstName) &&
        regPrenom.test(this.dataSignup.firstName)
      );
    },
    stateNom() {
      var regNom = /^[A-Z a-z'-]+$/;
      return (
        Boolean(this.dataSignup.lastName) &&
        regNom.test(this.dataSignup.lastName)
      );
    },
    stateMail() {
      var regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (
        Boolean(this.dataSignup.email) && regMail.test(this.dataSignup.email)
      );
    },
    statePassword() {
      var regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{6,}$/;
      return (
        Boolean(this.dataSignup.password) &&
        regPassword.test(this.dataSignup.password)
      );
    },
  },
  methods: {
    sendSignup: function (e) {
      if (
        !this.statePrenom ||
        !this.stateNom ||
        !this.stateMail ||
        !this.statePassword
      ) {
        e.preventDefault();
      } else {
        //Fonction qui envoi le formulaire d'inscription à l'API

        axios
          .post("http://localhost:3000/api/user/signup", this.dataSignup)
          .then(() => {
            console.log("Inscription réussi !");
            alert("Félicitation vous êtes désormais inscrit");
            window.location.href = "http://localhost:8080/loggin";
          })
          .catch(() => console.log("Echec de l'inscription"));
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>