<template>
  <div>
    <b-container>
      <b-row class="mt-4 d-flex justify-content-around">
        <b-col class="mb-4 col-5 pb-4">
          <div>
            <h2>
              <b-avatar :src="post.avatar" class="mr-3"></b-avatar
              ><strong>{{ post.title }}</strong>
            </h2>
            <div class="d-flex justify-content-around">
              <b-img :id="post.id" :src="post.imageUrl" fluid rounded></b-img>
            </div>
            <div class="d-flex justify-content-between mt-1">
              <p class="mr-1">
                Posté le : {{ post.updatedAt | moment("DD/MM/YY à H:mm") }}
              </p>
              <b-button
                v-if="post.UserId === user.id"
                size="sm"
                class="my-2 mr-1 my-sm-0"
                type="button"
                variant="danger"
                v-b-modal.modal-deletePub
                >Supprimer la publication</b-button
              >
              <b-button
                v-if="post.UserId === user.id"
                size="sm"
                class="my-2 my-sm-0"
                type="button"
                variant="primary"
                v-b-modal.modal-updatePost
                >Modifier la publication</b-button
              >
            </div>
          </div>
          <div class="d-flex">
            <b-button
              v-b-toggle.collapseComment
              id="btn_hide"
              class="dropdown-toggle"
              type="button"
              size="sm"
            >
              {{ comments.length }} commentaires
            </b-button>
          </div>
          <div>
            <b-collapse id="collapseComment" class="mt-2">
              <b-row class="mt-1 mb-4">
                <b-col class="d-flex">
                  <b-button
                    class="p-1"
                    type="button"
                    variant="primary"
                    size="sm"
                    rounded
                    v-b-modal.modal-addComment
                    ><i class="fas fa-plus"></i> Ajouter un
                    commentaire</b-button
                  >
                </b-col>
              </b-row>
              <div v-for="(objet, id) in comments" :key="id" class="mt-1">
                <div class="d-flex">
                  <b-avatar
                    :src="post.avatar"
                    size="2rem"
                    class="mr-2 mb-1"
                  ></b-avatar>
                  <p class="mt-2">
                   {{ comments[id].User.firstName }} {{ comments[id].User.lastName}}
                  </p>
                </div>
                <div
                  id="commentaire"
                  class="border border-dark pt-2 pl-2 pr-2 mb-4 rounded text-break"
                >
                  {{ comments[id].content }}
                  <p class="mt-3">
                    {{ comments[id].updatedAt | moment("DD/MM/YY à H:mm") }}
                  </p>
                </div>
              </div>
            </b-collapse>
          </div>
        </b-col>
      </b-row>
      <div>
        <b-modal id="modal-deletePub" ref="modal" @ok="deletePost()">
          <h4>Etes vous sur ? Cette action est irréversible</h4>
        </b-modal>
      </div>
      <div>
        <b-modal
          id="modal-updatePost"
          ref="modal"
          title="Modifier votre publication :"
          @ok="handleUpdate"
          @hidden="remove"
        >
          <b-form ref="form">
            <b-form-group
              label="Titre de la publication :"
              label-for="title"
              valid-feedback=" "
              invalid-feedback="Un titre d'au moins 3 caractères est requis"
              :state="stateTitle"
            >
              <b-form-input
                v-model="title"
                id="title"
                type="text"
                :placeholder="this.title"
                :state="stateTitle"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Changer votre publication :"
              label-for="imgPost"
            >
              <b-form-file
                v-model="imgPost"
                id="imgPost"
                type="file"
                accept="image/png, image/jpeg, image/gif"
                required
                plain
              ></b-form-file>
            </b-form-group>
          </b-form>
        </b-modal>
      </div>
      <div>
        <b-modal
          id="modal-addComment"
          ref="modal"
          @ok="addComment"
          @hidden="removeComment"
        >
          <b-form ref="form">
            <b-form-group label="Ecrivez votre commentaire :" label-for="text">
              <b-form-textarea
                v-model="content"
                id="content"
                type="text"
                rows="4"
                required
              ></b-form-textarea>
            </b-form-group>
          </b-form>
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: "",
      user: "",
      comments: "",
      title: "",
      imgPost: null,
      content: "",
    };
  },
  computed: {
    stateTitle() {
      return this.title.length >= 3;
    },
  },
  created() {
    axios
      .get("http://localhost:3000/api/post/" + localStorage.getItem("imgId"), {
        headers: {
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        (this.post = response.data), (this.title = response.data.title);
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
        this.user = response.data;
        console.log(this.user);
      })
      .catch((err) => {
        this.errors.push(err);
      });
    axios
      .get(
        "http://localhost:3000/api/comment/" + localStorage.getItem("imgId"),
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        this.comments = response.data;
        console.log(response.data);
      })
      .catch((err) => {
        this.errors.push(err);
      });
  },
  methods: {
    deletePost() {
      axios
        .delete(
          "http://localhost:3000/api/post/" + localStorage.getItem("imgId"),
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
      window.location.href = "http://localhost:8080//#/accueil";
    },
    remove() {
      this.imgPost = null;
    },
    handleUpdate(e) {
      e.preventDefault();
      if (this.title < 3) {
        return;
      } else {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("image", this.imgPost);
        axios
          .put(
            "http://localhost:3000/api/post/" + localStorage.getItem("imgId"),
            formData,
            {
              headers: {
                authorization: "bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            this.errors.push(err);
          });
        this.handleSubmit();
      }
    },
    removeComment() {
      this.content = "";
    },
    addComment(e) {
      e.preventDefault();
      let contents = new Object();
      contents.content = this.content;
      axios
        .post(
          "http://localhost:3000/api/comment/" + localStorage.getItem("imgId"),
          contents,
          {
            headers: {
              authorization: "bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          this.errors.push(err);
        });
      this.handleSubmit();
    },
    handleSubmit() {
      this.$nextTick(() => {
        setTimeout(function () {
          location.reload();
        }, 300);
      });
    },
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

#btn_hide {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  padding-left: 0.7rem;
  margin: 0rem;
}

#commentaire {
  font-size: 1rem;
  color: black;
}
</style>